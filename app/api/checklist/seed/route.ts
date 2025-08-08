import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checklistCategories, checklistItems } from "@/lib/db/schema";
import { checklistCategories as categoriesData, checklistItems as itemsData } from "@/lib/checklist-data";

export async function POST() {
    try {
        // Limpar dados existentes
        await db.delete(checklistItems);
        await db.delete(checklistCategories);

        // Inserir categorias
        const insertedCategories = await db.insert(checklistCategories)
            .values(categoriesData)
            .returning();

        console.log(`${insertedCategories.length} categorias inseridas`);

        // Criar mapeamento de ordem para ID de categoria
        const categoryOrderToId = insertedCategories.reduce((acc, cat) => {
            acc[cat.order] = cat.id;
            return acc;
        }, {} as Record<number, string>);

        // Inserir items com referência correta às categorias
        const itemsWithCategoryIds = itemsData.map((item, index) => {
            // Calcular qual categoria baseado na ordem do item
            const categoryOrder = Math.floor(index / 10) + 1;
            const categoryId = categoryOrderToId[categoryOrder];

            if (!categoryId) {
                throw new Error(`Categoria não encontrada para ordem ${categoryOrder}`);
            }

            return {
                ...item,
                categoryId,
            };
        });

        const insertedItems = await db.insert(checklistItems)
            .values(itemsWithCategoryIds)
            .returning();

        console.log(`${insertedItems.length} items inseridos`);

        return NextResponse.json({
            message: "Dados do checklist populados com sucesso",
            categories: insertedCategories.length,
            items: insertedItems.length,
        });
    } catch (error) {
        console.error("Erro ao popular dados:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor", details: error.message },
            { status: 500 }
        );
    }
}