"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChecklistItem } from "./checklist-item";
import {
    CheckCircle2,
    Clock,
    Filter
} from "lucide-react";

interface ChecklistCategory {
    id: string;
    name: string;
    description: string;
    order: number;
}

interface ChecklistItemData {
    id: string;
    categoryId: string;
    title: string;
    description: string;
    order: number;
    propertyTypes: string[];
    buyerProfiles: string[];
    usageTypes: string[];
    isOptional: boolean;
    estimatedDays?: number;
    resources?: string[];
}

interface UserProgress {
    [itemId: string]: {
        isCompleted: boolean;
        notes?: string;
        completedAt?: Date;
    };
}

interface UserProfile {
    propertyType: string;
    location?: string;
    buyerProfile: string;
    usageType: string;
    investmentBudget: number;
    investmentGoal: string;
}

interface ChecklistViewProps {
    categories: ChecklistCategory[];
    items: ChecklistItemData[];
    userProfile: UserProfile;
    initialProgress?: UserProgress;
    onProgressUpdate: (itemId: string, completed: boolean, notes?: string) => void;
}

export function ChecklistView({
    categories,
    items,
    userProfile,
    initialProgress = {},
    onProgressUpdate,
}: ChecklistViewProps) {
    const [progress, setProgress] = useState<UserProgress>(initialProgress);
    const [showOptional, setShowOptional] = useState(true);
    const progressUpdateTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());
    const [showCompleted, setShowCompleted] = useState(true);

    // Limpar todos os timeouts quando o componente for desmontado
    useEffect(() => {
        const timeouts = progressUpdateTimeouts.current;
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
            timeouts.clear();
        };
    }, []);

    // Show all items regardless of user profile
    const filteredItems = useMemo(() => {
        return items; // Return all items without filtering
    }, [items]);

    // Group items by category
    const categorizedItems = useMemo(() => {
        const grouped = categories.map(category => ({
            ...category,
            items: filteredItems
                .filter(item => item.categoryId === category.id)
                .sort((a, b) => a.order - b.order)
        }));

        return grouped.filter(category => category.items.length > 0);
    }, [categories, filteredItems]);

    // Calculate progress statistics
    const stats = useMemo(() => {
        const totalItems = filteredItems.length;
        const completedItems = filteredItems.filter(item => progress[item.id]?.isCompleted).length;
        const requiredItems = filteredItems.filter(item => !item.isOptional).length;
        const completedRequiredItems = filteredItems.filter(item =>
            !item.isOptional && progress[item.id]?.isCompleted
        ).length;

        const totalEstimatedDays = filteredItems.reduce((sum, item) =>
            sum + (item.estimatedDays || 0), 0
        );

        const remainingDays = filteredItems
            .filter(item => !progress[item.id]?.isCompleted)
            .reduce((sum, item) => sum + (item.estimatedDays || 0), 0);

        return {
            totalItems,
            completedItems,
            requiredItems,
            completedRequiredItems,
            totalEstimatedDays,
            remainingDays,
            completionPercentage: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
            requiredCompletionPercentage: requiredItems > 0 ? Math.round((completedRequiredItems / requiredItems) * 100) : 0,
        };
    }, [filteredItems, progress]);

    const handleToggleComplete = useCallback((itemId: string, completed: boolean, notes?: string) => {
        const newProgress = {
            ...progress,
            [itemId]: {
                isCompleted: completed,
                notes: notes || progress[itemId]?.notes || "",
                completedAt: completed ? new Date() : undefined,
            },
        };

        setProgress(newProgress);

        // Limpar timeout anterior se existir
        const existingTimeout = progressUpdateTimeouts.current.get(itemId);
        if (existingTimeout) {
            clearTimeout(existingTimeout);
        }

        // Para mudanças de checkbox (completed), salvar imediatamente
        // Para mudanças apenas de notas, usar debounce
        const isCheckboxChange = progress[itemId]?.isCompleted !== completed;

        if (isCheckboxChange) {
            // Mudança de status - salvar imediatamente
            onProgressUpdate(itemId, completed, notes);
        } else {
            // Apenas mudança de notas - usar debounce de 500ms
            const timeout = setTimeout(() => {
                onProgressUpdate(itemId, completed, notes);
                progressUpdateTimeouts.current.delete(itemId);
            }, 500);

            progressUpdateTimeouts.current.set(itemId, timeout);
        }
    }, [progress, onProgressUpdate]);

    const getProfileLabel = (key: string, value: string) => {
        const labels: Record<string, Record<string, string>> = {
            propertyType: {
                residential: "Residencial",
                commercial: "Comercial",
                investment: "Investimento",
            },
            buyerProfile: {
                foreign_non_resident: "Brasileiro não-residente",
                italian_citizen: "Cidadão italiano",
                resident: "Residente na Itália",
            },
            usageType: {
                personal_use: "Uso próprio",
                long_rental: "Aluguel longo prazo",
                short_rental: "Aluguel curto prazo",
            },
        };

        return labels[key]?.[value] || value;
    };

    return (
        <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Seu Perfil</CardTitle>
                            <CardDescription>Checklist personalizado baseado nas suas informações</CardDescription>
                        </div>
                        {/* <Button variant="outline" onClick={onResetProfile}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Alterar Perfil
                        </Button> */}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="font-medium">Tipo:</span>
                                <p className="text-muted-foreground">{getProfileLabel('propertyType', userProfile.propertyType)}</p>
                            </div>
                            <div>
                                <span className="font-medium">Regiões:</span>
                                <p className="text-muted-foreground">{(userProfile as UserProfile & { formattedRegions?: string }).formattedRegions || userProfile.location || "Não especificado"}</p>
                            </div>
                            <div>
                                <span className="font-medium">Perfil:</span>
                                <p className="text-muted-foreground">{getProfileLabel('buyerProfile', userProfile.buyerProfile)}</p>
                            </div>
                            <div>
                                <span className="font-medium">Uso:</span>
                                <p className="text-muted-foreground">{getProfileLabel('usageType', userProfile.usageType)}</p>
                            </div>
                        </div>
                        <div className="border-t pt-4 text-sm">
                            <div>
                                <span className="font-medium">Objetivo do Investimento:</span>
                                <p className="text-muted-foreground mt-1">{userProfile.investmentGoal}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Progresso do Checklist
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Progresso Geral</span>
                                <span className="text-sm text-muted-foreground">
                                    {stats.completedItems} de {stats.totalItems} itens
                                </span>
                            </div>
                            <Progress value={stats.completionPercentage} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span>{stats.completedItems} Concluídos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span>{stats.remainingDays} dias restantes</span>
                            </div>
                            <div>
                                <Badge variant="secondary">
                                    {stats.requiredCompletionPercentage}% obrigatórios
                                </Badge>
                            </div>
                            <div>
                                <Badge variant="outline">
                                    €{userProfile.investmentBudget.toLocaleString()}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <span className="text-sm font-medium">Filtros:</span>
                        </div>
                        <Button
                            variant={showOptional ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowOptional(!showOptional)}
                        >
                            Itens Opcionais
                        </Button>
                        <Button
                            variant={showCompleted ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowCompleted(!showCompleted)}
                        >
                            Concluídos
                        </Button>
                        {/* <div className="ml-auto flex gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Exportar PDF
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share className="h-4 w-4 mr-2" />
                                Compartilhar
                            </Button>
                        </div> */}
                    </div>
                </CardContent>
            </Card>

            {/* Checklist Categories */}
            <div className="space-y-6">
                {categorizedItems.map((category) => {
                    const categoryItems = category.items.filter(item => {
                        if (!showOptional && item.isOptional) return false;
                        if (!showCompleted && progress[item.id]?.isCompleted) return false;
                        return true;
                    });

                    if (categoryItems.length === 0) return null;

                    const completedInCategory = categoryItems.filter(item => progress[item.id]?.isCompleted).length;
                    const categoryProgress = Math.round((completedInCategory / categoryItems.length) * 100);

                    return (
                        <Card key={category.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            {category.name}
                                            <Badge variant="outline">
                                                {completedInCategory}/{categoryItems.length}
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription>{category.description}</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary">{categoryProgress}%</div>
                                        <div className="text-sm text-muted-foreground">concluído</div>
                                    </div>
                                </div>
                                <Progress value={categoryProgress} className="h-1" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {categoryItems.map((item) => (
                                        <ChecklistItem
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            description={item.description}
                                            isCompleted={progress[item.id]?.isCompleted || false}
                                            isOptional={item.isOptional}
                                            estimatedDays={item.estimatedDays}
                                            resources={item.resources}
                                            notes={progress[item.id]?.notes}
                                            onToggleComplete={handleToggleComplete}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}