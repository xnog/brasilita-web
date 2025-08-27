'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMixpanel } from '@/components/providers/mixpanel-provider';

export function PageTracker() {
    const pathname = usePathname();
    const { track, isInitialized } = useMixpanel();

    useEffect(() => {
        if (!isInitialized) return;

        const pageName = pathname === '/' ? 'Home' : pathname.split('/').filter(Boolean).join(' - ');

        track('Page View', {
            page_name: pageName,
            pathname,
        });
    }, [pathname, track, isInitialized]);

    return null;
}

