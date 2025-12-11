import { auth } from "@/lib/auth";
import { PropertiesClient } from "./properties-client";
import { db } from "@/lib/db";
import { userProfiles, Region, properties, userPropertyInterests } from "@/lib/db/schema";
import { eq, asc, sql, count, and, inArray } from "drizzle-orm";
import { CustomSearchBanner } from "@/components/services/custom-search-banner";
import {
    buildWhereClause,
    buildOrderByClause,
    normalizeFilters
} from "@/lib/api/property-filters";

export default async function PropertiesPage() {
    const session = await auth();

    // Load both user profile and regions in parallel
    let userProfile = null;
    let userPreferences = null;
    let regions: Region[] = [];
    let initialPropertyData = null;
    let userEmail: string | undefined;
    let userRegionNames: string[] = [];

    try {
        const [profileResult, regionsResult] = await Promise.all([
            session?.user?.id ? db.query.userProfiles.findFirst({
                where: eq(userProfiles.userId, session.user.id),
                with: {
                    userProfileRegions: {
                        with: {
                            region: true
                        }
                    }
                }
            }) : Promise.resolve(null),
            db.query.regions.findMany({
                orderBy: asc(sql`${sql.identifier('name')}`)
            })
        ]);

        userProfile = profileResult;
        regions = regionsResult || [];

        // Extract user info for WhatsApp messages
        if (session?.user?.email) {
            userEmail = session.user.email;
        }

        // Prepare preferences for PropertyList if profile exists
        if (userProfile) {
            // Extract region names for WhatsApp
            if (userProfile.userProfileRegions.length > 0) {
                userRegionNames = userProfile.userProfileRegions.map(upr => upr.region.name);
            }

            userPreferences = {
                page: 1,
                limit: 20,
                sortBy: 'createdAt' as const,
                sortOrder: 'desc' as const,
                ...(userProfile.userProfileRegions.length > 0 && {
                    regions: userProfile.userProfileRegions.map(upr => upr.regionId)
                }),
                ...(userProfile.investmentBudget && {
                    priceMax: userProfile.investmentBudget
                })
            };

            // Fetch initial property data on server for SSR
            const normalizedFilters = normalizeFilters(userPreferences);
            const whereClause = buildWhereClause(normalizedFilters);
            const orderBy = buildOrderByClause(normalizedFilters);

            // Get total count and properties in parallel
            const [totalCountResult, propertyList] = await Promise.all([
                db.select({ count: count() })
                    .from(properties)
                    .where(whereClause),
                db.query.properties.findMany({
                    where: whereClause,
                    with: {
                        region: true
                    },
                    orderBy: orderBy,
                    limit: normalizedFilters.limit,
                    offset: 0, // First page
                    columns: {
                        originalUrl: false // Hide originalUrl from response
                    }
                })
            ]);

            const totalCount = totalCountResult[0]?.count || 0;
            const totalPages = Math.ceil(totalCount / (normalizedFilters.limit || 20));

            // Get user interests for these properties
            const propertyIds = propertyList.map(p => p.id);
            let userInterests: Array<{
                id: string;
                userId: string;
                propertyId: string;
                isInterested: boolean | null;
            }> = [];

            if (propertyIds.length > 0 && session?.user?.id) {
                userInterests = await db.query.userPropertyInterests.findMany({
                    where: and(
                        eq(userPropertyInterests.userId, session.user.id),
                        inArray(userPropertyInterests.propertyId, propertyIds)
                    )
                });
            }

            // Create interest map for easy lookup
            const interestMap = new Map(
                userInterests.map(interest => [interest.propertyId, interest.isInterested ?? false])
            );

            // Add interest status to properties
            const propertiesWithInterest = propertyList.map(property => ({
                ...property,
                isInterested: interestMap.get(property.id) || false
            }));

            initialPropertyData = {
                properties: propertiesWithInterest,
                pagination: {
                    currentPage: normalizedFilters.page || 1,
                    totalPages: Math.max(1, totalPages),
                    totalCount: Math.max(0, totalCount),
                    hasNextPage: (normalizedFilters.page || 1) < Math.max(1, totalPages),
                    hasPrevPage: (normalizedFilters.page || 1) > 1,
                    limit: normalizedFilters.limit || 20
                },
                appliedFilters: normalizedFilters
            };
        } else {
            // If no profile, show all properties with default filters
            const defaultFilters = {
                page: 1,
                limit: 20,
                sortBy: 'createdAt' as const,
                sortOrder: 'desc' as const,
            };

            const normalizedFilters = normalizeFilters(defaultFilters);
            const whereClause = buildWhereClause(normalizedFilters);
            const orderBy = buildOrderByClause(normalizedFilters);

            const [totalCountResult, propertyList] = await Promise.all([
                db.select({ count: count() })
                    .from(properties)
                    .where(whereClause),
                db.query.properties.findMany({
                    where: whereClause,
                    with: {
                        region: true
                    },
                    orderBy: orderBy,
                    limit: normalizedFilters.limit,
                    offset: 0,
                    columns: {
                        originalUrl: false
                    }
                })
            ]);

            const totalCount = totalCountResult[0]?.count || 0;
            const totalPages = Math.ceil(totalCount / (normalizedFilters.limit || 20));

            // Get user interests if logged in
            const propertyIds = propertyList.map(p => p.id);
            let userInterests: Array<{
                id: string;
                userId: string;
                propertyId: string;
                isInterested: boolean | null;
            }> = [];

            if (propertyIds.length > 0 && session?.user?.id) {
                userInterests = await db.query.userPropertyInterests.findMany({
                    where: and(
                        eq(userPropertyInterests.userId, session.user.id),
                        inArray(userPropertyInterests.propertyId, propertyIds)
                    )
                });
            }

            const interestMap = new Map(
                userInterests.map(interest => [interest.propertyId, interest.isInterested ?? false])
            );

            const propertiesWithInterest = propertyList.map(property => ({
                ...property,
                isInterested: interestMap.get(property.id) || false
            }));

            initialPropertyData = {
                properties: propertiesWithInterest,
                pagination: {
                    currentPage: normalizedFilters.page || 1,
                    totalPages: Math.max(1, totalPages),
                    totalCount: Math.max(0, totalCount),
                    hasNextPage: (normalizedFilters.page || 1) < Math.max(1, totalPages),
                    hasPrevPage: (normalizedFilters.page || 1) > 1,
                    limit: normalizedFilters.limit || 20
                },
                appliedFilters: normalizedFilters
            };
        }
    } catch (error) {
        console.log("Error loading data:", error);
        // Continue - page can still work without data
    }

    return (
        <div className="container mx-auto container-padding py-8">
            <div className="w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        {userProfile ? "Imóveis Selecionados" : "Imóveis"}
                    </h1>
                    <p className="text-muted-foreground mb-3">
                        {userProfile 
                            ? "Imóveis de imobiliárias italianas. Assessoramos você em todo o processo de compra."
                            : "Explore imóveis de imobiliárias italianas. Complete seu perfil para ver recomendações personalizadas."
                        }
                    </p>
                </div>

                <PropertiesClient
                    userPreferences={userPreferences}
                    regions={regions}
                    initialPropertyData={initialPropertyData}
                />

                <div className="mt-12">
                    <CustomSearchBanner 
                        userProfile={userProfile}
                        userEmail={userEmail}
                        userRegionNames={userRegionNames}
                    />
                </div>
            </div>
        </div>
    );
}
