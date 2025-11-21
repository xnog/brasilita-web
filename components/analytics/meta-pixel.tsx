'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PIXEL_ID = '847001467717991';

export function MetaPixel() {
    const pathname = usePathname();

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        // Dynamic import to avoid SSR issues
        import('react-facebook-pixel').then((module) => {
            const ReactPixel = module.default;

            // Initialize Meta Pixel
            ReactPixel.init(PIXEL_ID, undefined, {
                autoConfig: true,
                debug: false,
            });
            ReactPixel.pageView();
        });
    }, []);

    // Track page views on route changes
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        import('react-facebook-pixel').then((module) => {
            const ReactPixel = module.default;
            ReactPixel.pageView();
        });
    }, [pathname]);

    return null;
}
