import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checklistCategories, checklistItems, userProfiles, userChecklistProgress } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        // Execute todas as queries em paralelo para melhor performance
        const [categories, items, profile, progressData] = await Promise.all([
            // Buscar categorias
            db.query.checklistCategories.findMany({
                orderBy: (categories, { asc }) => [asc(categories.order)]
            }),
            
            // Buscar items
            db.query.checklistItems.findMany({
                orderBy: (items, { asc }) => [asc(items.order)]
            }),
            
            // Buscar perfil do usuário
            db.query.userProfiles.findFirst({
                where: eq(userProfiles.userId, session.user.id)
            }),
            
            // Buscar progresso do usuário
            db.query.userChecklistProgress.findMany({
                where: eq(userChecklistProgress.userId, session.user.id)
            })
        ]);

        // Converter progresso para o formato esperado pelo frontend
        const progressMap: { [key: string]: { isCompleted: boolean; completedAt: string | null; notes: string | null } } = {};
        progressData.forEach(p => {
            progressMap[p.checklistItemId] = {
                isCompleted: p.isCompleted ?? false,
                notes: p.notes,
                completedAt: p.completedAt ? p.completedAt.toISOString() : null,
            };
        });

        return NextResponse.json({
            categories,
            items,
            profile,
            progress: progressMap
        });
    } catch (error) {
        console.error("Erro ao buscar dados do checklist:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
