import { db } from "@/lib/db";
import { properties, propertyNotifications } from "@/lib/db/schema";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import DailyAlertsEmail from "@/emails/daily-alerts";
import { buildWhereClause, type PropertyFilters } from "@/lib/api/property-filters";
import { sendEmail } from "@/lib/email";

/**
 * POST /api/emails/daily-alerts/send
 * Body: { alertId: string }
 *
 * Renderiza E envia o email de alertas diários para um alerta específico.
 * Busca imóveis cadastrados nas últimas 24h que atendem aos filtros do alerta.
 * Se não houver imóveis, não envia email (retorna success: true, sent: false).
 * Protegido por API Key no middleware.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { alertId } = body;

        if (!alertId) {
            return NextResponse.json(
                { error: "alertId is required in request body" },
                { status: 400 }
            );
        }

        // Buscar o alerta com informações do usuário
        const alert = await db.query.propertyNotifications.findFirst({
            where: eq(propertyNotifications.id, alertId),
            with: {
                user: {
                    columns: {
                        name: true,
                        email: true,
                    }
                }
            }
        });

        if (!alert) {
            return NextResponse.json(
                { error: "Alert not found" },
                { status: 404 }
            );
        }

        if (!alert.isActive) {
            return NextResponse.json(
                { error: "Alert is not active" },
                { status: 400 }
            );
        }

        if (!alert.user?.email) {
            return NextResponse.json(
                { error: "User email not found" },
                { status: 400 }
            );
        }

        // Parse os filtros do alerta
        const alertFilters = alert.filters as PropertyFilters;

        // Construir condições de busca baseado nos filtros do alerta
        const whereClause = buildWhereClause(alertFilters);

        // Adicionar filtro de data: últimas 24 horas
        const dateCondition = gte(properties.createdAt, sql`NOW() - INTERVAL '24 hours'`);

        // Combinar todas as condições
        const finalWhereClause = and(whereClause, dateCondition);

        // Buscar propriedades que atendem ao alerta
        const matchedProperties = await db.query.properties.findMany({
            where: finalWhereClause,
            with: {
                region: true,
            },
            orderBy: desc(properties.createdAt),
            limit: 10, // Máximo 10 propriedades por email
        });

        // Se não houver propriedades novas, não enviar email
        if (matchedProperties.length === 0) {
            return NextResponse.json({
                success: true,
                sent: false,
                alertId,
                propertiesCount: 0,
                message: "No new properties found for this alert - email not sent",
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
            DailyAlertsEmail({
                userName: alert.user?.name || 'Cliente',
                alertName: alert.name,
                properties: propertiesData,
                baseUrl,
            })
        );

        // Enviar email
        const emailResult = await sendEmail({
            to: alert.user.email,
            subject: `Brasilità: ${propertiesData.length} ${propertiesData.length === 1 ? 'novo imóvel' : 'novos imóveis'}`,
            html,
        });

        // Atualizar lastProcessedAt do alerta
        await db
            .update(propertyNotifications)
            .set({ lastProcessedAt: new Date() })
            .where(eq(propertyNotifications.id, alertId));

        return NextResponse.json({
            success: true,
            sent: true,
            alertId,
            alertName: alert.name,
            userId: alert.userId,
            userEmail: alert.user?.email,
            propertiesCount: propertiesData.length,
            messageId: emailResult.messageId,
        });
    } catch (error) {
        console.error("Error sending daily alert email:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
