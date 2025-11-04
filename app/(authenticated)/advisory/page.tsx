import { Metadata } from "next";
import { AdvisoryClient } from "./advisory-client";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

    let property = null;

    if (propertyId) {
        try {
            property = await db.query.properties.findFirst({
                where: eq(properties.id, propertyId),
                with: {
                    region: true
                },
                columns: {
                    originalUrl: false
                }
            });
        } catch (error) {
            console.error("Error fetching property:", error);
        }
    }

    return <AdvisoryClient initialProperty={property} />;
}
