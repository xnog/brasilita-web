"use client";

import { MapPin, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

interface PropertyMapProps {
    latitude?: string | null;
    longitude?: string | null;
    propertyTitle: string;
    className?: string;
}

interface PropertyMapLeafletProps {
    latitude: number;
    longitude: number;
    propertyTitle: string;
}

// Componente do mapa dinâmico (só carrega no cliente)
const DynamicMap = dynamic(
    () => import('./property-map-leaflet'),
    {
        ssr: false,
        loading: () => (
            <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Carregando mapa...</span>
                </div>
            </div>
        )
    }
) as React.ComponentType<PropertyMapLeafletProps>;

export function PropertyMap({ latitude, longitude, propertyTitle, className = "" }: PropertyMapProps) {
    // Se não tiver coordenadas, não exibir o mapa
    if (!latitude || !longitude) {
        return null;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Validar se as coordenadas são válidas
    if (isNaN(lat) || isNaN(lng)) {
        return null;
    }

    // Link para abrir no Google Maps
    const openInGoogleMaps = () => {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&ll=${lat},${lng}&z=15`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-500" />
                Localização
            </h3>
            
            <div className="relative rounded-lg overflow-hidden border shadow-sm">
                <DynamicMap 
                    latitude={lat} 
                    longitude={lng} 
                    propertyTitle={propertyTitle}
                />
            </div>
            
            <div className="flex items-center justify-between text-sm">
                <div className="text-slate-600">
                    <span className="font-medium">Coordenadas:</span> {lat.toFixed(6)}, {lng.toFixed(6)}
                </div>
                <button
                    onClick={openInGoogleMaps}
                    className="text-emerald-600 hover:text-emerald-700 underline font-medium flex items-center gap-1 transition-colors"
                >
                    <ExternalLink className="h-3 w-3" />
                    Google Maps
                </button>
            </div>
        </div>
    );
}