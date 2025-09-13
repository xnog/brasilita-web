"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para os ícones do Leaflet no Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});

type PropertyMapMarker = {
    id: string;
    title: string;
    price: number;
    latitude: string;
    longitude: string;
    location: string | null;
    rooms: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    area: number | null;
    isInterested?: boolean;
};

interface PropertiesOverviewMapLeafletProps {
    markers: PropertyMapMarker[];
    onPropertyClick?: (propertyId: string) => void;
    loadingPropertyId?: string | null;
}

// Componente para controlar o zoom e posicionamento do mapa
function MapController({ markers }: { markers: PropertyMapMarker[] }) {
    const map = useMap();
    const [initializedMarkers, setInitializedMarkers] = useState<string>('');

    useEffect(() => {
        if (markers.length === 0) return;

        // Criar uma string única dos marcadores para detectar mudanças reais
        const markersSignature = markers.map(m => `${m.id}-${m.latitude}-${m.longitude}`).sort().join('|');
        
        // Só atualizar o mapa se os marcadores realmente mudaram
        if (markersSignature === initializedMarkers) {
            return;
        }

        // Calcular bounds dos marcadores
        const latitudes = markers.map(m => parseFloat(m.latitude));
        const longitudes = markers.map(m => parseFloat(m.longitude));
        
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);

        // Se há apenas um marcador, centrar com zoom fixo
        if (markers.length === 1) {
            map.setView([latitudes[0], longitudes[0]], 12);
            setInitializedMarkers(markersSignature);
            return;
        }

        // Para múltiplos marcadores, usar fitBounds
        const bounds = L.latLngBounds([
            [minLat, minLng],
            [maxLat, maxLng]
        ]);

        // Aplicar bounds com padding
        map.fitBounds(bounds, {
            padding: [20, 20], // padding em pixels
            maxZoom: 12 // zoom máximo para evitar muito zoom
        });

        // Marcar os marcadores como inicializados
        setInitializedMarkers(markersSignature);
    }, [map, markers, initializedMarkers]);

    return null;
}

function PropertiesOverviewMapLeaflet({ markers, onPropertyClick, loadingPropertyId }: PropertiesOverviewMapLeafletProps) {
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

    // Se não há marcadores, exibir mensagem
    if (markers.length === 0) {
        return (
            <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-slate-600">
                    <p className="font-medium">Nenhum imóvel com localização encontrado</p>
                    <p className="text-sm">Os imóveis desta listagem não possuem coordenadas de localização</p>
                </div>
            </div>
        );
    }

    // Calcular bounds dos marcadores para melhor centralização
    const latitudes = markers.map(m => parseFloat(m.latitude));
    const longitudes = markers.map(m => parseFloat(m.longitude));
    
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);
    
    // Centro baseado nos bounds (não na média simples)
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    
    // Calcular ranges com padding para evitar cortes
    const latRange = maxLat - minLat;
    const lngRange = maxLng - minLng;
    const maxRange = Math.max(latRange, lngRange);
    
    // Determinar zoom com mais conservadorismo para evitar cortes
    let zoom = 7; // Começar mais conservador
    if (maxRange > 8) zoom = 5;       // Muito disperso (toda Itália)
    else if (maxRange > 4) zoom = 6;  // Várias regiões
    else if (maxRange > 2) zoom = 7;  // Algumas regiões
    else if (maxRange > 1) zoom = 8;  // Uma região grande
    else if (maxRange > 0.5) zoom = 9;  // Área regional
    else if (maxRange > 0.2) zoom = 10; // Área local
    else zoom = 11; // Área muito local

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="h-[500px] md:h-[600px] w-full relative z-0">
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
                
                {/* Componente para controlar zoom/posicionamento quando markers mudarem */}
                <MapController markers={markers} />
                
                {markers.map((marker) => {
                    const lat = parseFloat(marker.latitude);
                    const lng = parseFloat(marker.longitude);
                    const position: [number, number] = [lat, lng];
                    
                    return (
                        <Marker 
                            key={marker.id} 
                            position={position}
                        >
                            <Popup>
                                <div className="text-center p-2 min-w-48">
                                    <div className="mb-2">
                                        <strong className="text-emerald-600 text-sm font-semibold">
                                            {marker.title}
                                        </strong>
                                        {marker.isInterested && (
                                            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                                                ❤️ Favorito
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="text-sm space-y-1 text-left">
                                        <div className="font-semibold text-emerald-600">
                                            {formatPrice(marker.price)}
                                        </div>
                                        
                                        {marker.location && (
                                            <div className="text-slate-600">
                                                📍 {marker.location}
                                            </div>
                                        )}
                                        
                                        {(marker.rooms || marker.bedrooms || marker.bathrooms || marker.area) && (
                                            <div className="text-slate-600 flex flex-wrap gap-2 text-xs">
                                                {marker.rooms && (
                                                    <span>🏠 {marker.rooms}</span>
                                                )}
                                                {marker.bedrooms && (
                                                    <span>🛏️ {marker.bedrooms}</span>
                                                )}
                                                {marker.bathrooms && (
                                                    <span>🛁 {marker.bathrooms}</span>
                                                )}
                                                {marker.area && (
                                                    <span>⏹️ {marker.area}m²</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {onPropertyClick && (
                                        <button 
                                            onClick={() => onPropertyClick(marker.id)}
                                            disabled={loadingPropertyId === marker.id}
                                            className="mt-2 text-xs bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 mx-auto"
                                        >
                                            {loadingPropertyId === marker.id && (
                                                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                            )}
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
