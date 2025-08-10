import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userPropertyInterests } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// Temporary in-memory storage for interests (replace with database when ready)
const mockInterests = new Map<string, Map<string, "interested" | "rejected">>(); // userId -> Map<propertyId, status>

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        // Get user interests from database
        try {
            const userInterestsDb = await db.query.userPropertyInterests.findMany({
                where: eq(userPropertyInterests.userId, session.user.id)
            });

            const interests = userInterestsDb.reduce((acc, interest) => {
                if (interest.status) {
                    acc[interest.propertyId] = interest.status;
                }
                return acc;
            }, {} as Record<string, "interested" | "rejected">);

            return NextResponse.json({ interests });
        } catch (dbError) {
            console.log("Database not ready, using mock data:", dbError);
            // Fallback to mock data
            const userInterests = mockInterests.get(session.user.id) || new Map();
            const interests = Object.fromEntries(userInterests);
            return NextResponse.json({ interests });
        }

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

        const { propertyId, status, notes } = await request.json();

        if (!propertyId) {
            return NextResponse.json(
                { error: "ID do imóvel é obrigatório" },
                { status: 400 }
            );
        }

        if (!status || !["interested", "rejected"].includes(status)) {
            return NextResponse.json(
                { error: "Status deve ser 'interested' ou 'rejected'" },
                { status: 400 }
            );
        }

        // Try database operations first
        try {
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
                        status,
                        isInterested: status === "interested",
                        notes,
                        updatedAt: new Date()
                    })
                    .where(eq(userPropertyInterests.id, existingInterest.id));
            } else {
                // Create new interest
                await db.insert(userPropertyInterests).values({
                    userId: session.user.id,
                    propertyId,
                    status,
                    isInterested: status === "interested",
                    notes
                });
            }

            const message = status === "interested" 
                ? "✅ Imóvel adicionado aos seus interesses" 
                : "❌ Entendido, nossa IA vai aprender com isso";

            return NextResponse.json({
                success: true,
                message
            });

        } catch (dbError) {
            console.log("Database not ready, using mock data:", dbError);
            
            // Fallback to mock data
            if (!mockInterests.has(session.user.id)) {
                mockInterests.set(session.user.id, new Map());
            }
            
            const userInterests = mockInterests.get(session.user.id)!;
            userInterests.set(propertyId, status);

            const message = status === "interested" 
                ? "✅ Imóvel adicionado aos seus interesses" 
                : "❌ Entendido, nossa IA vai aprender com isso";

            return NextResponse.json({
                success: true,
                message
            });
        }

    } catch (error) {
        console.error("Error updating property interest:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
