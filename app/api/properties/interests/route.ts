import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { userPropertyInterests } from "@/lib/db/schema";
// import { eq, and } from "drizzle-orm";

// Temporary in-memory storage for interests (replace with database when ready)
const mockInterests = new Map<string, Set<string>>(); // userId -> Set of propertyIds

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        // TODO: Replace with actual database query
        const userInterests = mockInterests.get(session.user.id) || new Set();
        
        /*
        const userInterests = await db.query.userPropertyInterests.findMany({
            where: and(
                eq(userPropertyInterests.userId, session.user.id),
                eq(userPropertyInterests.isInterested, true)
            )
        });
        */

        return NextResponse.json({
            interests: Array.from(userInterests)
        });

    } catch (error) {
        console.error("Error fetching user interests:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const { propertyId, isInterested, notes } = await request.json();

        if (!propertyId) {
            return NextResponse.json(
                { error: "ID do imóvel é obrigatório" },
                { status: 400 }
            );
        }

        // TODO: Replace with actual database operations
        if (!mockInterests.has(session.user.id)) {
            mockInterests.set(session.user.id, new Set());
        }
        
        const userInterests = mockInterests.get(session.user.id)!;
        
        if (isInterested) {
            userInterests.add(propertyId);
        } else {
            userInterests.delete(propertyId);
        }

        /*
        // Check if interest already exists
        const existingInterest = await db.query.userPropertyInterests.findFirst({
            where: and(
                eq(userPropertyInterests.userId, session.user.id),
                eq(userPropertyInterests.propertyId, propertyId)
            )
        });

        if (existingInterest) {
            // Update existing interest
            await db.update(userPropertyInterests)
                .set({
                    isInterested,
                    notes,
                    updatedAt: new Date()
                })
                .where(eq(userPropertyInterests.id, existingInterest.id));
        } else if (isInterested) {
            // Create new interest
            await db.insert(userPropertyInterests).values({
                userId: session.user.id,
                propertyId,
                isInterested,
                notes
            });
        }
        */

        return NextResponse.json({
            success: true,
            message: isInterested ? 
                "Interesse marcado com sucesso" : 
                "Interesse removido com sucesso"
        });

    } catch (error) {
        console.error("Error updating property interest:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
