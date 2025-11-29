import { db } from "@/lib/db";
import { properties, userProfiles } from "@/lib/db/schema";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import WeeklySuggestionsEmail from "@/emails/weekly-suggestions";
import { sendEmail } from "@/lib/email";

/**
 * POST /api/emails/weekly-suggestions/send
 * Body: { userId: string }
 *
 * Renderiza E envia o email de sugestões semanais para um usuário específico.
 * Busca até 3 imóveis cadastrados nos últimos 7 dias que atendem ao perfil do usuário.
 * Se não houver imóveis, não envia email (retorna success: true, sent: false).
 * Protegido por API Key no middleware.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required in request body" },
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

        if (!userProfile.user?.email) {
            return NextResponse.json(
                { error: "User email not found" },
                { status: 400 }
            );
        }

        // Verificar se o usuário desativou as sugestões semanais
        const emailPrefs = userProfile.emailPreferences as { weeklySuggestions?: boolean } | null;
        if (emailPrefs?.weeklySuggestions === false) {
            return NextResponse.json({
                success: true,
                sent: false,
                userId,
                message: "User has disabled weekly suggestions",
            });
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

        // Buscar até 10 propriedades mais recentes
        const matchedProperties = await db.query.properties.findMany({
            where: and(...whereConditions),
            with: {
                region: true,
            },
            orderBy: desc(properties.createdAt),
            limit: 10,
        });

        // Se não houver propriedades, não enviar email
        if (matchedProperties.length === 0) {
            return NextResponse.json({
                success: true,
                sent: false,
                userId,
                propertiesCount: 0,
                message: "No properties found for this user - email not sent",
            });
        }

        // Preparar dados para o template
        const propertiesData = matchedProperties.map(prop => ({
            id: prop.id,
            title: prop.title,
            price: prop.price,
            location: prop.location,
            region: prop.region?.name || undefined,
            area: prop.area || undefined,
            rooms: prop.rooms || undefined,
            bedrooms: prop.bedrooms || undefined,
            bathrooms: prop.bathrooms || undefined,
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

        // Enviar email
        const emailResult = await sendEmail({
            to: userProfile.user.email,
            subject: `Brasilità: ${propertiesData.length} ${propertiesData.length === 1 ? 'novo imóvel selecionado' : 'novos imóveis selecionados'} para você`,
            html,
        });

        return NextResponse.json({
            success: true,
            sent: true,
            userId,
            userEmail: userProfile.user?.email,
            propertiesCount: propertiesData.length,
            messageId: emailResult.messageId,
        });
    } catch (error) {
        console.error("Error sending weekly suggestions email:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
