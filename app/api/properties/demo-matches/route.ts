import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        // Simulate AI matching with some sample properties
        // In real scenario, this would be called by external AI service
        const demoMatches = [
            "1", // Apartamento Moderno em Roma
            "4", // Casa Histórica em Florença  
            "7", // Escritório Comercial em Roma
        ];

        // Call the matches API to store these demo matches
        const matchesResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/properties/matches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': request.headers.get('Cookie') || ''
            },
            body: JSON.stringify({
                propertyIds: demoMatches,
                source: 'Demo'
            })
        });

        if (!matchesResponse.ok) {
            throw new Error('Failed to set demo matches');
        }

        const result = await matchesResponse.json();

        return NextResponse.json({
            message: "Matches de demonstração criados com sucesso!",
            demoMatches,
            ...result
        });

    } catch (error) {
        console.error("Error creating demo matches:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
