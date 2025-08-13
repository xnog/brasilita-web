"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "./property-card";
import { Property } from "@/lib/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Heart } from "lucide-react";
import { PageLoading } from "@/components/ui/page-loading";

type PropertyWithInterest = Property & { isInterested?: boolean };

export function PropertyList() {
    const [properties, setProperties] = useState<PropertyWithInterest[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const fetchProperties = async () => {
        try {
            const response = await fetch("/api/properties");
            const data = await response.json();
            setProperties(data.properties || []);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleInterest = async (propertyId: string, isInterested: boolean) => {
        // Optimistic update
        setProperties(prev => prev.map(p =>
            p.id === propertyId ? { ...p, isInterested } : p
        ));

        try {
            await fetch("/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ propertyId, isInterested })
            });
        } catch {
            // Revert on error
            setProperties(prev => prev.map(p =>
                p.id === propertyId ? { ...p, isInterested: !isInterested } : p
            ));
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    if (loading) {
        return <PageLoading />;
    }

    const filteredProperties = showFavoritesOnly
        ? properties.filter(p => p.isInterested)
        : properties;

    const interestedCount = properties.filter(p => p.isInterested).length;

    if (filteredProperties.length === 0) {
        return (
            <Card className="p-12 text-center">
                <CardContent>
                    <Home className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                        {showFavoritesOnly ? "Nenhum favorito" : "Procurando imóveis para você"}
                    </h3>
                    <p className="text-slate-600 mb-6">
                        {showFavoritesOnly
                            ? "Marque imóveis como interessante para vê-los aqui"
                            : "Nossos especialistas procuram novos imóveis todos os dias que atendam ao seu perfil. Você será notificado por email assim que encontrarmos opções ideais para você."
                        }
                    </p>
                    {showFavoritesOnly && (
                        <Button onClick={() => setShowFavoritesOnly(false)}>
                            Ver todos os imóveis
                        </Button>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    {filteredProperties.length} imóveis
                </h2>
                <Button
                    variant={showFavoritesOnly ? "default" : "outline"}
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                >
                    <Heart className={showFavoritesOnly ? "h-4 w-4 mr-2 fill-current" : "h-4 w-4 mr-2"} />
                    {showFavoritesOnly ? "Todos" : "Favoritos"}
                    {interestedCount > 0 && !showFavoritesOnly && (
                        <Badge variant="secondary" className="ml-2">
                            {interestedCount}
                        </Badge>
                    )}
                </Button>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {filteredProperties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        onToggleInterest={handleToggleInterest}
                    />
                ))}
            </div>
        </div>
    );
}
