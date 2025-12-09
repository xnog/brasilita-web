"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Settings, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileRequiredModalProps {
    open: boolean;
    onClose: () => void;
    missingFields?: string[];
}

export function ProfileRequiredModal({ open, onClose, missingFields = [] }: ProfileRequiredModalProps) {
    const router = useRouter();

    const handleGoToPreferences = () => {
        onClose();
        router.push("/preferences");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Settings className="h-6 w-6 text-blue-600" />
                    </div>
                    <DialogTitle className="text-center text-2xl">
                        Complete seu perfil para continuar
                    </DialogTitle>
                    <DialogDescription className="text-center text-base pt-2">
                        Para entrar em contato com nossa equipe de assessoria, precisamos entender melhor suas necessidades e objetivos
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700">
                            Isso nos ajuda a preparar um atendimento personalizado e qualificado para você
                        </p>
                    </div>

                    {missingFields.length > 0 && (
                        <div>
                            <h4 className="font-medium text-sm text-slate-900 mb-3">
                                Informações necessárias:
                            </h4>
                            <div className="space-y-2">
                                {missingFields.map((field, index) => (
                                    <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span>{field}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-2">
                        <p className="text-sm text-slate-500 text-center">
                            Leva apenas 2-3 minutos para completar
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-col gap-2">
                    <Button
                        onClick={handleGoToPreferences}
                        size="lg"
                        className="w-full"
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Completar Perfil
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="sm"
                        className="w-full"
                    >
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
