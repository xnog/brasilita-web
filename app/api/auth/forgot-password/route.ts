import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, passwordResetTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/components";
import ForgotPasswordEmail from "@/emails/forgot-password";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email é obrigatório" },
                { status: 400 }
            );
        }

        // Buscar usuário pelo email
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        // Por segurança, sempre retornar sucesso mesmo se o usuário não existir
        // Isso evita que atacantes possam descobrir quais emails estão cadastrados
        if (!user) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Se o email estiver cadastrado, você receberá um link para redefinir sua senha."
                },
                { status: 200 }
            );
        }

        // Verificar se o usuário tem senha (não é apenas OAuth)
        if (!user.password) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Se o email estiver cadastrado, você receberá um link para redefinir sua senha."
                },
                { status: 200 }
            );
        }

        // Gerar token único e seguro
        const token = crypto.randomBytes(32).toString("hex");

        // Token expira em 1 hora
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        // Deletar tokens antigos do usuário
        await db.delete(passwordResetTokens).where(
            eq(passwordResetTokens.userId, user.id)
        );

        // Criar novo token
        await db.insert(passwordResetTokens).values({
            userId: user.id,
            token,
            expires,
        });

        // Gerar URL de reset
        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

        // Renderizar email
        const emailHtml = await render(
            ForgotPasswordEmail({
                userEmail: user.email!,
                resetUrl,
            })
        );

        // Enviar email
        await sendEmail({
            to: user.email!,
            subject: "Redefinição de senha - Brasilità",
            html: emailHtml,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Se o email estiver cadastrado, você receberá um link para redefinir sua senha."
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao processar solicitação de reset de senha:", error);
        return NextResponse.json(
            { error: "Erro ao processar solicitação" },
            { status: 500 }
        );
    }
}
