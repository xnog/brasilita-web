import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const { propertyType, location, buyerProfile, usageType, investmentBudget, phone } = await request.json();

        if (!propertyType || !location || !buyerProfile || !usageType || !investmentBudget) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios" },
                { status: 400 }
            );
        }

        // Verificar se já existe um perfil para este usuário
        const existingProfile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, session.user.id)
        });

        let profile;
        if (existingProfile) {
            // Atualizar perfil existente
            const updated = await db.update(userProfiles)
                .set({
                    propertyType,
                    location,
                    buyerProfile,
                    usageType,
                    investmentBudget,
                    phone,
                    updatedAt: new Date(),
                })
                .where(eq(userProfiles.userId, session.user.id))
                .returning();
            profile = updated[0];
        } else {
            // Criar novo perfil
            const created = await db.insert(userProfiles).values({
                userId: session.user.id,
                propertyType,
                location,
                buyerProfile,
                usageType,
                investmentBudget,
                phone,
            }).returning();
            profile = created[0];
        }

        return NextResponse.json({
            message: "Perfil salvo com sucesso",
            profile
        });
    } catch (error) {
        console.error("Erro ao salvar perfil:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const profile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, session.user.id)
        });

        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}