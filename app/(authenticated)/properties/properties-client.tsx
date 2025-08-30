"use client";

import { PropertyList } from "@/components/properties/property-list";
import { PropertyFilters } from "@/components/properties/property-filters";
import { Region, Property } from "@/lib/db/schema";

interface PropertyListResponse {
    properties: Array<Omit<Property, 'originalUrl'> & {
        isInterested?: boolean;
        interestNotes?: string | null;
        region: { id: string; name: string; examples: string | null; createdAt: Date | null; updatedAt: Date | null; } | null;
    }>;
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

interface PropertiesClientProps {
    userPreferences?: PropertyFilters | null;
    regions: Region[];
    initialPropertyData?: PropertyListResponse | null;
}

export function PropertiesClient({ userPreferences, regions, initialPropertyData }: PropertiesClientProps) {
    return (
        <PropertyList
            userPreferences={userPreferences}
            regions={regions}
            initialPropertyData={initialPropertyData}
        />
    );
}
