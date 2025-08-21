import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { properties, userPropertyInterests } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PropertyDetailClient } from "./property-detail-client";

interface PropertyDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
        notFound();
    }

    // Buscar a propriedade com região
    const property = await db.query.properties.findFirst({
        where: eq(properties.id, id),
        with: {
            region: true
        }
    });

    if (!property) {
        notFound();
    }

    // Buscar interesse do usuário nesta propriedade
    let userInterest = null;
    try {
        userInterest = await db.query.userPropertyInterests.findFirst({
            where: and(
                eq(userPropertyInterests.userId, session.user.id),
                eq(userPropertyInterests.propertyId, property.id)
            )
        });
    } catch (error) {
        console.error("Error fetching user interest:", error);
    }

    // Preparar dados da propriedade com status de interesse
    const propertyWithInterest = {
        ...property,
        isInterested: userInterest?.isInterested || false,
        interestNotes: userInterest?.notes || null
    };

    return (
        <div className="container mx-auto container-padding py-8">
            <PropertyDetailClient property={propertyWithInterest} />
        </div>
    );
}

// Gerar metadata para SEO
export async function generateMetadata({ params }: PropertyDetailPageProps) {
    const { id } = await params;
    const property = await db.query.properties.findFirst({
        where: eq(properties.id, id),
        with: {
            region: true
        }
    });

    if (!property) {
        return {
            title: 'Propriedade não encontrada',
            description: 'A propriedade solicitada não foi encontrada.'
        };
    }

    const propertyImages = property.images
        ? (typeof property.images === 'string' ? JSON.parse(property.images) : property.images)
        : [];

    return {
        title: `${property.title} - Brasilità`,
        description: property.description || `${property.title} em ${property.location}, ${property.region?.name || 'Itália'}. €${property.price.toLocaleString()}.`,
        openGraph: {
            title: `${property.title} - Brasilità`,
            description: property.description || `Propriedade em ${property.location}, ${property.region?.name || 'Itália'}. €${property.price.toLocaleString()}.`,
            siteName: "Brasilità",
            type: "website",
            images: [
                // Primeira imagem do imóvel se disponível
                ...(propertyImages.length > 0 ? [propertyImages[0]] : []),
                // Logo da Brasilità como fallback
                {
                    url: "/logo.svg",
                    width: 800,
                    height: 600,
                    alt: "Brasilità - Seu imóvel na Itália"
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: `${property.title} - Brasilità`,
            description: property.description || `Propriedade em ${property.location}`,
            images: propertyImages.length > 0 ? [propertyImages[0]] : ["/logo.svg"]
        }
    };
}
