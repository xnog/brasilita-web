import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userPropertyInterests, properties } from "@/lib/db/schema";
import { eq, and, desc, count } from "drizzle-orm";

/**
 * GET /api/favorites
 * Retorna os imóveis favoritados pelo usuário logado
 */
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const offset = (page - 1) * limit;

        // Buscar favoritos do usuário com informações do imóvel
        const favorites = await db.query.userPropertyInterests.findMany({
            where: and(
                eq(userPropertyInterests.userId, session.user.id),
                eq(userPropertyInterests.isInterested, true)
            ),
            with: {
                property: {
                    with: {
                        region: true,
                    },
                },
            },
            orderBy: [desc(userPropertyInterests.createdAt)],
            limit,
            offset,
        });

        // Contar total de favoritos
        const [totalCountResult] = await db
            .select({ count: count() })
            .from(userPropertyInterests)
            .where(and(
                eq(userPropertyInterests.userId, session.user.id),
                eq(userPropertyInterests.isInterested, true)
            ));

        const total = totalCountResult.count;
        const totalPages = Math.ceil(total / limit);

        // Formatar resposta
        const formattedFavorites = favorites.map((favorite) => ({
            id: favorite.id,
            property: favorite.property,
            createdAt: favorite.createdAt,
            updatedAt: favorite.updatedAt,
        }));

        return NextResponse.json({
            favorites: formattedFavorites,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasMore: page < totalPages,
            },
        });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

/**
 * DELETE /api/favorites
 * Remove um imóvel dos favoritos
 */
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { propertyId } = await request.json();

        if (!propertyId) {
            return NextResponse.json({ error: "PropertyId obrigatório" }, { status: 400 });
        }

        // Atualizar interesse para false (remover dos favoritos)
        await db
            .update(userPropertyInterests)
            .set({
                isInterested: false,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(userPropertyInterests.userId, session.user.id),
                    eq(userPropertyInterests.propertyId, propertyId)
                )
            );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error removing favorite:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

