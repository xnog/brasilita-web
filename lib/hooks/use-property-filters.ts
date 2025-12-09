import { useCallback } from 'react';

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
    pricePerSqmMin?: number;
    pricePerSqmMax?: number;
    favoritesOnly?: boolean;
    isRented?: boolean;
    isRentToOwn?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'price' | 'area' | 'createdAt' | 'pricePerSqm';
    sortOrder?: 'asc' | 'desc';
}

export function usePropertyFilters() {
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

    return {
        buildQueryString
    };
}
