"use client";

import * as React from "react";
import { Property } from "@/lib/db/schema";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapPin, CheckCircle2, XIcon } from "lucide-react";
import { parsePropertyImages } from "@/lib/utils/property-parsing";
import { useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InsiderInterestModalProps {
    property: Omit<Property, 'originalUrl'> & {
        region?: { id: string; name: string; examples?: string | null; createdAt?: Date | null; updatedAt?: Date | null; } | null;
    };
    isOpen: boolean;
    onClose: () => void;
}

export function InsiderInterestModal({ property, isOpen, onClose }: InsiderInterestModalProps) {
    const images = useMemo(() => parsePropertyImages(property.images), [property.images]);
    const firstImage = images.length > 0 ? images[0] : '/api/placeholder/400/300';
    const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);

    const formattedPrice = useMemo(() => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(property.price);
    }, [property.price]);

    // Create portal container on mount
    useEffect(() => {
        const container = document.createElement('div');
        container.id = 'insider-modal-portal';
        container.style.position = 'fixed';
        container.style.zIndex = '10000';
        document.body.appendChild(container);
        setPortalContainer(container);

        return () => {
            if (container.parentNode) {
                document.body.removeChild(container);
            }
        };
    }, []);

    const handleKnowInsider = () => {
        // Redirecionar para a página do Insider
        window.open('/insider', '_blank');
    };

    const handleContinueExploring = () => {
        onClose();
    };

    // Don't render until container is ready
    if (!portalContainer) {
        return null;
    }

    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
            <DialogPrimitive.Portal container={portalContainer}>
                <DialogPrimitive.Overlay
                    className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    style={{ zIndex: 10000 }}
                />
                <DialogPrimitive.Content
                    className={cn(
                        "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
                        "max-w-xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto",
                        "bg-white rounded-lg border shadow-lg p-6",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                    )}
                    style={{ zIndex: 10001 }}
                >
                    {/* Close button */}
                    <DialogPrimitive.Close
                        className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none"
                    >
                        <XIcon className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>

                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-slate-900">
                            Interessado neste imóvel?
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Conheça a Brasilità Insider e tenha suporte completo para sua compra
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        {/* Property Card */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex gap-4">
                                {/* Property Image */}
                                <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200">
                                    <Image
                                        src={firstImage}
                                        alt={property.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Property Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-slate-900 text-sm line-clamp-2 mb-1">
                                        {property.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-slate-600 mb-1">
                                        <MapPin className="h-3 w-3 text-slate-400 flex-shrink-0" />
                                        <span className="truncate">
                                            {property.location}{property.region?.name ? `, ${property.region.name}` : ''}
                                        </span>
                                    </div>
                                    <div className="text-base font-bold text-slate-900">
                                        {formattedPrice}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Message */}
                        <div className="space-y-4">
                            <p className="text-slate-700 leading-relaxed">
                                A compra de imóveis na Itália envolve <strong className="text-slate-900">burocracia complexa, impostos específicos e riscos</strong> que podem custar milhares de euros.
                            </p>

                        <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg">
                            <p className="text-slate-800 font-medium mb-2">
                                A Brasilità Insider foi criada para ajudar brasileiros a comprarem com segurança:
                            </p>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span>Consultoria ao vivo com especialistas</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span>Curso completo sobre o processo de compra</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span>Ferramentas exclusivas</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span>Comunidade ativa de brasileiros investindo na Itália</span>
                                </li>
                            </ul>
                        </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-2">
                            <Button
                                onClick={handleKnowInsider}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base py-6"
                                size="lg"
                            >
                                Conhecer a Brasilità Insider
                            </Button>

                            <Button
                                onClick={handleContinueExploring}
                                variant="ghost"
                                className="w-full text-slate-600 hover:text-slate-900"
                                size="lg"
                            >
                                Continuar explorando imóveis
                            </Button>
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

