"use client";

import { ContentLoading } from "./content-loading";

interface PageLoadingProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function PageLoading({ 
    message = "Carregando...", 
    size = "md",
    className 
}: PageLoadingProps) {
    return (
        <ContentLoading 
            message={message}
            size={size}
            className={className}
            variant="overlay"
        />
    );
}
