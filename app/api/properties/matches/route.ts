import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { propertyMatches, properties, userProfiles } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";

// GET: Retrieve matched properties for user
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        // Get user's matched property IDs from database
        const matches = await db.query.propertyMatches.findMany({
            where: and(
                eq(propertyMatches.userId, session.user.id),
                eq(propertyMatches.isActive, true)
            )
        });
        
        // Check if user has completed profile
        const userProfile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, session.user.id)
        });

        // User must have a complete profile to see properties
        if (!userProfile || !userProfile.propertyType || !userProfile.location || !userProfile.buyerProfile || !userProfile.usageType || !userProfile.investmentBudget) {
            return NextResponse.json({
                properties: [],
                total: 0,
                message: "Complete seu perfil no checklist para que nossa IA e especialistas possam selecionar imóveis ideais para você.",
                hasProfile: false,
                requiresProfile: true
            });
        }

        if (matches.length === 0) {
            const message = "Nossa IA e especialistas estão analisando novos imóveis para seu perfil. Volte em breve para ver as recomendações!";

            return NextResponse.json({
                properties: [],
                total: 0,
                message,
                hasProfile: true,
                requiresProfile: false
            });
        }

        const propertyIds = matches.map(match => match.propertyId);

        // Get the actual properties from database
        const matchedProperties = await db.query.properties.findMany({
            where: inArray(properties.id, propertyIds)
        });

        return NextResponse.json({
            properties: matchedProperties,
            total: matchedProperties.length,
            matchedIds: propertyIds
        });

    } catch (error) {
        console.error("Error fetching property matches:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

// POST: Receive matches from external AI service
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { propertyIds, source } = body;

        if (!propertyIds || !Array.isArray(propertyIds)) {
            return NextResponse.json(
                { error: "propertyIds deve ser um array" },
                { status: 400 }
            );
        }

        // Validate that all property IDs exist in database
        const existingProperties = await db.query.properties.findMany({
            where: inArray(properties.id, propertyIds),
            columns: { id: true }
        });

        const validPropertyIds = existingProperties.map(prop => prop.id);

        if (validPropertyIds.length !== propertyIds.length) {
            console.warn(`Some property IDs not found: ${propertyIds.filter(id => !validPropertyIds.includes(id))}`);
        }

        // Clear existing matches for this user
        await db.delete(propertyMatches)
            .where(eq(propertyMatches.userId, session.user.id));

        // Insert new matches
        if (validPropertyIds.length > 0) {
            const matchesToInsert = validPropertyIds.map(propertyId => ({
                userId: session.user.id,
                propertyId,
                matchScore: 100, // AI or specialist determined this is a match
                matchReason: JSON.stringify({ 
                    timestamp: new Date().toISOString(),
                    method: 'curated_selection'
                }),
                isActive: true
            }));

            await db.insert(propertyMatches).values(matchesToInsert);
        }

        return NextResponse.json({
            message: `${validPropertyIds.length} propriedades vinculadas com sucesso`,
            matchedCount: validPropertyIds.length,
            source: source || 'AI'
        });

    } catch (error) {
        console.error("Error setting property matches:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

// DELETE: Remove a specific property from user's matches
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { propertyId } = body;

        if (!propertyId) {
            return NextResponse.json(
                { error: "propertyId é obrigatório" },
                { status: 400 }
            );
        }

        // Remove the specific match for this user
        await db.delete(propertyMatches)
            .where(and(
                eq(propertyMatches.userId, session.user.id),
                eq(propertyMatches.propertyId, propertyId)
            ));

        return NextResponse.json({
            message: "Imóvel removido do match com sucesso"
        });

    } catch (error) {
        console.error("Error removing property from match:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
