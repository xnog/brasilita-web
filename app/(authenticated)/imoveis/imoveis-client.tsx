"use client";

import { PropertyList } from "@/components/properties/property-list";

interface ImoveisClientProps {
    userProfile?: {
        location?: string | null;
        investmentBudget?: number | null;
        propertyType?: string | null;
    } | null;
}

export function ImoveisClient({ userProfile }: ImoveisClientProps) {
    // Convert null values to undefined for compatibility
    const cleanUserProfile = userProfile ? {
        location: userProfile.location || undefined,
        investmentBudget: userProfile.investmentBudget || undefined,
        propertyType: userProfile.propertyType || undefined,
    } : undefined;

    return <PropertyList userProfile={cleanUserProfile} />;
}
