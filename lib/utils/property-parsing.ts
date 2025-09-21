/**
 * Utility functions for parsing property JSON fields safely
 */

export function parsePropertyImages(images: unknown): string[] {
    if (!images) return ['/api/placeholder/800/600'];

    try {
        const parsed = typeof images === 'string' ? JSON.parse(images) : images;
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['/api/placeholder/800/600'];
    } catch (error) {
        console.warn('Error parsing property images:', error);
        return ['/api/placeholder/800/600'];
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