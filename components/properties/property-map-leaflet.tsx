"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
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

interface PropertyMapLeafletProps {
    latitude: number;
    longitude: number;
    propertyTitle: string;
}

function PropertyMapLeaflet({ latitude, longitude, propertyTitle }: PropertyMapLeafletProps) {
    // Garantir que os ícones sejam carregados
    useEffect(() => {
        // Criar ícone customizado usando os assets locais
        const icon = L.icon({
            iconUrl: '/leaflet/marker-icon.png',
            iconRetinaUrl: '/leaflet/marker-icon-2x.png',
            shadowUrl: '/leaflet/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Aplicar como padrão
        L.Marker.prototype.options.icon = icon;
    }, []);

    const position: [number, number] = [latitude, longitude];

    return (
        <div className="h-64 w-full">
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full rounded-lg"
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div className="text-center p-2">
                            <strong className="text-emerald-600">{propertyTitle}</strong>
                            <br />
                            <span className="text-sm text-slate-600">
                                {latitude.toFixed(6)}, {longitude.toFixed(6)}
                            </span>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default PropertyMapLeaflet;
