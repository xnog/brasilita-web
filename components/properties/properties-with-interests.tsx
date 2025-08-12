"use client";

import { useState, useEffect, useCallback } from "react";
import { PropertyList } from "./property-list";
import { toast } from "sonner";

interface PropertiesWithInterestsProps {
    userProfile?: {
        location?: string;
        investmentBudget?: number;
        propertyType?: string;
    };
    showOnlyInterested?: boolean;
}

export function PropertiesWithInterests({ 
    userProfile, 
    showOnlyInterested = false 
}: PropertiesWithInterestsProps) {
    const [propertyInterests, setPropertyInterests] = useState<Record<string, "interested" | "rejected">>({});
    const [loading, setLoading] = useState(true);

    // Fetch user interests on component mount
    const fetchUserInterests = useCallback(async () => {
        try {
            const response = await fetch('/api/properties/interests');
            if (response.ok) {
                const data = await response.json();
                const interests: Record<string, "interested" | "rejected"> = {};
                
                // Convert array of interested property IDs to our format
                data.interests?.forEach((propertyId: string) => {
                    interests[propertyId] = "interested";
                });
                
                setPropertyInterests(interests);
            }
        } catch (error) {
            console.error('Error fetching user interests:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserInterests();
    }, [fetchUserInterests]);

    const handleStatusChange = async (propertyId: string, status: "interested" | "rejected") => {
        try {
            // Optimistic update
            setPropertyInterests(prev => ({
                ...prev,
                [propertyId]: status
            }));

            const response = await fetch('/api/properties/interests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    propertyId,
                    isInterested: status === "interested",
                    status
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update interest');
            }

            const data = await response.json();
            
            // Show success message
            if (status === "interested") {
                toast.success("Imóvel marcado como interessante!");
            } else if (status === "rejected") {
                toast.success("Imóvel removido da sua lista");
                // Remove from interests when rejected
                setPropertyInterests(prev => {
                    const newInterests = { ...prev };
                    delete newInterests[propertyId];
                    return newInterests;
                });
            }

        } catch (error) {
            console.error('Error updating property interest:', error);
            
            // Revert optimistic update on error
            setPropertyInterests(prev => {
                const newInterests = { ...prev };
                if (status === "rejected") {
                    delete newInterests[propertyId];
                } else {
                    newInterests[propertyId] = prev[propertyId] || "rejected";
                }
                return newInterests;
            });
            
            toast.error("Erro ao atualizar interesse. Tente novamente.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <PropertyList
            userProfile={userProfile}
            propertyInterests={propertyInterests}
            onStatusChange={handleStatusChange}
            showOnlyInterested={showOnlyInterested}
        />
    );
}
