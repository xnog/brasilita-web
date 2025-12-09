import { Metadata } from "next";
import { AdvisoryClient } from "./advisory-client";
import { db } from "@/lib/db";
import { properties, userProfiles, UserProfile } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Assessoria de Compra de Imóveis na Itália | Brasilità",
    description: "Assessoria completa para comprar seu imóvel na Itália com segurança. Do sonho à chave, cuidamos de todo o processo: busca, validação, documentação e suporte em português.",
    keywords: [
        "comprar imóvel na Itália",
        "assessoria imobiliária Itália",
        "compra de imóveis italianos",
        "investir na Itália",
        "imóveis Itália brasileiros",
        "assessoria compra imóvel Itália",
        "Brasilità"
    ],
    openGraph: {
        title: "Assessoria de Compra de Imóveis na Itália - Brasilità",
        description: "Do sonho à chave: assessoria completa para comprar seu imóvel na Itália com segurança e suporte em português.",
        type: "website",
        locale: "pt_BR",
        siteName: "Brasilità - Seu imóvel na Itália",
    },
};

export default async function AdvisoryPage({
    searchParams,
}: {
    searchParams: Promise<{ propertyId?: string }>;
}) {
    const params = await searchParams;
    const propertyId = params.propertyId;
    const session = await auth();

    let property = null;
    let userProfile = null;
    let userEmail: string | undefined = undefined;
    let userRegionNames: string[] = [];

    // Buscar informações do usuário
    try {
        const [propertyResult, profileResult] = await Promise.all([
            // Buscar propriedade se propertyId foi fornecido
            propertyId ? db.query.properties.findFirst({
                where: eq(properties.id, propertyId),
                with: {
                    region: true
                },
                columns: {
                    originalUrl: false
                }
            }) : Promise.resolve(null),

            // Buscar perfil do usuário
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
        ]);

        property = propertyResult;
        userProfile = profileResult;
        userEmail = session?.user?.email || undefined;

        // Mapear IDs das regiões do usuário para nomes
        if (userProfile && userProfile.userProfileRegions) {
            userRegionNames = userProfile.userProfileRegions.map(upr => upr.region.name);
            // Adicionar regions como propriedade temporária
            (userProfile as UserProfile & { regions?: string[] }).regions = userProfile.userProfileRegions.map(upr => upr.regionId);
        }
    } catch (error) {
        console.error("Error fetching advisory page data:", error);
    }

    return (
        <AdvisoryClient
            initialProperty={property}
            userProfile={userProfile}
            userEmail={userEmail}
            userRegionNames={userRegionNames}
        />
    );
}
