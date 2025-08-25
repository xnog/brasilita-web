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
    Car,
    Wifi,
    Dumbbell,
    ChefHat,
    Calendar,
    Euro,
    Hash,
    Check,
    X,
    Phone
} from "lucide-react";
import { PropertyDetailImage } from "./property-detail-image";
import { PropertyMap } from "./property-map";
import { getPropertyCode } from "@/lib/utils";

interface PropertyDetailContentProps {
    property: Property & {
        isInterested?: boolean;
        interestNotes?: string | null;
        region?: { id: string; name: string } | null;
    };
    onToggleInterest: (propertyId: string, isInterested: boolean) => void;
    showCloseButton?: boolean;
    onClose?: () => void;
}

const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('garage') || lowerFeature.includes('parking')) return Car;
    if (lowerFeature.includes('wifi') || lowerFeature.includes('internet')) return Wifi;
    if (lowerFeature.includes('gym') || lowerFeature.includes('academia')) return Dumbbell;
    if (lowerFeature.includes('kitchen') || lowerFeature.includes('cozinha')) return ChefHat;
    return null;
};

export function PropertyDetailContent({
    property,
    onToggleInterest,
    showCloseButton = false,
    onClose
}: PropertyDetailContentProps) {
    const [loading, setLoading] = useState(false);
    const [wantsToProceed, setWantsToProceed] = useState(false);

    // Memoizar parsing para melhor performance
    const images = useMemo(() => {
        if (!property.images) return ['/api/placeholder/800/600'];
        return typeof property.images === 'string' ? JSON.parse(property.images) : property.images;
    }, [property.images]);

    const features = useMemo(() => {
        if (!property.features) return [];
        return typeof property.features === 'string' ? JSON.parse(property.features) : property.features;
    }, [property.features]);

    const handleToggleInterest = async () => {
        setLoading(true);
        try {
            await onToggleInterest(property.id, !property.isInterested);
        } finally {
            setLoading(false);
        }
    };

    const openWhatsApp = (propertyCode: string, message: string) => {
        const phoneNumber = "393515295913";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Tentar abrir em nova aba primeiro
        const newWindow = window.open(whatsappUrl, '_blank');

        // Se o popup foi bloqueado, usar redirecionamento direto
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = whatsappUrl;
        }
    };

    const handleProceedToNegotiation = async () => {
        setLoading(true);
        try {
            // Registrar o interesse em prosseguir no banco de dados
            const response = await fetch('/api/properties/interest', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    propertyId: property.id,
                    wantsToProceed: true
                })
            });

            if (!response.ok) {
                console.error('Erro ao registrar interesse em prosseguir');
                // Continue mesmo se houver erro no registro, não queremos bloquear o usuário
            } else {
                // Atualizar o estado local se o registro foi bem-sucedido
                setWantsToProceed(true);
            }

            // Criar mensagem pré-preenchida para WhatsApp
            const propertyCode = getPropertyCode(property.id);
            const message = `Olá! Tenho interesse no imóvel código ${propertyCode} - ${property.title}. Gostaria de receber mais informações. Obrigado!`;

            // Abrir WhatsApp com fallback para bloqueio de popup
            openWhatsApp(propertyCode, message);

        } catch (error) {
            console.error('Erro ao registrar interesse:', error);
            // Continue mesmo se houver erro, não queremos bloquear o usuário

            // Criar mensagem pré-preenchida para WhatsApp mesmo com erro
            const propertyCode = getPropertyCode(property.id);
            const message = `Olá! Tenho interesse no imóvel código ${propertyCode} - ${property.title}. Gostaria de receber mais informações. Obrigado!`;

            // Abrir WhatsApp com fallback para bloqueio de popup
            openWhatsApp(propertyCode, message);
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
                            <Badge variant="secondary" className="text-sm">
                                {propertyTypeLabel}
                            </Badge>
                        </div>

                        {/* Specs */}
                        <div className="flex flex-wrap gap-6">
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
                                            Código: <span className="font-mono font-semibold text-slate-800">{getPropertyCode(property.id)}</span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-slate-500" />
                                        <span className="text-slate-600">
                                            Anunciado em {formattedDate}
                                        </span>
                                    </div>

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
                                    {property.isInterested ? "Favoritado" : "Adicionar aos Favoritos"}
                                </Button>

                                {/* Negotiation Flow */}
                                <div className="space-y-2">
                                    <Button
                                        onClick={handleProceedToNegotiation}
                                        disabled={loading}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                                        size="lg"
                                    >
                                        <Phone className="h-5 w-5 mr-2" />
                                        Negociar via WhatsApp
                                    </Button>
                                    <p className="text-xs text-center text-slate-500">
                                        Conecte-se diretamente com nossa equipe
                                    </p>
                                </div>

                                {/* Success Message */}
                                {wantsToProceed && (
                                    <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
                                        <div className="text-center space-y-4">
                                            <Check className="h-12 w-12 text-emerald-600 mx-auto" />
                                            <div className="space-y-3">
                                                <h4 className="text-xl font-bold text-emerald-900">
                                                    Contato iniciado com sucesso!
                                                </h4>
                                                <div className="text-emerald-800 space-y-3 leading-relaxed">
                                                    <p>
                                                        Você foi redirecionado para o WhatsApp da nossa equipe.
                                                        Continue a conversa por lá para receber todas as informações
                                                        sobre este imóvel e dar os próximos passos.
                                                    </p>

                                                    <div className="p-4 bg-emerald-100 rounded-lg border border-emerald-300">
                                                        <p className="text-sm font-medium text-emerald-800 mb-2">
                                                            📱 Se o WhatsApp não abrir automaticamente:
                                                        </p>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span className="text-emerald-700 font-semibold">
                                                                +39 351 529 5913
                                                            </span>
                                                            <button
                                                                onClick={() => navigator.clipboard.writeText('+393515295913')}
                                                                className="text-xs bg-emerald-200 hover:bg-emerald-300 text-emerald-800 px-2 py-1 rounded transition-colors"
                                                                title="Copiar número"
                                                            >
                                                                Copiar
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <p>
                                                        Você pode acompanhar seus imóveis de interesse acessando o{" "}
                                                        <a
                                                            href="/dashboard"
                                                            className="font-semibold text-emerald-700 hover:text-emerald-900 underline decoration-emerald-300 hover:decoration-emerald-500 transition-colors"
                                                        >
                                                            dashboard
                                                        </a>.
                                                    </p>
                                                    <p className="pt-2">
                                                        A Brasilità está aqui para tornar o sonho do seu imóvel na Itália uma realidade.
                                                    </p>
                                                    <div className="pt-2 space-y-1">
                                                        <p className="font-medium">Boa sorte na sua jornada!</p>
                                                        <p className="text-emerald-700 font-semibold">
                                                            Equipe Brasilità - do sonho à chave.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
