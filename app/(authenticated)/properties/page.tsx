import { auth } from "@/lib/auth";
import { PropertiesClient } from "./properties-client";
import { db } from "@/lib/db";
import { userProfiles, Region, properties, userPropertyInterests } from "@/lib/db/schema";
import { eq, asc, sql, count, and, inArray } from "drizzle-orm";
import { PreferencesRequiredBanner } from "@/components/preferences/preferences-required-banner";
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

        // Prepare preferences for PropertyList if profile exists
        if (userProfile) {
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
                isInterested: boolean;
            }> = [];

            if (propertyIds.length > 0) {
                userInterests = await db.query.userPropertyInterests.findMany({
                    where: and(
                        eq(userPropertyInterests.userId, session.user.id),
                        inArray(userPropertyInterests.propertyId, propertyIds)
                    )
                });
            }

            // Create interest map for easy lookup
            const interestMap = new Map(
                userInterests.map(interest => [interest.propertyId, interest.isInterested])
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
        }
    } catch (error) {
        console.log("Error loading data:", error);
        // Continue without profile - user can still use the page
    }

    return (
        <div className="container mx-auto container-padding py-8">
            <div className="w-full">
                {!userProfile ? (
                    <PreferencesRequiredBanner
                        title="Imóveis"
                        description="Complete seu perfil para ver imóveis selecionados para você."
                    />
                ) : (
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-foreground mb-2">Imóveis Selecionados</h1>
                            <p className="text-muted-foreground mb-3">
                                Lista curada por especialistas baseada no seu perfil
                            </p>
                        </div>

                        <PropertiesClient
                            userPreferences={userPreferences}
                            regions={regions}
                            initialPropertyData={initialPropertyData}
                        />

                        <div className="mt-12">
                            <CustomSearchBanner />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
