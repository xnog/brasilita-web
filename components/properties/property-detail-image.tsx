"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyDetailImageProps {
    images: string[];
    propertyTitle: string;
    className?: string;
}

export function PropertyDetailImage({ images, propertyTitle, className }: PropertyDetailImageProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
    
    // Touch/swipe states
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const imageContainerRef = useRef<HTMLDivElement>(null);

    const validImages = images.length > 0 ? images : ['/api/placeholder/800/600'];
    const currentImage = validImages[currentImageIndex];

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }, [validImages.length]);

    const previousImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }, [validImages.length]);

    const handleImageError = (index: number) => {
        setImageError(prev => ({ ...prev, [index]: true }));
    };

    // Touch/swipe handlers
    const minSwipeDistance = 50;

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        if (validImages.length <= 1) return;
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, [validImages.length]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (validImages.length <= 1 || touchStart === null) return;
        setTouchEnd(e.targetTouches[0].clientX);
        // Prevent default to avoid scrolling while swiping images
        e.preventDefault();
    }, [validImages.length, touchStart]);

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd || validImages.length <= 1) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
        } else if (isRightSwipe) {
            setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
        }
        
        setTouchStart(null);
        setTouchEnd(null);
    }, [touchStart, touchEnd, validImages.length, minSwipeDistance]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (validImages.length <= 1) return;

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

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [validImages.length, nextImage, previousImage]);

    return (
        <div className={cn("space-y-4 p-4", className)}>
            {/* Main Image - Full display without cropping */}
            <div 
                ref={imageContainerRef}
                className="relative w-full h-[40vh] min-h-[300px] md:h-[50vh] md:min-h-[400px] overflow-hidden rounded-xl bg-slate-100"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <Image
                    src={imageError[currentImageIndex] ? '/api/placeholder/800/600' : currentImage}
                    alt={`${propertyTitle} - Foto ${currentImageIndex + 1}`}
                    fill
                    className="object-contain" // Changed from object-cover to object-contain to show full image
                    onError={() => handleImageError(currentImageIndex)}
                    priority={currentImageIndex === 0}
                />

                {/* Navigation arrows - only show if multiple images */}
                {validImages.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 md:w-12 md:h-12 md:left-4 p-0 z-10 shadow-lg touch-manipulation"
                            onClick={previousImage}
                        >
                            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 md:w-12 md:h-12 md:right-4 p-0 z-10 shadow-lg touch-manipulation"
                            onClick={nextImage}
                        >
                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                        </Button>

                        {/* Image counter */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 md:bottom-4 md:px-4 md:py-2">
                            <span className="text-xs md:text-sm font-medium text-white">
                                {currentImageIndex + 1} / {validImages.length}
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* Thumbnail gallery - only show if multiple images */}
            {validImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    {validImages.map((image: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={cn(
                                "relative aspect-[4/3] w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:opacity-80",
                                index === currentImageIndex
                                    ? "border-emerald-500 ring-2 ring-emerald-200"
                                    : "border-slate-200 hover:border-slate-400"
                            )}
                        >
                            <Image
                                src={imageError[index] ? '/api/placeholder/400/300' : image}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                onError={() => handleImageError(index)}
                            />
                            {/* Selected indicator */}
                            {index === currentImageIndex && (
                                <div className="absolute inset-0 bg-emerald-500/20" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
