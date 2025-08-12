"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    X, 
    MapPin, 
    Bed, 
    Bath, 
    Square, 
    Heart, 
    ThumbsUp, 
    ThumbsDown,
    ChevronLeft,
    ChevronRight,
    Car,
    Wifi,
    Dumbbell,
    ChefHat,
    Calendar,
    Euro
} from "lucide-react";
import { Property } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

interface PropertyDetailModalProps {
    property: Property;
    isOpen: boolean;
    onClose: () => void;
    isInterested: boolean;
    onToggleInterest: (propertyId: string, isInterested: boolean) => void;
    onStatusChange?: (propertyId: string, status: "interested" | "rejected") => Promise<void>;
    onRemoveFromMatch?: (propertyId: string) => void;
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
    isInterested,
    onToggleInterest,
    onStatusChange,
    onRemoveFromMatch
}: PropertyDetailModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const images = property.images ? JSON.parse(property.images) : ['/api/placeholder/800/600'];
    const features = property.features ? JSON.parse(property.features) : [];

    const handleLike = async () => {
        setLoading(true);
        try {
            if (onStatusChange) {
                await onStatusChange(property.id, "interested");
            } else {
                await onToggleInterest(property.id, true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDislike = async () => {
        setLoading(true);
        try {
            if (onStatusChange) {
                await onStatusChange(property.id, "rejected");
            }
            if (onRemoveFromMatch) {
                await onRemoveFromMatch(property.id);
            }
            onClose();
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-full h-[90vh] p-0 gap-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold text-slate-900">
                        {property.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-6 pt-4 space-y-6">
                            {/* Image Gallery */}
                            <div className="space-y-4">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                                    <img
                                        src={images[currentImageIndex]}
                                        alt={`${property.title} - Foto ${currentImageIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    {images.length > 1 && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 p-0"
                                                onClick={previousImage}
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 p-0"
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
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
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
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                            {property.description || "Descrição não disponível."}
                                        </p>
                                    </div>

                                    {/* Features */}
                                    {features.length > 0 && (
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-slate-900">Características</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {features.map((feature: string, index: number) => {
                                                    const FeatureIcon = getFeatureIcon(feature);
                                                    return (
                                                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                                                {FeatureIcon ? (
                                                                    <FeatureIcon className="h-4 w-4 text-emerald-600" />
                                                                ) : (
                                                                    <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                                                                )}
                                                            </div>
                                                            <span className="text-slate-700 font-medium">{feature}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
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
                                            onClick={handleLike}
                                            disabled={loading}
                                            className={cn(
                                                "w-full rounded-xl font-medium transition-all duration-200",
                                                isInterested
                                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                                                    : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200"
                                            )}
                                            size="lg"
                                        >
                                            <ThumbsUp className="h-5 w-5 mr-2" />
                                            {isInterested ? "Interessado" : "Tenho interesse"}
                                        </Button>

                                        {onStatusChange && (
                                            <Button
                                                onClick={handleDislike}
                                                disabled={loading}
                                                variant="outline"
                                                size="lg"
                                                className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                                            >
                                                <ThumbsDown className="h-5 w-5 mr-2" />
                                                Não tenho interesse
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
