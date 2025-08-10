"use client";

import { Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Loading({ 
    message = "Carregando...", 
    size = "md",
    className 
}: LoadingProps) {
    const sizeClasses = {
        sm: "h-5 w-5",
        md: "h-8 w-8", 
        lg: "h-12 w-12"
    };

    const containerClasses = {
        sm: "min-h-[200px]",
        md: "min-h-[400px]",
        lg: "min-h-[600px]"
    };

    return (
        <div className={cn("container mx-auto py-8", className)}>
            <div className={cn("flex items-center justify-center", containerClasses[size])}>
                <div className="text-center">
                    <Building className={cn(sizeClasses[size], "animate-spin mx-auto mb-4 text-primary")} />
                    <p className="text-muted-foreground">{message}</p>
                </div>
            </div>
        </div>
    );
}
