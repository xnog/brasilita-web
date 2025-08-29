'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import mixpanel from 'mixpanel-browser';

interface MixpanelContextType {
    track: (eventName: string, properties?: Record<string, unknown>) => void;
    setUser: (email: string, name?: string) => void;
    reset: () => void;
    isInitialized: boolean;
}

const MixpanelContext = createContext<MixpanelContextType | null>(null);

export function MixpanelProvider({ children }: { children: ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN;
        const isLocalhost = typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname.startsWith('192.168.') ||
                window.location.hostname.endsWith('.local'));

        // Don't initialize Mixpanel on localhost
        if (isLocalhost) {
            console.log('Mixpanel disabled on localhost environment');
            return;
        }

        if (token && typeof window !== 'undefined') {
            mixpanel.init(token, {
                track_pageview: false,
                persistence: 'localStorage',
            });
            setIsInitialized(true);
        }
    }, []);

    const track = (eventName: string, properties?: Record<string, unknown>) => {
        if (!isInitialized) return;
        mixpanel.track(eventName, properties);
    };

    const setUser = (email: string, name?: string) => {
        if (!isInitialized) return;

        mixpanel.identify(email);
        mixpanel.register({
            user_email: email,
            user_name: name,
        });
    };

    const reset = () => {
        if (!isInitialized) return;
        mixpanel.reset();
    };

    return (
        <MixpanelContext.Provider value={{ track, setUser, reset, isInitialized }}>
            {children}
        </MixpanelContext.Provider>
    );
}

export function useMixpanel() {
    const context = useContext(MixpanelContext);
    if (!context) {
        throw new Error('useMixpanel must be used within a MixpanelProvider');
    }
    return context;
}

