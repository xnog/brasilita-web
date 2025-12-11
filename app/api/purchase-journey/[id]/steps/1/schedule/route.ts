import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { purchaseJourneys, purchaseJourneySteps } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { createCalendarEvent } from "@/lib/integrations/google-calendar";
import { sql } from "drizzle-orm";

/**
 * POST /api/purchase-journey/[id]/steps/1/schedule
 * Cria evento no Google Calendar para a Etapa 1 e conclui a etapa automaticamente.
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { start, durationMinutes = 60 } = body as { start?: string; durationMinutes?: number };

        if (!start) {
            return NextResponse.json({ error: "Data/hora de início é obrigatória" }, { status: 400 });
        }
        if (!durationMinutes || durationMinutes <= 0) {
            return NextResponse.json({ error: "Duração inválida" }, { status: 400 });
        }

        const startDate = new Date(start);
        if (isNaN(startDate.getTime())) {
            return NextResponse.json({ error: "Data/hora inválida" }, { status: 400 });
        }

        const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

        const calendarId = process.env.GOOGLE_CALENDAR_ID;
        if (!calendarId) {
            return NextResponse.json({ error: "GOOGLE_CALENDAR_ID não configurado" }, { status: 500 });
        }

        const brasilitaEmail = process.env.BRASILITA_CALENDAR_EMAIL || process.env.GOOGLE_CALENDAR_SERVICE_EMAIL;
        const attendeeEmail = session.user.email;
        if (!attendeeEmail) {
            return NextResponse.json({ error: "Email do usuário não disponível" }, { status: 400 });
        }

        // Buscar jornada e etapa 1
        const journey = await db.query.purchaseJourneys.findFirst({
            where: eq(purchaseJourneys.id, id),
            with: {
                steps: true,
            },
        });

        if (!journey) {
            return NextResponse.json({ error: "Jornada não encontrada" }, { status: 404 });
        }
        if (journey.userId !== session.user.id) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        const step1 = journey.steps.find((s) => s.stepNumber === 1);
        if (!step1) {
            return NextResponse.json({ error: "Etapa 1 não encontrada" }, { status: 404 });
        }

        // Criar evento no Google Calendar
        const eventTitle = "Reunião Brasilità – Definição de Critérios";
        const calendarEvent = await createCalendarEvent({
            calendarId,
            summary: eventTitle,
            description: "Reunião online para definição de critérios de compra.",
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            attendees: [
                { email: attendeeEmail },
                ...(brasilitaEmail ? [{ email: brasilitaEmail }] : []),
            ],
        });

        // Atualizar etapa 1 como concluída com dados do evento
        const [updatedStep] = await db
            .update(purchaseJourneySteps)
            .set({
                status: "completed",
                completedAt: new Date(),
                eventId: calendarEvent.eventId,
                meetingLink: calendarEvent.hangoutLink || calendarEvent.htmlLink || null,
                eventStart: startDate,
                eventEnd: endDate,
                updatedAt: sql`now()`,
            })
            .where(
                and(
                    eq(purchaseJourneySteps.journeyId, id),
                    eq(purchaseJourneySteps.stepNumber, 1)
                )
            )
            .returning();

        return NextResponse.json({
            step: updatedStep,
            event: {
                eventId: calendarEvent.eventId,
                meetingLink: calendarEvent.hangoutLink || calendarEvent.htmlLink || null,
                start: calendarEvent.start,
                end: calendarEvent.end,
                htmlLink: calendarEvent.htmlLink,
            },
        });
    } catch (error: any) {
        console.error("Error scheduling meeting:", error);
        return NextResponse.json(
            { error: error?.message || "Erro ao agendar reunião" },
            { status: 500 }
        );
    }
}

