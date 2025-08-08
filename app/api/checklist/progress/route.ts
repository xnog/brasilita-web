import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userChecklistProgress } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
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

        const { checklistItemId, isCompleted, notes } = await request.json();

        if (!checklistItemId || typeof isCompleted !== 'boolean') {
            return NextResponse.json(
                { error: "checklistItemId e isCompleted são obrigatórios" },
                { status: 400 }
            );
        }

        // Verificar se já existe progresso para este item
        const existingProgress = await db.query.userChecklistProgress.findFirst({
            where: and(
                eq(userChecklistProgress.userId, session.user.id),
                eq(userChecklistProgress.checklistItemId, checklistItemId)
            )
        });

        let progress;
        if (existingProgress) {
            // Atualizar progresso existente
            const updated = await db.update(userChecklistProgress)
                .set({
                    isCompleted,
                    notes: notes || null,
                    completedAt: isCompleted ? new Date() : null,
                    updatedAt: new Date(),
                })
                .where(and(
                    eq(userChecklistProgress.userId, session.user.id),
                    eq(userChecklistProgress.checklistItemId, checklistItemId)
                ))
                .returning();
            progress = updated[0];
        } else {
            // Criar novo progresso
            const created = await db.insert(userChecklistProgress).values({
                userId: session.user.id,
                checklistItemId,
                isCompleted,
                notes: notes || null,
                completedAt: isCompleted ? new Date() : null,
            }).returning();
            progress = created[0];
        }

        return NextResponse.json({
            message: "Progresso salvo com sucesso",
            progress
        });
    } catch (error) {
        console.error("Erro ao salvar progresso:", error);
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

        const progress = await db.query.userChecklistProgress.findMany({
            where: eq(userChecklistProgress.userId, session.user.id)
        });

        // Converter para o formato esperado pelo frontend
        const progressMap: { [key: string]: { isCompleted: boolean; completedAt: string | null; notes: string | null } } = {};
        progress.forEach(p => {
            progressMap[p.checklistItemId] = {
                isCompleted: p.isCompleted ?? false,
                notes: p.notes,
                completedAt: p.completedAt ? p.completedAt.toISOString() : null,
            };
        });

        return NextResponse.json({ progress: progressMap });
    } catch (error) {
        console.error("Erro ao buscar progresso:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}