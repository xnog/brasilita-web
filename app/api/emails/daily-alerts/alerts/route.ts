import { db } from "@/lib/db";
import { propertyNotifications, users } from "@/lib/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * GET /api/emails/daily-alerts/alerts
 *
 * Retorna lista de alertas ativos para processamento diário.
 * Protegido por API Key no middleware.
 */
export async function GET() {
    try {
        // Buscar todos os alertas ativos com informações do usuário
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
            );

        // Retornar apenas dados essenciais para o N8N fazer loop
        return NextResponse.json({
            success: true,
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
