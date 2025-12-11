/**
 * Utility functions for parsing property JSON fields safely
 */

import { PROPERTY_PLACEHOLDER_IMAGE } from '@/lib/constants';

export function parsePropertyImages(images: unknown): string[] {
    if (!images) return [PROPERTY_PLACEHOLDER_IMAGE];

    try {
        const parsed = typeof images === 'string' ? JSON.parse(images) : images;
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : [PROPERTY_PLACEHOLDER_IMAGE];
    } catch (error) {
        console.warn('Error parsing property images:', error);
        return [PROPERTY_PLACEHOLDER_IMAGE];
    }
}

export function parsePropertyFeatures(features: unknown): string[] {
    if (!features) return [];

    try {
        const parsed = typeof features === 'string' ? JSON.parse(features) : features;
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn('Error parsing property features:', error);
        return [];
    }
}

export function parsePropertyImagesForCard(images: unknown): string[] {
    if (!images) return [];

    try {
        const parsed = typeof images === 'string' ? JSON.parse(images) : images;
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn('Error parsing property images:', error);
        return [];
    }
}