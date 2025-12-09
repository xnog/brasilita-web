"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyFilters } from "@/lib/api/property-filters";
import { formatFiltersPreview } from "@/lib/utils/format-filters";
import { toast } from "sonner";

interface CreateAlertModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialFilters?: PropertyFilters;
}

export function CreateAlertModal({
    open,
    onClose,
    onSuccess,
    initialFilters
}: CreateAlertModalProps) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const filters = initialFilters || {};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Nome do alerta é obrigatório");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/alerts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    filters,
                }),
            });

            if (response.ok) {
                setName("");
                onSuccess();
            } else {
                const data = await response.json();
                toast.error(data.error || "Erro ao criar alerta");
            }
        } catch (error) {
            console.error("Erro ao criar alerta:", error);
            toast.error("Erro ao criar alerta");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setName("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Criar Novo Alerta</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Notification Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome do Alerta</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Apartamentos em Roma até €30k"
                            required
                        />
                        <p className="text-sm text-slate-600">
                            Escolha um nome descritivo para identificar facilmente este alerta.
                        </p>
                    </div>

                    {/* Current Filters Preview */}
                    <div className="space-y-4">
                        <div>
                            <Label className="text-base font-medium">Filtros que serão aplicados</Label>
                            <p className="text-sm text-slate-600">
                                Os filtros atualmente aplicados na listagem de imóveis serão usados para este alerta.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border">
                            <div className="text-sm text-slate-700">
                                <strong>Filtros atuais:</strong> {formatFiltersPreview(filters)}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading || !name.trim()}>
                            {loading ? "Criando..." : "Criar Alerta"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
