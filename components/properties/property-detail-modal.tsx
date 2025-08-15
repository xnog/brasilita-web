"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    MapPin,
    Bed,
    Bath,
    Square,
    ThumbsUp,
    ChevronLeft,
    ChevronRight,
    Car,
    Wifi,
    Dumbbell,
    ChefHat,
    Calendar,
    Euro,
    MessageCircle,
    Check
} from "lucide-react";
import { Property } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

interface PropertyDetailModalProps {
    property: Property & { isInterested?: boolean };
    isOpen: boolean;
    onClose: () => void;
    onToggleInterest: (propertyId: string, isInterested: boolean) => void;
}

const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('garage') || lowerFeature.includes('parking')) return Car;
    if (lowerFeature.includes('wifi') || lowerFeature.includes('internet')) return Wifi;
    if (lowerFeature.includes('gym') || lowerFeature.includes('academia')) return Dumbbell;
    if (lowerFeature.includes('kitchen') || lowerFeature.includes('cozinha')) return ChefHat;
    return null;
};

export function PropertyDetailModal({
    property,
    isOpen,
    onClose,
    onToggleInterest
}: PropertyDetailModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showNegotiationFlow, setShowNegotiationFlow] = useState(false);
    const [wantsToProceed, setWantsToProceed] = useState(false);

    const images = property.images
        ? (typeof property.images === 'string' ? JSON.parse(property.images) : property.images)
        : ['/api/placeholder/800/600'];
    const features = property.features
        ? (typeof property.features === 'string' ? JSON.parse(property.features) : property.features)
        : [];

    const handleToggleInterest = async () => {
        setLoading(true);
        try {
            await onToggleInterest(property.id, !property.isInterested);
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToNegotiation = () => {
        setShowNegotiationFlow(true);
    };

    const handleConfirmProceed = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/properties/interest', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId: property.id, wantsToProceed: true })
            });

            if (response.ok) {
                setWantsToProceed(true);
                setShowNegotiationFlow(false);
            } else {
                const errorData = await response.json();
                console.error('Erro ao confirmar interesse:', errorData.error);
                alert('Erro ao confirmar interesse. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao confirmar interesse:', error);
            alert('Erro ao confirmar interesse. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen || images.length <= 1) return;

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    previousImage();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    nextImage();
                    break;
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, images.length]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (date: Date | string | null) => {
        if (!date) return "Data não informada";

        const dateObj = typeof date === 'string' ? new Date(date) : date;

        // Check if the date is valid
        if (isNaN(dateObj.getTime())) {
            return "Data não informada";
        }

        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(dateObj);
    };

    const getPropertyTypeLabel = (type: string) => {
        const types = {
            'residential': 'Residencial',
            'commercial': 'Comercial',
            'investment': 'Investimento'
        };
        return types[type as keyof typeof types] || type;
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 gap-0 flex flex-col sm:max-w-7xl" onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader className="p-6 pb-0 flex-shrink-0">
                    <DialogTitle className="text-2xl font-bold text-slate-900">
                        {property.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-auto">
                    <div className="p-6 pt-4 space-y-6">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative w-full h-[50vh] overflow-hidden rounded-xl bg-slate-100">
                                <Image
                                    src={images[currentImageIndex]}
                                    alt={`${property.title} - Foto ${currentImageIndex + 1}`}
                                    fill
                                    className="object-cover"
                                />

                                {images.length > 1 && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 p-0 z-10"
                                            onClick={previousImage}
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 p-0 z-10"
                                            onClick={nextImage}
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>

                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                                            <span className="text-sm font-medium text-slate-700">
                                                {currentImageIndex + 1} / {images.length}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail gallery */}
                            {images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {images.map((image: string, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={cn(
                                                "relative aspect-[4/3] w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                                                index === currentImageIndex
                                                    ? "border-emerald-500"
                                                    : "border-transparent hover:border-slate-300"
                                            )}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Info */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Info */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Price and Type */}
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="text-3xl font-bold text-emerald-600">
                                        {formatPrice(property.price)}
                                    </div>
                                    <Badge variant="secondary" className="text-sm">
                                        {getPropertyTypeLabel(property.propertyType)}
                                    </Badge>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-slate-600">
                                    <MapPin className="h-5 w-5 text-emerald-500" />
                                    <span className="text-lg font-medium">{property.location}</span>
                                </div>

                                {/* Specs */}
                                <div className="flex flex-wrap gap-6">
                                    {property.bedrooms && (
                                        <div className="flex items-center gap-2">
                                            <Bed className="h-5 w-5 text-emerald-500" />
                                            <div>
                                                <div className="font-semibold text-slate-900">{property.bedrooms}</div>
                                                <div className="text-sm text-slate-500">Quartos</div>
                                            </div>
                                        </div>
                                    )}
                                    {property.bathrooms && (
                                        <div className="flex items-center gap-2">
                                            <Bath className="h-5 w-5 text-emerald-500" />
                                            <div>
                                                <div className="font-semibold text-slate-900">{property.bathrooms}</div>
                                                <div className="text-sm text-slate-500">Banheiros</div>
                                            </div>
                                        </div>
                                    )}
                                    {property.area && (
                                        <div className="flex items-center gap-2">
                                            <Square className="h-5 w-5 text-emerald-500" />
                                            <div>
                                                <div className="font-semibold text-slate-900">{property.area}m²</div>
                                                <div className="text-sm text-slate-500">Área</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-slate-900">Descrição</h3>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line break-words">
                                        {property.description || "Descrição não disponível."}
                                    </p>
                                </div>

                                {/* Features */}
                                {features.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold text-slate-900">Características</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {features.map((feature: string, index: number) => {
                                                const FeatureIcon = getFeatureIcon(feature);
                                                return (
                                                    <li key={index} className="flex items-center gap-3 py-2 px-3 bg-slate-50 rounded-lg border">
                                                        {FeatureIcon ? (
                                                            <FeatureIcon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                                        ) : (
                                                            <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0" />
                                                        )}
                                                        <span className="text-slate-700">{feature}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-4">
                                {/* Additional Info */}
                                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                                    <h4 className="font-semibold text-slate-900">Informações Adicionais</h4>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-slate-500" />
                                            <span className="text-slate-600">
                                                Anunciado em {formatDate(property.createdAt)}
                                            </span>
                                        </div>

                                        {property.area && (
                                            <div className="flex items-center gap-2">
                                                <Euro className="h-4 w-4 text-slate-500" />
                                                <span className="text-slate-600">
                                                    €{Math.round(property.price / property.area)}/m²
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Button
                                        onClick={handleToggleInterest}
                                        disabled={loading}
                                        className={property.isInterested
                                            ? "w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                                            : "w-full bg-slate-100 text-slate-700 hover:bg-emerald-50"
                                        }
                                        size="lg"
                                    >
                                        <ThumbsUp className="h-5 w-5 mr-2" />
                                        {property.isInterested ? "Interessado" : "Tenho interesse"}
                                    </Button>

                                    {/* Negotiation Flow */}
                                    {property.isInterested && !showNegotiationFlow && !wantsToProceed && (
                                        <Button
                                            onClick={handleProceedToNegotiation}
                                            disabled={loading}
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                                            size="lg"
                                        >
                                            <MessageCircle className="h-5 w-5 mr-2" />
                                            Prosseguir para Negociação
                                        </Button>
                                    )}

                                    {/* Confirmation Flow */}
                                    {showNegotiationFlow && (
                                        <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="text-center">
                                                <h4 className="font-semibold text-blue-900 mb-2">Confirmar Interesse</h4>
                                                <p className="text-sm text-blue-700 mb-4">
                                                    Ao confirmar, entraremos em contato em breve para iniciar a negociação.
                                                    Você confirma que tem interesse em comprar este imóvel?
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={handleConfirmProceed}
                                                    disabled={loading}
                                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                                                >
                                                    <Check className="h-4 w-4 mr-2" />
                                                    Sim, tenho interesse
                                                </Button>
                                                <Button
                                                    onClick={() => setShowNegotiationFlow(false)}
                                                    disabled={loading}
                                                    variant="outline"
                                                    className="flex-1"
                                                >
                                                    Cancelar
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Success Message */}
                                    {wantsToProceed && (
                                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                            <div className="text-center">
                                                <Check className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                                                <h4 className="font-semibold text-emerald-900 mb-1">Interesse Confirmado!</h4>
                                                <p className="text-sm text-emerald-700">
                                                    Entraremos em contato em breve para iniciar a negociação.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
}
