import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checklistCategories, checklistItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        // Buscar categorias
        const categories = await db.query.checklistCategories.findMany({
            orderBy: (categories, { asc }) => [asc(categories.order)]
        });

        // Buscar items
        const items = await db.query.checklistItems.findMany({
            orderBy: (items, { asc }) => [asc(items.order)]
        });

        return NextResponse.json({
            categories,
            items,
        });
    } catch (error) {
        console.error("Erro ao buscar items do checklist:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}