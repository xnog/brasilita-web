"use client";

import { useState, useEffect, useCallback } from "react";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Property } from "@/lib/db/schema";
import { PageLoading } from "@/components/ui/page-loading";
import Link from "next/link";

interface Favorite {
    id: string;
    property: Omit<Property, 'originalUrl'> & {
        region: { id: string; name: string; examples: string | null; createdAt: Date | null; updatedAt: Date | null; } | null;
    } | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

interface FavoritesResponse {
    favorites: Favorite[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    };
}

export function FavoritesClient() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<FavoritesResponse["pagination"] | null>(null);
    const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

    const fetchFavorites = useCallback(async (pageNum: number) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/favorites?page=${pageNum}&limit=12`);
            
            if (!response.ok) {
                throw new Error("Erro ao carregar favoritos");
            }

            const data: FavoritesResponse = await response.json();
            setFavorites(data.favorites);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavorites(page);
    }, [page, fetchFavorites]);

    const handleRemoveFavorite = async (propertyId: string, favoriteId: string) => {
        // Atualização otimista
        setRemovingIds(prev => new Set(prev).add(favoriteId));
        setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));

        try {
            const response = await fetch("/api/favorites", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ propertyId }),
            });

            if (!response.ok) {
                throw new Error("Erro ao remover favorito");
            }

            // Recarregar favoritos para atualizar paginação
            await fetchFavorites(page);
        } catch (error) {
            console.error("Error removing favorite:", error);
            // Reverter em caso de erro
            await fetchFavorites(page);
        } finally {
            setRemovingIds(prev => {
                const next = new Set(prev);
                next.delete(favoriteId);
                return next;
            });
        }
    };

    const handleToggleInterest = async (propertyId: string, isInterested: boolean) => {
        // Se está removendo o interesse, remover dos favoritos
        if (!isInterested) {
            const favorite = favorites.find(fav => fav.property?.id === propertyId);
            if (favorite) {
                await handleRemoveFavorite(propertyId, favorite.id);
            }
        }
    };

    // Estado vazio
    if (!loading && favorites.length === 0 && (!pagination || pagination.total === 0)) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="rounded-full bg-slate-100 p-6 mb-4">
                    <Heart className="h-12 w-12 text-slate-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-center">
                    Você ainda não favoritou imóveis
                </h2>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                    Clique no coração para marcar seus preferidos e acompanhá-los aqui.
                </p>
                <Button asChild>
                    <Link href="/properties">
                        <Home className="mr-2 h-4 w-4" />
                        Explorar Imóveis
                    </Link>
                </Button>
            </div>
        );
    }

    if (loading && favorites.length === 0) {
        return <PageLoading />;
    }

    // Filtrar favoritos que têm propriedade válida
    const validFavorites = favorites.filter(fav => fav.property !== null);

    return (
        <div className="space-y-6">
            {/* Lista de favoritos */}
            {validFavorites.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {validFavorites.map((favorite) => {
                        if (!favorite.property) return null;
                        
                        return (
                            <div key={favorite.id} className="relative">
                                <PropertyCard
                                    property={{
                                        ...favorite.property,
                                        isInterested: true,
                                    }}
                                    onToggleInterest={handleToggleInterest}
                                />
                                {removingIds.has(favorite.id) && (
                                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10">
                                        <div className="text-sm text-slate-600">Removendo...</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-slate-600">Nenhum favorito encontrado</p>
                </div>
            )}

            {/* Paginação */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                        disabled={page === 1 || loading}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Anterior
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Página {pagination.page} de {pagination.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(prev => Math.min(pagination.totalPages, prev + 1))}
                        disabled={!pagination.hasMore || loading}
                    >
                        Próxima
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            )}

            {/* Informação de total */}
            {pagination && pagination.total > 0 && (
                <div className="text-center text-sm text-muted-foreground">
                    {pagination.total} {pagination.total === 1 ? "imóvel favoritado" : "imóveis favoritados"}
                </div>
            )}
        </div>
    );
}

