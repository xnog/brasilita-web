import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { propertyNotifications } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// PATCH /api/notifications/[id]/toggle - Toggle notification active status
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

        // Toggle the active status
        const newActiveStatus = !existingNotification.isActive;

        const [updatedNotification] = await db
            .update(propertyNotifications)
            .set({
                isActive: newActiveStatus,
                updatedAt: new Date(),
            })
            .where(eq(propertyNotifications.id, id))
            .returning();

        return NextResponse.json({
            message: `Notificação ${newActiveStatus ? 'ativada' : 'desativada'} com sucesso`,
            notification: updatedNotification
        });

    } catch (error) {
        console.error("Erro ao alterar status da notificação:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
