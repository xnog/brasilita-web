"use client";

import { useState, useCallback } from "react";
import { PropertyFilters as PropertyFiltersComponent } from "./property-filters";
import { PropertiesOverviewMap } from "./properties-overview-map";
import { PropertyListView } from "./property-list-view";
import { Region } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { PropertyFilters } from "@/lib/hooks/use-property-filters";
import { usePropertyCache } from "@/lib/hooks/use-property-cache";

import { Map, List, Bell } from "lucide-react";
import { PageLoading } from "@/components/ui/page-loading";
import { CreateAlertModal } from "@/components/alerts/create-alert-modal";

interface PropertyListResponse {
    properties: Array<any>;
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
    initialPropertyData?: PropertyListResponse | null;
}

const defaultFilters: PropertyFilters = {
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc'
};

export function PropertyList({ userPreferences: initialUserPreferences, regions, initialPropertyData }: PropertyListProps) {
    const [userPreferences] = useState<PropertyFilters | null>(initialUserPreferences || null);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [filters, setFilters] = useState<PropertyFilters>(
        initialPropertyData?.appliedFilters || initialUserPreferences || defaultFilters
    );
    const [totalProperties, setTotalProperties] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showCreateAlertModal, setShowCreateAlertModal] = useState(false);

    const { clearSearchCache } = usePropertyCache();

    const handleClearFilters = useCallback(() => {
        const newFilters = defaultFilters;
        clearSearchCache(); // Clear search cache when filters are cleared
        setFilters(newFilters);
    }, [clearSearchCache]);

    const handleApplyPreferences = useCallback(() => {
        if (userPreferences) {
            const preferencesWithPage = { ...userPreferences, page: 1 };
            clearSearchCache(); // Clear search cache when applying preferences
            setFilters(preferencesWithPage);
        } else {
            handleClearFilters();
        }
    }, [userPreferences, handleClearFilters, clearSearchCache]);

    const handleFiltersChange = useCallback((newFilters: PropertyFilters) => {
        clearSearchCache(); // Clear search cache when filters change
        setFilters(newFilters);
    }, [clearSearchCache]);

    const handleViewModeChange = useCallback((newViewMode: 'list' | 'map') => {
        setViewMode(newViewMode);
    }, []);

    return (
        <div className="space-y-6">
            <PropertyFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                onApplyPreferences={handleApplyPreferences}
                isLoading={isLoading}
                regions={regions}
            />

            {/* View mode toggle and actions */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">
                        {totalProperties !== null ? `${totalProperties} imóveis` : 'Imóveis'}
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    {/* Create Alert Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCreateAlertModal(true)}
                        className="flex items-center gap-2"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Criar Alerta</span>
                    </Button>

                    {/* View Mode Buttons */}
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleViewModeChange('list')}
                        className="flex items-center gap-2"
                    >
                        <List className="h-4 w-4" />
                        <span className="hidden sm:inline">Lista</span>
                    </Button>
                    <Button
                        variant={viewMode === 'map' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleViewModeChange('map')}
                        className="flex items-center gap-2"
                    >
                        <Map className="h-4 w-4" />
                        <span className="hidden sm:inline">Mapa</span>
                    </Button>
                </div>
            </div>

            {/* Content based on view mode - each component manages its own data but reports loading back */}
            {viewMode === 'list' ? (
                <PropertyListView
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onTotalPropertiesChange={setTotalProperties}
                    onLoadingChange={setIsLoading}
                    initialPropertyData={initialPropertyData}
                />
            ) : (
                <PropertiesOverviewMap
                    filters={filters}
                    onTotalPropertiesChange={setTotalProperties}
                    onLoadingChange={setIsLoading}
                />
            )}

            {/* General loading overlay when filtering */}
            {isLoading && (
                <div className="flex justify-center py-8">
                    <PageLoading />
                </div>
            )}

            {/* Create Alert Modal */}
            <CreateAlertModal
                open={showCreateAlertModal}
                onClose={() => setShowCreateAlertModal(false)}
                onSuccess={() => setShowCreateAlertModal(false)}
                initialFilters={filters}
            />
        </div>
    );
}