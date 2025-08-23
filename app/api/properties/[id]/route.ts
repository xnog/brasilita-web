import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { properties, userPropertyInterests } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { id: propertyId } = await params;

        // Get full property details
        const property = await db.query.properties.findFirst({
            where: eq(properties.id, propertyId),
            with: {
                region: true
            },
            columns: {
                originalUrl: false // Hide originalUrl from API response
            }
        });

        if (!property) {
            return NextResponse.json({ error: "Propriedade não encontrada" }, { status: 404 });
        }

        // Get user interest for this property
        const userInterest = await db.query.userPropertyInterests.findFirst({
            where: and(
                eq(userPropertyInterests.userId, session.user.id),
                eq(userPropertyInterests.propertyId, propertyId)
            )
        });

        // Combine property with interest status
        const propertyWithInterest = {
            ...property,
            isInterested: userInterest?.isInterested || false,
            interestNotes: userInterest?.notes || null
        };

        return NextResponse.json({
            property: propertyWithInterest
        });

    } catch (error) {
        console.error("Error fetching property details:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
