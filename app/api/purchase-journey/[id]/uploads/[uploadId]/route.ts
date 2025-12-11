import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { purchaseJourneys, purchaseJourneyUploads, purchaseJourneySteps } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * DELETE /api/purchase-journey/[id]/uploads/[uploadId]
 * Remove um arquivo enviado
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; uploadId: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { id, uploadId } = await params;

        // Buscar a jornada
        const journey = await db.query.purchaseJourneys.findFirst({
            where: eq(purchaseJourneys.id, id),
        });

        if (!journey) {
            return NextResponse.json({ error: "Jornada não encontrada" }, { status: 404 });
        }

        // Verificar autorização
        if (journey.userId !== session.user.id) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        // Buscar o upload
        const upload = await db.query.purchaseJourneyUploads.findFirst({
            where: eq(purchaseJourneyUploads.id, uploadId),
            with: {
                step: true,
            },
        });

        if (!upload) {
            return NextResponse.json({ error: "Upload não encontrado" }, { status: 404 });
        }

        // Verificar se o upload pertence à jornada
        if (upload.journeyId !== id) {
            return NextResponse.json({ error: "Upload não pertence a esta jornada" }, { status: 400 });
        }

        // Se a etapa está concluída e requer upload, verificar se há outros uploads
        if (upload.step.status === "completed" && upload.step.uploadRequired) {
            const remainingUploads = await db.query.purchaseJourneyUploads.findMany({
                where: eq(purchaseJourneyUploads.stepId, upload.stepId),
            });

            // Se não há mais uploads (apenas o que está sendo deletado), reabrir a etapa
            if (remainingUploads.length === 1) {
                await db
                    .update(purchaseJourneySteps)
                    .set({
                        status: "in_progress",
                        completedAt: null,
                    })
                    .where(eq(purchaseJourneySteps.id, upload.stepId));
            }
        }

        // Deletar arquivo físico
        const filePath = join(process.cwd(), "public", upload.fileUrl);
        if (existsSync(filePath)) {
            await unlink(filePath);
        }

        // Deletar registro do banco
        await db.delete(purchaseJourneyUploads).where(eq(purchaseJourneyUploads.id, uploadId));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting upload:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

