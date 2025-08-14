import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { propertyMatches, properties, userProfiles } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Check profile with regions
        const userProfile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, session.user.id),
            with: {
                userProfileRegions: {
                    with: {
                        region: true
                    }
                }
            }
        });

        if (!userProfile?.propertyType || !userProfile.investmentBudget) {
            return NextResponse.json({
                properties: [],
                message: "Complete seu perfil para ver imóveis selecionados"
            });
        }

        // Verificar se tem regiões selecionadas (novo campo) ou location (campo antigo)
        const hasRegions = userProfile.userProfileRegions.length > 0;
        const hasLocation = userProfile.location && userProfile.location.trim().length > 0;

        if (!hasRegions && !hasLocation) {
            return NextResponse.json({
                properties: [],
                message: "Selecione pelo menos uma região de interesse para ver imóveis"
            });
        }

        // Get matches
        const matches = await db.query.propertyMatches.findMany({
            where: and(
                eq(propertyMatches.userId, session.user.id),
                eq(propertyMatches.isActive, true)
            )
        });

        if (matches.length === 0) {
            return NextResponse.json({
                properties: [],
                message: "Nenhum imóvel encontrado para seu perfil"
            });
        }

        // Get properties with region information
        const propertyIds = matches.map(m => m.propertyId);
        const propertyList = await db.query.properties.findMany({
            where: inArray(properties.id, propertyIds),
            with: {
                region: true
            }
        });

        // Combine with interest status
        const propertiesWithInterest = propertyList.map(property => {
            const match = matches.find(m => m.propertyId === property.id);
            return {
                ...property,
                isInterested: match?.isInterested || false
            };
        });

        return NextResponse.json({
            properties: propertiesWithInterest,
            message: `${propertiesWithInterest.length} imóveis encontrados`
        });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        const { propertyId, isInterested } = await request.json();
        if (!propertyId) {
            return NextResponse.json({ error: "PropertyId obrigatório" }, { status: 400 });
        }

        // Update interest in property_match
        await db.update(propertyMatches)
            .set({ isInterested })
            .where(and(
                eq(propertyMatches.userId, session.user.id),
                eq(propertyMatches.propertyId, propertyId)
            ));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}