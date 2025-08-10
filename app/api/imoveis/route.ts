import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        // Get matched properties via internal call
        try {
            const matchesResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/imoveis/matches`, {
                headers: {
                    'Cookie': request.headers.get('Cookie') || ''
                }
            });

            if (matchesResponse.ok) {
                const matchesData = await matchesResponse.json();
                
                // If user doesn't have a complete profile, return early
                if (matchesData.requiresProfile) {
                    return NextResponse.json({
                        properties: [],
                        total: 0,
                        isMatched: false,
                        hasProfile: false,
                        requiresProfile: true,
                        message: matchesData.message
                    });
                }

                const matchedProperties = matchesData.properties || [];

                // Apply filters on matched properties
                const { searchParams } = new URL(request.url);
                const location = searchParams.get("location");
                const maxPrice = searchParams.get("maxPrice");
                const propertyType = searchParams.get("propertyType");
                const minBedrooms = searchParams.get("minBedrooms");
                const sortBy = searchParams.get("sortBy") || "createdAt";
                const sortOrder = searchParams.get("sortOrder") || "desc";

                let filteredProperties = [...matchedProperties];

                // Apply filters
                if (location) {
                    filteredProperties = filteredProperties.filter(property => 
                        property.location.toLowerCase().includes(location.toLowerCase())
                    );
                }

                if (maxPrice) {
                    const maxPriceNum = parseInt(maxPrice);
                    filteredProperties = filteredProperties.filter(property => 
                        property.price <= maxPriceNum
                    );
                }

                if (propertyType) {
                    filteredProperties = filteredProperties.filter(property => 
                        property.propertyType === propertyType
                    );
                }

                if (minBedrooms) {
                    const minBedroomsNum = parseInt(minBedrooms);
                    filteredProperties = filteredProperties.filter(property => 
                        property.bedrooms && property.bedrooms >= minBedroomsNum
                    );
                }

                // Apply sorting
                filteredProperties.sort((a, b) => {
                    let aValue, bValue;
                    
                    switch (sortBy) {
                        case "price":
                            aValue = a.price;
                            bValue = b.price;
                            break;
                        case "area":
                            aValue = a.area || 0;
                            bValue = b.area || 0;
                            break;
                        case "bedrooms":
                            aValue = a.bedrooms || 0;
                            bValue = b.bedrooms || 0;
                            break;
                        case "createdAt":
                        default:
                            aValue = a.createdAt.getTime();
                            bValue = b.createdAt.getTime();
                            break;
                    }

                    if (sortOrder === "asc") {
                        return aValue - bValue;
                    } else {
                        return bValue - aValue;
                    }
                });

                return NextResponse.json({
                    properties: filteredProperties,
                    total: filteredProperties.length,
                    totalMatched: matchedProperties.length,
                    isMatched: true,
                    message: matchedProperties.length > 0 ? 
                        `Mostrando ${filteredProperties.length} de ${matchedProperties.length} imóveis selecionados para você` :
                        "Nossa IA e especialistas estão analisando seu perfil para selecionar os melhores imóveis"
                });
            }
        } catch (error) {
            console.error("Error fetching matches:", error);
        }

        // Fallback: show empty state encouraging profile completion
        return NextResponse.json({
            properties: [],
            total: 0,
            isMatched: false,
            message: "Complete seu perfil no checklist para que nossa IA e especialistas possam selecionar imóveis ideais para você"
        });

    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}