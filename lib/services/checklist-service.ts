import { db } from "@/lib/db";
import { userChecklistProgress, userProgressHistory, checklistItems } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import type {
    UserChecklistProgress,
    NewUserChecklistProgress,
    NewUserProgressHistory
} from "@/lib/db/schema";

export interface ProgressUpdateData {
    checklistItemId: string;
    isCompleted: boolean;
    notes?: string;
    priority?: number;
    dueDate?: Date;
    attachments?: string[];
}

export interface ProgressStats {
    total: number;
    completed: number;
    inProgress: number;
    completionRate: number;
    estimatedDaysRemaining: number;
}

export class ChecklistService {

    /**
     * Atualiza o progresso de um item e registra no histórico
     */
    static async updateProgress(
        userId: string,
        data: ProgressUpdateData
    ): Promise<UserChecklistProgress> {
        return await db.transaction(async (tx) => {
            // Buscar progresso existente
            const existingProgress = await tx.query.userChecklistProgress.findFirst({
                where: and(
                    eq(userChecklistProgress.userId, userId),
                    eq(userChecklistProgress.checklistItemId, data.checklistItemId)
                )
            });

            let progress: UserChecklistProgress;
            let action: string;
            let previousValue: Record<string, boolean | string | number | null> | null = null;

            if (existingProgress) {
                // Capturar estado anterior para histórico
                previousValue = {
                    isCompleted: existingProgress.isCompleted,
                    notes: existingProgress.notes,
                    priority: existingProgress.priority,
                };

                // Atualizar existente
                const updated = await tx.update(userChecklistProgress)
                    .set({
                        isCompleted: data.isCompleted,
                        completedAt: data.isCompleted ? new Date() : null,
                        notes: data.notes || null,
                        priority: data.priority ?? existingProgress.priority,
                        dueDate: data.dueDate || existingProgress.dueDate,
                        attachments: data.attachments ? JSON.stringify(data.attachments) : existingProgress.attachments,
                        updatedAt: new Date(),
                    })
                    .where(eq(userChecklistProgress.id, existingProgress.id))
                    .returning();

                progress = updated[0];
                action = data.isCompleted ? "completed" : "updated";
            } else {
                // Criar novo
                const created = await tx.insert(userChecklistProgress).values({
                    userId,
                    checklistItemId: data.checklistItemId,
                    isCompleted: data.isCompleted,
                    completedAt: data.isCompleted ? new Date() : null,
                    notes: data.notes || null,
                    priority: data.priority || 0,
                    dueDate: data.dueDate || null,
                    attachments: data.attachments ? JSON.stringify(data.attachments) : null,
                }).returning();

                progress = created[0];
                action = "created";
            }

            // Registrar no histórico
            await tx.insert(userProgressHistory).values({
                progressId: progress.id,
                action,
                previousValue: previousValue ? JSON.stringify(previousValue) : null,
                newValue: JSON.stringify({
                    isCompleted: progress.isCompleted,
                    notes: progress.notes,
                    priority: progress.priority,
                }),
            });

            return progress;
        });
    }

    /**
     * Busca progresso do usuário com estatísticas
     */
    static async getUserProgress(userId: string): Promise<{
        progress: { [key: string]: UserChecklistProgress };
        stats: ProgressStats;
    }> {
        // Buscar progresso do usuário
        const userProgress = await db.query.userChecklistProgress.findMany({
            where: eq(userChecklistProgress.userId, userId)
        });

        // Buscar todos os items relevantes para calcular estatísticas
        const allItems = await db.query.checklistItems.findMany();

        // Converter para mapa
        const progressMap: { [key: string]: UserChecklistProgress } = {};
        userProgress.forEach(p => {
            progressMap[p.checklistItemId] = p;
        });

        // Calcular estatísticas
        const completed = userProgress.filter(p => p.isCompleted).length;
        const total = allItems.length; // Ou filtrar por perfil do usuário
        const inProgress = userProgress.filter(p => !p.isCompleted && p.notes).length;

        // Estimar dias restantes baseado nos items não completados
        const remainingItems = allItems.filter(item =>
            !progressMap[item.id]?.isCompleted
        );
        const estimatedDaysRemaining = remainingItems.reduce((sum, item) =>
            sum + (item.estimatedDays || 0), 0
        );

        const stats: ProgressStats = {
            total,
            completed,
            inProgress,
            completionRate: total > 0 ? (completed / total) * 100 : 0,
            estimatedDaysRemaining,
        };

        return { progress: progressMap, stats };
    }

    /**
     * Busca histórico de um item específico
     */
    static async getItemHistory(userId: string, checklistItemId: string) {
        const progress = await db.query.userChecklistProgress.findFirst({
            where: and(
                eq(userChecklistProgress.userId, userId),
                eq(userChecklistProgress.checklistItemId, checklistItemId)
            )
        });

        if (!progress) return [];

        return await db.query.userProgressHistory.findMany({
            where: eq(userProgressHistory.progressId, progress.id),
            orderBy: [desc(userProgressHistory.timestamp)]
        });
    }

    /**
     * Gera relatório de progresso
     */
    static async generateProgressReport(userId: string) {
        const { progress, stats } = await this.getUserProgress(userId);

        // Buscar items e categorias separadamente por enquanto
        const items = await db.query.checklistItems.findMany();
        const categories = await db.query.checklistCategories.findMany();

        // Criar mapa de categorias
        const categoryMap = categories.reduce((acc, cat) => {
            acc[cat.id] = cat.name;
            return acc;
        }, {} as Record<string, string>);

        // Agrupar por categoria
        const progressByCategory = items.reduce((acc, item) => {
            const categoryName = categoryMap[item.categoryId] || 'Sem categoria';
            if (!acc[categoryName]) {
                acc[categoryName] = { total: 0, completed: 0, items: [] };
            }

            acc[categoryName].total++;
            const itemProgress = progress[item.id];
            if (itemProgress?.isCompleted) {
                acc[categoryName].completed++;
            }

            acc[categoryName].items.push({
                title: item.title,
                isCompleted: itemProgress?.isCompleted || false,
                completedAt: itemProgress?.completedAt,
                notes: itemProgress?.notes,
            });

            return acc;
        }, {} as Record<string, { total: number; completed: number; items: Array<{ title: string; isCompleted: boolean; completedAt?: Date | null; notes?: string | null }> }>);

        return {
            stats,
            progressByCategory,
            lastUpdated: new Date(),
        };
    }
}