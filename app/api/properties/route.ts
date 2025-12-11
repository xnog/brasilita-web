import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { properties, userPropertyInterests, regions } from "@/lib/db/schema";
import { eq, and, inArray, sql, count, asc } from "drizzle-orm";
import { 
    parseFiltersFromRequest,
    buildWhereClause,
    buildOrderByClause,
    normalizeFilters
} from "@/lib/api/property-filters";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Parse filters from query params
        const filters = parseFiltersFromRequest(request);
        const appliedFilters = { ...filters };

        // Build where clause
        let whereClause = buildWhereClause(filters);

        // Add favorites filter if requested
        if (appliedFilters.favoritesOnly) {
            const favoritesCondition = inArray(
                properties.id,
                db.select({ propertyId: userPropertyInterests.propertyId })
                  .from(userPropertyInterests)
                  .where(
                      and(
                          eq(userPropertyInterests.userId, session.user.id),
                          eq(userPropertyInterests.isInterested, true)
                      )
                  )
            );
            whereClause = whereClause ? and(whereClause, favoritesCondition) : favoritesCondition;
        }

        // Get total count for pagination
        const [totalCountResult] = await db
            .select({ count: count() })
            .from(properties)
            .where(whereClause);

        const totalCount = totalCountResult.count;
        const totalPages = Math.ceil(totalCount / appliedFilters.limit!);

        // Get properties with pagination - using raw query to calculate pricePerSqm
        const offset = (appliedFilters.page! - 1) * appliedFilters.limit!;

        // Build ORDER BY clause using centralized function
        const orderByClause = buildOrderByClause(filters);

        // Query with calculated pricePerSqm
        const propertyList = await db
            .select({
                id: properties.id,
                title: properties.title,
                description: properties.description,
                price: properties.price,
                location: properties.location,
                regionId: properties.regionId,
                propertyType: properties.propertyType,
                rooms: properties.rooms,
                bedrooms: properties.bedrooms,
                bathrooms: properties.bathrooms,
                area: properties.area,
                features: properties.features,
                images: properties.images,
                latitude: properties.latitude,
                longitude: properties.longitude,
                realEstate: properties.realEstate,
                isRentToOwn: properties.isRentToOwn,
                isAvailable: properties.isAvailable,
                isRented: properties.isRented,
                createdAt: properties.createdAt,
                updatedAt: properties.updatedAt,
                pricePerSqm: sql<number>`ROUND((${properties.price}::float / NULLIF(${properties.area}, 0))::numeric, 2)`,
                region: {
                    id: regions.id,
                    name: regions.name,
                    examples: regions.examples,
                    createdAt: regions.createdAt,
                    updatedAt: regions.updatedAt,
                }
            })
            .from(properties)
            .leftJoin(regions, eq(properties.regionId, regions.id))
            .where(whereClause)
            .orderBy(orderByClause)
            .limit(appliedFilters.limit!)
            .offset(offset);

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
        const propertiesWithInterest = propertyList.map(property => {
            const interest = userInterests.find(ui => ui.propertyId === property.id);
            return {
                ...property,
                isInterested: interest?.isInterested || false,
                interestNotes: interest?.notes || null
            };
        });

        // Get available filter options for frontend
        const availableFilters = await getAvailableFilters();

        return NextResponse.json({
            properties: propertiesWithInterest,
            pagination: {
                currentPage: appliedFilters.page,
                totalPages: totalPages,
                totalCount: totalCount,
                hasNextPage: appliedFilters.page! < totalPages,
                hasPrevPage: appliedFilters.page! > 1,
                limit: appliedFilters.limit
            },
            appliedFilters: normalizeFilters(appliedFilters),
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