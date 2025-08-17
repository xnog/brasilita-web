import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { properties, userPropertyInterests } from "@/lib/db/schema";
import { eq, and, inArray, gte, lte, ilike, desc, asc, sql, count } from "drizzle-orm";

interface PropertyFilters {
    regions?: string[];
    priceMin?: number;
    priceMax?: number;
    bedroomsMin?: number;
    bedroomsMax?: number;
    bathroomsMin?: number;
    bathroomsMax?: number;
    areaMin?: number;
    areaMax?: number;
    location?: string;
    favoritesOnly?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'price' | 'area' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);

        // Parse filters from query params
        const filters: PropertyFilters = {
            regions: searchParams.get('regions')?.split(',').filter(Boolean),
            priceMin: searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : undefined,
            priceMax: searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : undefined,
            bedroomsMin: searchParams.get('bedroomsMin') ? parseInt(searchParams.get('bedroomsMin')!) : undefined,
            bedroomsMax: searchParams.get('bedroomsMax') ? parseInt(searchParams.get('bedroomsMax')!) : undefined,
            bathroomsMin: searchParams.get('bathroomsMin') ? parseInt(searchParams.get('bathroomsMin')!) : undefined,
            bathroomsMax: searchParams.get('bathroomsMax') ? parseInt(searchParams.get('bathroomsMax')!) : undefined,
            areaMin: searchParams.get('areaMin') ? parseInt(searchParams.get('areaMin')!) : undefined,
            areaMax: searchParams.get('areaMax') ? parseInt(searchParams.get('areaMax')!) : undefined,
            location: searchParams.get('location') || undefined,
            favoritesOnly: searchParams.get('favoritesOnly') === 'true',
            page: Math.max(1, parseInt(searchParams.get('page') || '1')),
            limit: Math.min(50, Math.max(10, parseInt(searchParams.get('limit') || '20'))), // Max 50 per page
            sortBy: (searchParams.get('sortBy') as 'price' | 'area' | 'createdAt') || 'createdAt',
            sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
        };

        const appliedFilters = { ...filters };

        // Build where conditions
        const whereConditions = [
            eq(properties.isAvailable, true)
        ];

        if (appliedFilters.regions && appliedFilters.regions.length > 0) {
            whereConditions.push(inArray(properties.regionId, appliedFilters.regions));
        }

        if (appliedFilters.priceMin) {
            whereConditions.push(gte(properties.price, appliedFilters.priceMin));
        }

        if (appliedFilters.priceMax) {
            whereConditions.push(lte(properties.price, appliedFilters.priceMax));
        }

        if (appliedFilters.bedroomsMin) {
            whereConditions.push(gte(properties.bedrooms, appliedFilters.bedroomsMin));
        }

        if (appliedFilters.bedroomsMax) {
            whereConditions.push(lte(properties.bedrooms, appliedFilters.bedroomsMax));
        }

        if (appliedFilters.bathroomsMin) {
            whereConditions.push(gte(properties.bathrooms, appliedFilters.bathroomsMin));
        }

        if (appliedFilters.bathroomsMax) {
            whereConditions.push(lte(properties.bathrooms, appliedFilters.bathroomsMax));
        }

        if (appliedFilters.areaMin) {
            whereConditions.push(gte(properties.area, appliedFilters.areaMin));
        }

        if (appliedFilters.areaMax) {
            whereConditions.push(lte(properties.area, appliedFilters.areaMax));
        }

        if (appliedFilters.location) {
            whereConditions.push(ilike(properties.location, `%${appliedFilters.location}%`));
        }

        const whereClause = whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0];

        // Get total count for pagination
        const [totalCountResult] = await db
            .select({ count: count() })
            .from(properties)
            .where(whereClause);

        const totalCount = totalCountResult.count;
        const totalPages = Math.ceil(totalCount / appliedFilters.limit!);

        // Build sort order
        let orderBy;
        const sortDirection = appliedFilters.sortOrder === 'asc' ? asc : desc;

        switch (appliedFilters.sortBy) {
            case 'price':
                orderBy = sortDirection(properties.price);
                break;
            case 'area':
                orderBy = sortDirection(properties.area);
                break;
            default:
                orderBy = sortDirection(properties.createdAt);
        }

        // Get properties with pagination
        const offset = (appliedFilters.page! - 1) * appliedFilters.limit!;

        const propertyList = await db.query.properties.findMany({
            where: whereClause,
            with: {
                region: true
            },
            orderBy: orderBy,
            limit: appliedFilters.limit,
            offset: offset,
            columns: {
                originalUrl: false // Hide originalUrl from API response
            }
        });

        // Get user interests for these properties
        const propertyIds = propertyList.map(p => p.id);
        let userInterests: Array<{
            id: string;
            userId: string;
            propertyId: string;
            isInterested: boolean | null;
            notes: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        }> = [];

        if (propertyIds.length > 0) {
            userInterests = await db.query.userPropertyInterests.findMany({
                where: and(
                    eq(userPropertyInterests.userId, session.user.id),
                    inArray(userPropertyInterests.propertyId, propertyIds)
                )
            });
        }

        // Combine properties with interest status
        let propertiesWithInterest = propertyList.map(property => {
            const interest = userInterests.find(ui => ui.propertyId === property.id);
            return {
                ...property,
                isInterested: interest?.isInterested || false,
                interestNotes: interest?.notes || null
            };
        });

        // Apply favorites filter if requested
        if (appliedFilters.favoritesOnly) {
            propertiesWithInterest = propertiesWithInterest.filter(property => property.isInterested);
        }

        // Get available filter options for frontend
        const availableFilters = await getAvailableFilters();

        // Adjust pagination for favorites filter
        const finalTotalCount = appliedFilters.favoritesOnly ? propertiesWithInterest.length : totalCount;
        const finalTotalPages = appliedFilters.favoritesOnly ? 1 : totalPages; // Simplified for favorites

        return NextResponse.json({
            properties: propertiesWithInterest,
            pagination: {
                currentPage: appliedFilters.page,
                totalPages: finalTotalPages,
                totalCount: finalTotalCount,
                hasNextPage: appliedFilters.page! < finalTotalPages,
                hasPrevPage: appliedFilters.page! > 1,
                limit: appliedFilters.limit
            },
            appliedFilters: {
                regions: appliedFilters.regions || [],
                priceMin: appliedFilters.priceMin,
                priceMax: appliedFilters.priceMax,
                bedroomsMin: appliedFilters.bedroomsMin,
                bedroomsMax: appliedFilters.bedroomsMax,
                bathroomsMin: appliedFilters.bathroomsMin,
                bathroomsMax: appliedFilters.bathroomsMax,
                areaMin: appliedFilters.areaMin,
                areaMax: appliedFilters.areaMax,
                location: appliedFilters.location,
                favoritesOnly: appliedFilters.favoritesOnly,
                sortBy: appliedFilters.sortBy,
                sortOrder: appliedFilters.sortOrder
            },
            availableFilters
        });

    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

