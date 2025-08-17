"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/extension/multi-select";
import { Filter, X, ChevronDown, ChevronUp, Heart, RotateCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Region } from "@/lib/db/schema";

export interface PropertyFilters {
    regions?: string[];
    priceMin?: number;
    priceMax?: number;
    bedroomsMin?: number;
    bedroomsMax?: number;
    bathroomsMin?: number;
    bathroomsMax?: number;
    areaMin?: number;
    areaMax?: number;
    location?: string;
    favoritesOnly?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'price' | 'area' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}

export interface AvailableFilters {
    priceRange: { min: number; max: number };
    areaRange: { min: number; max: number };
    bedroomOptions: number[];
    bathroomOptions: number[];
}

interface PropertyFiltersProps {
    filters: PropertyFilters;
    availableFilters: AvailableFilters;
    onFiltersChange: (filters: PropertyFilters) => void;
    onClearFilters: () => void;
    onApplyPreferences?: () => void;
    isLoading?: boolean;
}

export function PropertyFilters({
    filters,
    availableFilters,
    onFiltersChange,
    onClearFilters,
    onApplyPreferences,
    isLoading = false
}: PropertyFiltersProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [localFilters, setLocalFilters] = useState<PropertyFilters>(filters);
    const [regions, setRegions] = useState<Region[]>([]);

    // Update local filters when props change
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    // Fetch regions once on component mount
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await fetch('/api/regions');
                if (response.ok) {
                    const data = await response.json();
                    setRegions(data.regions || []);
                }
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };

        fetchRegions();
    }, []);

    const handleFilterChange = (key: keyof PropertyFilters, value: string | number | string[] | boolean | undefined) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
    };

    const handleApplyFilters = () => {
        onFiltersChange(localFilters);
    };

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        const numValue = value ? parseInt(value) : undefined;
        const key = type === 'min' ? 'priceMin' : 'priceMax';
        handleFilterChange(key, numValue);
    };

    const handleAreaChange = (type: 'min' | 'max', value: string) => {
        const numValue = value ? parseInt(value) : undefined;
        const key = type === 'min' ? 'areaMin' : 'areaMax';
        handleFilterChange(key, numValue);
    };

    const handleBedroomChange = (type: 'min' | 'max', value: string) => {
        const numValue = value ? parseInt(value) : undefined;
        const key = type === 'min' ? 'bedroomsMin' : 'bedroomsMax';
        handleFilterChange(key, numValue);
    };

    const handleBathroomChange = (type: 'min' | 'max', value: string) => {
        const numValue = value ? parseInt(value) : undefined;
        const key = type === 'min' ? 'bathroomsMin' : 'bathroomsMax';
        handleFilterChange(key, numValue);
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (localFilters.regions && localFilters.regions.length > 0) count++;
        if (localFilters.priceMin || localFilters.priceMax) count++;
        if (localFilters.bedroomsMin || localFilters.bedroomsMax) count++;
        if (localFilters.bathroomsMin || localFilters.bathroomsMax) count++;
        if (localFilters.areaMin || localFilters.areaMax) count++;
        if (localFilters.location) count++;
        if (localFilters.favoritesOnly) count++;
        return count;
    };

    const regionOptions = regions.map(region => ({
        value: region.id,
        label: region.name
    }));

    return (
        <div className="bg-white border rounded-xl shadow-sm">
            {/* Header with quick filters */}
            <div className="p-3 sm:p-4 md:p-6 border-b bg-slate-50/50">
                {/* All filters and buttons in one row */}
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-end">
                    {/* Filters row */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 min-w-0">
                        {/* Regions - very compact */}
                        <div className="flex-1 min-w-0 min-w-[120px]">
                            <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-1 block">Regiões</Label>
                            <MultiSelector
                                values={regionOptions.filter(option =>
                                    localFilters.regions?.includes(option.value)
                                )}
                                onValuesChange={(values) =>
                                    handleFilterChange('regions', values.length > 0 ? values.map(v => v.value) : undefined)
                                }
                                disabled={isLoading}
                            >
                                <MultiSelectorTrigger className="h-10 min-w-0">
                                    <MultiSelectorInput 
                                        placeholder="Regiões" 
                                        className="truncate text-sm"
                                    />
                                </MultiSelectorTrigger>
                                <MultiSelectorContent>
                                    <MultiSelectorList>
                                        {regionOptions.map(option => (
                                            <MultiSelectorItem
                                                key={option.value}
                                                value={option.value}
                                                label={option.label}
                                            >
                                                {option.label}
                                            </MultiSelectorItem>
                                        ))}
                                    </MultiSelectorList>
                                </MultiSelectorContent>
                            </MultiSelector>
                        </div>

                        {/* Price Range - compact */}
                        <div className="flex-1 min-w-0 min-w-[160px]">
                            <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-1 block">Preço (€)</Label>
                            <div className="flex gap-1">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={localFilters.priceMin || ''}
                                    onChange={(e) => handlePriceChange('min', e.target.value)}
                                    disabled={isLoading}
                                    className="h-10 text-sm min-w-0"
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={localFilters.priceMax || ''}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                    disabled={isLoading}
                                    className="h-10 text-sm min-w-0"
                                />
                            </div>
                        </div>

                        {/* Sort - compact */}
                        <div className="flex-1 min-w-0 min-w-[140px]">
                            <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-1 block">Ordenar</Label>
                            <Select
                                value={`${localFilters.sortBy || 'createdAt'}-${localFilters.sortOrder || 'desc'}`}
                                onValueChange={(value) => {
                                    const [sortBy, sortOrder] = value.split('-');
                                    handleFilterChange('sortBy', sortBy as 'price' | 'area' | 'createdAt');
                                    handleFilterChange('sortOrder', sortOrder as 'asc' | 'desc');
                                }}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="h-10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="createdAt-desc">Recentes</SelectItem>
                                    <SelectItem value="createdAt-asc">Antigos</SelectItem>
                                    <SelectItem value="price-asc">↑ Preço</SelectItem>
                                    <SelectItem value="price-desc">↓ Preço</SelectItem>
                                    <SelectItem value="area-desc">↓ Área</SelectItem>
                                    <SelectItem value="area-asc">↑ Área</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Action buttons in same row */}
                    <div className="flex gap-2 lg:flex-shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="h-10 px-2 lg:px-3 text-slate-600 hover:text-slate-900 flex-shrink-0"
                        >
                            <span className="hidden sm:inline text-sm">Avançado</span>
                            <span className="sm:hidden text-sm">+</span>
                            {showAdvanced ? (
                                <ChevronUp className="h-4 w-4 ml-0 sm:ml-1" />
                            ) : (
                                <ChevronDown className="h-4 w-4 ml-0 sm:ml-1" />
                            )}
                        </Button>

                        <Button
                            onClick={handleApplyFilters}
                            disabled={isLoading}
                            className="h-10 px-3 lg:px-4 bg-emerald-600 hover:bg-emerald-700 flex-shrink-0"
                        >
                            <Filter className="h-4 w-4 mr-1" />
                            <span className="text-sm">Buscar</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isLoading}
                                    className="h-10 px-2 flex-shrink-0"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    <span className="hidden lg:inline ml-1 text-sm">Reset</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={onClearFilters}>
                                    <X className="h-4 w-4 mr-2" />
                                    Limpar todos os filtros
                                </DropdownMenuItem>
                                {onApplyPreferences && (
                                    <DropdownMenuItem onClick={onApplyPreferences}>
                                        <Heart className="h-4 w-4 mr-2" />
                                        Ver baseado nas preferências
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>


            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
                <div className="p-3 sm:p-4 md:p-6 bg-white border-t space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {/* Bedrooms Range */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Quartos</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={localFilters.bedroomsMin || ''}
                                    onChange={(e) => handleBedroomChange('min', e.target.value)}
                                    disabled={isLoading}
                                    min="0"
                                    className="h-9"
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={localFilters.bedroomsMax || ''}
                                    onChange={(e) => handleBedroomChange('max', e.target.value)}
                                    disabled={isLoading}
                                    min="0"
                                    className="h-9"
                                />
                            </div>
                        </div>

                        {/* Bathrooms Range */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Banheiros</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={localFilters.bathroomsMin || ''}
                                    onChange={(e) => handleBathroomChange('min', e.target.value)}
                                    disabled={isLoading}
                                    min="0"
                                    className="h-9"
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={localFilters.bathroomsMax || ''}
                                    onChange={(e) => handleBathroomChange('max', e.target.value)}
                                    disabled={isLoading}
                                    min="0"
                                    className="h-9"
                                />
                            </div>
                        </div>

                        {/* Area Range */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Área (m²)</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={localFilters.areaMin || ''}
                                    onChange={(e) => handleAreaChange('min', e.target.value)}
                                    disabled={isLoading}
                                    className="h-9"
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={localFilters.areaMax || ''}
                                    onChange={(e) => handleAreaChange('max', e.target.value)}
                                    disabled={isLoading}
                                    className="h-9"
                                />
                            </div>
                        </div>

                        {/* Favorites Filter */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Apenas Interessados</Label>
                            <Button
                                variant={localFilters.favoritesOnly ? "default" : "outline"}
                                onClick={() => handleFilterChange('favoritesOnly', !localFilters.favoritesOnly)}
                                disabled={isLoading}
                                className="w-full h-9 justify-start"
                            >
                                <Heart className={`h-4 w-4 mr-2 ${localFilters.favoritesOnly ? 'fill-current' : ''}`} />
                                {localFilters.favoritesOnly ? "Sim" : "Não"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}