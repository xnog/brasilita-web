import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * PATCH /api/user/email-preferences
 * Body: { weeklySuggestions: boolean }
 *
 * Atualiza as preferências de email do usuário.
 */
export async function PATCH(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { weeklySuggestions } = body;

        if (typeof weeklySuggestions !== "boolean") {
            return NextResponse.json(
                { error: "weeklySuggestions deve ser um booleano" },
                { status: 400 }
            );
        }

        // Buscar perfil do usuário
        const [existingProfile] = await db
            .select()
            .from(userProfiles)
            .where(eq(userProfiles.userId, session.user.id));

        if (!existingProfile) {
            return NextResponse.json(
                { error: "Perfil não encontrado" },
                { status: 404 }
            );
        }

        // Atualizar preferências
        const currentPrefs = (existingProfile.emailPreferences as { weeklySuggestions?: boolean } | null) || {};
        const newPrefs = {
            ...currentPrefs,
            weeklySuggestions,
        };

        const [updatedProfile] = await db
            .update(userProfiles)
            .set({
                emailPreferences: newPrefs,
                updatedAt: new Date(),
            })
            .where(eq(userProfiles.userId, session.user.id))
            .returning();

        return NextResponse.json({
            message: `Sugestões semanais ${weeklySuggestions ? 'ativadas' : 'desativadas'} com sucesso`,
            emailPreferences: updatedProfile.emailPreferences,
        });

    } catch (error) {
        console.error("Erro ao atualizar preferências de email:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/user/email-preferences
 *
 * Retorna as preferências de email do usuário.
 */
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        // Buscar perfil do usuário
        const [profile] = await db
            .select({
                emailPreferences: userProfiles.emailPreferences,
            })
            .from(userProfiles)
            .where(eq(userProfiles.userId, session.user.id));

        if (!profile) {
            return NextResponse.json(
                { error: "Perfil não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            emailPreferences: profile.emailPreferences || { weeklySuggestions: true },
        });

    } catch (error) {
        console.error("Erro ao buscar preferências de email:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
