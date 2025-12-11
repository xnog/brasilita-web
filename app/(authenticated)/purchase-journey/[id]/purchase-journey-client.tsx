"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { PurchaseJourney, PurchaseJourneyStep, PurchaseJourneyUpload } from "@/lib/db/schema";
import { Property } from "@/lib/db/schema";
import { PurchaseJourneyTimeline } from "@/components/purchase-journey/purchase-journey-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PurchaseJourneyWithRelations extends PurchaseJourney {
    property: Property & {
        region: { id: string; name: string } | null;
    };
    steps: (PurchaseJourneyStep & {
        uploads: PurchaseJourneyUpload[];
    })[];
}

interface PurchaseJourneyClientProps {
    initialJourney: PurchaseJourneyWithRelations;
}

export function PurchaseJourneyClient({ initialJourney }: PurchaseJourneyClientProps) {
    const [journey, setJourney] = useState(initialJourney);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const isProcessingRef = useRef(false);

    // Identificar etapa atual: in_progress ou primeira pending (que não está bloqueada)
    const currentStepNumber = useMemo(() => {
        // Buscar etapa com status "in_progress"
        const inProgressStep = journey.steps.find((s) => s.status === "in_progress");
        if (inProgressStep) {
            return inProgressStep.stepNumber;
        }

        // Se não há in_progress, buscar primeira pending que não está bloqueada
        // (todas as etapas anteriores devem estar concluídas)
        for (let i = 0; i < journey.steps.length; i++) {
            const step = journey.steps[i];
            if (step.status === "pending") {
                // Verificar se todas as anteriores estão concluídas
                const allPreviousCompleted = journey.steps
                    .slice(0, i)
                    .every((s) => s.status === "completed");
                
                if (allPreviousCompleted) {
                    return step.stepNumber;
                }
            }
        }

        // Se todas estão concluídas, retornar null (nenhuma expandida)
        return null;
    }, [journey.steps]);

    const refreshJourney = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/purchase-journey/${journey.id}`);
            if (response.ok) {
                const data = await response.json();
                setJourney(data.journey);
            }
        } catch (error) {
            console.error("Error refreshing journey:", error);
        } finally {
            setLoading(false);
        }
    };

    // Revalidar ao voltar o foco da aba
    useEffect(() => {
        const handleFocus = () => {
            refreshJourney();
        };

        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [journey.id]);

    const handleStepUpdate = async (stepNumber: number, status: string, notes?: string) => {
        // Prevenir cliques duplos
        if (isProcessingRef.current) {
            return;
        }

        isProcessingRef.current = true;
        try {
            const response = await fetch(`/api/purchase-journey/${journey.id}/steps/${stepNumber}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, notes }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Erro ao atualizar etapa");
            }

            await refreshJourney();
        } catch (error: any) {
            toast.error(error.message || "Erro ao atualizar etapa");
        } finally {
            isProcessingRef.current = false;
        }
    };

    const handleStepCompleted = async (completedStepNumber: number) => {
        // Após concluir uma etapa, avançar automaticamente para a próxima
        await refreshJourney();
        
        // Scroll será feito automaticamente pelo componente StepCard quando a próxima etapa expandir
        toast.success("Etapa concluída! Avançando para a próxima...");
    };

    const handleUploadComplete = () => {
        refreshJourney();
    };

    const completedSteps = journey.steps.filter((s) => s.status === "completed").length;
    const totalSteps = journey.steps.length;
    const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

    return (
        <div className="container-padding py-8">
            {/* Header */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                </Button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Processo de Compra</h1>
                        <p className="text-muted-foreground mt-2">
                            {journey.property.title}
                        </p>
                        {journey.property.region && (
                            <p className="text-sm text-muted-foreground">
                                {journey.property.region.name}
                            </p>
                        )}
                    </div>
                    <Link href={`/properties/${journey.propertyId}`}>
                        <Button variant="outline">
                            <Home className="h-4 w-4 mr-2" />
                            Ver Imóvel
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Progress Card */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Progresso Geral</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Etapas Concluídas</span>
                            <span className="font-medium">
                                {completedSteps} de {totalSteps}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div
                                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {progressPercentage}% completo
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Timeline */}
            <PurchaseJourneyTimeline
                journey={journey}
                onStepUpdate={handleStepUpdate}
                onUploadComplete={handleUploadComplete}
                loading={loading}
                currentStepNumber={currentStepNumber}
                onStepCompleted={handleStepCompleted}
            />
        </div>
    );
}

