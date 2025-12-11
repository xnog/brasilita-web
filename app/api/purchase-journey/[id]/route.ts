import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { purchaseJourneys } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/purchase-journey/[id]
 * Retorna detalhes completos de uma jornada de compra
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { id } = await params;

        const journey = await db.query.purchaseJourneys.findFirst({
            where: eq(purchaseJourneys.id, id),
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

        // Verificar autorização: apenas o dono da jornada pode acessar
        if (journey.userId !== session.user.id) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        return NextResponse.json({ journey });
    } catch (error) {
        console.error("Error fetching purchase journey:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

