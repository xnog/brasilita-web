"use client";

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Property } from "@/lib/db/schema";
import { generatePropertyVisitMessage, openWhatsApp } from "@/lib/services/whatsapp-messages";

interface PropertyVisitButtonProps {
    property: Property & { region?: { name: string } | null };
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "default" | "lg";
    className?: string;
    showIcon?: boolean;
    children?: React.ReactNode;
}

export function PropertyVisitButton({
    property,
    variant = "outline",
    size = "default",
    className = "",
    showIcon = true,
    children
}: PropertyVisitButtonProps) {
    const handleVisitRequest = () => {
        const message = generatePropertyVisitMessage(property);
        openWhatsApp(message);
    };

    return (
        <Button
            onClick={handleVisitRequest}
            variant={variant}
            size={size}
            className={className}
        >
            {showIcon && <Camera className="w-4 h-4 mr-2" />}
            {children || "Solicitar Visita"}
        </Button>
    );
}

interface PropertyVisitFloatingButtonProps {
    property: Property & { region?: { name: string } | null };
}

export function PropertyVisitFloatingButton({ property }: PropertyVisitFloatingButtonProps) {
    const handleVisitRequest = () => {
        const message = generatePropertyVisitMessage(property);
        openWhatsApp(message);
    };

    return (
        <Button
            onClick={handleVisitRequest}
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white text-slate-700 border border-slate-200 shadow-sm"
        >
            <Camera className="w-3 h-3 mr-1" />
            Visita
        </Button>
    );
}