// Manage property interest
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { propertyId, isInterested, notes } = await request.json();

        if (!propertyId) {
            return NextResponse.json({ error: "PropertyId obrigatório" }, { status: 400 });
        }

        if (isInterested) {
            // Insert or update interest
            await db.insert(userPropertyInterests)
                .values({
                    userId: session.user.id,
                    propertyId,
                    isInterested: true,
                    notes: notes || null
                })
                .onConflictDoUpdate({
                    target: [userPropertyInterests.userId, userPropertyInterests.propertyId],
                    set: {
                        isInterested: true,
                        notes: notes || null,
                        updatedAt: sql`now()`
                    }
                });
        } else {
            // Remove interest or mark as not interested
            await db.insert(userPropertyInterests)
                .values({
                    userId: session.user.id,
                    propertyId,
                    isInterested: false,
                    notes: notes || null
                })
                .onConflictDoUpdate({
                    target: [userPropertyInterests.userId, userPropertyInterests.propertyId],
                    set: {
                        isInterested: false,
                        notes: notes || null,
                        updatedAt: sql`now()`
                    }
                });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error updating property interest:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

// Helper function to get available filter options (without regions)
async function getAvailableFilters() {
    try {
        // Get price range
        const [priceRange] = await db
            .select({
                min: sql<number>`MIN(${properties.price})`,
                max: sql<number>`MAX(${properties.price})`
            })
            .from(properties)
            .where(eq(properties.isAvailable, true));

        // Get bedroom options
        const bedroomOptions = await db
            .selectDistinct({ bedrooms: properties.bedrooms })
            .from(properties)
            .where(and(
                eq(properties.isAvailable, true),
                sql`${properties.bedrooms} IS NOT NULL`
            ))
            .orderBy(asc(properties.bedrooms));

        // Get bathroom options  
        const bathroomOptions = await db
            .selectDistinct({ bathrooms: properties.bathrooms })
            .from(properties)
            .where(and(
                eq(properties.isAvailable, true),
                sql`${properties.bathrooms} IS NOT NULL`
            ))
            .orderBy(asc(properties.bathrooms));

        // Get area range
        const [areaRange] = await db
            .select({
                min: sql<number>`MIN(${properties.area})`,
                max: sql<number>`MAX(${properties.area})`
            })
            .from(properties)
            .where(and(
                eq(properties.isAvailable, true),
                sql`${properties.area} IS NOT NULL`
            ));

        return {
            priceRange: {
                min: priceRange?.min || 0,
                max: priceRange?.max || 1000000
            },
            areaRange: {
                min: areaRange?.min || 0,
                max: areaRange?.max || 1000
            },
            bedroomOptions: bedroomOptions.map(b => b.bedrooms).filter(b => b !== null),
            bathroomOptions: bathroomOptions.map(b => b.bathrooms).filter(b => b !== null)
        };

    } catch (error) {
        console.error("Error getting available filters:", error);
        return {
            priceRange: { min: 0, max: 1000000 },
            areaRange: { min: 0, max: 1000 },
            bedroomOptions: [1, 2, 3, 4, 5],
            bathroomOptions: [1, 2, 3, 4]
        };
    }
}