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
    Check,
    AlertTriangle,
    Shield,
    Lock
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
            </DialogContent>

            {/* Confirmation Dialog - Centered */}
            <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
                <DialogContent className="max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto p-0">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50">
                        {/* Header with Icon */}
                        <div className="flex items-center gap-4 p-6 pb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <AlertTriangle className="h-7 w-7 text-amber-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-amber-900 mb-1">
                                    Atenção antes de confirmar seu interesse
                                </DialogTitle>
                                <p className="text-amber-800 text-sm">
                                    Leia atentamente as informações abaixo
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 space-y-5">
                            {/* Main Warning */}
                            <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm">
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    A seleção de um imóvel é o primeiro passo real rumo à compra, por isso, antes de prosseguir,
                                    é importante estar ciente dos custos envolvidos na negociação além do valor do imóvel:
                                </p>
                            </div>

                            {/* Costs Section */}
                            <div className="bg-white rounded-lg p-5 border border-amber-200 shadow-sm">
                                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                    <Euro className="h-4 w-4 text-amber-600" />
                                    Custos Adicionais
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <span className="font-medium text-slate-700">Taxas e comissões imobiliárias:</span>
                                            <br />
                                            <span className="text-slate-600 text-sm">entre €3.000 e €7.000</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <span className="font-medium text-slate-700">Imposto de registro:</span>
                                            <br />
                                            <span className="text-slate-600 text-sm">9% sobre o valor declarado do imóvel</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
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
                            <div className="bg-amber-50 rounded-lg p-4 border border-amber-300">
                                <div className="flex items-start gap-3 mb-3">
                                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-amber-800 font-medium text-sm">
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
                        <div className="p-6 pt-4 border-t border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                            <div className="text-center mb-5">
                                <p className="text-slate-800 font-semibold text-lg mb-2">Deseja confirmar seu interesse?</p>
                                <p className="text-slate-600 text-sm">Esta ação iniciará o processo de negociação</p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={handleConfirmProceed}
                                    disabled={loading}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3"
                                    size="lg"
                                >
                                    <Check className="h-5 w-5 mr-2" />
                                    Sim, confirmo meu interesse
                                </Button>
                                <Button
                                    onClick={() => setShowConfirmationDialog(false)}
                                    disabled={loading}
                                    variant="outline"
                                    className="flex-1 border-slate-300 hover:bg-slate-50 py-3"
                                    size="lg"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Dialog >
    );
}
