import { useCallback } from 'react';

export function usePropertyInterest() {
    const toggleInterest = useCallback(async (
        propertyId: string, 
        isInterested: boolean, 
        notes?: string
    ) => {
        try {
            const response = await fetch("/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ propertyId, isInterested, notes })
            });

            if (!response.ok) {
                throw new Error('Failed to update interest');
            }

            return { success: true };
        } catch (error) {
            console.error("Error updating property interest:", error);
            return { success: false, error };
        }
    }, []);

    return {
        toggleInterest
    };
}
