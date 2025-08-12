"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Eye, Car, Wifi, Dumbbell, ChefHat, X, ThumbsUp, ThumbsDown } from "lucide-react";
import { Property } from "@/lib/db/schema";
import { PropertyDetailModal } from "./property-detail-modal";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
    property: Property;
    isInterested: boolean;
    currentStatus?: "interested" | "rejected" | null;
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

export function PropertyCard({ 
    property, 
    isInterested, 
    currentStatus, 
    onToggleInterest, 
    onStatusChange, 
    onRemoveFromMatch 
}: PropertyCardProps) {
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [imageError, setImageError] = useState(false);

    const images = property.images ? JSON.parse(property.images) : [];
    const features = property.features ? JSON.parse(property.features) : [];
    const mainImage = images[0] || '/api/placeholder/400/300';

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
            // Se tem função de remover do match, chama ela também
            if (onRemoveFromMatch) {
                await onRemoveFromMatch(property.id);
            }
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getPropertyTypeLabel = (type: string) => {
        const types = {
            'residential': 'Residencial',
            'commercial': 'Comercial',
            'investment': 'Investimento'
        };
        return types[type as keyof typeof types] || type;
    };

    // Se o imóvel foi rejeitado, não mostra
    if (currentStatus === "rejected") {
        return null;
    }

    return (
        <>
            <Card className="group overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                {/* Image Section */}
                <div className="relative overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                        <img
                            src={imageError ? '/api/placeholder/400/300' : mainImage}
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={() => setImageError(true)}
                        />
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-white/90 text-slate-700 border-0 font-medium">
                            {getPropertyTypeLabel(property.propertyType)}
                        </Badge>
                        {images.length > 1 && (
                            <Badge variant="secondary" className="bg-white/90 text-slate-700 border-0 font-medium">
                                {images.length} fotos
                            </Badge>
                        )}
                    </div>

                    {/* Price overlay */}
                    <div className="absolute bottom-4 left-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                            <div className="text-2xl font-bold text-emerald-600">
                                {formatPrice(property.price)}
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white border-0 rounded-full w-10 h-10 p-0"
                            onClick={() => setShowDetails(true)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-4">
                    {/* Title and location */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-xl text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {property.title}
                        </h3>
                        
                        <div className="flex items-center text-slate-500">
                            <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                            <span className="text-sm font-medium">{property.location}</span>
                        </div>
                    </div>

                    {/* Property specs */}
                    <div className="flex items-center gap-6 text-slate-600">
                        {property.bedrooms && (
                            <div className="flex items-center gap-1">
                                <Bed className="h-4 w-4 text-emerald-500" />
                                <span className="text-sm font-medium">{property.bedrooms} quartos</span>
                            </div>
                        )}
                        {property.bathrooms && (
                            <div className="flex items-center gap-1">
                                <Bath className="h-4 w-4 text-emerald-500" />
                                <span className="text-sm font-medium">{property.bathrooms} banheiros</span>
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center gap-1">
                                <Square className="h-4 w-4 text-emerald-500" />
                                <span className="text-sm font-medium">{property.area}m²</span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                        {property.description}
                    </p>

                    {/* Features */}
                    {features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {features.slice(0, 4).map((feature: string, index: number) => {
                                const FeatureIcon = getFeatureIcon(feature);
                                return (
                                    <div key={index} className="flex items-center gap-1 bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs">
                                        {FeatureIcon && <FeatureIcon className="h-3 w-3" />}
                                        <span>{feature}</span>
                                    </div>
                                );
                            })}
                            {features.length > 4 && (
                                <div className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs">
                                    +{features.length - 4} mais
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            onClick={handleLike}
                            disabled={loading}
                            className={cn(
                                "flex-1 rounded-xl font-medium transition-all duration-200",
                                currentStatus === "interested" || isInterested
                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                                    : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200"
                            )}
                        >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            {currentStatus === "interested" || isInterested ? "Interessado" : "Tenho interesse"}
                        </Button>

                        {onStatusChange && (
                            <Button
                                onClick={handleDislike}
                                disabled={loading}
                                variant="outline"
                                className="px-4 rounded-xl border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                            >
                                <ThumbsDown className="h-4 w-4" />
                            </Button>
                        )}

                        <Button
                            onClick={() => setShowDetails(true)}
                            variant="outline"
                            className="px-4 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <PropertyDetailModal
                property={property}
                isOpen={showDetails}
                onClose={() => setShowDetails(false)}
                isInterested={isInterested || currentStatus === "interested"}
                onToggleInterest={onToggleInterest}
                onStatusChange={onStatusChange}
                onRemoveFromMatch={onRemoveFromMatch}
            />
        </>
    );
}
