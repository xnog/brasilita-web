// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { checklistCategories, checklistItems } from "@/lib/db/schema";
// import { checklistCategories as categoriesData, checklistItems as itemsData } from "@/lib/checklist-data";

// export async function POST() {
//     try {
//         // Limpar dados existentes
//         await db.delete(checklistItems);
//         await db.delete(checklistCategories);

//         // Inserir categorias
//         const insertedCategories = await db.insert(checklistCategories)
//             .values(categoriesData)
//             .returning();

//         console.log(`${insertedCategories.length} categorias inseridas`);

//         // Criar mapeamento de ordem para ID de categoria
//         const categoryOrderToId = insertedCategories.reduce((acc, cat) => {
//             acc[cat.order] = cat.id;
//             return acc;
//         }, {} as Record<number, string>);

//         // Inserir items com referência correta às categorias
//         // Distribuição: Cat1=4 itens, Cat2=3 itens, Cat3=5 itens, Cat4=2 itens
//         const categoryDistribution = [4, 3, 5, 2];
//         let currentCategoryIndex = 0;
//         let itemsInCurrentCategory = 0;

//         const itemsWithCategoryIds = itemsData.map((item, index) => {
//             // Se ultrapassou o limite da categoria atual, muda para próxima
//             if (itemsInCurrentCategory >= categoryDistribution[currentCategoryIndex]) {
//                 currentCategoryIndex++;
//                 itemsInCurrentCategory = 0;
//             }

//             const categoryOrder = currentCategoryIndex + 1;
//             const categoryId = categoryOrderToId[categoryOrder];

//             if (!categoryId) {
//                 throw new Error(`Categoria não encontrada para ordem ${categoryOrder}`);
//             }

//             itemsInCurrentCategory++;

//             return {
//                 ...item,
//                 categoryId,
//             };
//         });

//         const insertedItems = await db.insert(checklistItems)
//             .values(itemsWithCategoryIds)
//             .returning();

//         console.log(`${insertedItems.length} items inseridos`);

//         return NextResponse.json({
//             message: "Dados do checklist populados com sucesso",
//             categories: insertedCategories.length,
//             items: insertedItems.length,
//         });
//     } catch (error) {
//         console.error("Erro ao popular dados:", error);
//         return NextResponse.json(
//             { error: "Erro interno do servidor" },
//             { status: 500 }
//         );
//     }
// }