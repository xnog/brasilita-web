"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    return (
        <SessionProvider
            // Não fazer refetch automático da sessão
            refetchInterval={0}
            // Não fazer refetch quando a janela ganha foco
            refetchOnWindowFocus={false}
        >
            {children}
        </SessionProvider>
    );
}