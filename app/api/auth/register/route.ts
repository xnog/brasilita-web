import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { addSubscriberToListmonk } from "@/lib/integrations/listmonk";
import { createClintContact } from "@/lib/integrations/clint";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Nome, email e senha são obrigatórios" },
                { status: 400 }
            );
        }

        // Verificar se o usuário já existe
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Usuário já existe com este email" },
                { status: 400 }
            );
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 12);

        // Criar o usuário
        const newUser = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        }).returning();

        // Remover a senha da resposta
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = newUser[0];

        // Integração com Listmonk - adicionar à lista "Brasilità"
        addSubscriberToListmonk(email, name).then(result => {
            if (result.success) {
                console.log(`✅ Usuário ${email} adicionado ao Listmonk`);
            } else {
                console.error(`❌ Falha ao adicionar ${email} ao Listmonk:`, result.error);
            }
        }).catch(err => {
            console.error('❌ Erro ao adicionar usuário ao Listmonk:', err);
        });

        // Integração com Clint CRM - criar contato
        createClintContact(name, email).then(result => {
            if (result.success) {
                console.log(`✅ Contato ${email} criado no Clint CRM`);
            } else {
                console.error(`❌ Falha ao criar contato ${email} no Clint:`, result.error);
            }
        }).catch(err => {
            console.error('❌ Erro ao criar contato no Clint CRM:', err);
        });

        return NextResponse.json(
            {
                message: "Usuário criado com sucesso",
                user: userWithoutPassword
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}