"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { PropertyCard } from "./property-card";
import { PropertyFilters, PropertyFilters as FiltersType } from "./property-filters";
import { Property } from "@/lib/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Search, SlidersHorizontal, Grid, List, Heart, Sparkles, Filter } from "lucide-react";
import { PageLoading } from "@/components/ui/page-loading";
import { cn } from "@/lib/utils";

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
    hasProfile: boolean;
    requiresProfile: boolean;
    message?: string;
    curationCriteria?: {
        location?: string;
        investmentBudget?: number;
        propertyType?: string;
    } | null;
}

export function PropertyList({
    userProfile,
    propertyInterests = {},
    onStatusChange,
    showOnlyInterested = false
}: PropertyListProps) {
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FiltersType>({});
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(showOnlyInterested);
    const [curationInfo, setCurationInfo] = useState<CurationInfo>({
        isCurated: false,
        isMatched: false,
        totalCurated: 0,
        totalMatched: 0,
        totalAvailable: 0,
        hasProfile: false,
        requiresProfile: false,
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
    }, [filters, sortBy, sortOrder]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const filteredProperties = useMemo(() => {
        let filtered = allProperties;

        if (showFavoritesOnly) {
            filtered = filtered.filter(property => 
                propertyInterests[property.id] === "interested"
            );
        } else {
            // Remove rejected properties from view
            filtered = filtered.filter(property => 
                propertyInterests[property.id] !== "rejected"
            );
        }

        return filtered;
    }, [allProperties, propertyInterests, showFavoritesOnly]);

    const interestedCount = useMemo(() => {
        return Object.values(propertyInterests).filter(status => status === "interested").length;
    }, [propertyInterests]);

    const handleToggleInterest = async (propertyId: string, isInterested: boolean) => {
        if (onStatusChange) {
            await onStatusChange(propertyId, isInterested ? "interested" : "rejected");
        }
    };

    const handleRemoveFromMatch = async (propertyId: string) => {
        if (onStatusChange) {
            await onStatusChange(propertyId, "rejected");
        }
    };

    if (loading) {
        return <PageLoading />;
    }

    if (error) {
        return (
            <Card className="p-8 text-center">
                <CardContent>
                    <div className="text-red-500 mb-4">⚠️ {error}</div>
                    <Button onClick={fetchProperties} variant="outline">
                        Tentar novamente
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const renderEmptyState = () => {
        if (showFavoritesOnly) {
            return (
                <Card className="p-12 text-center border-dashed">
                    <CardContent>
                        <Heart className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            Nenhum imóvel marcado como interessante
                        </h3>
                        <p className="text-slate-600 mb-6">
                            Explore os imóveis disponíveis e marque aqueles que despertam seu interesse
                        </p>
                        <Button onClick={() => setShowFavoritesOnly(false)} className="bg-emerald-500 hover:bg-emerald-600">
                            Ver todos os imóveis
                        </Button>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card className="p-12 text-center border-dashed">
                <CardContent>
                    <Home className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        Nenhum imóvel encontrado
                    </h3>
                    <p className="text-slate-600 mb-6">
                        {curationInfo.requiresProfile 
                            ? "Complete seu perfil para ver imóveis personalizados para você"
                            : "Não encontramos imóveis que atendam aos critérios de busca. Tente ajustar os filtros."}
                    </p>
                    {Object.keys(filters).length > 0 && (
                        <Button 
                            onClick={() => setFilters({})} 
                            variant="outline"
                            className="mr-2"
                        >
                            Limpar filtros
                        </Button>
                    )}
                    <Button onClick={fetchProperties} className="bg-emerald-500 hover:bg-emerald-600">
                        <Search className="h-4 w-4 mr-2" />
                        Buscar novamente
                    </Button>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header with stats */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Imóveis Selecionados para Você
                            </h2>
                            <p className="text-slate-600">
                                {curationInfo.isMatched 
                                    ? `${filteredProperties.length} imóveis correspondem ao seu perfil`
                                    : `${filteredProperties.length} imóveis disponíveis`}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {interestedCount > 0 && (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                <Heart className="h-3 w-3 mr-1 fill-current" />
                                {interestedCount} interessados
                            </Badge>
                        )}
                        {curationInfo.isMatched && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                                🤖 IA Personalizada
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={showFavoritesOnly ? "default" : "outline"}
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className="rounded-xl"
                    >
                        <Heart className={cn("h-4 w-4 mr-2", showFavoritesOnly && "fill-current")} />
                        {showFavoritesOnly ? "Todos os imóveis" : "Apenas favoritos"}
                        {interestedCount > 0 && !showFavoritesOnly && (
                            <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700">
                                {interestedCount}
                            </Badge>
                        )}
                    </Button>
                    
                    <Button
                        variant={showFilters ? "default" : "outline"}
                        onClick={() => setShowFilters(!showFilters)}
                        className="rounded-xl"
                    >
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filtros
                    </Button>
                    
                    {Object.keys(filters).length > 0 && (
                        <Button
                            variant="ghost"
                            onClick={() => setFilters({})}
                            className="text-slate-600 hover:text-slate-900"
                            size="sm"
                        >
                            Limpar filtros
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <Button
                            variant={viewMode === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className="rounded-md"
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("list")}
                            className="rounded-md"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            {showFilters && (
                <Card className="p-6 border-slate-200">
                    <PropertyFilters
                        onFiltersChange={setFilters}
                        onSortChange={(sortBy, sortOrder) => {
                            setSortBy(sortBy);
                            setSortOrder(sortOrder);
                        }}
                        totalProperties={filteredProperties.length}
                    />
                </Card>
            )}

            {/* Properties grid/list */}
            {filteredProperties.length === 0 ? (
                renderEmptyState()
            ) : (
                <div className={cn(
                    "grid gap-6",
                    viewMode === "grid" 
                        ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" 
                        : "grid-cols-1 max-w-4xl mx-auto"
                )}>
                    {filteredProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            isInterested={propertyInterests[property.id] === "interested"}
                            currentStatus={propertyInterests[property.id]}
                            onToggleInterest={handleToggleInterest}
                            onStatusChange={onStatusChange}
                            onRemoveFromMatch={handleRemoveFromMatch}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
