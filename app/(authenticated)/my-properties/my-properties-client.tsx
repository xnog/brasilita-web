"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/properties/property-card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Home, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageLoading } from "@/components/ui/page-loading";
import Image from "next/image";

interface JourneyStep {
    stepNumber: number;
    status: string;
    title: string;
    completedAt: string | null;
}

interface JourneyProperty {
    id: string;
    title: string;
    price: number;
    location: string;
    region?: { id: string; name: string } | null;
    images: any;
    features: any;
}

interface Journey {
    id: string;
    propertyId: string;
    status: string;
    updatedAt: string | null;
    property: JourneyProperty;
    steps: JourneyStep[];
}

interface ApiResponse {
    activeJourney: Journey | null;
    completedJourneys: Journey[];
}

export function MyPropertiesClient() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/my-properties", { cache: "no-store" });
            if (!res.ok) throw new Error("Erro ao carregar Meus Imóveis");
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const activeStepInfo = useMemo(() => {
        if (!data?.activeJourney) return null;
        const steps = data.activeJourney.steps || [];
        const completed = steps.filter((s) => s.status === "completed").length;
        const total = steps.length || 24;
        const progress = Math.round((completed / total) * 100);

        const current =
            steps.find((s) => s.status === "in_progress") ||
            steps.find((s) => s.status === "pending");

        return {
            completed,
            total,
            progress,
            currentStepNumber: current?.stepNumber ?? null,
            currentTitle: current?.title ?? null,
        };
    }, [data?.activeJourney]);

    if (loading) {
        return <PageLoading />;
    }

    const activeJourney = data?.activeJourney || null;
    const completedJourneys = data?.completedJourneys || [];

    return (
        <div className="container-padding py-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meus Imóveis</h1>
                    <p className="text-muted-foreground mt-2">
                        Acompanhe seu processo de compra e veja imóveis já adquiridos.
                    </p>
                </div>
            </div>

            {/* Imóvel em processo */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Em Processo</h2>
                {activeJourney ? (
                    <Card className="shadow-sm border border-slate-200">
                        <CardContent className="p-4 md:p-6">
                            <div className="grid gap-4 md:grid-cols-[2fr_1fr] items-center">
                                <div className="flex gap-4 items-start">
                                    <div className="w-32 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative">
                                        <Image
                                            src={
                                                Array.isArray(activeJourney.property.images) && activeJourney.property.images.length > 0
                                                    ? activeJourney.property.images[0]
                                                    : "/api/placeholder/400/300"
                                            }
                                            alt={activeJourney.property.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold leading-tight">
                                            {activeJourney.property.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin className="h-4 w-4 text-emerald-600" />
                                            <span>
                                                {activeJourney.property.location}
                                                {activeJourney.property.region?.name
                                                    ? `, ${activeJourney.property.region.name}`
                                                    : ""}
                                            </span>
                                        </div>
                                        <div className="text-base font-semibold text-emerald-600">
                                            {new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "EUR",
                                                minimumFractionDigits: 0,
                                            }).format(activeJourney.property.price)}
                                        </div>
                                        {activeStepInfo?.currentStepNumber && (
                                            <div className="text-sm text-slate-600">
                                                Etapa {activeStepInfo.currentStepNumber} de {activeStepInfo.total}
                                                {activeStepInfo.currentTitle ? ` — ${activeStepInfo.currentTitle}` : ""}
                                            </div>
                                        )}
                                        <div className="pt-2">
                                            <Progress value={activeStepInfo?.progress || 0} className="h-2" />
                                            <div className="text-xs text-slate-500 mt-1">
                                                {activeStepInfo?.progress || 0}% concluído
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <Link href={`/purchase-journey/${activeJourney.id}`}>
                                        <Button className="flex items-center gap-2">
                                            Continuar Processo
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
                        <CardContent className="p-6 text-center space-y-3">
                            <div className="text-lg font-semibold text-slate-800">
                                Você ainda não iniciou a compra de um imóvel.
                            </div>
                            <p className="text-sm text-slate-600">
                                Escolha um imóvel e clique em “Seguir com o Processo de Compra” para começar.
                            </p>
                            <Button asChild variant="outline">
                                <Link href="/properties">
                                    <Home className="h-4 w-4 mr-2" />
                                    Ver Imóveis
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Imóveis concluídos */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Imóveis Concluídos</h2>
                {completedJourneys.length === 0 ? (
                    <div className="text-sm text-slate-600">
                        Nenhum imóvel concluído ainda.
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {completedJourneys.map((journey) => (
                            <div key={journey.id} className="relative">
                                <PropertyCard
                                    property={{
                                        ...journey.property,
                                        isInterested: false,
                                    }}
                                    onToggleInterest={() => {}}
                                />
                                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                                    Concluído
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

