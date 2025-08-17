"use client";

import { PropertyList } from "@/components/properties/property-list";
import { PropertyFilters } from "@/components/properties/property-filters";
import { Region } from "@/lib/db/schema";

interface PropertiesClientProps {
    userPreferences?: PropertyFilters | null;
    regions: Region[];
}

export function PropertiesClient({ userPreferences, regions }: PropertiesClientProps) {
    return <PropertyList userPreferences={userPreferences} regions={regions} />;
}
