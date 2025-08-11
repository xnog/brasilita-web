"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { PropertyCard } from "./property-card";
import { PropertyFilters, PropertyFilters as FiltersType } from "./property-filters";
import { Property } from "@/lib/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search } from "lucide-react";
import { Loading } from "@/components/ui/loading";

interface PropertyListProps {
    userProfile?: {
        location?: string;
        investmentBudget?: number;
        propertyType?: string;
    };
    propertyInterests?: Record<string, "interested" | "rejected">;
    onStatusChange?: (propertyId: string, status: "interested" | "rejected") => Promise<void>;
    showOnlyInterested?: boolean;
}

interface CurationInfo {
    isCurated: boolean;
    isMatched: boolean;
    totalCurated: number;
    totalMatched: number;
    totalAvailable: number;
    hasProfile?: boolean;
    requiresProfile?: boolean;
    message?: string;
    curationCriteria: {
        location?: string;
        maxBudget?: number;
        propertyType?: string;
    } | null;
}

export function PropertyList({
    userProfile,
    propertyInterests = {},
    onStatusChange,
    showOnlyInterested = false
}: PropertyListProps) {
    const [allProperties, setAllProperties] = useState<Property[]>([]); // All properties from API
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FiltersType>({});
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [curationInfo, setCurationInfo] = useState<CurationInfo>({
        isCurated: false,
        isMatched: false,
        totalCurated: 0,
        totalMatched: 0,
        totalAvailable: 0,
        curationCriteria: null
    });

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();

            if (filters.location) params.append("location", filters.location);
            if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
            if (filters.propertyType) params.append("propertyType", filters.propertyType);
            if (filters.minBedrooms) params.append("minBedrooms", filters.minBedrooms.toString());
            params.append("sortBy", sortBy);
            params.append("sortOrder", sortOrder);

            const response = await fetch(`/api/properties?${params.toString()}`);

            if (!response.ok) {
                throw new Error("Erro ao carregar imóveis");
            }

            const data = await response.json();
            const allProps = data.properties || [];

            // Store all properties without filtering
            setAllProperties(allProps);
            setCurationInfo({
                isCurated: data.isMatched || false,
                isMatched: data.isMatched || false,
                totalCurated: data.totalMatched || 0,
                totalMatched: data.totalMatched || 0,
                totalAvailable: data.total || 0,
                hasProfile: data.hasProfile,
                requiresProfile: data.requiresProfile || false,
                message: data.message,
                curationCriteria: null
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setAllProperties([]);
        } finally {
            setLoading(false);
        }
    }, [filters, sortBy, sortOrder, showOnlyInterested]);

    // Removed fetchUserInterests - now handled by parent component

    // Removed old handlers - now using parent component handlers

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    // Removed useEffect for fetchUserInterests - now handled by parent

    // Create a stable reference for propertyInterests to avoid unnecessary re-renders
    const propertyInterestsKey = useMemo(() =>
        JSON.stringify(propertyInterests), [propertyInterests]
    );

    // Memoize filtered properties to avoid re-renders
    const properties = useMemo(() => {
        if (showOnlyInterested) {
            // Show only properties marked as interested
            return allProperties.filter((property: Property) =>
                propertyInterests[property.id] === "interested"
            );
        } else {
            // Show all properties except rejected ones
            return allProperties.filter((property: Property) =>
                propertyInterests[property.id] !== "rejected"
            );
        }
    }, [allProperties, propertyInterestsKey, showOnlyInterested]);

    // Removed automatic filter setting - now using curated results from backend

    const handleFiltersChange = useCallback((newFilters: FiltersType) => {
        setFilters(newFilters);
    }, []);

    const handleSortChange = useCallback((newSortBy: string, newSortOrder: "asc" | "desc") => {
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
    }, []);

    if (error) {
        return (
            <Card className="p-8 text-center">
                <CardContent>
                    <div className="text-red-500 mb-2">
                        <Search className="h-12 w-12 mx-auto mb-4" />
                        <p className="text-lg font-semibold">Erro ao carregar imóveis</p>
                        <p className="text-sm text-gray-600 mt-2">{error}</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Profile Incomplete Warning */}
            {!loading && curationInfo.requiresProfile && (
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <Home className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                    Complete seu perfil para ver imóveis
                                </h3>
                                <p className="text-blue-700 mb-4">
                                    {curationInfo.message || "Complete seu perfil no checklist para que nossa IA possa selecionar imóveis ideais para você."}
                                </p>
                                <a
                                    href="/checklist"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Completar Perfil
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* AI/Specialist Matching Info Banner */}
            {!loading && curationInfo.isMatched && curationInfo.totalMatched > 0 && (
                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-green-900">
                                    🤖👨‍💼 Seleção Curada
                                </h3>
                                <p className="text-xs text-green-700 mt-1">
                                    Nossa IA e especialistas selecionaram {curationInfo.totalMatched} imóveis especialmente para você
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Status Banner - No Results */}
            {!loading && properties.length === 0 && !curationInfo.requiresProfile && (
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                        <Search className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                            🤖👨‍💼 Nossa equipe está trabalhando para você
                        </h3>
                        <p className="text-blue-700">
                            {curationInfo.message || (curationInfo.hasProfile
                                ? "Nossa IA e especialistas estão analisando novos imóveis para seu perfil. Volte em breve para ver as recomendações!"
                                : "Complete seu perfil no checklist para que nossa IA e especialistas possam analisar suas preferências e selecionar os imóveis ideais para você."
                            )}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Filters - Only show if user has profile and can see properties */}
            {!curationInfo.requiresProfile && (
                <PropertyFilters
                    onFiltersChange={handleFiltersChange}
                    onSortChange={handleSortChange}
                    totalProperties={properties.length}
                />
            )}

            {/* Loading State */}
            {loading && (
                <Loading message="Carregando imóveis..." />
            )}

            {/* Properties Grid */}
            {!loading && properties.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            isInterested={propertyInterests[property.id] === "interested"}
                            currentStatus={propertyInterests[property.id]}
                            onToggleInterest={() => { }} // Legacy support - not used
                            onStatusChange={onStatusChange}
                            onRemoveFromMatch={() => { }} // Legacy support - not used
                        />
                    ))}
                </div>
            )}

            {/* Results Summary */}
            {!loading && properties.length > 0 && (
                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                        <Home className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-green-800">
                            Encontramos <strong>{properties.length}</strong> imóve{properties.length !== 1 ? 'is' : 'l'}
                            {Object.values(propertyInterests).filter(status => status === "interested").length > 0 && (
                                <span> • <strong>{Object.values(propertyInterests).filter(status => status === "interested").length}</strong> marcado{Object.values(propertyInterests).filter(status => status === "interested").length !== 1 ? 's' : ''} como interesse</span>
                            )}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
