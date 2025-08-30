import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { propertyNotifications } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";


// GET /api/notifications/[id] - Get specific notification
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const { id } = await params;

        const [notification] = await db
            .select()
            .from(propertyNotifications)
            .where(
                and(
                    eq(propertyNotifications.id, id),
                    eq(propertyNotifications.userId, session.user.id)
                )
            );

        if (!notification) {
            return NextResponse.json(
                { error: "Notificação não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ notification });

    } catch (error) {
        console.error("Erro ao buscar notificação:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

// PATCH /api/notifications/[id] - Update notification
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { name, isActive } = body;

        // Validate that at least one field is being updated
        if (name === undefined && isActive === undefined) {
            return NextResponse.json(
                { error: "Pelo menos um campo deve ser fornecido para atualização" },
                { status: 400 }
            );
        }

        // Check if notification exists and belongs to user
        const [existingNotification] = await db
            .select()
            .from(propertyNotifications)
            .where(
                and(
                    eq(propertyNotifications.id, id),
                    eq(propertyNotifications.userId, session.user.id)
                )
            );

        if (!existingNotification) {
            return NextResponse.json(
                { error: "Notificação não encontrada" },
                { status: 404 }
            );
        }

        // Prepare update data - only allow name and isActive
        const updateData: {
            updatedAt: Date;
            name?: string;
            isActive?: boolean;
        } = {
            updatedAt: new Date(),
        };

        if (name !== undefined) {
            if (!name.trim()) {
                return NextResponse.json(
                    { error: "Nome do alerta não pode estar vazio" },
                    { status: 400 }
                );
            }
            updateData.name = name.trim();
        }

        if (isActive !== undefined) {
            updateData.isActive = isActive;
        }

        const [updatedNotification] = await db
            .update(propertyNotifications)
            .set(updateData)
            .where(eq(propertyNotifications.id, id))
            .returning();

        return NextResponse.json({
            message: "Notificação atualizada com sucesso",
            notification: updatedNotification
        });

    } catch (error) {
        console.error("Erro ao atualizar notificação:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

// DELETE /api/notifications/[id] - Delete notification
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Check if notification exists and belongs to user
        const [existingNotification] = await db
            .select()
            .from(propertyNotifications)
            .where(
                and(
                    eq(propertyNotifications.id, id),
                    eq(propertyNotifications.userId, session.user.id)
                )
            );

        if (!existingNotification) {
            return NextResponse.json(
                { error: "Notificação não encontrada" },
                { status: 404 }
            );
        }

        await db
            .delete(propertyNotifications)
            .where(eq(propertyNotifications.id, id));

        return NextResponse.json({
            message: "Notificação removida com sucesso"
        });

    } catch (error) {
        console.error("Erro ao remover notificação:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
