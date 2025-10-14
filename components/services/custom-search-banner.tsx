"use client";

import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { generatePropertyAdvisoryMessage, openWhatsApp } from "@/lib/services/whatsapp-messages";

interface CustomSearchBannerProps {
    variant?: "default" | "empty-results";
    className?: string;
}

export function CustomSearchBanner({ variant = "default", className = "" }: CustomSearchBannerProps) {
    const isEmptyResults = variant === "empty-results";

    return (
        <div className={`border-t border-border/40 pt-8 ${className}`}>
            <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                        <Search className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-medium text-muted-foreground">
                        {isEmptyResults
                            ? "Não encontrou o que procura?"
                            : "Não encontrou o imóvel ideal?"
                        }
                    </h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4 max-w-2xl mx-auto">
                    Nossa assessoria completa pode ajudar você a encontrar e adquirir o imóvel perfeito na Itália.
                </p>

                <Button
                    variant="outline"
                    size="sm"
                    className="group"
                    onClick={() => {
                        const message = generatePropertyAdvisoryMessage();
                        openWhatsApp(message);
                    }}
                >
                    <Search className="w-3 h-3 mr-2" />
                    Assessoria de Compra
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
}
