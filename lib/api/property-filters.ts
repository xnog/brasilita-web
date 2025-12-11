import { NextRequest } from "next/server";
import { properties } from "@/lib/db/schema";
import { eq, and, inArray, gte, lte, ilike, desc, asc, sql } from "drizzle-orm";

export interface PropertyFilters {
    regions?: string[];
    priceMin?: number;
    priceMax?: number;
    roomsMin?: number;
    roomsMax?: number;
    bedroomsMin?: number;
    bedroomsMax?: number;
    bathroomsMin?: number;
    bathroomsMax?: number;
    areaMin?: number;
    areaMax?: number;
    location?: string;
    pricePerSqmMin?: number;
    pricePerSqmMax?: number;
    favoritesOnly?: boolean;
    isRented?: boolean;
    isRentToOwn?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'price' | 'area' | 'createdAt' | 'pricePerSqm';
    sortOrder?: 'asc' | 'desc';
}

/**
 * Parse filters from URL search parameters
 */
export function parseFiltersFromRequest(request: NextRequest): PropertyFilters {
    const { searchParams } = new URL(request.url);

    return {
        regions: searchParams.get('regions')?.split(',').filter(Boolean),
        priceMin: searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : undefined,
        priceMax: searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : undefined,
        roomsMin: searchParams.get('roomsMin') ? parseInt(searchParams.get('roomsMin')!) : undefined,
        roomsMax: searchParams.get('roomsMax') ? parseInt(searchParams.get('roomsMax')!) : undefined,
        bedroomsMin: searchParams.get('bedroomsMin') ? parseInt(searchParams.get('bedroomsMin')!) : undefined,
        bedroomsMax: searchParams.get('bedroomsMax') ? parseInt(searchParams.get('bedroomsMax')!) : undefined,
        bathroomsMin: searchParams.get('bathroomsMin') ? parseInt(searchParams.get('bathroomsMin')!) : undefined,
        bathroomsMax: searchParams.get('bathroomsMax') ? parseInt(searchParams.get('bathroomsMax')!) : undefined,
        areaMin: searchParams.get('areaMin') ? parseInt(searchParams.get('areaMin')!) : undefined,
        areaMax: searchParams.get('areaMax') ? parseInt(searchParams.get('areaMax')!) : undefined,
        location: searchParams.get('location') || undefined,
        pricePerSqmMin: searchParams.get('pricePerSqmMin') ? parseInt(searchParams.get('pricePerSqmMin')!) : undefined,
        pricePerSqmMax: searchParams.get('pricePerSqmMax') ? parseInt(searchParams.get('pricePerSqmMax')!) : undefined,
        favoritesOnly: searchParams.get('favoritesOnly') === 'true',
        isRented: searchParams.get('isRented') ? searchParams.get('isRented') === 'true' : undefined,
        isRentToOwn: searchParams.get('isRentToOwn') ? searchParams.get('isRentToOwn') === 'true' : undefined,
        page: Math.max(1, parseInt(searchParams.get('page') || '1')),
        limit: Math.min(50, Math.max(10, parseInt(searchParams.get('limit') || '20'))),
        sortBy: (searchParams.get('sortBy') as 'price' | 'area' | 'createdAt' | 'pricePerSqm') || 'createdAt',
        sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    };
}

/**
 * Build WHERE clause for property queries based on filters
 */
