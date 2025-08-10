import { auth } from "@/lib/auth";
import { PropertiesClient } from "./properties-client";
import { db } from "@/lib/db";
import { userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-4">Imóveis</h1>
                <p className="text-sm text-muted-foreground mb-4">Seleção personalizada da IA</p>
                <p className="text-gray-600">
                        {userProfile ? (
                            <>
                                Nossa IA selecionou imóveis que atendem ao seu perfil de investimento.
                                Marque aqueles que despertam seu interesse para acompanhamento personalizado.
                                <span className="block mt-2 text-sm text-green-600 font-medium">
                                    🤖 Baseado no seu perfil: {userProfile.location && `${userProfile.location} • `}
                                    {userProfile.investmentBudget && `Até €${userProfile.investmentBudget.toLocaleString()} • `}
                                    {userProfile.propertyType && `${userProfile.propertyType}`}
                                </span>
                            </>
                        ) : (
                            <>
                                Complete seu perfil no checklist para que nossa IA possa selecionar imóveis ideais para você.
                                <span className="block mt-2 text-sm text-blue-600">
                                    💡 Configure suas preferências para recomendações personalizadas
                                </span>
                            </>
                        )}
                </p>
            </div>

            <PropertiesClient userProfile={userProfile} />
        </div>
    );
}
