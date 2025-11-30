import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, passwordResetTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token, password } = body;

        if (!token || !password) {
            return NextResponse.json(
                { error: "Token e senha são obrigatórios" },
                { status: 400 }
            );
        }

        // Validar senha
        if (password.length < 6) {
            return NextResponse.json(
                { error: "A senha deve ter no mínimo 6 caracteres" },
                { status: 400 }
            );
        }

        // Buscar token
        const resetToken = await db.query.passwordResetTokens.findFirst({
            where: eq(passwordResetTokens.token, token),
        });

        if (!resetToken) {
            return NextResponse.json(
                { error: "Token inválido ou expirado" },
                { status: 400 }
            );
        }

        // Verificar se o token expirou
        if (new Date() > resetToken.expires) {
            // Deletar token expirado
            await db.delete(passwordResetTokens).where(
                eq(passwordResetTokens.id, resetToken.id)
            );

            return NextResponse.json(
                { error: "Token expirado. Solicite um novo link de redefinição." },
                { status: 400 }
            );
        }

        // Hash da nova senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Atualizar senha do usuário
        await db
            .update(users)
            .set({ password: hashedPassword })
            .where(eq(users.id, resetToken.userId));

        // Deletar token usado
        await db.delete(passwordResetTokens).where(
            eq(passwordResetTokens.id, resetToken.id)
        );

        return NextResponse.json(
            {
                success: true,
                message: "Senha redefinida com sucesso!"
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao redefinir senha:", error);
        return NextResponse.json(
            { error: "Erro ao redefinir senha" },
            { status: 500 }
        );
    }
}
