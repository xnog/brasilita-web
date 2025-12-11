import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { purchaseJourneys, purchaseJourneySteps, purchaseJourneyUploads } from "@/lib/db/schema";
import { eq, and, lt } from "drizzle-orm";
import { sql } from "drizzle-orm";

/**
 * PATCH /api/purchase-journey/[id]/steps/[stepNumber]
 * Atualiza o status de uma etapa da jornada
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; stepNumber: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { id, stepNumber } = await params;
        const stepNum = parseInt(stepNumber);

        if (isNaN(stepNum) || stepNum < 1 || stepNum > 24) {
            return NextResponse.json({ error: "Número de etapa inválido" }, { status: 400 });
        }

        const body = await request.json();
        const { status, notes } = body;

        // Buscar a jornada
        const journey = await db.query.purchaseJourneys.findFirst({
            where: eq(purchaseJourneys.id, id),
            with: {
                steps: {
                    orderBy: (steps, { asc }) => [asc(steps.stepNumber)],
                    with: {
                        uploads: true,
                    },
                },
            },
        });

        if (!journey) {
            return NextResponse.json({ error: "Jornada não encontrada" }, { status: 404 });
        }

        // Verificar autorização
        if (journey.userId !== session.user.id) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        // Buscar a etapa
        const step = journey.steps.find((s) => s.stepNumber === stepNum);
        if (!step) {
            return NextResponse.json({ error: "Etapa não encontrada" }, { status: 404 });
        }

        // VALIDAÇÕES DE NEGÓCIO

        // 1. Verificar se está tentando concluir uma etapa sem concluir as anteriores
        if (status === "completed") {
            const previousSteps = journey.steps.filter((s) => s.stepNumber < stepNum);
            const incompletePreviousSteps = previousSteps.filter(
                (s) => s.status !== "completed"
            );

            if (incompletePreviousSteps.length > 0) {
                return NextResponse.json(
                    {
                        error: "Complete as etapas anteriores primeiro",
                        firstIncompleteStep: incompletePreviousSteps[0].stepNumber,
                    },
                    { status: 400 }
                );
            }
        }

        // 2. Se está tentando concluir e a etapa requer upload, verificar se há uploads
        if (status === "completed" && step.uploadRequired) {
            const hasUploads = step.uploads && step.uploads.length > 0;
            if (!hasUploads) {
                return NextResponse.json(
                    {
                        error: "Esta etapa requer upload de arquivo antes de ser concluída",
                    },
                    { status: 400 }
                );
            }
        }

        // 2.1. Regra específica da Etapa 1: só pode concluir com eventId salvo
        if (status === "completed" && step.stepNumber === 1) {
            if (!step.eventId) {
                return NextResponse.json(
                    { error: "Etapa 1 só pode ser concluída após agendar a reunião." },
                    { status: 400 }
                );
            }
        }

        // 3. Se está tentando reabrir uma etapa concluída (mudando para in_progress ou pending)
        // e há uploads, permitir mas manter os uploads
        if (
            step.status === "completed" &&
            (status === "in_progress" || status === "pending")
        ) {
            // Permitir reabrir, mas manter os uploads
        }

        // Atualizar a etapa
        const [updatedStep] = await db
            .update(purchaseJourneySteps)
            .set({
                status: status || step.status,
                notes: notes !== undefined ? notes : step.notes,
                completedAt:
                    status === "completed" && !step.completedAt
                        ? new Date()
                        : status !== "completed"
                          ? null
                          : step.completedAt,
                updatedAt: sql`now()`,
            })
            .where(
                and(
                    eq(purchaseJourneySteps.journeyId, id),
                    eq(purchaseJourneySteps.stepNumber, stepNum)
                )
            )
            .returning();

        // Atualizar status da jornada se todas as etapas foram concluídas
        const allStepsCompleted = journey.steps.every(
            (s) => s.stepNumber === stepNum || s.status === "completed"
        ) && updatedStep.status === "completed";

        if (allStepsCompleted && journey.status !== "completed") {
            await db
                .update(purchaseJourneys)
                .set({
                    status: "completed",
                    updatedAt: sql`now()`,
                })
                .where(eq(purchaseJourneys.id, id));
        }

        return NextResponse.json({ step: updatedStep });
    } catch (error) {
        console.error("Error updating purchase journey step:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

