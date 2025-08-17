import { auth } from "@/lib/auth";
import { PreferencesClient } from "./preferences-client";
import { db } from "@/lib/db";
import { userProfiles, UserProfile } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";

export default async function PreferencesPage() {
    const session = await auth();

    // Load user profile and regions in parallel via SSR
    let userProfile = null;
    let availableRegions: { value: string; label: string; }[] = [];

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

        userProfile = profileResult || null;
        availableRegions = regionsResult?.map(region => ({
            value: region.id,
            label: region.name
        })) || [];

        // If profile exists, add regions as a temporary property for the client
        if (userProfile && userProfile.userProfileRegions) {
            (userProfile as UserProfile & { regions?: string[] }).regions = userProfile.userProfileRegions.map(upr => upr.regionId);
        }
    } catch (error) {
        console.log("Error loading preferences data:", error);
    }

    return (
        <div className="container mx-auto container-padding py-8">
            <PreferencesClient
                initialUserProfile={userProfile}
                availableRegions={availableRegions}
            />
        </div>
    );
}
