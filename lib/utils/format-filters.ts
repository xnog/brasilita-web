import { PropertyFilters } from "@/lib/api/property-filters";

/**
 * Formata os filtros de propriedade para exibição legível
 */
export function formatFilters(filters: PropertyFilters): string {
    const parts = [];

    if (filters.regions && filters.regions.length > 0) {
        parts.push(`${filters.regions.length} região(ões)`);
    }

    if (filters.priceMin || filters.priceMax) {
        if (filters.priceMin && filters.priceMax) {
            parts.push(`€${filters.priceMin.toLocaleString()} - €${filters.priceMax.toLocaleString()}`);
        } else if (filters.priceMin) {
            parts.push(`A partir de €${filters.priceMin.toLocaleString()}`);
        } else if (filters.priceMax) {
            parts.push(`Até €${filters.priceMax.toLocaleString()}`);
        }
    }

    if (filters.bedroomsMin || filters.bedroomsMax) {
        if (filters.bedroomsMin && filters.bedroomsMax) {
            if (filters.bedroomsMin === filters.bedroomsMax) {
                parts.push(`${filters.bedroomsMin} quartos`);
            } else {
                parts.push(`${filters.bedroomsMin} a ${filters.bedroomsMax} quartos`);
            }
        } else if (filters.bedroomsMin) {
            parts.push(`${filters.bedroomsMin}+ quartos`);
        } else if (filters.bedroomsMax) {
            parts.push(`Até ${filters.bedroomsMax} quartos`);
        }
    }

    if (filters.bathroomsMin || filters.bathroomsMax) {
        if (filters.bathroomsMin && filters.bathroomsMax) {
            if (filters.bathroomsMin === filters.bathroomsMax) {
                parts.push(`${filters.bathroomsMin} banheiros`);
            } else {
                parts.push(`${filters.bathroomsMin} a ${filters.bathroomsMax} banheiros`);
            }
        } else if (filters.bathroomsMin) {
            parts.push(`${filters.bathroomsMin}+ banheiros`);
        } else if (filters.bathroomsMax) {
            parts.push(`Até ${filters.bathroomsMax} banheiros`);
        }
    }

    if (filters.areaMin || filters.areaMax) {
        if (filters.areaMin && filters.areaMax) {
            parts.push(`${filters.areaMin} - ${filters.areaMax}m²`);
        } else if (filters.areaMin) {
            parts.push(`A partir de ${filters.areaMin}m²`);
        } else if (filters.areaMax) {
            parts.push(`Até ${filters.areaMax}m²`);
        }
    }

    if (filters.pricePerSqmMin || filters.pricePerSqmMax) {
        if (filters.pricePerSqmMin && filters.pricePerSqmMax) {
            parts.push(`€${filters.pricePerSqmMin}/m² - €${filters.pricePerSqmMax}/m²`);
        } else if (filters.pricePerSqmMin) {
            parts.push(`A partir de €${filters.pricePerSqmMin}/m²`);
        } else if (filters.pricePerSqmMax) {
            parts.push(`Até €${filters.pricePerSqmMax}/m²`);
        }
    }

    if (filters.location) {
        parts.push(`Localização: "${filters.location}"`);
    }

    if (filters.favoritesOnly) {
        parts.push("Apenas favoritos");
    }

    if (filters.isRented !== undefined) {
        parts.push(filters.isRented ? "Apenas alugados" : "Apenas à venda");
    }

    // Ordenação
    if (filters.sortBy && filters.sortOrder) {
        const sortLabels: Record<string, string> = {
            'price': 'preço',
            'area': 'área',
            'createdAt': 'data de cadastro',
            'pricePerSqm': 'preço/m²'
        };
        const orderLabels = {
            'asc': 'crescente',
            'desc': 'decrescente'
        };

        const sortLabel = sortLabels[filters.sortBy] || filters.sortBy;
        const orderLabel = orderLabels[filters.sortOrder] || filters.sortOrder;
        parts.push(`Ordenado por ${sortLabel} (${orderLabel})`);
    }

    return parts.length > 0 ? parts.join(" • ") : "Sem filtros específicos";
}

/**
 * Formata os filtros para preview (usado no modal de criar alerta)
 */
export function formatFiltersPreview(filters: PropertyFilters): string {
    const result = formatFilters(filters);
    return result === "Sem filtros específicos" ? "Todos os imóveis disponíveis" : result;
}
