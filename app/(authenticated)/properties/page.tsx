import { auth } from "@/lib/auth";
import { PropertiesClient } from "./properties-client";
import { db } from "@/lib/db";
import { userProfiles, Region } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import { PreferencesRequiredBanner } from "@/components/preferences/preferences-required-banner";

export default async function PropertiesPage() {
    const session = await auth();

    // Load both user profile and regions in parallel
    let userProfile = null;
    let userPreferences = null;
    let regions: Region[] = [];

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

                        <PropertiesClient userPreferences={userPreferences} regions={regions} />
                    </>
                )}
            </div>
        </div>
    );
}
