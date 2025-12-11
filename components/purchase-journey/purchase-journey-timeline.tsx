"use client";

import { useMemo } from "react";
import { PurchaseJourneyStep, PurchaseJourneyUpload } from "@/lib/db/schema";
import { PurchaseJourneyStepCard } from "./purchase-journey-step-card";

interface PurchaseJourneyTimelineProps {
    journey: {
        id: string;
        steps: (PurchaseJourneyStep & {
            uploads: PurchaseJourneyUpload[];
        })[];
    };
    onStepUpdate: (stepNumber: number, status: string, notes?: string) => Promise<void>;
    onUploadComplete: () => void;
    loading: boolean;
    currentStepNumber: number | null;
    onStepCompleted?: (stepNumber: number) => void;
}

export function PurchaseJourneyTimeline({
    journey,
    onStepUpdate,
    onUploadComplete,
    loading,
    currentStepNumber,
    onStepCompleted,
}: PurchaseJourneyTimelineProps) {
    // Verificar quais etapas estão bloqueadas (etapas futuras que dependem de etapas anteriores)
    const isStepLocked = (step: PurchaseJourneyStep, index: number) => {
        // Primeira etapa nunca está bloqueada
        if (index === 0) return false;
        
        // Se a etapa já foi iniciada ou concluída, não está bloqueada
        if (step.status !== "pending") return false;
        
        // Verificar se todas as etapas anteriores foram concluídas
        for (let i = 0; i < index; i++) {
            if (journey.steps[i].status !== "completed") {
                return true; // Bloqueada se alguma etapa anterior não foi concluída
            }
        }
        
        return false;
    };

    // Verificar se etapa é a atual (deve estar expandida)
    const isCurrentStep = (step: PurchaseJourneyStep) => {
        return currentStepNumber !== null && step.stepNumber === currentStepNumber;
    };

    return (
        <div className="space-y-4">
            {journey.steps.map((step, index) => {
                const isLocked = isStepLocked(step, index);
                const isCurrent = isCurrentStep(step);

                return (
                    <div key={step.id} id={`step-${step.stepNumber}`} className="relative">
                        {/* Linha conectora */}
                        {index < journey.steps.length - 1 && (
                            <div
                                className={`absolute left-6 top-12 w-0.5 h-full ${
                                    step.status === "completed"
                                        ? "bg-emerald-600"
                                        : "bg-slate-200"
                                }`}
                                style={{ height: "calc(100% - 3rem)" }}
                            />
                        )}

                        <PurchaseJourneyStepCard
                            step={step}
                            isLocked={isLocked}
                            isExpanded={isCurrent}
                            onStepUpdate={onStepUpdate}
                            onUploadComplete={onUploadComplete}
                            onStepCompleted={onStepCompleted}
                        />
                    </div>
                );
            })}
        </div>
    );
}

