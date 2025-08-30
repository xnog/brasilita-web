"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { PropertyNotification } from "@/lib/db/schema";
import { PropertyFilters } from "@/lib/api/property-filters";

interface DeleteAlertModalProps {
    alert: PropertyNotification | null;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
}

export function DeleteAlertModal({
    alert,
    open,
    onClose,
    onConfirm,
    loading = false
}: DeleteAlertModalProps) {
    if (!alert) return null;

    const formatFilters = (filters: PropertyFilters) => {
        const parts = [];

        if (filters.regions && filters.regions.length > 0) {
            parts.push(`${filters.regions.length} região(ões)`);
        }

        if (filters.priceMin || filters.priceMax) {
            if (filters.priceMin && filters.priceMax) {
                parts.push(`€${filters.priceMin.toLocaleString()} - €${filters.priceMax.toLocaleString()}`);
            } else if (filters.priceMin) {
                parts.push(`A partir de €${filters.priceMin.toLocaleString()}`);
            } else if (filters.priceMax) {
                parts.push(`Até €${filters.priceMax.toLocaleString()}`);
            }
        }

        if (filters.bedroomsMin || filters.bedroomsMax) {
            if (filters.bedroomsMin && filters.bedroomsMax) {
                if (filters.bedroomsMin === filters.bedroomsMax) {
                    parts.push(`${filters.bedroomsMin} quartos`);
                } else {
                    parts.push(`${filters.bedroomsMin} a ${filters.bedroomsMax} quartos`);
                }
            } else if (filters.bedroomsMin) {
                parts.push(`${filters.bedroomsMin}+ quartos`);
            } else if (filters.bedroomsMax) {
                parts.push(`Até ${filters.bedroomsMax} quartos`);
            }
        }

        return parts.length > 0 ? parts.join(" • ") : "Sem filtros específicos";
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <DialogTitle className="text-lg">Remover Alerta</DialogTitle>
                    </div>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-slate-600">
                        Tem certeza que deseja remover este alerta? Esta ação não pode ser desfeita.
                    </p>

                    {/* Alert Details */}
                    <div className="bg-slate-50 p-4 rounded-lg border space-y-2">
                        <div>
                            <span className="font-medium text-slate-900">{alert.name}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                            <strong>Filtros:</strong> {formatFilters(alert.filters as PropertyFilters)}
                        </div>
                        <div className="text-xs text-slate-500">
                            Criado em {alert.createdAt ? new Date(alert.createdAt).toLocaleDateString("pt-BR") : "Data não disponível"}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading ? "Removendo..." : "Remover Alerta"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
