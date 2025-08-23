"use client";

import { Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentLoadingProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
    variant?: "overlay" | "inline" | "badge";
    height?: string;
}

export function ContentLoading({ 
    message = "Carregando...", 
    size = "md",
    className,
    variant = "inline",
    height = "h-96"
}: ContentLoadingProps) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-6 w-6", 
        lg: "h-8 w-8"
    };

    const textSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
    };

    // Overlay variant (full screen)
    if (variant === "overlay") {
        return (
            <div className={cn(
                "fixed inset-0 z-[9998] bg-background/80 backdrop-blur-sm",
                "flex items-center justify-center",
                className
            )}>
                <div className="text-center">
                    <div className="relative">
                        <Building className={cn(
                            sizeClasses[size], 
                            "animate-spin mx-auto mb-4 text-primary"
                        )} />
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

    // Badge variant (small corner indicator)
    if (variant === "badge") {
        return (
            <div className={cn(
                "bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md",
                "flex items-center gap-2",
                className
            )}>
                <div className={cn(
                    sizeClasses[size], 
                    "border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"
                )} />
                <span className={cn("text-slate-600", textSizeClasses[size])}>
                    {message}
                </span>
            </div>
        );
    }

    // Inline variant (content area)
    return (
        <div className={cn(
            height,
            "bg-slate-100 rounded-lg flex items-center justify-center",
            className
        )}>
            <div className="text-center">
                <div className="relative mb-4">
                    <Building className={cn(
                        sizeClasses[size], 
                        "animate-spin mx-auto text-emerald-500"
                    )} />
                    <div className={cn(
                        sizeClasses[size],
                        "absolute inset-0 mx-auto bg-emerald-500/20 rounded-full animate-pulse"
                    )} />
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <span className={cn("font-medium", textSizeClasses[size])}>
                        {message}
                    </span>
                </div>
            </div>
        </div>
    );
}
