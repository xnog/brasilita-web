import { auth } from "@/lib/auth";
import { PropertiesClient } from "./properties-client";
import { db } from "@/lib/db";
import { userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PreferencesRequiredBanner } from "@/components/preferences/preferences-required-banner";

export default async function PropertiesPage() {
    const session = await auth();

    // Try to get user profile for default filters
    let userProfile = null;
    try {
        if (session?.user?.id) {
            userProfile = await db.query.userProfiles.findFirst({
                where: eq(userProfiles.userId, session.user.id)
            });
        }
    } catch (error) {
        console.log("User profile not found or database not ready:", error);
        // Continue without profile - user can still use the page
    }

    return (
        <div className="container mx-auto container-padding py-8">
            <div className="max-w-4xl mx-auto">
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
                            <p className="text-sm text-emerald-600 font-medium">
                                {userProfile.location && `${userProfile.location}`}
                                {userProfile.location && userProfile.investmentBudget && ` • `}
                                {userProfile.investmentBudget && `Até €${userProfile.investmentBudget.toLocaleString()}`}
                            </p>
                        </div>

                        <PropertiesClient userProfile={userProfile} />
                    </>
                )}
            </div>
        </div>
    );
}
