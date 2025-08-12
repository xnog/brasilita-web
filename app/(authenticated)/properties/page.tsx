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
        userProfile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, session?.user?.id)
        });
    } catch (error) {
        console.log("User profile not found or database not ready:", error);
        // Continue without profile - user can still use the page
    }

    return (
        <div className="container mx-auto container-padding py-8">
            <div className="max-w-4xl mx-auto">
                {!userProfile ? (
                    <PreferencesRequiredBanner
                        title="Imóveis Selecionados"
                        description="Complete seu perfil para que nossa IA e especialistas possam selecionar imóveis ideais para você."
                    />
                ) : (
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-foreground mb-2">Imóveis</h1>
                            <p className="text-muted-foreground mb-4">Seleção personalizada da IA e especialistas</p>
                            <p className="text-muted-foreground">
                                Nossa IA e especialistas selecionaram imóveis que atendem ao seu perfil de investimento.
                                Marque aqueles que despertam seu interesse para acompanhamento personalizado.
                                <span className="block mt-2 text-sm text-green-600 font-medium">
                                    🤖👨‍💼 Baseado no seu perfil: {userProfile.location && `${userProfile.location} • `}
                                    {userProfile.investmentBudget && `Até €${userProfile.investmentBudget.toLocaleString()} • `}
                                    {userProfile.propertyType && `${userProfile.propertyType}`}
                                </span>
                            </p>
                        </div>

                        <PropertiesClient userProfile={userProfile} />
                    </>
                )}
            </div>
        </div>
    );
}
