"use client";

import { useState, useRef, useEffect } from "react";
import { PurchaseJourneyStep, PurchaseJourneyUpload } from "@/lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Upload, FileText, X, AlertCircle, Lock, ChevronDown, ChevronRight } from "lucide-react";
import { PurchaseJourneyUploadComponent } from "./purchase-journey-upload";
import { toast } from "sonner";

interface PurchaseJourneyStepCardProps {
    step: PurchaseJourneyStep & {
        uploads: PurchaseJourneyUpload[];
    };
    isLocked: boolean;
    isExpanded: boolean;
    onStepUpdate: (stepNumber: number, status: string, notes?: string) => Promise<void>;
    onUploadComplete: () => void;
    onStepCompleted?: (stepNumber: number) => void;
}

export function PurchaseJourneyStepCard({
    step,
    isLocked,
    isExpanded,
    onStepUpdate,
    onUploadComplete,
    onStepCompleted,
}: PurchaseJourneyStepCardProps) {
    const [updating, setUpdating] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Scroll para esta etapa quando expandir
    useEffect(() => {
        if (isExpanded && cardRef.current) {
            setTimeout(() => {
                cardRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 100);
        }
    }, [isExpanded]);

    const handleCardClick = () => {
        // Se não é a etapa atual e está bloqueada, mostrar aviso
        if (!isExpanded && isLocked) {
            toast.info("Conclua a etapa atual para avançar.");
            return;
        }

        // Se é etapa concluída, não permitir expandir
        if (step.status === "completed") {
            toast.info("Esta etapa já foi concluída.");
            return;
        }
    };

    const getStatusIcon = () => {
        switch (step.status) {
            case "completed":
                return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
            case "in_progress":
                return <Clock className="h-5 w-5 text-blue-600" />;
            default:
                return <Circle className="h-5 w-5 text-slate-400" />;
        }
    };

    const getStatusBadge = () => {
        switch (step.status) {
            case "completed":
                return <Badge className="bg-emerald-600">Concluída</Badge>;
            case "in_progress":
                return <Badge className="bg-blue-600">Em Andamento</Badge>;
            default:
                return <Badge variant="outline">Pendente</Badge>;
        }
    };

    const handleMarkInProgress = async () => {
        if (isLocked || isProcessing) return;
        setIsProcessing(true);
        setUpdating(true);
        try {
            await onStepUpdate(step.stepNumber, "in_progress");
        } finally {
            setUpdating(false);
            setIsProcessing(false);
        }
    };

    const handleMarkCompleted = async () => {
        if (isLocked || isProcessing) return;

        // Verificar se requer upload e se há uploads
        if (step.uploadRequired && (!step.uploads || step.uploads.length === 0)) {
            toast.error("Esta etapa requer upload de arquivo antes de ser concluída.");
            return;
        }

        setIsProcessing(true);
        setUpdating(true);
        try {
            await onStepUpdate(step.stepNumber, "completed");
            // Notificar que etapa foi concluída para avançar automaticamente
            if (onStepCompleted) {
                onStepCompleted(step.stepNumber);
            }
        } catch (error: any) {
            toast.error(error.message || "Erro ao concluir etapa");
        } finally {
            setUpdating(false);
            setIsProcessing(false);
        }
    };

    const canComplete = !isLocked && (
        !step.uploadRequired || (step.uploads && step.uploads.length > 0)
    );

    // Versão colapsada (para etapas não expandidas)
    if (!isExpanded) {
        return (
            <Card
                ref={cardRef}
                className={`cursor-pointer transition-all ${
                    isLocked ? "opacity-60" : "hover:bg-slate-50"
                } ${step.status === "completed" ? "bg-emerald-50/50" : ""}`}
                onClick={handleCardClick}
            >
                <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="flex-shrink-0">{getStatusIcon()}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-base">
                                        Etapa {step.stepNumber}: {step.title}
                                    </CardTitle>
                                    {getStatusBadge()}
                                    {isLocked && (
                                        <Lock className="h-4 w-4 text-amber-600" />
                                    )}
                                </div>
                            </div>
                        </div>
                        {step.status === "completed" ? (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                        ) : isLocked ? (
                            <Lock className="h-5 w-5 text-amber-600" />
                        ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                        )}
                    </div>
                </CardHeader>
            </Card>
        );
    }

    // Versão expandida (apenas para etapa atual)
    return (
        <Card ref={cardRef} className="border-2 border-blue-500 shadow-lg">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1">{getStatusIcon()}</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-lg">
                                    Etapa {step.stepNumber}: {step.title}
                                </CardTitle>
                                {getStatusBadge()}
                            </div>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            {step.uploadRequired && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>Upload obrigatório</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Uploads */}
                {step.uploadRequired && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Upload className="h-4 w-4" />
                            <span>Arquivos Enviados</span>
                        </div>
                        <PurchaseJourneyUploadComponent
                            step={step}
                            journeyId={step.journeyId}
                            onUploadComplete={onUploadComplete}
                        />
                    </div>
                )}

                {/* Notas */}
                {step.notes && (
                    <div className="p-3 bg-slate-50 rounded-md">
                        <p className="text-sm text-slate-700">
                            <strong>Notas:</strong> {step.notes}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    {step.status === "pending" && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleMarkInProgress}
                            disabled={updating || isProcessing}
                        >
                            Iniciar Etapa
                        </Button>
                    )}
                    {step.status !== "completed" && (
                        <Button
                            size="sm"
                            onClick={handleMarkCompleted}
                            disabled={updating || isProcessing || !canComplete}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {updating || isProcessing ? "Salvando..." : "Marcar como Concluída"}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

