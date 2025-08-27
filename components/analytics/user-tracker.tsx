'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMixpanel } from '@/components/providers/mixpanel-provider';

export function UserTracker() {
    const { data: session, status } = useSession();
    const { setUser, reset, isInitialized } = useMixpanel();

    useEffect(() => {
        if (!isInitialized || status === 'loading') return;

        if (session?.user?.email) {
            setUser(session.user.email, session.user.name || undefined);
        } else {
            reset();
        }
    }, [session, status, isInitialized, setUser, reset]);

    return null;
}
