"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Search, Home, LucideIcon } from "lucide-react";

// Mapa de ícones disponíveis
const iconMap: Record<string, LucideIcon> = {
    Search,
    Home,
};

interface ServiceCardProps {
    icon?: ReactNode | string;
    title: string;
    subtitle?: string;
    description: string;
    features: string[];
    onAction?: () => void;
    actionText?: string;
    actionVariant?: "default" | "outline" | "secondary";
    href?: string;
}

export function ServiceCard({
    icon,
    title,
    subtitle,
    description,
    features,
    onAction,
    actionText = "Acessar",
    actionVariant = "default",
    href
}: ServiceCardProps) {
    // Renderizar ícone baseado no tipo
    const renderIcon = () => {
        if (typeof icon === "string" && iconMap[icon]) {
            const IconComponent = iconMap[icon];
            return <IconComponent className="h-6 w-6 text-primary" />;
        }
        return icon;
    };

    const cardContent = (
        <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {renderIcon()}
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col pt-0">
                <p className="text-muted-foreground mb-6 text-center">
                    {description}
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>

                {href ? (
                    <Button asChild variant={actionVariant} className="w-full group">
                        <Link href={href}>
                            {actionText}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                ) : (
                    <Button
                        onClick={onAction}
                        variant={actionVariant}
                        className="w-full group"
                    >
                        {actionText}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                )}
            </CardContent>
        </Card>
    );

    return cardContent;
}
