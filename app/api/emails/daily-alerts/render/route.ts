import { db } from "@/lib/db";
import { properties, propertyNotifications } from "@/lib/db/schema";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import DailyAlertsEmail from "@/emails/daily-alerts";
import { buildWhereClause, type PropertyFilters } from "@/lib/api/property-filters";

/**
 * GET /api/emails/daily-alerts/render?alertId=xxx
 *
 * Renderiza o email de alertas diários para um alerta específico.
 * Busca imóveis cadastrados nas últimas 24h que atendem aos filtros do alerta.
 * Protegido por API Key no middleware.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const alertId = searchParams.get("alertId");

        if (!alertId) {
            return NextResponse.json(
                { error: "alertId parameter is required" },
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

        // Parse os filtros do alerta
        const alertFilters = alert.filters as PropertyFilters;

        // Construir condições de busca baseado nos filtros do alerta
        const whereClause = buildWhereClause(alertFilters);

        // Adicionar filtro de data: últimas 24 horas
        const dateCondition = gte(properties.createdAt, sql`NOW() - INTERVAL '24 hours'`);

        // Combinar todas as condições
        const finalWhereClause = and(whereClause, dateCondition);

        // Buscar propriedades que atendem ao alerta
        const matchedProperties = await db
            .select()
            .from(properties)
            .where(finalWhereClause)
            .orderBy(desc(properties.createdAt))
            .limit(10); // Máximo 10 propriedades por email

        // Se não houver propriedades novas, não enviar email
        if (matchedProperties.length === 0) {
            return NextResponse.json({
                success: true,
                alertId,
                propertiesCount: 0,
                message: "No new properties found for this alert",
                html: null,
            });
        }

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
            DailyAlertsEmail({
                userName: alert.user?.name || 'Cliente',
                alertName: alert.name,
                properties: propertiesData,
                baseUrl,
            })
        );

        // Atualizar lastProcessedAt do alerta
        await db
            .update(propertyNotifications)
            .set({ lastProcessedAt: new Date() })
            .where(eq(propertyNotifications.id, alertId));

        return NextResponse.json({
            success: true,
            alertId,
            alertName: alert.name,
            userId: alert.userId,
            userEmail: alert.user?.email,
            userName: alert.user?.name,
            propertiesCount: propertiesData.length,
            html,
        });
    } catch (error) {
        console.error("Error rendering daily alert email:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
