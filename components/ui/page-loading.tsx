"use client";

import { Building } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-8 w-8", 
        lg: "h-12 w-12"
    };

    const textSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
    };

    return (
        <div className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
            "flex items-center justify-center",
            className
        )}>
            <div className="text-center">
                <div className="relative">
                    <Building className={cn(
                        sizeClasses[size], 
                        "animate-spin mx-auto mb-4 text-primary"
                    )} />
                    {/* Pulsing backdrop effect */}
                    <div className={cn(
                        sizeClasses[size],
                        "absolute inset-0 mx-auto bg-primary/20 rounded-full animate-pulse"
                    )} />
                </div>
                <p className={cn(
                    "text-muted-foreground font-medium",
                    textSizeClasses[size]
                )}>
                    {message}
                </p>
            </div>
        </div>
    );
}
