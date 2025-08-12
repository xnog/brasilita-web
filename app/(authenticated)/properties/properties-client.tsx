"use client";

import { PropertiesWithInterests } from "@/components/properties/properties-with-interests";

interface PropertiesClientProps {
    userProfile?: {
        location?: string | null;
        investmentBudget?: number | null;
        propertyType?: string | null;
    } | null;
}

export function PropertiesClient({ userProfile }: PropertiesClientProps) {
    // Convert null values to undefined for compatibility
    const cleanUserProfile = userProfile ? {
        location: userProfile.location || undefined,
        investmentBudget: userProfile.investmentBudget || undefined,
        propertyType: userProfile.propertyType || undefined,
    } : undefined;

    return <PropertiesWithInterests userProfile={cleanUserProfile} />;
}
