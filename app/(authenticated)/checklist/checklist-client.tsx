"use client";

import { useState, useEffect } from "react";
import { ChecklistView } from "@/components/checklist/checklist-view";
import { SuccessBanner } from "@/components/checklist/success-banner";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ArrowRight } from "lucide-react";
import { PreferencesRequiredBanner } from "@/components/preferences/preferences-required-banner";
import type { ChecklistCategory, ChecklistItem } from "@/lib/db/schema";

interface UserProfile {
    propertyType: "residential" | "commercial" | "investment";
    location: string;
    buyerProfile: "resident" | "italian_citizen" | "foreign_non_resident";
    usageType: "personal_use" | "long_rental" | "short_rental" | "relocation" | "mixed_use" | "family_legacy";
    investmentBudget: number;
    phone: string;
    investmentGoal: string;
}

interface UserProgress {
    [itemId: string]: {
        isCompleted: boolean;
        notes?: string;
        completedAt?: Date;
    };
}

interface ChecklistPageClientProps {
    userId: string;
}

export function ChecklistPageClient({ userId }: ChecklistPageClientProps) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [userProgress, setUserProgress] = useState<UserProgress>({});
    const [categories, setCategories] = useState<ChecklistCategory[]>([]);
    const [items, setItems] = useState<ChecklistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load user profile, progress and checklist items from database
    useEffect(() => {
        const loadData = async () => {
            try {
                // Usar API unificada para carregar todos os dados em uma única requisição
                const response = await fetch('/api/checklist/data');
                
                if (response.ok) {
                    const data = await response.json();
                    
                    // Set all data at once
                    setCategories(data.categories || []);
                    setItems(data.items || []);
                    if (data.profile) {
                        setUserProfile(data.profile);
                    }
                    if (data.progress) {
                        setUserProgress(data.progress);
                    }
                } else {
                    console.error('Erro ao carregar dados:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [userId]);

    // Removed profile submit handler - preferences are now handled separately

    const handleProgressUpdate = async (itemId: string, completed: boolean, notes?: string) => {
        // Atualizar estado local imediatamente para UX responsiva
        const newProgress = {
            ...userProgress,
            [itemId]: {
                isCompleted: completed,
                notes: notes || userProgress[itemId]?.notes || "",
                completedAt: completed ? new Date() : undefined,
            },
        };
        setUserProgress(newProgress);

        try {
            const response = await fetch('/api/checklist/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    checklistItemId: itemId,
                    isCompleted: completed,
                    notes: notes || userProgress[itemId]?.notes || "",
                }),
            });

            if (!response.ok) {
                console.error('Erro ao salvar progresso:', await response.text());
                // Reverter mudança local se falhou no servidor
                setUserProgress(userProgress);
                alert('Erro ao salvar progresso. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao salvar progresso:', error);
            // Reverter mudança local se falhou
            setUserProgress(userProgress);
            alert('Erro ao salvar progresso. Tente novamente.');
        }
    };

    const handleResetProfile = async () => {
        if (confirm('Tem certeza que deseja resetar seu perfil? Todos os dados serão perdidos.')) {
            try {
                // Não temos endpoint de delete ainda, então vamos apenas limpar localmente
                // Em uma implementação completa, você criaria endpoints DELETE
                setUserProfile(null);
                setUserProgress({});

                // Opcional: Recarregar a página para garantir estado limpo
                window.location.reload();
            } catch (error) {
                console.error('Erro ao resetar perfil:', error);
                alert('Erro ao resetar perfil. Tente novamente.');
            }
        }
    };

    // Transform checklist data to match component interface
    const transformedCategories = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description || "",
        order: cat.order,
    }));

    const transformedItems = items.map((item) => {
        return {
            id: item.id, // ID real do banco
            categoryId: item.categoryId,
            title: item.title,
            description: item.description || "",
            order: item.order,
            propertyTypes: JSON.parse(item.propertyTypes || "[]"),
            buyerProfiles: JSON.parse(item.buyerProfiles || "[]"),
            usageTypes: JSON.parse(item.usageTypes || "[]"),
            isOptional: item.isOptional || false,
            estimatedDays: item.estimatedDays || undefined,
            resources: JSON.parse(item.resources || "[]"),
        };
    });

    if (isLoading) {
        return <PageLoading message="Carregando seu checklist..." />;
    }

    return (
        <>
            {!userProfile ? (
                <PreferencesRequiredBanner
                    title="Checklist de Compra de Imóvel na Itália"
                    description="Para acessar seu checklist personalizado, você precisa configurar suas preferências primeiro."
                />
            ) : (
                <>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Seu Checklist Personalizado
                        </h1>
                        <p className="text-muted-foreground">
                            Acompanhe seu progresso na compra do imóvel em {userProfile.location}, Itália
                        </p>
                    </div>

                    {/* Success Banner */}
                    <div className="mb-6">
                        <SuccessBanner userProfile={userProfile} />
                    </div>

                    <ChecklistView
                        categories={transformedCategories}
                        items={transformedItems}
                        userProfile={userProfile}
                        initialProgress={userProgress}
                        onProgressUpdate={handleProgressUpdate}
                        onResetProfile={handleResetProfile}
                    />
                </>
            )}
        </>
    );
}