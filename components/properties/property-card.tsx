"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Car, Wifi, Dumbbell, ChefHat, ChevronLeft, ChevronRight } from "lucide-react";
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
    const [showDetails, setShowDetails] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Touch/swipe states
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    // Memoizar parsing de JSON para evitar re-processing
    const images = useMemo(() => {
        if (!property.images) return [];
        return typeof property.images === 'string' ? JSON.parse(property.images) : property.images;
    }, [property.images]);

    const features = useMemo(() => {
        if (!property.features) return [];
        return typeof property.features === 'string' ? JSON.parse(property.features) : property.features;
    }, [property.features]);

    const currentImage = useMemo(() => {
        return images[currentImageIndex] || '/api/placeholder/400/300';
    }, [images, currentImageIndex]);



    const formattedPrice = useMemo(() => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(property.price);
    }, [property.price]);



    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const previousImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Touch/swipe handlers
    const minSwipeDistance = 50;

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        if (images.length <= 1) return;
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(false);
    }, [images.length]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (images.length <= 1 || touchStart === null) return;
        setTouchEnd(e.targetTouches[0].clientX);
        setIsDragging(true);
        // Prevent default to avoid scrolling while swiping images
        e.preventDefault();
    }, [images.length, touchStart]);

    const onTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!touchStart || !touchEnd || images.length <= 1) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            e.stopPropagation();
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        } else if (isRightSwipe) {
            e.stopPropagation();
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }

        setTouchStart(null);
        setTouchEnd(null);
        setIsDragging(false);
    }, [touchStart, touchEnd, images.length, minSwipeDistance]);

    const handleImageClick = useCallback((e: React.MouseEvent) => {
        if (isDragging) {
            e.stopPropagation();
            return;
        }
    }, [isDragging]);

    return (
        <>
            <Card
                className="group overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border-0 rounded-2xl cursor-pointer flex flex-col"
                onClick={() => setShowDetails(true)}
            >
                {/* Image Section */}
                <div
                    ref={imageContainerRef}
                    className="relative overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onClick={handleImageClick}
                >
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
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-8 h-8 p-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                                onClick={previousImage}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-8 h-8 p-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
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
                                {formattedPrice}
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
                    <div className="space-y-4">
                        {/* Title and location */}
                        <div className="space-y-2">
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
                        <div className="flex items-center gap-6 text-slate-600 pt-1">
                            {property.bedrooms != null && Number(property.bedrooms) > 0 && (
                                <div className="flex items-center gap-1">
                                    <Bed className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm font-medium">
                                        {property.bedrooms} {Number(property.bedrooms) === 1 ? 'quarto' : 'quartos'}
                                    </span>
                                </div>
                            )}
                            {property.bathrooms != null && Number(property.bathrooms) > 0 && (
                                <div className="flex items-center gap-1">
                                    <Bath className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm font-medium">
                                        {property.bathrooms} {Number(property.bathrooms) === 1 ? 'banheiro' : 'banheiros'}
                                    </span>
                                </div>
                            )}
                            {property.area != null && Number(property.area) > 0 && (
                                <div className="flex items-center gap-1">
                                    <Square className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm font-medium">{property.area}m²</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="pt-1">
                            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                                {property.description}
                            </p>
                        </div>

                        {/* Features */}
                        {features.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
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
