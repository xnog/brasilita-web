"use client";

import { useState, useEffect, useCallback } from "react";
import { PropertyCard } from "./property-card";
import { PropertyFilters } from "./property-filters";
import { Property, Region } from "@/lib/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { PageLoading } from "@/components/ui/page-loading";

type PropertyWithInterest = Property & {
    isInterested?: boolean;
    interestNotes?: string | null;
};

interface PropertyListResponse {
    properties: PropertyWithInterest[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        limit: number;
    };
    appliedFilters: PropertyFilters;
}

interface PropertyListProps {
    userPreferences?: PropertyFilters | null;
    regions: Region[];
}

const defaultFilters: PropertyFilters = {
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc'
};

export function PropertyList({ userPreferences: initialUserPreferences, regions }: PropertyListProps) {
    const [data, setData] = useState<PropertyListResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [userPreferences] = useState<PropertyFilters | null>(initialUserPreferences || null);

    const [filters, setFilters] = useState<PropertyFilters>(
        initialUserPreferences || defaultFilters
    );

    const buildQueryString = useCallback((filterParams: PropertyFilters) => {
        const params = new URLSearchParams();

        Object.entries(filterParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                if (key === 'regions' && Array.isArray(value)) {
                    if (value.length > 0) {
                        params.set(key, value.join(','));
                    }
                } else {
                    params.set(key, value.toString());
                }
            }
        });

        return params.toString();
    }, []);

    const fetchProperties = useCallback(async (newFilters: PropertyFilters) => {
        try {
            setLoading(true);
            const queryString = buildQueryString(newFilters);
            const response = await fetch(`/api/properties?${queryString}`);
            const responseData = await response.json();

            if (response.ok) {
                setData(responseData);
            } else {
                console.error("API Error:", responseData.error);
                setData(null);
            }
        } catch (error) {
            console.error("Error:", error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [buildQueryString]);

    const handleFiltersChange = useCallback((newFilters: PropertyFilters) => {
        // Reset to page 1 when filters change and show loading immediately
        const filtersWithPage = { ...newFilters, page: 1 };
        setLoading(true);
        setFilters(filtersWithPage);
        fetchProperties(filtersWithPage);
    }, [fetchProperties]);

    const handlePageChange = useCallback((page: number) => {
        const newFilters = { ...filters, page };
        setLoading(true);
        setFilters(newFilters);
        fetchProperties(newFilters);
    }, [filters, fetchProperties]);

    const handleClearFilters = useCallback(() => {
        setLoading(true);
        setFilters(defaultFilters);
        fetchProperties(defaultFilters);
    }, [fetchProperties, defaultFilters]);

    const handleApplyPreferences = useCallback(() => {
        if (userPreferences) {
            const preferencesWithPage = { ...userPreferences, page: 1 };
            setLoading(true);
            setFilters(preferencesWithPage);
            fetchProperties(preferencesWithPage);
        } else {
            // If no preferences saved, just clear filters
            handleClearFilters();
        }
    }, [userPreferences, fetchProperties, handleClearFilters]);

    const handleToggleInterest = async (propertyId: string, isInterested: boolean) => {
        if (!data) return;

        // Optimistic update
        const updatedProperties = data.properties.map(p =>
            p.id === propertyId ? { ...p, isInterested } : p
        );
        setData({ ...data, properties: updatedProperties });

        try {
            await fetch("/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ propertyId, isInterested })
            });
        } catch {
            // Revert on error
            const revertedProperties = data.properties.map(p =>
                p.id === propertyId ? { ...p, isInterested: !isInterested } : p
            );
            setData({ ...data, properties: revertedProperties });
        }
    };

    // Initial load
    useEffect(() => {
        fetchProperties(filters);
    }, []); // Only run once on mount

    if (loading && !data) {
        return <PageLoading />;
    }

    if (!data) {
        return (
            <Card className="p-12 text-center">
                <CardContent>
                    <Home className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Erro ao carregar propriedades</h3>
                    <p className="text-slate-600 mb-6">
                        Ocorreu um erro ao buscar as propriedades. Tente novamente.
                    </p>
                    <Button onClick={() => fetchProperties(filters)}>
                        Tentar novamente
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const filteredProperties = data.properties;

    if (filteredProperties.length === 0) {
        return (
            <div className="space-y-6">
                <PropertyFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                    onApplyPreferences={handleApplyPreferences}
                    isLoading={loading}
                    regions={regions}
                />

                <Card className="p-12 text-center">
                    <CardContent>
                        <Home className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Nenhuma propriedade encontrada
                        </h3>
                        <p className="text-slate-600 mb-6">
                            Tente ajustar os filtros para encontrar propriedades que atendam aos seus critérios.
                        </p>
                        <Button onClick={handleClearFilters}>
                            Visualizar todos os imóveis
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PropertyFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                onApplyPreferences={handleApplyPreferences}
                isLoading={loading}
                regions={regions}
            />

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">
                        {data.pagination.totalCount.toLocaleString()} propriedades
                    </h2>
                    {data.pagination.totalCount > 0 && (
                        <span className="text-sm text-slate-600">
                            Página {data.pagination.currentPage} de {data.pagination.totalPages}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProperties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        onToggleInterest={handleToggleInterest}
                    />
                ))}
            </div>

            {/* Pagination */}
            {data.pagination.totalPages > 1 && (
                <div className="w-full">
                    {/* Mobile pagination */}
                    <div className="flex md:hidden items-center justify-between">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(data.pagination.currentPage - 1)}
                            disabled={!data.pagination.hasPrevPage || loading}
                            className={`flex-1 max-w-[100px] ${!data.pagination.hasPrevPage || loading ? '' : 'cursor-pointer'}`}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="hidden xs:inline ml-1">Anterior</span>
                        </Button>

                        <div className="flex items-center gap-2 px-4">
                            <span className="text-sm text-slate-600">
                                {data.pagination.currentPage} de {data.pagination.totalPages}
                            </span>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(data.pagination.currentPage + 1)}
                            disabled={!data.pagination.hasNextPage || loading}
                            className={`flex-1 max-w-[100px] ${!data.pagination.hasNextPage || loading ? '' : 'cursor-pointer'}`}
                        >
                            <span className="hidden xs:inline mr-1">Próxima</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Desktop pagination */}
                    <div className="hidden md:flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(data.pagination.currentPage - 1)}
                            disabled={!data.pagination.hasPrevPage || loading}
                            className={!data.pagination.hasPrevPage || loading ? '' : 'cursor-pointer'}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Anterior
                        </Button>

                        <div className="flex items-center gap-1">
                            {/* Show first page */}
                            {data.pagination.currentPage > 3 && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(1)}
                                        disabled={loading}
                                        className={loading ? '' : 'cursor-pointer'}
                                    >
                                        1
                                    </Button>
                                    {data.pagination.currentPage > 4 && (
                                        <span className="px-2">...</span>
                                    )}
                                </>
                            )}

                            {/* Show current page and neighbors */}
                            {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                                const startPage = Math.max(1, Math.min(
                                    data.pagination.currentPage - 2,
                                    data.pagination.totalPages - 4
                                ));
                                const page = startPage + i;

                                if (page > data.pagination.totalPages) return null;

                                return (
                                    <Button
                                        key={page}
                                        variant={page === data.pagination.currentPage ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        disabled={loading}
                                        className={loading ? '' : 'cursor-pointer'}
                                    >
                                        {page}
                                    </Button>
                                );
                            })}

                            {/* Show last page */}
                            {data.pagination.currentPage < data.pagination.totalPages - 2 && (
                                <>
                                    {data.pagination.currentPage < data.pagination.totalPages - 3 && (
                                        <span className="px-2">...</span>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(data.pagination.totalPages)}
                                        disabled={loading}
                                        className={loading ? '' : 'cursor-pointer'}
                                    >
                                        {data.pagination.totalPages}
                                    </Button>
                                </>
                            )}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(data.pagination.currentPage + 1)}
                            disabled={!data.pagination.hasNextPage || loading}
                            className={!data.pagination.hasNextPage || loading ? '' : 'cursor-pointer'}
                        >
                            Próxima
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {loading && (
                <div className="flex justify-center py-8">
                    <PageLoading />
                </div>
            )}
        </div>
    );
}