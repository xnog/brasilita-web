import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { purchaseJourneys } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Buscar jornada ativa
        const activeJourney = await db.query.purchaseJourneys.findFirst({
            where: and(
                eq(purchaseJourneys.userId, session.user.id),
                eq(purchaseJourneys.status, "in_progress")
            ),
            with: {
                property: { with: { region: true } },
                steps: { orderBy: (s, { asc }) => [asc(s.stepNumber)] },
            },
        });

        // Buscar jornadas concluídas
        const completedJourneys = await db.query.purchaseJourneys.findMany({
            where: and(
                eq(purchaseJourneys.userId, session.user.id),
                eq(purchaseJourneys.status, "completed")
            ),
            with: {
                property: { with: { region: true } },
                steps: { orderBy: (s, { asc }) => [asc(s.stepNumber)] },
            },
            orderBy: (j, { desc }) => [desc(j.updatedAt)],
        });

        return NextResponse.json({
            activeJourney,
            completedJourneys,
        });
    } catch (error) {
        console.error("Error fetching my properties:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

