import { db } from "@/lib/db";
import { properties, userProfiles, userProfileRegions } from "@/lib/db/schema";
import { and, desc, eq, gte, inArray, isNotNull, lte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import WeeklySuggestionsEmail from "@/emails/weekly-suggestions";

/**
 * GET /api/emails/weekly-suggestions/render?userId=xxx
 *
 * Renderiza o email de sugestões semanais para um usuário específico.
 * Busca até 3 imóveis cadastrados nos últimos 7 dias que atendem ao perfil do usuário.
 * Protegido por API Key no middleware.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "userId parameter is required" },
                { status: 400 }
            );
        }

        // Buscar perfil do usuário com regiões
        const userProfile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, userId),
            with: {
                user: {
                    columns: {
                        name: true,
                        email: true,
                    }
                },
                userProfileRegions: {
                    with: {
                        region: true
                    }
                }
            }
        });

        if (!userProfile) {
            return NextResponse.json(
                { error: "User profile not found" },
                { status: 404 }
            );
        }

        // Construir condições de busca baseado no perfil
        const whereConditions = [
            eq(properties.isAvailable, true),
            // Últimos 7 dias
            gte(properties.createdAt, sql`NOW() - INTERVAL '7 days'`),
        ];

        // Filtrar por regiões se o usuário tiver preferências
        const regionIds = userProfile.userProfileRegions.map(upr => upr.regionId);
        if (regionIds.length > 0) {
            whereConditions.push(inArray(properties.regionId, regionIds));
        }

        // Filtrar por tipo de propriedade
        if (userProfile.propertyType) {
            whereConditions.push(eq(properties.propertyType, userProfile.propertyType));
        }

        // Filtrar por orçamento
        if (userProfile.investmentBudget) {
            // Buscar imóveis até 20% acima do orçamento
            whereConditions.push(lte(properties.price, Math.floor(userProfile.investmentBudget * 1.2)));
        }

        // Filtrar por tipo de uso (rent-to-own se for short_rental)
        if (userProfile.usageType === 'short_rental') {
            whereConditions.push(eq(properties.isRentToOwn, true));
        }

        // Buscar até 3 propriedades
        const matchedProperties = await db
            .select()
            .from(properties)
            .where(and(...whereConditions))
            .orderBy(desc(properties.createdAt))
            .limit(3);

        // Preparar dados para o template
        const propertiesData = matchedProperties.map(prop => ({
            id: prop.id,
            title: prop.title,
            price: prop.price,
            location: prop.location,
            area: prop.area || undefined,
            rooms: prop.rooms || undefined,
            bedrooms: prop.bedrooms || undefined,
            images: prop.images as string[] || [],
        }));

        // Renderizar o email
        const baseUrl = process.env.NEXTAUTH_URL || 'https://brasilita.com';
        const html = await render(
            WeeklySuggestionsEmail({
                userName: userProfile.user?.name || 'Cliente',
                properties: propertiesData,
                baseUrl,
            })
        );

        return NextResponse.json({
            success: true,
            userId,
            userEmail: userProfile.user?.email,
            userName: userProfile.user?.name,
            propertiesCount: propertiesData.length,
            html,
        });
    } catch (error) {
        console.error("Error rendering weekly suggestions email:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
