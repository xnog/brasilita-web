"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { PurchaseJourneyStep, PurchaseJourneyUpload } from "@/lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Upload, FileText, X, AlertCircle, Lock, ChevronRight, ArrowUpRight } from "lucide-react";
import { PurchaseJourneyUploadComponent } from "./purchase-journey-upload";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

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
    const [scheduleLoading, setScheduleLoading] = useState(false);
    const [scheduleError, setScheduleError] = useState<string | null>(null);
    const [startDateTime, setStartDateTime] = useState("");
    const [duration, setDuration] = useState(60);
    const cardRef = useRef<HTMLDivElement>(null);
    const [showDetails, setShowDetails] = useState(false);
    const { data: session } = useSession();

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

        // Se é etapa concluída e não é a atual, apenas abre detalhes
        if (!isExpanded && step.status === "completed") {
            setShowDetails(true);
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

    const meetingInfo = useMemo(() => {
        if (!step.eventStart && !step.meetingLink && !step.eventId) return null;

        const formattedDate = step.eventStart
            ? new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "medium",
                  timeStyle: "short",
              }).format(typeof step.eventStart === "string" ? new Date(step.eventStart) : step.eventStart)
            : null;

        return {
            when: formattedDate,
            link: step.meetingLink || undefined,
            eventId: step.eventId || undefined,
        };
    }, [step.eventStart, step.meetingLink, step.eventId]);

    const handleScheduleMeeting = async () => {
        if (isLocked || isProcessing || scheduleLoading) return;
        if (!startDateTime) {
            toast.error("Selecione a data e hora da reunião.");
            return;
        }

        setScheduleError(null);
        setScheduleLoading(true);
        setIsProcessing(true);

        try {
            const response = await fetch(`/api/purchase-journey/${step.journeyId}/steps/1/schedule`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    start: new Date(startDateTime).toISOString(),
                    durationMinutes: duration,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Erro ao agendar reunião");
            }

            toast.success("Reunião agendada com sucesso!");

            // Notificar conclusão da etapa para avançar
            if (onStepCompleted) {
                onStepCompleted(step.stepNumber);
            }
        } catch (error: any) {
            setScheduleError(error.message || "Erro ao agendar reunião");
            toast.error(error.message || "Erro ao agendar reunião");
        } finally {
            setScheduleLoading(false);
            setIsProcessing(false);
        }
    };

    // Versão colapsada (para etapas não expandidas)
    if (!isExpanded) {
        return (
            <>
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
                                    {step.stepNumber === 1 && meetingInfo && (
                                        <div className="text-xs text-muted-foreground mt-1 space-y-1">
                                            {meetingInfo.when && <div>Reunião: {meetingInfo.when}</div>}
                                            {meetingInfo.link && (
                                                <a
                                                    href={meetingInfo.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-emerald-600 hover:underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Abrir link da reunião
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {step.status === "completed" && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowDetails(true);
                                        }}
                                        className="text-emerald-700 hover:text-emerald-800"
                                    >
                                        Ver/editar detalhes
                                        <ArrowUpRight className="h-4 w-4 ml-1" />
                                    </Button>
                                )}
                                {step.status === "completed" ? (
                                    <ChevronRight className="h-5 w-5 text-slate-400" />
                                ) : isLocked ? (
                                    <Lock className="h-5 w-5 text-amber-600" />
                                ) : (
                                    <ChevronRight className="h-5 w-5 text-slate-400" />
                                )}
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Dialog para etapas concluídas - ver/editar arquivos */}
                <Dialog open={showDetails} onOpenChange={setShowDetails}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Etapa {step.stepNumber}: {step.title}</DialogTitle>
                            <DialogDescription>{step.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            {step.uploadRequired && (
                                <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                                    Esta etapa requer pelo menos um documento enviado.
                                </div>
                            )}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <Upload className="h-4 w-4" />
                                    <span>Arquivos enviados</span>
                                </div>
                                <PurchaseJourneyUploadComponent
                                    step={step}
                                    journeyId={step.journeyId}
                                    onUploadComplete={onUploadComplete}
                                    uploadRequired={step.uploadRequired}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowDetails(false)}>
                                Fechar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
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
                {/* Etapa 1 - Agendamento de reunião */}
                {step.stepNumber === 1 ? (
                    <div className="space-y-4">
                        {meetingInfo && step.status === "completed" && (
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-sm">
                                <div className="font-semibold text-emerald-800 mb-1">Reunião agendada</div>
                                {meetingInfo.when && <div>Data e hora: {meetingInfo.when}</div>}
                                {meetingInfo.link && (
                                    <div>
                                        Link:{" "}
                                        <a
                                            href={meetingInfo.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-emerald-700 hover:underline break-all"
                                        >
                                            {meetingInfo.link}
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}

                        {step.status !== "completed" && (
                            <div className="space-y-3">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Data e hora</label>
                                        <input
                                            type="datetime-local"
                                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={startDateTime}
                                            onChange={(e) => setStartDateTime(e.target.value)}
                                            disabled={scheduleLoading}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-700">Duração</label>
                                        <select
                                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value))}
                                            disabled={scheduleLoading}
                                        >
                                            <option value={30}>30 minutos</option>
                                            <option value={45}>45 minutos</option>
                                            <option value={60}>60 minutos</option>
                                        </select>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleScheduleMeeting}
                                    disabled={scheduleLoading || isProcessing || !startDateTime}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {scheduleLoading ? "Agendando..." : "Agendar Reunião"}
                                </Button>

                                {scheduleError && (
                                    <div className="text-sm text-red-600">{scheduleError}</div>
                                )}

                                <div className="text-xs text-muted-foreground">
                                    Um convite do Google Calendar será criado e você receberá o link do Meet automaticamente.
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Uploads (para demais etapas que exigem) */}
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
                    </>
                )}

            </CardContent>
        </Card>
    );
}

