import { db } from "@/lib/db";
import { users, userProfiles } from "@/lib/db/schema";
import { eq, isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * GET /api/emails/weekly-suggestions/users
 *
 * Retorna lista de usuários com perfis configurados para receber sugestões semanais.
 * Protegido por API Key no middleware.
 */
export async function GET() {
    try {
        // Buscar todos os usuários que têm perfil configurado
        const usersWithProfiles = await db
            .select({
                userId: users.id,
                userEmail: users.email,
                userName: users.name,
            })
            .from(users)
            .innerJoin(userProfiles, eq(users.id, userProfiles.userId))
            .where(isNotNull(users.email));

        // Retornar apenas dados essenciais para o N8N fazer loop
        return NextResponse.json({
            success: true,
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
