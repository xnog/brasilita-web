"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
    MessageCircle,
    Check,
    AlertTriangle,
    Lock,
    X
} from "lucide-react";
import { Property } from "@/lib/db/schema";
import { PropertyDetailImage } from "./property-detail-image";

interface PropertyDetailModalProps {
    property: Property & { isInterested?: boolean; region?: { id: string; name: string } | null };
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
    const [loading, setLoading] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
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
        setShowConfirmationDialog(true);
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
                setShowConfirmationDialog(false);
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

    // Handle browser back button
    useEffect(() => {
        const handleBackButton = (e: PopStateEvent) => {
            if (isOpen) {
                e.preventDefault();
                onClose();
            }
        };

        if (isOpen) {
            // Push a new state when modal opens
            window.history.pushState({ modalOpen: true }, '', window.location.href);
            window.addEventListener('popstate', handleBackButton);
        }

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [isOpen, onClose]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent 
                className="max-w-none w-full h-full sm:max-w-7xl sm:w-[95vw] sm:h-[95vh] p-0 gap-0 flex flex-col [&>button]:hidden" 
            >
                <VisuallyHidden>
                    <DialogTitle>{property.title}</DialogTitle>
                </VisuallyHidden>
                
                <div className="flex-1 overflow-auto relative">
                    {/* Close Button */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                            onClick={onClose}
                        className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 p-0 shadow-lg border border-slate-200 cursor-pointer"
                                        >
                        <X className="h-5 w-5" />
                                        </Button>

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
                                        {formatPrice(property.price)}
                                    </div>
                                    <Badge variant="secondary" className="text-sm">
                                        {getPropertyTypeLabel(property.propertyType)}
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
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-4">
                                <div className="bg-white rounded-xl p-6 shadow-sm">
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
                                    {property.isInterested && !wantsToProceed && (
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

                                    {/* Success Message */}
                                    {wantsToProceed && (
                                        <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
                                            <div className="text-center space-y-4">
                                                <Check className="h-12 w-12 text-emerald-600 mx-auto" />
                                                <div className="space-y-3">
                                                    <h4 className="text-xl font-bold text-emerald-900">
                                                        Interesse confirmado com sucesso!
                                                    </h4>
                                                    <div className="text-emerald-800 space-y-3 leading-relaxed">
                                                        <p>
                                                            Nas próximas horas, nossa equipe entrará em contato para confirmar 
                                                            os detalhes e encaminhar seu perfil à imobiliária responsável pelo imóvel.
                                                        </p>
                                                        <p>
                                                            Enquanto isso, você pode acompanhar o status da solicitação acessando{" "}
                                                            <a 
                                                                href="/dashboard" 
                                                                className="font-semibold text-emerald-700 hover:text-emerald-900 underline decoration-emerald-300 hover:decoration-emerald-500 transition-colors"
                                                            >
                                                                dashboard
                                                            </a>.
                                                        </p>
                                                        <p className="pt-2">
                                                            A Brasilità segue ao seu lado para tornar o sonho do seu imóvel na Itália uma realidade.
                                                        </p>
                                                        <div className="pt-2 space-y-1">
                                                            <p className="font-medium">Um abraço,</p>
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
            </DialogContent>

            {/* Confirmation Dialog - Responsive */}
            <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
                <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto p-0 sm:max-w-2xl sm:w-[90vw] sm:max-h-[85vh] [&>button]:hidden">
                    <VisuallyHidden>
                        <DialogTitle>Atenção antes de confirmar seu interesse</DialogTitle>
                    </VisuallyHidden>
                    <div className="bg-white relative">
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowConfirmationDialog(false)}
                            className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full w-10 h-10 p-0 shadow-lg border border-slate-200 cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </Button>

                        {/* Header with Icon */}
                        <div className="flex items-center gap-3 p-4 pb-3 sm:gap-4 sm:p-6 sm:pb-4 border-b border-slate-200">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 sm:h-7 sm:w-7 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                                    Atenção antes de confirmar seu interesse
                                </h3>
                                <p className="text-slate-600 text-xs sm:text-sm">
                                    Leia atentamente as informações abaixo
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-4 py-4 space-y-4 sm:px-6 sm:py-5 sm:space-y-5">
                            {/* Main Warning */}
                            <div className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-200 shadow-sm">
                                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                                    A seleção de um imóvel é o primeiro passo real rumo à compra, por isso, antes de prosseguir,
                                    é importante estar ciente dos custos envolvidos na negociação além do valor do imóvel:
                                </p>
                            </div>

                            {/* Costs Section */}
                            <div className="bg-slate-50 rounded-lg p-4 sm:p-5 border border-slate-200 shadow-sm">
                                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                    <Euro className="h-4 w-4 text-blue-600" />
                                    Custos Adicionais
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <span className="font-medium text-slate-700">Taxas e comissões imobiliárias:</span>
                                            <br />
                                            <span className="text-slate-600 text-sm">entre €3.000 e €7.000</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <span className="font-medium text-slate-700">Imposto de registro:</span>
                                            <br />
                                            <span className="text-slate-600 text-sm">9% sobre o valor declarado do imóvel</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <span className="font-medium text-slate-700">Honorários do notário (cartório):</span>
                                            <br />
                                            <span className="text-slate-600 text-sm">entre €2.000 e €3.000</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Important Note */}
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <div className="flex items-start gap-3">
                                    <MessageCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-blue-800 text-sm leading-relaxed">
                                        <span className="font-medium">Esses valores são pagos diretamente às partes envolvidas na Itália</span>
                                        <br />
                                        (proprietário do imóvel, imobiliária, notário), a Brasilità atua apenas como plataforma de conexão e organização do processo.
                                    </p>
                                </div>
                            </div>

                            {/* Responsibility Warning */}
                            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                <div className="flex items-start gap-3 mb-3">
                                    <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-orange-800 font-medium text-sm">
                                        Só confirme o interesse se você realmente pretende avançar para uma possível negociação.
                                    </p>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed ml-8">
                                    Essa etapa envolve contato com a imobiliária licenciada e movimentações práticas.
                                    Pedimos responsabilidade para evitar o bloqueio de sua conta sem intenção real de compra.
                                </p>
                            </div>

                            {/* Legal Note */}
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                <div className="flex items-start gap-3">
                                    <Lock className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        <span className="font-medium">Sua seleção não gera nenhum compromisso legal,</span> mas sinaliza intenção séria de avaliar o imóvel.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Final Question and Actions */}
                        <div className="p-4 pt-3 sm:p-6 sm:pt-4 border-t border-slate-200 bg-slate-50">
                            <div className="text-center mb-4 sm:mb-5">
                                <p className="text-slate-800 font-semibold text-base sm:text-lg mb-2">Deseja confirmar seu interesse?</p>
                                <p className="text-slate-600 text-xs sm:text-sm">Esta ação iniciará o processo de negociação</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    onClick={handleConfirmProceed}
                                    disabled={loading}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3"
                                    size="lg"
                                >
                                    <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                    <span className="text-sm sm:text-base">Sim, confirmo meu interesse</span>
                                </Button>
                                <Button
                                    onClick={() => setShowConfirmationDialog(false)}
                                    disabled={loading}
                                    variant="outline"
                                    className="flex-1 border-slate-300 hover:bg-slate-50 py-3"
                                    size="lg"
                                >
                                    <span className="text-sm sm:text-base">Cancelar</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Dialog >
    );
}
