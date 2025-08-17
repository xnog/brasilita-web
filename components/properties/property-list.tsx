"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyCard } from "./property-card";
import { PropertyFilters, AvailableFilters } from "./property-filters";
import { Property } from "@/lib/db/schema";
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
    availableFilters: AvailableFilters;
}

export function PropertyList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<PropertyListResponse | null>(null);
    const [loading, setLoading] = useState(true);

    // Initialize filters from URL
    const getFiltersFromUrl = useCallback((): PropertyFilters => {
        const urlFilters: PropertyFilters = {
            page: parseInt(searchParams.get('page') || '1'),
            limit: 20,
            sortBy: (searchParams.get('sortBy') as 'price' | 'area' | 'createdAt') || 'createdAt',
            sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
        };

        // Parse URL parameters
        const regions = searchParams.get('regions');
        if (regions) urlFilters.regions = regions.split(',');

        const priceMin = searchParams.get('priceMin');
        if (priceMin) urlFilters.priceMin = parseInt(priceMin);

        const priceMax = searchParams.get('priceMax');
        if (priceMax) urlFilters.priceMax = parseInt(priceMax);

        const bedroomsMin = searchParams.get('bedroomsMin');
        if (bedroomsMin) urlFilters.bedroomsMin = parseInt(bedroomsMin);

        const bedroomsMax = searchParams.get('bedroomsMax');
        if (bedroomsMax) urlFilters.bedroomsMax = parseInt(bedroomsMax);

        const bathroomsMin = searchParams.get('bathroomsMin');
        if (bathroomsMin) urlFilters.bathroomsMin = parseInt(bathroomsMin);

        const bathroomsMax = searchParams.get('bathroomsMax');
        if (bathroomsMax) urlFilters.bathroomsMax = parseInt(bathroomsMax);

        const areaMin = searchParams.get('areaMin');
        if (areaMin) urlFilters.areaMin = parseInt(areaMin);

        const areaMax = searchParams.get('areaMax');
        if (areaMax) urlFilters.areaMax = parseInt(areaMax);

        const location = searchParams.get('location');
        if (location) urlFilters.location = location;

        const favoritesOnly = searchParams.get('favoritesOnly');
        if (favoritesOnly) urlFilters.favoritesOnly = favoritesOnly === 'true';

        return urlFilters;
    }, [searchParams]);

    const [filters, setFilters] = useState<PropertyFilters>(getFiltersFromUrl);

    const buildQueryString = useCallback((filterParams: PropertyFilters) => {
        const params = new URLSearchParams();

        // Add user preferences flag for initial load
        if (!filterParams.regions && !filterParams.priceMin && !filterParams.priceMax) {
            params.set('userPreferences', 'true');
        }

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

    const updateUrlWithFilters = useCallback((filters: PropertyFilters) => {
        const params = new URLSearchParams();

        // Add all filter parameters to URL
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                if (key === 'regions' && Array.isArray(value)) {
                    if (value.length > 0) {
                        params.set(key, value.join(','));
                    }
                } else if (key !== 'limit') { // Don't include limit in URL
                    params.set(key, value.toString());
                }
            }
        });

        // Update URL without page reload
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
    }, [router]);

    const handleFiltersChange = useCallback((newFilters: PropertyFilters) => {
        // Reset to page 1 when filters change
        const filtersWithPage = { ...newFilters, page: 1 };
        setFilters(filtersWithPage);
        updateUrlWithFilters(filtersWithPage);
        fetchProperties(filtersWithPage);
    }, [fetchProperties, updateUrlWithFilters]);

    const handlePageChange = useCallback((page: number) => {
        const newFilters = { ...filters, page };
        setFilters(newFilters);
        updateUrlWithFilters(newFilters);
        fetchProperties(newFilters);
    }, [filters, fetchProperties, updateUrlWithFilters]);

    const handleClearFilters = useCallback(() => {
        const clearedFilters: PropertyFilters = {
            page: 1,
            limit: 20,
            sortBy: 'createdAt',
            sortOrder: 'desc'
        };
        
        // Update URL with cleared filters and add parameter to disable user preferences
        const params = new URLSearchParams();
        params.set('page', '1');
        params.set('sortBy', 'createdAt');
        params.set('sortOrder', 'desc');
        params.set('userPreferences', 'false'); // Explicitly disable user preferences
        
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
        
        // No need to fetch here - useEffect will handle it when URL changes
    }, [router]);

    const handleApplyPreferences = useCallback(() => {
        const preferencesFilters: PropertyFilters = {
            page: 1,
            limit: 20,
            sortBy: 'createdAt',
            sortOrder: 'desc'
        };
        setFilters(preferencesFilters);
        updateUrlWithFilters(preferencesFilters);
        // Add userPreferences flag to URL
        const params = new URLSearchParams();
        params.set('userPreferences', 'true');
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
        fetchProperties(preferencesFilters);
    }, [fetchProperties, updateUrlWithFilters, router]);

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

    // Initial load and URL changes
    useEffect(() => {
        const urlFilters = getFiltersFromUrl();
        setFilters(urlFilters);
        
        // Check if userPreferences parameter is explicitly set in URL
        const userPreferencesParam = searchParams.get('userPreferences');
        if (userPreferencesParam === 'false') {
            // If userPreferences=false in URL, make explicit API call to preserve this
            const fetchParams = new URLSearchParams();
            
            // Add all filter parameters
            Object.entries(urlFilters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    if (key === 'regions' && Array.isArray(value)) {
                        if (value.length > 0) {
                            fetchParams.set(key, value.join(','));
                        }
                    } else {
                        fetchParams.set(key, value.toString());
                    }
                }
            });
            
            fetchParams.set('userPreferences', 'false');
            
            // Use the same fetchProperties logic but with explicit userPreferences=false
            setLoading(true);
            fetch(`/api/properties?${fetchParams.toString()}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`API Error: ${response.status}`);
                    }
                })
                .then(responseData => {
                    setData(responseData);
                })
                .catch(error => {
                    console.error("Error fetching properties:", error);
                    setData(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            // Normal fetch for other cases
            fetchProperties(urlFilters);
        }
    }, [searchParams, getFiltersFromUrl, fetchProperties]);

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
                    filters={data.appliedFilters}
                    availableFilters={data.availableFilters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                    onApplyPreferences={handleApplyPreferences}
                    isLoading={loading}
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
                            Limpar filtros
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PropertyFilters
                filters={data.appliedFilters}
                availableFilters={data.availableFilters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                onApplyPreferences={handleApplyPreferences}
                isLoading={loading}
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
                            className="flex-1 max-w-[100px]"
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
                            className="flex-1 max-w-[100px]"
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