"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ArrowRight, CheckCircle2 } from "lucide-react";

interface PreferencesRequiredBannerProps {
    title: string;
    description: string;
    className?: string;
}

export function PreferencesRequiredBanner({ 
    title, 
    description, 
    className = ""
}: PreferencesRequiredBannerProps) {
    // Conteúdo padronizado para ambas as páginas
    const config = {
        cardTitle: "Configure suas Preferências",
        cardDescription: "Suas preferências de investimento são necessárias para personalizar sua experiência na plataforma",
        buttonText: "Configurar Preferências",
        features: [
            "Tipo de imóvel (residencial, comercial, investimento)",
            "Sua localização desejada na Itália", 
            "Seu perfil como comprador",
            "Tipo de uso pretendido",
            "Orçamento disponível"
        ],
        featureIntro: "Configure suas preferências informando:",
        maxWidth: "max-w-3xl"
    };

    return (
        <div className={className}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    {title}
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    {description}
                </p>
            </div>
            
            <Card className={`${config.maxWidth} bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/20`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Settings className="h-5 w-5 text-primary" />
                        </div>
                        {config.cardTitle}
                    </CardTitle>
                    <CardDescription className="text-base">
                        {config.cardDescription}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-medium text-foreground mb-3">
                            {config.featureIntro}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                            {config.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/50">
                        <Button size="lg" asChild className="w-full sm:w-auto">
                            <a href="/preferences">
                                <Settings className="h-4 w-4 mr-2" />
                                {config.buttonText}
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