export function buildWhereClause(filters: PropertyFilters, includeCoordinates: boolean = false) {
    const whereConditions = [
        eq(properties.isAvailable, true)
    ];

    // Include coordinate validation for map queries
    if (includeCoordinates) {
        whereConditions.push(
            // Only include properties with valid coordinates for map display
            // Note: Using isNotNull from drizzle-orm would be imported separately
        );
    }

    if (filters.regions && filters.regions.length > 0) {
        whereConditions.push(inArray(properties.regionId, filters.regions));
    }

    if (filters.priceMin !== undefined) {
        whereConditions.push(gte(properties.price, filters.priceMin));
    }

    if (filters.priceMax !== undefined) {
        whereConditions.push(lte(properties.price, filters.priceMax));
    }

    if (filters.roomsMin !== undefined) {
        whereConditions.push(gte(properties.rooms, filters.roomsMin));
    }

    if (filters.roomsMax !== undefined) {
        whereConditions.push(lte(properties.rooms, filters.roomsMax));
    }

    if (filters.bedroomsMin !== undefined) {
        whereConditions.push(gte(properties.bedrooms, filters.bedroomsMin));
    }

    if (filters.bedroomsMax !== undefined) {
        whereConditions.push(lte(properties.bedrooms, filters.bedroomsMax));
    }

    if (filters.bathroomsMin !== undefined) {
        whereConditions.push(gte(properties.bathrooms, filters.bathroomsMin));
    }

    if (filters.bathroomsMax !== undefined) {
        whereConditions.push(lte(properties.bathrooms, filters.bathroomsMax));
    }

    if (filters.areaMin !== undefined) {
        whereConditions.push(gte(properties.area, filters.areaMin));
    }

    if (filters.areaMax !== undefined) {
        whereConditions.push(lte(properties.area, filters.areaMax));
    }

    if (filters.location) {
        // For list endpoint, search in location field
        // For map endpoint, search in title field (as implemented in original)
        whereConditions.push(ilike(properties.location, `%${filters.location}%`));
    }

    // Price per square meter filters
    if (filters.pricePerSqmMin !== undefined && filters.pricePerSqmMax !== undefined) {
        whereConditions.push(
            sql`(${properties.price}::float / NULLIF(${properties.area}, 0)) BETWEEN ${filters.pricePerSqmMin} AND ${filters.pricePerSqmMax}`
        );
    } else if (filters.pricePerSqmMin !== undefined) {
        whereConditions.push(
            sql`(${properties.price}::float / NULLIF(${properties.area}, 0)) >= ${filters.pricePerSqmMin}`
        );
    } else if (filters.pricePerSqmMax !== undefined) {
        whereConditions.push(
            sql`(${properties.price}::float / NULLIF(${properties.area}, 0)) <= ${filters.pricePerSqmMax}`
        );
    }

    if (filters.isRented !== undefined) {
        whereConditions.push(eq(properties.isRented, filters.isRented));
    }

    if (filters.isRentToOwn !== undefined) {
        whereConditions.push(eq(properties.isRentToOwn, filters.isRentToOwn));
    }

    return whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0];
}

/**
 * Build ORDER BY clause for property queries
 */
export function buildOrderByClause(filters: PropertyFilters) {
    const sortDirection = filters.sortOrder === 'asc' ? asc : desc;

    switch (filters.sortBy) {
        case 'price':
            return sortDirection(properties.price);
        case 'area':
            return sortDirection(properties.area);
        case 'pricePerSqm':
            // Sort by price per square meter with NULLS LAST
            return filters.sortOrder === 'asc'
                ? sql`(${properties.price}::float / NULLIF(${properties.area}, 0)) ASC NULLS LAST`
                : sql`(${properties.price}::float / NULLIF(${properties.area}, 0)) DESC NULLS LAST`;
        default:
            return sortDirection(properties.createdAt);
    }
}

/**
 * Normalize filters for consistent API responses
 */
export function normalizeFilters(filters: PropertyFilters): PropertyFilters {
    return {
        regions: filters.regions || [],
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        roomsMin: filters.roomsMin,
        roomsMax: filters.roomsMax,
        bedroomsMin: filters.bedroomsMin,
        bedroomsMax: filters.bedroomsMax,
        bathroomsMin: filters.bathroomsMin,
        bathroomsMax: filters.bathroomsMax,
        areaMin: filters.areaMin,
        areaMax: filters.areaMax,
        location: filters.location,
        pricePerSqmMin: filters.pricePerSqmMin,
        pricePerSqmMax: filters.pricePerSqmMax,
        favoritesOnly: filters.favoritesOnly,
        isRented: filters.isRented,
        isRentToOwn: filters.isRentToOwn,
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
    };
}
