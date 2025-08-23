import { useCallback } from 'react';
import { Property } from "@/lib/db/schema";
import { PropertyFilters } from "./use-property-filters";
import { PropertyMapMarker } from "./use-property-map";

type PropertyWithInterest = Property & {
    isInterested?: boolean;
    interestNotes?: string | null;
};

interface PropertyListResponse {
    properties: PropertyWithInterest[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        limit: number;
    };
    appliedFilters: PropertyFilters;
}

interface CacheEntry<T> {
    data: T;
    filters: PropertyFilters;
    timestamp: number;
}

interface MapCacheData {
    properties: PropertyMapMarker[];
    totalCount: number;
    propertiesWithoutLocation: number;
    appliedFilters: PropertyFilters;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Global cache instances - shared across all components
const globalListCache = new Map<string, CacheEntry<PropertyListResponse>>();
const globalMapCache = new Map<string, CacheEntry<MapCacheData>>();
// Separate cache for property details (persistent across filter changes)
const globalPropertyDetailsCache = new Map<string, CacheEntry<PropertyWithInterest>>();

// Generate cache key from filters (excluding pagination for map cache)
function generateCacheKey(filters: PropertyFilters, includePagination: boolean = true): string {
    const keyFilters = { ...filters };
    
    // For map cache, exclude pagination
    if (!includePagination) {
        delete keyFilters.page;
        delete keyFilters.limit;
    }
    
    return JSON.stringify(keyFilters);
}

// Check if filters are equivalent (ignoring pagination for cross-view cache)
function areFiltersEquivalent(filters1: PropertyFilters, filters2: PropertyFilters, ignorePagination: boolean = false): boolean {
    const f1 = { ...filters1 };
    const f2 = { ...filters2 };
    
    if (ignorePagination) {
        delete f1.page;
        delete f1.limit;
        delete f2.page;
        delete f2.limit;
    }
    
    return JSON.stringify(f1) === JSON.stringify(f2);
}

// Helper functions
const isValidCache = <T>(entry: CacheEntry<T>): boolean => {
    return Date.now() - entry.timestamp < CACHE_DURATION;
};

export function usePropertyCache() {
    const getCachedListData = useCallback((filters: PropertyFilters): PropertyListResponse | null => {
        const key = generateCacheKey(filters, true);
        const entry = globalListCache.get(key);
        
        if (entry && isValidCache(entry)) {
            return entry.data;
        }
        
        return null;
    }, []);

    const setCachedListData = useCallback((filters: PropertyFilters, data: PropertyListResponse) => {
        const key = generateCacheKey(filters, true);
        globalListCache.set(key, {
            data,
            filters,
            timestamp: Date.now()
        });
    }, []);

    const getCachedMapData = useCallback((filters: PropertyFilters): MapCacheData | null => {
        const key = generateCacheKey(filters, false);
        const entry = globalMapCache.get(key);
        
        if (entry && isValidCache(entry)) {
            return entry.data;
        }
        
        return null;
    }, []);

    const setCachedMapData = useCallback((filters: PropertyFilters, data: MapCacheData) => {
        const key = generateCacheKey(filters, false);
        globalMapCache.set(key, {
            data,
            filters,
            timestamp: Date.now()
        });
    }, []);

    // Check if we have data for the base filters (ignoring pagination)
    const hasDataForFilters = useCallback((filters: PropertyFilters): { hasListData: boolean; hasMapData: boolean } => {
        // Check list cache
        let hasListData = false;
        for (const [, entry] of globalListCache) {
            if (isValidCache(entry) && areFiltersEquivalent(entry.filters, filters, true)) {
                hasListData = true;
                break;
            }
        }

        // Check map cache
        const mapKey = generateCacheKey(filters, false);
        const mapEntry = globalMapCache.get(mapKey);
        const hasMapData = mapEntry ? isValidCache(mapEntry) : false;

        return { hasListData, hasMapData };
    }, []);

    // Clear only search results cache (list and map), keep property details
    const clearSearchCache = useCallback(() => {
        globalListCache.clear();
        globalMapCache.clear();
    }, []);

    // Clear all caches including property details
    const clearAllCache = useCallback(() => {
        globalListCache.clear();
        globalMapCache.clear();
        globalPropertyDetailsCache.clear();
    }, []);

    // Property details cache methods
    const getCachedPropertyDetails = useCallback((propertyId: string): PropertyWithInterest | null => {
        const entry = globalPropertyDetailsCache.get(propertyId);
        
        if (entry && isValidCache(entry)) {
            return entry.data;
        }
        
        return null;
    }, []);

    const setCachedPropertyDetails = useCallback((propertyId: string, data: PropertyWithInterest) => {
        globalPropertyDetailsCache.set(propertyId, {
            data,
            filters: {} as PropertyFilters, // Not relevant for property details
            timestamp: Date.now()
        });
    }, []);

    return {
        getCachedListData,
        setCachedListData,
        getCachedMapData,
        setCachedMapData,
        hasDataForFilters,
        clearSearchCache,
        clearAllCache,
        getCachedPropertyDetails,
        setCachedPropertyDetails,
        areFiltersEquivalent,
        // Keep clearCache for backward compatibility
        clearCache: clearAllCache
    };
}
