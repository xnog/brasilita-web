"use client";

import { PropertyCard } from "./property-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { usePropertyList } from "@/lib/hooks/use-property-list";
import { PropertyFilters } from "@/lib/hooks/use-property-filters";
import { useEffect } from "react";
import { Property } from "@/lib/db/schema";

interface PropertyListResponse {
    properties: Array<Omit<Property, 'originalUrl'> & {
        isInterested?: boolean;
        interestNotes?: string | null;
        region: { id: string; name: string; examples: string | null; createdAt: Date | null; updatedAt: Date | null; } | null;
    }>;
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

interface PropertyListViewProps {
    filters: PropertyFilters;
    onFiltersChange: (filters: PropertyFilters) => void;
    onTotalPropertiesChange: (total: number | null) => void;
    onLoadingChange: (loading: boolean) => void;
    initialPropertyData?: PropertyListResponse | null;
}

export function PropertyListView({ filters, onTotalPropertiesChange, onLoadingChange, initialPropertyData }: PropertyListViewProps) {
    const {
        data,
        loading,
        handlePageChange,
        handleToggleInterest
    } = usePropertyList(filters, initialPropertyData);

    // Update total properties when data changes
    useEffect(() => {
        if (data?.pagination?.totalCount !== undefined) {
            onTotalPropertiesChange(data.pagination.totalCount);
        } else if (!loading) {
            onTotalPropertiesChange(null);
        }
    }, [data, loading, onTotalPropertiesChange]);

    // Update loading state when loading changes
    useEffect(() => {
        onLoadingChange(loading);
    }, [loading, onLoadingChange]);

    // Don't show internal loading - parent component handles it

    // Show error state when no data and not loading
    if (!data && !loading) {
        return (
            <div className="text-center py-8">
                <p className="text-slate-600">Erro ao carregar propriedades</p>
            </div>
        );
    }

    // Show empty state when no properties
    if (data && data.properties.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-slate-600">Nenhuma propriedade encontrada</p>
            </div>
        );
    }

    if (!data) return null;

    const filteredProperties = data.properties;

    return (
        <>
            {/* Property Grid */}
            <div className="relative">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            onToggleInterest={handleToggleInterest}
                        />
                    ))}
                </div>
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


        </>
    );
}
