import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { purchaseJourneys, purchaseJourneySteps, properties, users, userPropertyInterests } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { PURCHASE_JOURNEY_STEPS } from "@/lib/data/purchase-journey-steps";

/**
 * POST /api/purchase-journey
 * Cria ou retorna uma jornada de compra existente para userId + propertyId
 */
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { propertyId } = await request.json();

        if (!propertyId) {
            return NextResponse.json({ error: "PropertyId obrigatório" }, { status: 400 });
        }

        // Verificar se o imóvel existe
        const property = await db.query.properties.findFirst({
            where: eq(properties.id, propertyId),
        });

        if (!property) {
            return NextResponse.json({ error: "Imóvel não encontrado" }, { status: 404 });
        }

        // Verificar se já existe uma jornada ativa para este usuário (qualquer imóvel)
        const activeJourney = await db.query.purchaseJourneys.findFirst({
            where: and(
                eq(purchaseJourneys.userId, session.user.id),
                eq(purchaseJourneys.status, "in_progress")
            ),
        });

        if (activeJourney && activeJourney.propertyId !== propertyId) {
            return NextResponse.json(
                {
                    error: "Você já possui um processo de compra em andamento. Continue de onde parou.",
                    journeyId: activeJourney.id,
                    propertyId: activeJourney.propertyId,
                },
                { status: 409 }
            );
        }

        // Verificar se já existe uma jornada para este imóvel
        const existingJourney = await db.query.purchaseJourneys.findFirst({
            where: and(
                eq(purchaseJourneys.userId, session.user.id),
                eq(purchaseJourneys.propertyId, propertyId)
            ),
            with: {
                steps: {
                    orderBy: (steps, { asc }) => [asc(steps.stepNumber)],
                },
            },
        });

        // Se já existe, retornar a existente
        if (existingJourney) {
            return NextResponse.json({
                journey: existingJourney,
                created: false,
            });
        }

        // Criar nova jornada em uma transação
        const newJourney = await db.transaction(async (tx) => {
            // Criar a jornada
            const [journey] = await tx
                .insert(purchaseJourneys)
                .values({
                    userId: session.user.id,
                    propertyId: propertyId,
                    status: "in_progress",
                })
                .returning();

            // Remover dos favoritos (se estiver favoritado)
            await tx
                .update(userPropertyInterests)
                .set({ isInterested: false })
                .where(
                    and(
                        eq(userPropertyInterests.userId, session.user.id),
                        eq(userPropertyInterests.propertyId, propertyId)
                    )
                );

            // Criar as 24 etapas padronizadas
            const steps = await tx
                .insert(purchaseJourneySteps)
                .values(
                    PURCHASE_JOURNEY_STEPS.map((step) => ({
                        journeyId: journey.id,
                        stepNumber: step.stepNumber,
                        title: step.title,
                        description: step.description,
                        uploadRequired: step.uploadRequired,
                        status: "pending",
                    }))
                )
                .returning();

            return { journey, steps };
        });

        return NextResponse.json({
            journey: {
                ...newJourney.journey,
                steps: newJourney.steps,
            },
            created: true,
        });
    } catch (error) {
        console.error("Error creating purchase journey:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

/**
 * GET /api/purchase-journey?propertyId=xxx
 * Retorna a jornada de compra para um imóvel específico
 */
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const propertyId = searchParams.get("propertyId");

        if (!propertyId) {
            return NextResponse.json({ error: "PropertyId obrigatório" }, { status: 400 });
        }

        const journey = await db.query.purchaseJourneys.findFirst({
            where: and(
                eq(purchaseJourneys.userId, session.user.id),
                eq(purchaseJourneys.propertyId, propertyId)
            ),
            with: {
                property: {
                    with: {
                        region: true,
                    },
                },
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

        return NextResponse.json({ journey });
    } catch (error) {
        console.error("Error fetching purchase journey:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

