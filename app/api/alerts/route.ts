import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { propertyNotifications } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { PropertyFilters } from "@/lib/api/property-filters";

// GET /api/notifications - List user's notifications
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const notifications = await db
            .select()
            .from(propertyNotifications)
            .where(eq(propertyNotifications.userId, session.user.id))
            .orderBy(desc(propertyNotifications.createdAt));

        return NextResponse.json({ notifications });

    } catch (error) {
        console.error("Erro ao buscar notificações:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

// POST /api/notifications - Create new notification
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, filters } = body;

        if (!name || !filters) {
            return NextResponse.json(
                { error: "Nome e filtros são obrigatórios" },
                { status: 400 }
            );
        }

        // Validate filters structure
        const validatedFilters: PropertyFilters = {
            regions: filters.regions || [],
            priceMin: filters.priceMin,
            priceMax: filters.priceMax,
            bedroomsMin: filters.bedroomsMin,
            bedroomsMax: filters.bedroomsMax,
            bathroomsMin: filters.bathroomsMin,
            bathroomsMax: filters.bathroomsMax,
            areaMin: filters.areaMin,
            areaMax: filters.areaMax,
            location: filters.location,
            isRented: filters.isRented,
            sortBy: filters.sortBy || 'createdAt',
            sortOrder: filters.sortOrder || 'desc'
        };

        const [notification] = await db
            .insert(propertyNotifications)
            .values({
                userId: session.user.id,
                name: name.trim(),
                filters: validatedFilters,
                isActive: true,
                lastProcessedAt: new Date(), // Start from now
            })
            .returning();

        return NextResponse.json(
            {
                message: "Notificação criada com sucesso",
                notification
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erro ao criar notificação:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
