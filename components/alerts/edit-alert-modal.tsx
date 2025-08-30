"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PropertyFilters } from "@/lib/api/property-filters";
import { PropertyNotification } from "@/lib/db/schema";
import { toast } from "sonner";

interface EditAlertModalProps {
    notification: PropertyNotification;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function EditAlertModal({
    notification,
    open,
    onClose,
    onSuccess
}: EditAlertModalProps) {
    const [name, setName] = useState(notification.name);
    const [isActive, setIsActive] = useState(notification.isActive);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setName(notification.name);
            setIsActive(notification.isActive);
        }
    }, [open, notification]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Nome do alerta é obrigatório");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/alerts/${notification.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    isActive,
                }),
            });

            if (response.ok) {
                onSuccess();
            } else {
                const data = await response.json();
                toast.error(data.error || "Erro ao atualizar alerta");
            }
        } catch (error) {
            console.error("Erro ao atualizar alerta:", error);
            toast.error("Erro ao atualizar alerta");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

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

        if (filters.bathroomsMin || filters.bathroomsMax) {
            if (filters.bathroomsMin && filters.bathroomsMax) {
                if (filters.bathroomsMin === filters.bathroomsMax) {
                    parts.push(`${filters.bathroomsMin} banheiros`);
                } else {
                    parts.push(`${filters.bathroomsMin} a ${filters.bathroomsMax} banheiros`);
                }
            } else if (filters.bathroomsMin) {
                parts.push(`${filters.bathroomsMin}+ banheiros`);
            } else if (filters.bathroomsMax) {
                parts.push(`Até ${filters.bathroomsMax} banheiros`);
            }
        }

        if (filters.areaMin || filters.areaMax) {
            if (filters.areaMin && filters.areaMax) {
                parts.push(`${filters.areaMin} - ${filters.areaMax}m²`);
            } else if (filters.areaMin) {
                parts.push(`A partir de ${filters.areaMin}m²`);
            } else if (filters.areaMax) {
                parts.push(`Até ${filters.areaMax}m²`);
            }
        }

        if (filters.location) {
            parts.push(`Localização: "${filters.location}"`);
        }

        if (filters.favoritesOnly) {
            parts.push("Apenas favoritos");
        }

        if (filters.isRented !== undefined) {
            parts.push(filters.isRented ? "Apenas alugados" : "Apenas à venda");
        }

        return parts.length > 0 ? parts.join(" • ") : "Sem filtros específicos";
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Editar Alerta</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Alert Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome do Alerta</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Apartamentos em Roma até €30k"
                            required
                        />
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                            <Label className="text-base font-medium">Status do Alerta</Label>
                            <p className="text-sm text-slate-600">
                                {isActive
                                    ? "Alerta ativo - você receberá emails sobre novos imóveis que correspondem aos filtros."
                                    : "Alerta inativo - você não receberá emails até reativar este alerta."}
                            </p>
                        </div>
                        <Switch
                            checked={isActive}
                            onCheckedChange={setIsActive}
                        />
                    </div>

                    {/* Current Filters Preview (Read-only) */}
                    <div className="space-y-4">
                        <div>
                            <Label className="text-base font-medium">Filtros do Alerta</Label>
                            <p className="text-sm text-slate-600">
                                Os filtros não podem ser editados. Para alterar os filtros, crie um novo alerta.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border">
                            <div className="text-sm text-slate-700">
                                <strong>Filtros atuais:</strong> {formatFilters(notification.filters as PropertyFilters)}
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
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}