"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { Property } from "@/lib/db/schema";
import { PropertyDetailModal } from "./property-detail-modal";

type PropertyWithInterest = Property & {
    isInterested?: boolean;
    interestNotes?: string | null;
};

interface PropertiesOverviewMapProps {
    properties: PropertyWithInterest[];
    onToggleInterest: (propertyId: string, isInterested: boolean, notes?: string) => void;
    className?: string;
}

interface PropertiesOverviewMapLeafletProps {
    properties: PropertyWithInterest[];
    onPropertyClick?: (property: PropertyWithInterest) => void;
}

// Componente do mapa dinâmico (só carrega no cliente)
const DynamicOverviewMap = dynamic(
    () => import('./properties-overview-map-leaflet'),
    {
        ssr: false,
        loading: () => (
            <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Carregando mapa...</span>
                </div>
            </div>
        )
    }
) as React.ComponentType<PropertiesOverviewMapLeafletProps>;

export function PropertiesOverviewMap({ 
    properties, 
    onToggleInterest,
    className = "" 
}: PropertiesOverviewMapProps) {
    const [selectedProperty, setSelectedProperty] = useState<PropertyWithInterest | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const handlePropertyClick = (property: PropertyWithInterest) => {
        setSelectedProperty(property);
        setShowDetails(true);
    };

    // Update selected property when properties change (sync with list updates)
    useEffect(() => {
        if (selectedProperty) {
            const updatedProperty = properties.find(p => p.id === selectedProperty.id);
            if (updatedProperty) {
                setSelectedProperty(updatedProperty);
            }
        }
    }, [properties, selectedProperty]);
    // Filtrar propriedades que têm coordenadas válidas
    const propertiesWithCoordinates = properties.filter(property => {
        const lat = property.latitude ? parseFloat(property.latitude) : null;
        const lng = property.longitude ? parseFloat(property.longitude) : null;
        return lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng);
    });

    // Se não há propriedades, não exibir o componente
    if (properties.length === 0) {
        return null;
    }



    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                    Mapa Geral
                </h3>
                
                <div className="text-sm text-slate-600">
                    {propertiesWithCoordinates.length} de {properties.length} propriedades com localização
                </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden border shadow-sm">
                <DynamicOverviewMap 
                    properties={properties}
                    onPropertyClick={handlePropertyClick}
                />
            </div>
            
            <div className="text-sm text-slate-600">
                <span className="font-medium">Total de propriedades:</span> {properties.length}
                {propertiesWithCoordinates.length < properties.length && (
                    <span className="ml-2 text-amber-600">
                        ({properties.length - propertiesWithCoordinates.length} sem localização)
                    </span>
                )}
            </div>

            {/* Property Detail Modal */}
            {selectedProperty && (
                <PropertyDetailModal
                    property={selectedProperty}
                    isOpen={showDetails}
                    onClose={() => setShowDetails(false)}
                    onToggleInterest={onToggleInterest}
                />
            )}
        </div>
    );
}
