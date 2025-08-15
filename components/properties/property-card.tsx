"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Car, Wifi, Dumbbell, ChefHat, ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Property } from "@/lib/db/schema";
import { PropertyDetailModal } from "./property-detail-modal";

interface PropertyCardProps {
    property: Property & { isInterested?: boolean; region?: { id: string; name: string } | null };
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

export function PropertyCard({ property, onToggleInterest }: PropertyCardProps) {
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = property.images
        ? (typeof property.images === 'string' ? JSON.parse(property.images) : property.images)
        : [];
    const features = property.features
        ? (typeof property.features === 'string' ? JSON.parse(property.features) : property.features)
        : [];
    const currentImage = images[currentImageIndex] || '/api/placeholder/400/300';

    const handleToggleInterest = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setLoading(true);
        try {
            await onToggleInterest(property.id, !property.isInterested);
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

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const previousImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <Card
                className="group overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border-0 rounded-2xl cursor-pointer flex flex-col"
                onClick={() => setShowDetails(true)}
            >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                        <Image
                            src={imageError ? '/api/placeholder/400/300' : currentImage}
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={() => setImageError(true)}
                        />
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Image navigation arrows */}
                    {images.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={previousImage}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={nextImage}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </>
                    )}

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {/* <Badge variant="secondary" className="bg-white/90 text-slate-700 border-0 font-medium">
                            {getPropertyTypeLabel(property.propertyType)}
                        </Badge> */}
                        {images.length > 1 && (
                            <Badge variant="secondary" className="bg-white/90 text-slate-700 border-0 font-medium">
                                {currentImageIndex + 1}/{images.length}
                            </Badge>
                        )}
                        {property.isRented && (
                            <Badge variant="secondary" className="bg-white/90 text-slate-700 border-0 font-medium">
                                Alugado
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

                    {/* Image dots indicator */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 right-4">
                            <div className="flex gap-1">
                                {images.map((_: string, index: number) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                            ? 'bg-white'
                                            : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <CardContent className="p-4 flex flex-col flex-1">
                    <div className="space-y-2">
                        {/* Title and location */}
                        <div className="space-y-1">
                            <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                {property.title}
                            </h3>

                            <div className="flex items-center text-slate-500">
                                <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                                <span className="text-sm font-medium">
                                    {property.location}{property.region?.name ? `, ${property.region.name}` : ''}
                                </span>
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
                    </div>

                    {/* Action button - sempre na mesma posição */}
                    <div className="mt-auto pt-3">
                        <Button
                            onClick={handleToggleInterest}
                            disabled={loading}
                            className={property.isInterested
                                ? "w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                                : "w-full bg-slate-100 text-slate-700 hover:bg-emerald-50"
                            }
                        >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            {property.isInterested ? "Interessado" : "Tenho interesse"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <PropertyDetailModal
                property={property}
                isOpen={showDetails}
                onClose={() => setShowDetails(false)}
                onToggleInterest={onToggleInterest}
            />
        </>
    );
}
