import { db } from "@/lib/db";
import { users, userProfiles } from "@/lib/db/schema";
import { eq, isNotNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/emails/weekly-suggestions/users?page=1&limit=50
 *
 * Retorna lista paginada de usuários com perfis configurados para receber sugestões semanais.
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

        // Buscar total de usuários com perfis
        const totalUsersResult = await db
            .select({
                userId: users.id,
            })
            .from(users)
            .innerJoin(userProfiles, eq(users.id, userProfiles.userId))
            .where(isNotNull(users.email));

        const totalUsers = totalUsersResult.length;
        const totalPages = Math.ceil(totalUsers / limit);
        const hasMore = page < totalPages;

        // Buscar usuários da página atual
        const usersWithProfiles = await db
            .select({
                userId: users.id,
                userEmail: users.email,
                userName: users.name,
            })
            .from(users)
            .innerJoin(userProfiles, eq(users.id, userProfiles.userId))
            .where(isNotNull(users.email))
            .limit(limit)
            .offset(offset);

        // Retornar dados essenciais para o N8N fazer loop
        return NextResponse.json({
            success: true,
            page,
            limit,
            total: totalUsers,
            totalPages,
            hasMore,
            count: usersWithProfiles.length,
            users: usersWithProfiles,
        });
    } catch (error) {
        console.error("Error fetching users for weekly suggestions:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
