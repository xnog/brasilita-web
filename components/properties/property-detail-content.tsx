"use client";

import { useState, useMemo } from "react";
import { Property } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Bed,
    Bath,
    Square,
    ThumbsUp,
    Calendar,
    Euro,
    Hash,
    X,
    Building2,
    HelpCircle,
    Home,
    CreditCard,
    Key,
    MessageCircle
} from "lucide-react";
import { PropertyDetailImage } from "./property-detail-image";
import { PropertyMap } from "./property-map";
import { getPropertyCode } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { parsePropertyImages, parsePropertyFeatures } from "@/lib/utils/property-parsing";

interface PropertyDetailContentProps {
    property: Omit<Property, 'originalUrl'> & {
        isInterested?: boolean;
        interestNotes?: string | null;
        region?: { id: string; name: string; examples?: string | null; createdAt?: Date | null; updatedAt?: Date | null; } | null;
    };
    onToggleInterest: (propertyId: string, isInterested: boolean) => void;
    showCloseButton?: boolean;
    onClose?: () => void;
}


export function PropertyDetailContent({
    property,
    onToggleInterest,
    showCloseButton = false,
    onClose
}: PropertyDetailContentProps) {
    const [loading, setLoading] = useState(false);

    // Memoizar parsing para melhor performance
    const images = useMemo(() => parsePropertyImages(property.images), [property.images]);
    const features = useMemo(() => parsePropertyFeatures(property.features), [property.features]);

    const handleToggleInterest = async () => {
        setLoading(true);
        try {
            onToggleInterest(property.id, !property.isInterested);
        } finally {
            setLoading(false);
        }
    };

    // Memoizar formatações para evitar re-computação
    const formattedPrice = useMemo(() => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(property.price);
    }, [property.price]);

    const formattedDate = useMemo(() => {
        if (!property.createdAt) return "Data não informada";

        const dateObj = typeof property.createdAt === 'string' ? new Date(property.createdAt) : property.createdAt;

        if (isNaN(dateObj.getTime())) {
            return "Data não informada";
        }

        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(dateObj);
    }, [property.createdAt]);

    const propertyTypeLabel = useMemo(() => {
        const types = {
            'residential': 'Residencial',
            'commercial': 'Comercial',
            'investment': 'Investimento'
        };
        return types[property.propertyType as keyof typeof types] || property.propertyType;
    }, [property.propertyType]);

    const pricePerSqm = useMemo(() => {
        if (!property.area) return null;
        return Math.round(property.price / property.area);
    }, [property.price, property.area]);

    return (
        <div className="flex flex-col h-full">
            {/* Header with close button - only for modal */}
            {showCloseButton && onClose && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 p-0 shadow-lg border border-slate-200 cursor-pointer"
                >
                    <X className="h-5 w-5" />
                </Button>
            )}

            {/* Content */}
            <div className="p-4 sm:p-6 pt-4 space-y-6">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <PropertyDetailImage
                        images={images}
                        propertyTitle={property.title}
                    />
                </div>

                {/* Property Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                                {property.title}
                            </h1>
                            <div className="flex items-center gap-2 text-slate-600">
                                <MapPin className="h-5 w-5 text-emerald-500" />
                                <span className="text-lg font-medium">
                                    {property.location}{property.region?.name ? `, ${property.region.name}` : ''}
                                </span>
                            </div>
                        </div>

                        {/* Price and Type */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="text-3xl font-bold text-emerald-600">
                                {formattedPrice}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {propertyTypeLabel && (
                                    <Badge variant="secondary" className="text-sm">
                                        {propertyTypeLabel}
                                    </Badge>
                                )}
                                {property.isRentToOwn && (
                                    <Badge variant="outline" className="text-sm border-blue-200 text-blue-700 bg-blue-50">
                                        <CreditCard className="h-3 w-3 mr-1" />
                                        Affitto a riscatto
                                    </Badge>
                                )}
                                {property.isRented && (
                                    <Badge variant="outline" className="text-sm border-orange-200 text-orange-700 bg-orange-50">
                                        <Key className="h-3 w-3 mr-1" />
                                        Alugado
                                    </Badge>
                                )}
                            </div>
                        </div>



                        {/* Specs */}
                        <div className="flex flex-wrap gap-6">
                            {property.rooms != null && Number(property.rooms) > 0 && (
                                <div className="flex items-center gap-2">
                                    <Home className="h-5 w-5 text-emerald-500" />
                                    <span className="font-semibold text-slate-900">{property.rooms} {Number(property.rooms) === 1 ? 'cômodo' : 'cômodos'}</span>
                                </div>
                            )}
                            {property.bedrooms != null && Number(property.bedrooms) > 0 && (
                                <div className="flex items-center gap-2">
                                    <Bed className="h-5 w-5 text-emerald-500" />
                                    <span className="font-semibold text-slate-900">{property.bedrooms} {Number(property.bedrooms) === 1 ? 'quarto' : 'quartos'}</span>
                                </div>
                            )}
                            {property.bathrooms != null && Number(property.bathrooms) > 0 && (
                                <div className="flex items-center gap-2">
                                    <Bath className="h-5 w-5 text-emerald-500" />
                                    <span className="font-semibold text-slate-900">{property.bathrooms} {Number(property.bathrooms) === 1 ? 'banheiro' : 'banheiros'}</span>
                                </div>
                            )}
                            {property.area != null && Number(property.area) > 0 && (
                                <div className="flex items-center gap-2">
                                    <Square className="h-5 w-5 text-emerald-500" />
                                    <span className="font-semibold text-slate-900">{property.area}m²</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-slate-900">Descrição</h3>
                            <div className="text-slate-600 leading-relaxed break-words prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-semibold prose-p:text-slate-600 prose-strong:text-slate-900 prose-ul:text-slate-600 prose-ol:text-slate-600">
                                <ReactMarkdown>
                                    {(property.description || "Descrição não disponível.")
                                        .replace(/\\n/g, '\n')
                                        .replace(/\n/g, '  \n')}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Help Section */}
                        <div className="bg-slate-50/50 rounded-lg p-4 border-l-4 border-slate-200">
                            <div className="flex items-start gap-3">
                                <HelpCircle className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="text-slate-600 mb-1">
                                        <span className="font-medium">Primeira vez comprando na Itália?</span>
                                    </p>
                                    <p className="text-slate-500 text-xs">
                                        Confira nossa seção de{" "}
                                        <button
                                            onClick={() => window.open('/faq', '_blank')}
                                            className="text-slate-700 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors"
                                        >
                                            perguntas frequentes
                                        </button>
                                        {" "}para esclarecer dúvidas sobre custos, documentação e processo.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        {features.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-slate-900">Características</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2">
                                    {features
                                        .filter((feature): feature is string => typeof feature === 'string')
                                        .sort((a: string, b: string) => a.localeCompare(b, 'pt-BR', { numeric: true }))
                                        .map((feature: string, index: number) => (
                                            <div key={index} className="flex items-center gap-2 py-1 text-slate-700">
                                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full flex-shrink-0" />
                                                <span className="text-sm leading-tight">{feature}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Map */}
                        <PropertyMap
                            latitude={property.latitude}
                            longitude={property.longitude}
                            propertyTitle={property.title}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            {/* Additional Info */}
                            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                                <h4 className="font-semibold text-slate-900">Informações Adicionais</h4>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Hash className="h-4 w-4 text-slate-500" />
                                        <span className="text-slate-600">
                                            Código <span className="font-mono font-semibold text-slate-800">{getPropertyCode(property.id)}</span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-slate-500" />
                                        <span className="text-slate-600">
                                            Anunciado em {formattedDate}
                                        </span>
                                    </div>

                                    {property.realEstate && (
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-slate-500" />
                                            <span className="text-slate-600">
                                                Anúncio de <span className="font-medium text-slate-800">{property.realEstate}</span>
                                            </span>
                                        </div>
                                    )}

                                    {property.area && (
                                        <div className="flex items-center gap-2">
                                            <Euro className="h-4 w-4 text-slate-500" />
                                            <span className="text-slate-600">
                                                €{pricePerSqm}/m²
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 mt-3">
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
                                    {property.isInterested ? "Favoritado" : "Adicionar aos Favoritos"}
                                </Button>

                                {/* Interest Flow - Advisory */}
                                <div className="space-y-2">
                                    <Button
                                        onClick={() => window.location.href = `/advisory?propertyId=${property.id}`}
                                        disabled={loading}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                        size="lg"
                                    >
                                        <MessageCircle className="h-5 w-5 mr-2" />
                                        Estou Interessado
                                    </Button>
                                    <p className="text-xs text-center text-slate-500">
                                        Conheça nossa assessoria para comprar com segurança
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
