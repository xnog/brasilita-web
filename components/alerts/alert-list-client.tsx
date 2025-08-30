"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, BellOff, Edit, Trash2, Loader2 } from "lucide-react";
import { PropertyNotification } from "@/lib/db/schema";
import { PropertyFilters } from "@/lib/api/property-filters";
import { EditAlertModal } from "./edit-alert-modal";
import { DeleteAlertModal } from "./delete-alert-modal";
import { toast } from "sonner";

interface AlertListClientProps {
    initialAlerts: PropertyNotification[];
}

export function AlertListClient({ initialAlerts }: AlertListClientProps) {
    const [alerts, setAlerts] = useState<PropertyNotification[]>(initialAlerts);
    const [editingAlert, setEditingAlert] = useState<PropertyNotification | null>(null);
    const [deletingAlert, setDeletingAlert] = useState<PropertyNotification | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [toggleLoadingId, setToggleLoadingId] = useState<string | null>(null);

    const fetchAlerts = async () => {
        try {
            const response = await fetch("/api/alerts");
            if (response.ok) {
                const data = await response.json();
                setAlerts(data.notifications);
            } else {
                toast.error("Erro ao carregar alertas");
            }
        } catch (error) {
            console.error("Erro ao carregar alertas:", error);
            toast.error("Erro ao carregar alertas");
        }
    };

    const toggleAlert = async (id: string) => {
        setToggleLoadingId(id);
        try {
            const response = await fetch(`/api/alerts/${id}/toggle`, {
                method: "PATCH",
            });

            if (response.ok) {
                const data = await response.json();
                setAlerts(prev =>
                    prev.map(n => n.id === id ? data.notification : n)
                );
            } else {
                toast.error("Erro ao alterar status do alerta");
            }
        } catch (error) {
            console.error("Erro ao alterar status:", error);
            toast.error("Erro ao alterar status do alerta");
        } finally {
            setToggleLoadingId(null);
        }
    };

    const handleDeleteAlert = async () => {
        if (!deletingAlert) return;

        setDeleteLoading(true);
        try {
            const response = await fetch(`/api/alerts/${deletingAlert.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAlerts(prev => prev.filter(n => n.id !== deletingAlert.id));
                setDeletingAlert(null);
            } else {
                toast.error("Erro ao remover alerta");
            }
        } catch (error) {
            console.error("Erro ao remover alerta:", error);
            toast.error("Erro ao remover alerta");
        } finally {
            setDeleteLoading(false);
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

        // Ordenação
        if (filters.sortBy && filters.sortOrder) {
            const sortLabels = {
                'price': 'preço',
                'area': 'área',
                'createdAt': 'data de cadastro'
            };
            const orderLabels = {
                'asc': 'crescente',
                'desc': 'decrescente'
            };

            const sortLabel = sortLabels[filters.sortBy] || filters.sortBy;
            const orderLabel = orderLabels[filters.sortOrder] || filters.sortOrder;
            parts.push(`Ordenado por ${sortLabel} (${orderLabel})`);
        }

        return parts.length > 0 ? parts.join(" • ") : "Sem filtros específicos";
    };

    return (
        <>
            <div className="space-y-6">
                {/* Alerts List */}
                {alerts.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">
                                Nenhum alerta criado
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Vá para a página de imóveis, aplique os filtros desejados e clique em "Criar Alerta" para receber alertas sobre novos imóveis.
                            </p>
                            <Button asChild>
                                <a href="/properties">
                                    Ver Imóveis
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {alerts.map((alert) => (
                            <Card key={alert.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${alert.isActive
                                                ? "bg-emerald-100 text-emerald-600"
                                                : "bg-slate-100 text-slate-400"
                                                }`}>
                                                {alert.isActive ? (
                                                    <Bell className="h-4 w-4" />
                                                ) : (
                                                    <BellOff className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">
                                                    {alert.name}
                                                </CardTitle>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant={alert.isActive ? "default" : "secondary"}>
                                                        {alert.isActive ? "Ativo" : "Inativo"}
                                                    </Badge>
                                                    <span className="text-sm text-slate-500">
                                                        Criado em {new Date(alert.createdAt).toLocaleDateString("pt-BR")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setEditingAlert(alert)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleAlert(alert.id)}
                                                disabled={toggleLoadingId === alert.id}
                                            >
                                                {toggleLoadingId === alert.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : alert.isActive ? (
                                                    <BellOff className="h-4 w-4" />
                                                ) : (
                                                    <Bell className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setDeletingAlert(alert)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-slate-600">
                                        <strong>Filtros:</strong> {formatFilters(alert.filters as PropertyFilters)}
                                    </div>
                                    {alert.lastProcessedAt && (
                                        <div className="text-xs text-slate-500 mt-2">
                                            Último processamento: {new Date(alert.lastProcessedAt).toLocaleString("pt-BR")}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingAlert && (
                <EditAlertModal
                    notification={editingAlert}
                    open={!!editingAlert}
                    onClose={() => setEditingAlert(null)}
                    onSuccess={() => {
                        setEditingAlert(null);
                        fetchAlerts();
                    }}
                />
            )}

            {/* Delete Confirmation Modal */}
            <DeleteAlertModal
                alert={deletingAlert}
                open={!!deletingAlert}
                onClose={() => setDeletingAlert(null)}
                onConfirm={handleDeleteAlert}
                loading={deleteLoading}
            />
        </>
    );
}
