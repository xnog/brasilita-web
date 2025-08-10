"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Heart, MapPin, Bed, Bath, Square, MoreVertical, X } from "lucide-react";
import { Property } from "@/lib/db/schema";
import { PropertyActions } from "./property-actions";

interface PropertyCardProps {
    property: Property;
    isInterested: boolean;
    currentStatus?: "interested" | "rejected" | null;
    onToggleInterest: (propertyId: string, isInterested: boolean) => void;
    onStatusChange?: (propertyId: string, status: "interested" | "rejected") => Promise<void>;
    onRemoveFromMatch?: (propertyId: string) => void;
}

export function PropertyCard({ 
    property, 
    isInterested, 
    currentStatus, 
    onToggleInterest, 
    onStatusChange, 
    onRemoveFromMatch 
}: PropertyCardProps) {
    const [loading, setLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);

    const handleToggleInterest = async () => {
        setLoading(true);
        try {
            await onToggleInterest(property.id, !isInterested);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromMatch = async () => {
        if (!onRemoveFromMatch) return;
        
        setRemoveLoading(true);
        try {
            await onRemoveFromMatch(property.id);
        } finally {
            setRemoveLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR',
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

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
                <div className="relative">
                    <img
                        src={property.images ? JSON.parse(property.images)[0] : '/api/placeholder/400/300'}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                        <Badge variant="secondary">
                            {getPropertyTypeLabel(property.propertyType)}
                        </Badge>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`p-2 rounded-full ${isInterested 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'bg-white/80 text-gray-600 hover:bg-white'
                            }`}
                            onClick={handleToggleInterest}
                            disabled={loading}
                        >
                            <Heart 
                                className={`h-4 w-4 ${isInterested ? 'fill-current' : ''}`}
                            />
                        </Button>
                        
                        {onRemoveFromMatch && (
                            <Dialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <X className="h-4 w-4 mr-2" />
                                                Remover do match
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Remover imóvel do match</DialogTitle>
                                        <DialogDescription>
                                            Tem certeza que deseja remover este imóvel da sua lista de matches? 
                                            Esta ação não pode ser desfeita e o imóvel não aparecerá mais nas suas recomendações.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline">
                                            Cancelar
                                        </Button>
                                        <Button 
                                            variant="destructive" 
                                            onClick={handleRemoveFromMatch}
                                            disabled={removeLoading}
                                        >
                                            {removeLoading ? "Removendo..." : "Remover"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="p-4">
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-1">
                        {property.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-2">
                        {property.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {property.bedrooms && (
                            <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1" />
                                {property.bedrooms}
                            </div>
                        )}
                        {property.bathrooms && (
                            <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                {property.bathrooms}
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center">
                                <Square className="h-4 w-4 mr-1" />
                                {property.area}m²
                            </div>
                        )}
                    </div>
                    
                    {property.features && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {JSON.parse(property.features).slice(0, 3).map((feature: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {feature}
                                </Badge>
                            ))}
                            {JSON.parse(property.features).length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{JSON.parse(property.features).length - 3} mais
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 space-y-3">
                <div className="flex justify-between items-center w-full">
                    <div className="text-2xl font-bold text-green-600">
                        {formatPrice(property.price)}
                    </div>
                </div>
                
                {/* Property Actions */}
                {onStatusChange ? (
                    <div className="w-full">
                        <PropertyActions
                            propertyId={property.id}
                            currentStatus={currentStatus}
                            onStatusChange={onStatusChange}
                            isLoading={loading}
                        />
                    </div>
                ) : (
                    <Button 
                        variant={isInterested ? "default" : "outline"}
                        size="sm"
                        onClick={handleToggleInterest}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "..." : isInterested ? "Interessado" : "Tenho interesse"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
