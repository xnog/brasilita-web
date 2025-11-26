import { db } from "@/lib/db";
import { propertyNotifications, users } from "@/lib/db/schema";
import { and, eq, isNotNull, count } from "drizzle-orm";
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
                { error: "Invalid pagination parameters. page >= 1, limit between 1-100" },
                { status: 400 }
            );
        }

        const offset = (page - 1) * limit;

        // Buscar total de alertas ativos
        const [totalCountResult] = await db
            .select({ count: count() })
            .from(propertyNotifications)
            .innerJoin(users, eq(propertyNotifications.userId, users.id))
            .where(
                and(
                    eq(propertyNotifications.isActive, true),
                    isNotNull(users.email)
                )
            );
        
        const totalCount = totalCountResult.count;
        const totalPages = Math.ceil(totalCount / limit);

        // Buscar alertas da página atual
        const activeAlerts = await db
            .select({
                alertId: propertyNotifications.id,
                alertName: propertyNotifications.name,
                userId: users.id,
                userEmail: users.email,
                userName: users.name,
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

        return NextResponse.json({
            alerts: activeAlerts,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                limit: limit
            }
        });
    } catch (error) {
        console.error("Error fetching active alerts:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
