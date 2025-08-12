"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Filter, SortAsc, SortDesc } from "lucide-react";

interface PropertyFiltersProps {
    onFiltersChange: (filters: PropertyFilters) => void;
    onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
    totalProperties: number;
    showFilters?: boolean;
    onToggleFilters?: () => void;
}

export interface PropertyFilters {
    location?: string;
    maxPrice?: number;
    propertyType?: string;
    minBedrooms?: number;
}

export function PropertyFilters({
    onFiltersChange,
    onSortChange,
    totalProperties,
    showFilters = false,
    onToggleFilters
}: PropertyFiltersProps) {
    const [filters, setFilters] = useState<PropertyFilters>({});
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const propertyTypes = [
        { value: "", label: "Todos os tipos" },
        { value: "residential", label: "Residencial" },
        { value: "commercial", label: "Comercial" },
        { value: "investment", label: "Investimento" },
    ];

    const sortOptions = [
        { value: "createdAt", label: "Data de cadastro" },
        { value: "price", label: "Preço" },
        { value: "area", label: "Área" },
        { value: "bedrooms", label: "Quartos" },
    ];

    useEffect(() => {
        onFiltersChange(filters);
    }, [filters, onFiltersChange]);

    useEffect(() => {
        onSortChange(sortBy, sortOrder);
    }, [sortBy, sortOrder, onSortChange]);

    const handleFilterChange = (key: keyof PropertyFilters, value: string | number) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === "" ? undefined : value
        }));
    };

    const clearFilters = () => {
        setFilters({});
    };

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(value => value !== undefined).length;
    };

    const toggleSort = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    };

    return (
        <div className="space-y-4">
            {/* Filter Toggle and Results Summary */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {onToggleFilters && (
                        <Button
                            variant="outline"
                            onClick={onToggleFilters}
                            className="flex items-center space-x-2"
                        >
                            <Filter className="h-4 w-4" />
                            <span>Filtros</span>
                            {getActiveFiltersCount() > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {getActiveFiltersCount()}
                                </Badge>
                            )}
                        </Button>
                    )}

                    <div className="text-sm text-gray-600">
                        {totalProperties} imóve{totalProperties !== 1 ? 'is' : 'l'} encontrado{totalProperties !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Sort Controls */}
                <div className="flex items-center space-x-2">
                    <Label className="text-sm">Ordenar por:</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSort}
                        className="p-1"
                    >
                        {sortOrder === "asc" ?
                            <SortAsc className="h-4 w-4" /> :
                            <SortDesc className="h-4 w-4" />
                        }
                    </Button>
                </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600">Filtros ativos:</span>
                    {filters.location && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Local: {filters.location}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleFilterChange("location", "")}
                            />
                        </Badge>
                    )}
                    {filters.maxPrice && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Até €{filters.maxPrice.toLocaleString()}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleFilterChange("maxPrice", "")}
                            />
                        </Badge>
                    )}
                    {filters.propertyType && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            {propertyTypes.find(t => t.value === filters.propertyType)?.label}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleFilterChange("propertyType", "")}
                            />
                        </Badge>
                    )}
                    {filters.minBedrooms && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Min. {filters.minBedrooms} quartos
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleFilterChange("minBedrooms", "")}
                            />
                        </Badge>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-red-600 hover:text-red-700"
                    >
                        Limpar todos
                    </Button>
                </div>
            )}

            {/* Filter Panel */}
            {showFilters && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Filtros de Busca</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Location Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="location">Localização</Label>
                                <Input
                                    id="location"
                                    placeholder="Ex: Roma, Milão..."
                                    value={filters.location || ""}
                                    onChange={(e) => handleFilterChange("location", e.target.value)}
                                />
                            </div>

                            {/* Max Price Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="maxPrice">Preço máximo (€)</Label>
                                <Input
                                    id="maxPrice"
                                    type="number"
                                    placeholder="Ex: 500000"
                                    value={filters.maxPrice || ""}
                                    onChange={(e) => handleFilterChange("maxPrice", e.target.value ? parseInt(e.target.value) : "")}
                                />
                            </div>

                            {/* Property Type Filter */}
                            <div className="space-y-2">
                                <Label>Tipo de imóvel</Label>
                                <Select
                                    value={filters.propertyType || ""}
                                    onValueChange={(value) => handleFilterChange("propertyType", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todos os tipos" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {propertyTypes.map(type => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Min Bedrooms Filter */}
                            <div className="space-y-2">
                                <Label>Quartos mínimos</Label>
                                <Select
                                    value={filters.minBedrooms?.toString() || ""}
                                    onValueChange={(value) => handleFilterChange("minBedrooms", value ? parseInt(value) : "")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Qualquer quantidade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Qualquer quantidade</SelectItem>
                                        <SelectItem value="1">1+ quartos</SelectItem>
                                        <SelectItem value="2">2+ quartos</SelectItem>
                                        <SelectItem value="3">3+ quartos</SelectItem>
                                        <SelectItem value="4">4+ quartos</SelectItem>
                                        <SelectItem value="5">5+ quartos</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
