"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { PropertyDetailModal } from "./property-detail-modal";
import { PropertyFilters } from "@/lib/hooks/use-property-filters";
import { usePropertyMap, PropertyMapMarker } from "@/lib/hooks/use-property-map";

import { useEffect } from "react";

interface PropertiesOverviewMapProps {
    filters: PropertyFilters;
    className?: string;
    onTotalPropertiesChange?: (total: number | null) => void;
    onLoadingChange?: (loading: boolean) => void;
}

interface PropertiesOverviewMapLeafletProps {
    markers: PropertyMapMarker[];
    onPropertyClick?: (propertyId: string) => void;
    loadingPropertyId?: string | null;
}

// Componente do mapa dinâmico (só carrega no cliente)
const DynamicOverviewMap = dynamic(
    () => import('./properties-overview-map-leaflet'),
    {
        ssr: false,
        loading: () => (
            <div className="h-[500px] md:h-[600px] bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-slate-600">
                    <p className="font-medium">Carregando mapa...</p>
                </div>
            </div>
        )
    }
) as React.ComponentType<PropertiesOverviewMapLeafletProps>;

export function PropertiesOverviewMap({ 
    filters,
    className = "",
    onTotalPropertiesChange,
    onLoadingChange
}: PropertiesOverviewMapProps) {
    const {
        validMarkers,
        totalProperties,
        propertiesWithoutLocation,
        loading,
        loadingPropertyId,
        selectedProperty,
        showDetails,
        handlePropertyClick,
        handleToggleInterest,
        handleCloseDetails
    } = usePropertyMap(filters);

    // Update total properties when data changes
    useEffect(() => {
        if (onTotalPropertiesChange) {
            if (totalProperties > 0 || !loading) {
                onTotalPropertiesChange(totalProperties);
            }
        }
    }, [totalProperties, loading, onTotalPropertiesChange]);

    // Update loading state when loading changes
    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(loading);
        }
    }, [loading, onLoadingChange]);

    // Don't show internal loading - parent component handles it

    // Se não há imóveis e não está carregando, não exibir o componente
    if (totalProperties === 0 && !loading) {
        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-emerald-500" />
                        Mapa Geral
                    </h3>
                </div>
                
                <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-slate-600">
                        <p className="font-medium">Nenhum imóvel encontrado</p>
                        <p className="text-sm">Tente ajustar os filtros para ver imóveis no mapa</p>
                    </div>
                </div>
            </div>
        );
    }





    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                    Mapa Geral
                </h3>
                
                <div className="text-sm text-slate-600">
                    Mostrando {validMarkers.length} imóveis no mapa
                    {propertiesWithoutLocation > 0 && (
                        <span className="text-amber-600">
                            {' '}({propertiesWithoutLocation} sem localização)
                        </span>
                    )}
                </div>
            </div>
            
                            <div className="relative rounded-lg overflow-hidden border shadow-sm">
                <DynamicOverviewMap 
                    markers={validMarkers}
                    onPropertyClick={handlePropertyClick}
                    loadingPropertyId={loadingPropertyId}
                />
            </div>
            


            {/* Property Detail Modal */}
            {selectedProperty && (
                <PropertyDetailModal
                    property={selectedProperty}
                    isOpen={showDetails}
                    onClose={handleCloseDetails}
                    onToggleInterest={handleToggleInterest}
                />
            )}
        </div>
    );
}
