import { useState, useEffect, useCallback, useRef } from "react";
import { Property } from "@/lib/db/schema";
import { PropertyFilters, usePropertyFilters } from "./use-property-filters";
import { usePropertyInterest } from "./use-property-interest";
import { usePropertyCache } from "./use-property-cache";

export type PropertyMapMarker = {
    id: string;
    title: string;
    price: number;
    latitude: string;
    longitude: string;
    location: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    area: number | null;
    isInterested?: boolean;
};

type PropertyWithInterest = Property & {
    isInterested?: boolean;
    interestNotes?: string | null;
};

interface PropertyMapResponse {
    properties: PropertyMapMarker[];
    totalCount: number;
    propertiesWithLocation: number;
    propertiesWithoutLocation: number;
    appliedFilters: PropertyFilters;
}

export function usePropertyMap(filters: PropertyFilters) {
    const [markers, setMarkers] = useState<PropertyMapMarker[]>([]);
    const [totalProperties, setTotalProperties] = useState<number>(0);
    const [propertiesWithoutLocation, setPropertiesWithoutLocation] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [loadingPropertyId, setLoadingPropertyId] = useState<string | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<PropertyWithInterest | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    
    // Ref to prevent double requests in development
    const lastFiltersRef = useRef<string>('');
    
    const { buildQueryString } = usePropertyFilters();
    const { toggleInterest } = usePropertyInterest();
    const { getCachedMapData, setCachedMapData, getCachedPropertyDetails, setCachedPropertyDetails } = usePropertyCache();

    // Fetch map markers (lightweight data)
    const fetchMapMarkers = useCallback(async (newFilters: PropertyFilters) => {
        // Check cache first
        const cachedData = getCachedMapData(newFilters);
        if (cachedData) {
            // Use cached data immediately without loading state
            setMarkers(cachedData.properties || []);
            setTotalProperties(cachedData.totalCount || 0);
            setPropertiesWithoutLocation(cachedData.propertiesWithoutLocation || 0);
            setLoading(false);
            return;
        }
        
        // Only show loading if we need to fetch from API
        setLoading(true);
        
        try {
            const queryString = buildQueryString(newFilters);
            const response = await fetch(`/api/properties/map?${queryString}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData: PropertyMapResponse = await response.json();
            setMarkers(responseData.properties || []);
            setTotalProperties(responseData.totalCount || 0);
            setPropertiesWithoutLocation(responseData.propertiesWithoutLocation || 0);
            setCachedMapData(newFilters, responseData);
        } catch (error: unknown) {
            console.error("Map Error:", error);
            setMarkers([]);
        } finally {
            setLoading(false);
        }
    }, [buildQueryString, getCachedMapData, setCachedMapData]);

    // Fetch full property details when clicked
    const fetchPropertyDetails = useCallback(async (propertyId: string) => {
        // Check global cache first
        const cachedProperty = getCachedPropertyDetails(propertyId);
        if (cachedProperty) {
            setSelectedProperty(cachedProperty);
            setShowDetails(true);
            return;
        }

        try {
            setLoadingPropertyId(propertyId);
            const response = await fetch(`/api/properties/${propertyId}`);
            const responseData = await response.json();

            if (response.ok) {
                const property = responseData.property;
                // Cache the property details in global cache
                setCachedPropertyDetails(propertyId, property);
                setSelectedProperty(property);
                setShowDetails(true);
            } else {
                console.error("Property details API Error:", responseData.error);
            }
        } catch (error) {
            console.error("Property details Error:", error);
        } finally {
            setLoadingPropertyId(null);
        }
    }, [getCachedPropertyDetails, setCachedPropertyDetails]);

    const handlePropertyClick = useCallback((propertyId: string) => {
        fetchPropertyDetails(propertyId);
    }, [fetchPropertyDetails]);

    const handleToggleInterest = useCallback(async (
        propertyId: string, 
        isInterested: boolean, 
        notes?: string
    ) => {
        // Update cache if property is cached
        const cachedProperty = getCachedPropertyDetails(propertyId);
        if (cachedProperty) {
            const updatedProperty = { ...cachedProperty, isInterested, interestNotes: notes || null };
            setCachedPropertyDetails(propertyId, updatedProperty);
            
            // Update selected property if it's the same one
            if (selectedProperty?.id === propertyId) {
                setSelectedProperty(updatedProperty);
            }
        }

        // Update marker interest status
        setMarkers(prev => prev.map(marker => 
            marker.id === propertyId ? { ...marker, isInterested } : marker
        ));

        const result = await toggleInterest(propertyId, isInterested, notes);
        
        if (!result.success) {
            // Revert changes on error
            const cachedPropertyForRevert = getCachedPropertyDetails(propertyId);
            if (cachedPropertyForRevert) {
                const revertedProperty = { ...cachedPropertyForRevert, isInterested: !isInterested };
                setCachedPropertyDetails(propertyId, revertedProperty);
                
                if (selectedProperty?.id === propertyId) {
                    setSelectedProperty(revertedProperty);
                }
            }
            
            setMarkers(prev => prev.map(marker => 
                marker.id === propertyId ? { ...marker, isInterested: !isInterested } : marker
            ));
        }
    }, [getCachedPropertyDetails, setCachedPropertyDetails, selectedProperty, toggleInterest]);

    const handleCloseDetails = useCallback(() => {
        setShowDetails(false);
    }, []);

    // Load markers when filters change (with deduplication to prevent double requests in dev)
    useEffect(() => {
        const filtersString = JSON.stringify(filters);
        if (lastFiltersRef.current === filtersString) {
            return; // Skip if same filters
        }
        lastFiltersRef.current = filtersString;
        fetchMapMarkers(filters);
    }, [filters, fetchMapMarkers]);



    // Filter markers with valid coordinates
    const validMarkers = markers.filter(marker => {
        const lat = marker.latitude ? parseFloat(marker.latitude) : null;
        const lng = marker.longitude ? parseFloat(marker.longitude) : null;
        return lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng);
    });

    return {
        markers,
        validMarkers,
        totalProperties,
        propertiesWithoutLocation,
        loading,
        loadingPropertyId,
        selectedProperty,
        showDetails,
        handlePropertyClick,
        handleToggleInterest,
        handleCloseDetails,
        refetch: () => fetchMapMarkers(filters)
    };
}
