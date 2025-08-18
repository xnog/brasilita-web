import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userPropertyInterests } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

// Update user's intent to proceed with property negotiation
export async function PATCH(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { propertyId, wantsToProceed } = await request.json();

        if (!propertyId) {
            return NextResponse.json({ error: "PropertyId obrigatório" }, { status: 400 });
        }

        if (typeof wantsToProceed !== 'boolean') {
            return NextResponse.json({ error: "wantsToProceed deve ser um boolean" }, { status: 400 });
        }

        // Check if user has already expressed interest in this property
        let existingInterest = await db.query.userPropertyInterests.findFirst({
            where: and(
                eq(userPropertyInterests.userId, session.user.id),
                eq(userPropertyInterests.propertyId, propertyId)
            )
        });

        // If no existing interest and user wants to proceed, create a new record
        if (!existingInterest && wantsToProceed) {
            await db.insert(userPropertyInterests)
                .values({
                    userId: session.user.id,
                    propertyId,
                    isInterested: true,
                    wantsToProceed: true,
                    notes: null
                });

            return NextResponse.json({ success: true, wantsToProceed: true });
        }

        if (!existingInterest) {
            return NextResponse.json({ error: "Você deve adicionar a propriedade aos favoritos primeiro" }, { status: 400 });
        }

        // Update the wantsToProceed field
        await db.update(userPropertyInterests)
            .set({
                wantsToProceed,
                updatedAt: sql`now()`
            })
            .where(and(
                eq(userPropertyInterests.userId, session.user.id),
                eq(userPropertyInterests.propertyId, propertyId)
            ));

        return NextResponse.json({ success: true, wantsToProceed });

    } catch (error) {
        console.error("Error updating property proceed intent:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}