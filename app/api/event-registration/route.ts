import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventRegistration } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, eventDate, eventName } = body;

        // Validate required fields
        if (!name || !email || !phone || !eventDate || !eventName) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios" },
                { status: 400 }
            );
        }

        // Insert into database
        const registration = await db.insert(eventRegistration).values({
            name,
            email,
            phone,
            eventDate: new Date(eventDate), // Convert string to Date
            eventName, // Nome do evento para facilitar consultas
            source: "landing-page-insider",
        }).returning();

        // TODO: Send confirmation email
        // TODO: Send WhatsApp message with event link

        return NextResponse.json(
            { success: true, registration: registration[0] },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating event registration:", error);
        return NextResponse.json(
            { error: "Erro ao processar registro" },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve registrations (admin only)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const eventName = searchParams.get("eventName");
        const eventDate = searchParams.get("eventDate");

        let registrations;
        if (eventName) {
            registrations = await db
                .select()
                .from(eventRegistration)
                .where(sql`${eventRegistration.eventName} = ${eventName}`);
        } else if (eventDate) {
            registrations = await db
                .select()
                .from(eventRegistration)
                .where(sql`${eventRegistration.eventDate} = ${eventDate}`);
        } else {
            registrations = await db.select().from(eventRegistration);
        }

        return NextResponse.json({ registrations }, { status: 200 });
    } catch (error) {
        console.error("Error fetching registrations:", error);
        return NextResponse.json(
            { error: "Erro ao buscar registros" },
            { status: 500 }
        );
    }
}

