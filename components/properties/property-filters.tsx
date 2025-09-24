"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/extension/multi-select";
import { Filter, X, ChevronDown, ChevronUp, Heart, RotateCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Region } from "@/lib/db/schema";

export interface PropertyFilters {
    regions?: string[];
    priceMin?: number;
    priceMax?: number;
    roomsMin?: number;
    roomsMax?: number;
    bedroomsMin?: number;
    bedroomsMax?: number;
    bathroomsMin?: number;
    bathroomsMax?: number;
    areaMin?: number;
    areaMax?: number;
    location?: string;
    favoritesOnly?: boolean;
    isRented?: boolean;
    isRentToOwn?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'price' | 'area' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}

export interface AvailableFilters {
    priceRange: { min: number; max: number };
    areaRange: { min: number; max: number };
    roomOptions: number[];
    bedroomOptions: number[];
    bathroomOptions: number[];
}

interface PropertyFiltersProps {
    filters: PropertyFilters;
    onFiltersChange: (filters: PropertyFilters) => void;
    onClearFilters: () => void;
    onApplyPreferences?: () => void;
    isLoading?: boolean;
    regions: Region[];
}

export function PropertyFilters({
    filters,
    onFiltersChange,
    onClearFilters,
    onApplyPreferences,
    isLoading = false,
    regions
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

    const handleRoomChange = (type: 'min' | 'max', value: string) => {
        const numValue = value ? parseInt(value) : undefined;
        const key = type === 'min' ? 'roomsMin' : 'roomsMax';
        handleFilterChange(key, numValue);
    };

    const handleBathroomChange = (type: 'min' | 'max', value: string) => {
        const numValue = value ? parseInt(value) : undefined;
        const key = type === 'min' ? 'bathroomsMin' : 'bathroomsMax';
        handleFilterChange(key, numValue);
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
                            <Label className="text-xs font-medium text-slate-600 tracking-wide mb-1 block">Regiões</Label>
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
                            <Label className="text-xs font-medium text-slate-600 tracking-wide mb-1 block">Preço (€)</Label>
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
                        <div className="flex-1 min-w-0 min-w-[140px] sm:flex-1 w-full sm:w-auto">
                            <Label className="text-xs font-medium text-slate-600 tracking-wide mb-1 block">Ordenar</Label>
                            <Select
                                value={`${localFilters.sortBy || 'createdAt'}-${localFilters.sortOrder || 'desc'}`}
                                onValueChange={(value) => {
                                    const [sortBy, sortOrder] = value.split('-');
                                    const newFilters = {
                                        ...localFilters,
                                        sortBy: sortBy as 'price' | 'area' | 'createdAt',
                                        sortOrder: sortOrder as 'asc' | 'desc'
                                    };
                                    setLocalFilters(newFilters);
                                }}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="h-10 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="createdAt-desc">Recentes</SelectItem>
                                    <SelectItem value="createdAt-asc">Antigos</SelectItem>
                                    <SelectItem value="price-asc">Menor preço</SelectItem>
                                    <SelectItem value="price-desc">Maior preço</SelectItem>
                                    <SelectItem value="area-asc">Menor área</SelectItem>
                                    <SelectItem value="area-desc">Maior área</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Action buttons in same row */}
                    <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0 w-full sm:w-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="h-10 px-2 lg:px-3 text-slate-600 hover:text-slate-900 w-full sm:w-auto sm:flex-shrink-0"
                        >
                            <span className="text-sm">Avançados</span>
                            {showAdvanced ? (
                                <ChevronUp className="h-4 w-4 ml-1" />
                            ) : (
                                <ChevronDown className="h-4 w-4 ml-1" />
                            )}
                        </Button>

                        <Button
                            onClick={handleApplyFilters}
                            disabled={isLoading}
                            className="h-10 px-3 lg:px-4 bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto sm:flex-shrink-0"
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
                                    className="h-10 px-2 w-full sm:w-auto sm:flex-shrink-0"
                                >
                                    <RotateCcw className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Limpar</span>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                        {/* Rooms Range */}
                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-slate-600 tracking-wide">Cômodos</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={localFilters.roomsMin || ''}
                                    onChange={(e) => handleRoomChange('min', e.target.value)}
                                    disabled={isLoading}
                                    min="0"
                                    className="h-9"
                                />
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={localFilters.roomsMax || ''}
                                    onChange={(e) => handleRoomChange('max', e.target.value)}
                                    disabled={isLoading}
                                    min="0"
                                    className="h-9"
                                />
                            </div>
                        </div>

                        {/* Bedrooms Range */}
                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-slate-600 tracking-wide">Quartos</Label>
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
                            <Label className="text-xs font-medium text-slate-600 tracking-wide">Banheiros</Label>
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
                            <Label className="text-xs font-medium text-slate-600 tracking-wide">Área (m²)</Label>
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

                        {/* Boolean Filters Row */}
                        <div className="lg:col-span-5 sm:col-span-2">
                            <div className="flex gap-6">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="favorites"
                                        checked={localFilters.favoritesOnly || false}
                                        onCheckedChange={(checked) => handleFilterChange('favoritesOnly', checked)}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="favorites" className="text-sm font-medium cursor-pointer">
                                        Favoritos
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="rented"
                                        checked={localFilters.isRented || false}
                                        onCheckedChange={(checked) => handleFilterChange('isRented', checked)}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="rented" className="text-sm font-medium cursor-pointer">
                                        Alugados
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isRentToOwn"
                                        checked={localFilters.isRentToOwn || false}
                                        onCheckedChange={(checked) => handleFilterChange('isRentToOwn', checked)}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="isRentToOwn" className="text-sm font-medium cursor-pointer">
                                        Affitto a riscatto
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}