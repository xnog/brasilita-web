"use client";

import { useState } from "react";
import { Property } from "@/lib/db/schema";
import { PropertyDetailContent } from "@/components/properties/property-detail-content";

interface PropertyDetailClientProps {
    property: Property & {
        isInterested?: boolean;
        interestNotes?: string | null;
        region?: { id: string; name: string } | null;
    };
}

export function PropertyDetailClient({ property: initialProperty }: PropertyDetailClientProps) {
    const [property, setProperty] = useState(initialProperty);

    const handleToggleInterest = async (propertyId: string, isInterested: boolean) => {
        // Atualização otimista
        setProperty(prev => ({ ...prev, isInterested }));

        try {
            const response = await fetch("/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ propertyId, isInterested })
            });

            if (!response.ok) {
                // Reverter em caso de erro
                setProperty(prev => ({ ...prev, isInterested: !isInterested }));
                console.error("Erro ao atualizar interesse");
            }
        } catch (error) {
            // Reverter em caso de erro
            setProperty(prev => ({ ...prev, isInterested: !isInterested }));
            console.error("Erro ao atualizar interesse:", error);
        }
    };

    return (
        <div className="w-full">
            {/* Conteúdo da propriedade - mesmo estilo do modal */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <PropertyDetailContent
                    property={property}
                    onToggleInterest={handleToggleInterest}
                    showCloseButton={false}
                />
            </div>
        </div>
    );
}