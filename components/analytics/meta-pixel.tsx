'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ReactPixel from 'react-facebook-pixel';

const PIXEL_ID = '847001467717991';

export function MetaPixel() {
    const pathname = usePathname();

    useEffect(() => {
        // Initialize Meta Pixel
        ReactPixel.init(PIXEL_ID, undefined, {
            autoConfig: true,
            debug: false,
        });
        ReactPixel.pageView();
    }, []);

    // Track page views on route changes
    useEffect(() => {
        ReactPixel.pageView();
    }, [pathname]);

    return null;
}
