import { db } from "@/lib/db";
import { propertyNotifications, users } from "@/lib/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/emails/daily-alerts/alerts?page=1&limit=50
 *
 * Retorna lista paginada de alertas ativos para processamento diário.
 * Protegido por API Key no middleware.
 */
export async function GET(request: NextRequest) {
    try {
        // Extrair parâmetros de paginação
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "50");
        
        // Validar parâmetros
        if (page < 1 || limit < 1 || limit > 100) {
            return NextResponse.json(
                { success: false, error: "Invalid pagination parameters. page >= 1, limit between 1-100" },
                { status: 400 }
            );
        }

        const offset = (page - 1) * limit;

        // Buscar total de alertas ativos
        const totalAlertsResult = await db
            .select({
                alertId: propertyNotifications.id,
            })
            .from(propertyNotifications)
            .innerJoin(users, eq(propertyNotifications.userId, users.id))
            .where(
                and(
                    eq(propertyNotifications.isActive, true),
                    isNotNull(users.email)
                )
            );
        
        const totalAlerts = totalAlertsResult.length;
        const totalPages = Math.ceil(totalAlerts / limit);
        const hasMore = page < totalPages;

        // Buscar alertas da página atual
        const activeAlerts = await db
            .select({
                alertId: propertyNotifications.id,
                alertName: propertyNotifications.name,
                userId: users.id,
                userEmail: users.email,
                userName: users.name,
                filters: propertyNotifications.filters,
                lastProcessedAt: propertyNotifications.lastProcessedAt,
            })
            .from(propertyNotifications)
            .innerJoin(users, eq(propertyNotifications.userId, users.id))
            .where(
                and(
                    eq(propertyNotifications.isActive, true),
                    isNotNull(users.email)
                )
            )
            .limit(limit)
            .offset(offset);

        // Retornar dados essenciais para o N8N fazer loop
        return NextResponse.json({
            success: true,
            page,
            limit,
            total: totalAlerts,
            totalPages,
            hasMore,
            count: activeAlerts.length,
            alerts: activeAlerts.map(alert => ({
                alertId: alert.alertId,
                alertName: alert.alertName,
                userId: alert.userId,
                userEmail: alert.userEmail,
                userName: alert.userName,
            })),
        });
    } catch (error) {
        console.error("Error fetching active alerts:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
