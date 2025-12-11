/**
 * Application-wide constants
 */

export const PROPERTY_PLACEHOLDER_IMAGE = '/property-placeholder.svg';

/**
 * Get property image URL with fallback to placeholder
 */
export function getPropertyImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl || imageUrl.trim() === '') {
        return PROPERTY_PLACEHOLDER_IMAGE;
    }
    return imageUrl;
}

/**
 * Get property image URL for error handling with fallback to placeholder
 */
export function getPropertyImageWithError(imageUrl: string | null | undefined, hasError: boolean): string {
    if (hasError) {
        return PROPERTY_PLACEHOLDER_IMAGE;
    }
    return getPropertyImageUrl(imageUrl);
}
