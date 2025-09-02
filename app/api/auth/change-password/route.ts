import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: "Senha atual e nova senha são obrigatórias" },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: "A nova senha deve ter pelo menos 6 caracteres" },
                { status: 400 }
            );
        }

        // Buscar o usuário no banco
        const user = await db.query.users.findFirst({
            where: eq(users.id, session.user.id)
        });

        if (!user) {
            return NextResponse.json(
                { error: "Usuário não encontrado" },
                { status: 404 }
            );
        }

        // Verificar se o usuário tem senha (login via email)
        if (!user.password) {
            return NextResponse.json(
                { error: "Este usuário não possui senha. Faça login via Google." },
                { status: 400 }
            );
        }

        // Verificar senha atual
        const currentPasswordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!currentPasswordMatch) {
            return NextResponse.json(
                { error: "Senha atual incorreta" },
                { status: 400 }
            );
        }

        // Verificar se a nova senha é diferente da atual
        const samePassword = await bcrypt.compare(newPassword, user.password);
        if (samePassword) {
            return NextResponse.json(
                { error: "A nova senha deve ser diferente da senha atual" },
                { status: 400 }
            );
        }

        // Hash da nova senha
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Atualizar a senha no banco
        await db.update(users)
            .set({ password: hashedNewPassword })
            .where(eq(users.id, session.user.id));

        return NextResponse.json(
            { message: "Senha alterada com sucesso" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}