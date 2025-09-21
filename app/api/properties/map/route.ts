import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { properties, userPropertyInterests } from "@/lib/db/schema";
import { and, eq, inArray, isNotNull, ilike, count } from "drizzle-orm";
import { 
    parseFiltersFromRequest,
    buildWhereClause,
    normalizeFilters
} from "@/lib/api/property-filters";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Parse filters from query params
        const filters = parseFiltersFromRequest(request);

        // Build base where clause without coordinate conditions
        const baseWhereConditions = buildWhereClause(filters);
        
        // Special handling for location search in map - search in title instead of location
        let baseWhereClause;
        if (filters.location) {
            // Override the location search to use title field for map
            const whereConditionsArray = Array.isArray(baseWhereConditions) 
                ? baseWhereConditions 
                : [baseWhereConditions];
            
            // Remove the location condition and add title search
            const conditionsWithoutLocation = whereConditionsArray.filter(condition => 
                !condition?.toString().includes('location')
            );
            
            const finalConditions = [
                ...conditionsWithoutLocation,
                ilike(properties.title, `%${filters.location}%`)
            ];
            
            baseWhereClause = and(...finalConditions);
        } else {
            baseWhereClause = baseWhereConditions;
        }

        // Get total count of properties matching filters (regardless of coordinates)
        const [totalCountResult] = await db
            .select({ count: count() })
            .from(properties)
            .where(baseWhereClause);

        const totalMatchingProperties = totalCountResult.count;

        // Build where clause with coordinate validation for map display
        const coordinateConditions = [
            isNotNull(properties.latitude),
            isNotNull(properties.longitude)
        ];
        
        const whereClause = and(baseWhereClause, ...coordinateConditions);

        // Get properties optimized for map markers (essential data for popups)
        // Limit to 1000 properties for performance reasons
        const propertyList = await db.query.properties.findMany({
            where: whereClause,
            columns: {
                id: true,
                title: true,
                price: true,
                latitude: true,
                longitude: true,
                location: true,
                rooms: true,
                bedrooms: true,
                bathrooms: true,
                area: true,
                // Exclude heavy fields not needed for map markers
                isRented: false,
                images: false,
                description: false,
                originalUrl: false,
                createdAt: false,
                updatedAt: false,
                regionId: false
            },
            limit: 1000
        });

        // If favorites only, filter by user interests
        let filteredProperties = propertyList;
        
        if (filters.favoritesOnly) {
            const propertyIds = propertyList.map(p => p.id);
            
            if (propertyIds.length > 0) {
                const userInterests = await db.query.userPropertyInterests.findMany({
                    where: and(
                        eq(userPropertyInterests.userId, session.user.id),
                        inArray(userPropertyInterests.propertyId, propertyIds),
                        eq(userPropertyInterests.isInterested, true)
                    )
                });

                const interestedPropertyIds = new Set(userInterests.map(ui => ui.propertyId));
                filteredProperties = propertyList.filter(p => interestedPropertyIds.has(p.id));
            } else {
                filteredProperties = [];
            }
        }

        // Get user interests for these properties (for heart icon state)
        const propertyIds = filteredProperties.map(p => p.id);
        let userInterests: Array<{
            id: string;
            userId: string;
            propertyId: string;
            isInterested: boolean | null;
            notes: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        }> = [];

        if (propertyIds.length > 0) {
            userInterests = await db.query.userPropertyInterests.findMany({
                where: and(
                    eq(userPropertyInterests.userId, session.user.id),
                    inArray(userPropertyInterests.propertyId, propertyIds)
                )
            });
        }

        // Combine properties with interest status
        const interestMap = new Map(
            userInterests.map(ui => [ui.propertyId, { isInterested: ui.isInterested, notes: ui.notes }])
        );

        const propertiesWithInterest = filteredProperties.map(property => ({
            ...property,
            isInterested: interestMap.get(property.id)?.isInterested || false,
            interestNotes: interestMap.get(property.id)?.notes || null
        }));

        // Calculate properties without location
        const propertiesWithLocation = propertiesWithInterest.length;
        const propertiesWithoutLocation = totalMatchingProperties - propertiesWithLocation;

        return NextResponse.json({
            properties: propertiesWithInterest,
            totalCount: totalMatchingProperties,
            propertiesWithLocation: propertiesWithLocation,
            propertiesWithoutLocation: propertiesWithoutLocation,
            appliedFilters: normalizeFilters(filters),
            isLimited: propertiesWithInterest.length >= 1000,
            maxMapProperties: 1000
        });

    } catch (error) {
        console.error("Error fetching properties for map:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
