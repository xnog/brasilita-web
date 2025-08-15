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
    regions: Region[];
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

    // Update local filters when props change
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

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

    const regionOptions = (availableFilters.regions || []).map(region => ({
        value: region.id,
        label: region.name
    }));

    return (
        <div className="bg-white border rounded-xl shadow-sm">
            {/* Header with quick filters */}
            <div className="p-6 border-b bg-slate-50/50">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Main filters row */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Regions */}
                        <div className="space-y-1">
                            <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Regiões</Label>
                            <MultiSelector
                                values={regionOptions.filter(option =>
                                    localFilters.regions?.includes(option.value)
                                )}
                                onValuesChange={(values) =>
                                    handleFilterChange('regions', values.length > 0 ? values.map(v => v.value) : undefined)
                                }
                                disabled={isLoading}
                            >
                                <MultiSelectorTrigger className="min-h-10 h-auto">
                                    <MultiSelectorInput placeholder="Todas as regiões" />
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

                        {/* Price Range */}
                        <div className="space-y-1">
                            <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Preço (€)</Label>
                            <div className="flex gap-1">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={localFilters.priceMin || ''}
                                    onChange={(e) => handlePriceChange('min', e.target.value)}
                                    disabled={isLoading}
                                    className="h-10 text-sm"
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={localFilters.priceMax || ''}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                    disabled={isLoading}
                                    className="h-10 text-sm"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="space-y-1">
                            <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Ordenar</Label>
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
                                    <SelectItem value="createdAt-desc">Mais recentes</SelectItem>
                                    <SelectItem value="createdAt-asc">Mais antigos</SelectItem>
                                    <SelectItem value="price-asc">Menor preço</SelectItem>
                                    <SelectItem value="price-desc">Maior preço</SelectItem>
                                    <SelectItem value="area-desc">Maior área</SelectItem>
                                    <SelectItem value="area-asc">Menor área</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="h-10 px-3 text-slate-600 hover:text-slate-900"
                        >
                            Mais filtros
                            {showAdvanced ? (
                                <ChevronUp className="h-4 w-4 ml-1" />
                            ) : (
                                <ChevronDown className="h-4 w-4 ml-1" />
                            )}
                        </Button>

                        <Button
                            onClick={handleApplyFilters}
                            disabled={isLoading}
                            className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700"
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Buscar
                        </Button>

                        {getActiveFilterCount() > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={isLoading}
                                        className="h-10 px-3"
                                    >
                                        <RotateCcw className="h-4 w-4 mr-1" />
                                        Resetar
                                        <ChevronDown className="h-3 w-3 ml-1" />
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
                        )}
                    </div>
                </div>


            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
                <div className="p-6 bg-white border-t space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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