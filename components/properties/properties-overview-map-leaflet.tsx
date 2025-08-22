"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Property } from "@/lib/db/schema";

// Fix para os ícones do Leaflet no Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});

type PropertyWithInterest = Property & {
    isInterested?: boolean;
    interestNotes?: string | null;
};

interface PropertiesOverviewMapLeafletProps {
    properties: PropertyWithInterest[];
    onPropertyClick?: (property: PropertyWithInterest) => void;
}

function PropertiesOverviewMapLeaflet({ properties, onPropertyClick }: PropertiesOverviewMapLeafletProps) {
    useEffect(() => {
        // Criar ícone customizado usando os assets locais
        const defaultIcon = L.icon({
            iconUrl: '/leaflet/marker-icon.png',
            iconRetinaUrl: '/leaflet/marker-icon-2x.png',
            shadowUrl: '/leaflet/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Aplicar como padrão
        L.Marker.prototype.options.icon = defaultIcon;
    }, []);

    // Filtrar propriedades que têm coordenadas válidas
    const propertiesWithCoordinates = properties.filter(property => {
        const lat = property.latitude ? parseFloat(property.latitude) : null;
        const lng = property.longitude ? parseFloat(property.longitude) : null;
        return lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng);
    });

    // Se não há propriedades com coordenadas, exibir mensagem
    if (propertiesWithCoordinates.length === 0) {
        return (
            <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-slate-600">
                    <p className="font-medium">Nenhuma propriedade com localização encontrada</p>
                    <p className="text-sm">As propriedades desta listagem não possuem coordenadas de localização</p>
                </div>
            </div>
        );
    }

    // Calcular centro do mapa baseado nas propriedades
    const centerLat = propertiesWithCoordinates.reduce((sum, prop) => 
        sum + parseFloat(prop.latitude!), 0) / propertiesWithCoordinates.length;
    const centerLng = propertiesWithCoordinates.reduce((sum, prop) => 
        sum + parseFloat(prop.longitude!), 0) / propertiesWithCoordinates.length;

    // Calcular zoom baseado na dispersão das propriedades
    const latitudes = propertiesWithCoordinates.map(p => parseFloat(p.latitude!));
    const longitudes = propertiesWithCoordinates.map(p => parseFloat(p.longitude!));
    const latRange = Math.max(...latitudes) - Math.min(...latitudes);
    const lngRange = Math.max(...longitudes) - Math.min(...longitudes);
    const maxRange = Math.max(latRange, lngRange);
    
    // Determinar zoom baseado na dispersão (começando com menos zoom para visão mais ampla)
    let zoom = 9;
    if (maxRange > 5) zoom = 6;
    else if (maxRange > 2) zoom = 8;
    else if (maxRange > 1) zoom = 9;
    else if (maxRange > 0.5) zoom = 10;
    else if (maxRange > 0.2) zoom = 11;
    else zoom = 12;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="h-96 w-full relative z-0">
            <MapContainer
                center={[centerLat, centerLng]}
                zoom={zoom}
                scrollWheelZoom={true}
                className="h-full w-full rounded-lg"
                style={{ height: '100%', width: '100%', zIndex: 1 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {propertiesWithCoordinates.map((property) => {
                    const lat = parseFloat(property.latitude!);
                    const lng = parseFloat(property.longitude!);
                    const position: [number, number] = [lat, lng];
                    
                    return (
                        <Marker 
                            key={property.id} 
                            position={position}
                        >
                            <Popup>
                                <div className="text-center p-2 min-w-48">
                                    <div className="mb-2">
                                        <strong className="text-emerald-600 text-sm font-semibold">
                                            {property.title}
                                        </strong>
                                        {property.isInterested && (
                                            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                                                ❤️ Favorito
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="text-sm space-y-1 text-left">
                                        <div className="font-semibold text-emerald-600">
                                            {formatPrice(property.price)}
                                        </div>
                                        
                                        <div className="text-slate-600">
                                            📍 {property.location}
                                        </div>
                                        
                                        {(property.bedrooms || property.bathrooms || property.area) && (
                                            <div className="text-slate-600 flex gap-2 text-xs">
                                                {property.bedrooms && (
                                                    <span>🛏️ {property.bedrooms}</span>
                                                )}
                                                {property.bathrooms && (
                                                    <span>🚿 {property.bathrooms}</span>
                                                )}
                                                {property.area && (
                                                    <span>📐 {property.area}m²</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {onPropertyClick && (
                                        <button 
                                            onClick={() => onPropertyClick(property)}
                                            className="mt-2 text-xs bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600 transition-colors"
                                        >
                                            Ver detalhes
                                        </button>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default PropertiesOverviewMapLeaflet;
