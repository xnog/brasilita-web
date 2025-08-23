import { useState, useEffect, useCallback, useRef } from "react";
import { Property } from "@/lib/db/schema";
import { PropertyFilters, usePropertyFilters } from "./use-property-filters";
import { usePropertyInterest } from "./use-property-interest";
import { usePropertyCache } from "./use-property-cache";

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

export function usePropertyList(filters: PropertyFilters) {
    const [data, setData] = useState<PropertyListResponse | null>(null);
    const [loading, setLoading] = useState(true);
    
    const { buildQueryString } = usePropertyFilters();
    const { toggleInterest } = usePropertyInterest();
    const { getCachedListData, setCachedListData } = usePropertyCache();
    
    // Ref to prevent double requests in development
    const lastFiltersRef = useRef<string>('');

    const fetchProperties = useCallback(async (newFilters: PropertyFilters) => {
        // Always show loading first to give user feedback
        setLoading(true);
        
        // Check cache first
        const cachedData = getCachedListData(newFilters);
        if (cachedData) {
            setData(cachedData);
            setLoading(false);
            return;
        }
        
        try {
            const queryString = buildQueryString(newFilters);
            const response = await fetch(`/api/properties?${queryString}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json();
            setData(responseData);
            setCachedListData(newFilters, responseData);
        } catch (error: unknown) {
            console.error("Error fetching properties:", error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [buildQueryString, getCachedListData, setCachedListData]);

    const handlePageChange = useCallback((page: number) => {
        const newFilters = { ...filters, page };
        fetchProperties(newFilters);
    }, [filters, fetchProperties]);

    const handleToggleInterest = useCallback(async (
        propertyId: string, 
        isInterested: boolean, 
        notes?: string
    ) => {
        if (!data) return;

        // Optimistic update
        const updatedProperties = data.properties.map(p =>
            p.id === propertyId ? { ...p, isInterested, interestNotes: notes || null } : p
        );
        setData({ ...data, properties: updatedProperties });

        const result = await toggleInterest(propertyId, isInterested, notes);
        
        if (!result.success) {
            // Revert on error
            const revertedProperties = data.properties.map(p =>
                p.id === propertyId ? { ...p, isInterested: !isInterested, interestNotes: p.interestNotes } : p
            );
            setData({ ...data, properties: revertedProperties });
        }
    }, [data, toggleInterest]);

    // Load properties when filters change (with deduplication to prevent double requests)
    useEffect(() => {
        const filtersString = JSON.stringify(filters);
        if (lastFiltersRef.current === filtersString) {
            return; // Skip if same filters
        }
        lastFiltersRef.current = filtersString;
        fetchProperties(filters);
    }, [filters, fetchProperties]);



    return {
        data,
        loading,
        handlePageChange,
        handleToggleInterest,
        refetch: () => fetchProperties(filters)
    };
}
