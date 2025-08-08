"use client";

import { useState, useEffect } from "react";
import { RequirementsForm } from "@/components/checklist/requirements-form";
import { ChecklistView } from "@/components/checklist/checklist-view";
import { Building, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProfile {
    propertyType: "residential" | "commercial" | "investment";
    location: string;
    buyerProfile: "resident" | "italian_citizen" | "foreign_non_resident";
    usageType: "personal_use" | "long_rental" | "short_rental";
    investmentBudget: number;
    phone: string;
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
    const [categories, setCategories] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load user profile, progress and checklist items from database
    useEffect(() => {
        const loadData = async () => {
            try {
                // Load checklist items and categories
                const itemsResponse = await fetch('/api/checklist/items');
                if (itemsResponse.ok) {
                    const itemsData = await itemsResponse.json();
                    setCategories(itemsData.categories || []);
                    setItems(itemsData.items || []);
                }

                // Load profile
                const profileResponse = await fetch('/api/checklist/profile');
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    if (profileData.profile) {
                        setUserProfile(profileData.profile);
                    }
                }

                // Load progress
                const progressResponse = await fetch('/api/checklist/progress');
                if (progressResponse.ok) {
                    const progressData = await progressResponse.json();
                    if (progressData.progress) {
                        setUserProgress(progressData.progress);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [userId]);

    const handleProfileSubmit = async (profile: UserProfile) => {
        try {
            const response = await fetch('/api/checklist/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (response.ok) {
                const data = await response.json();
                setUserProfile(data.profile);
            } else {
                console.error('Erro ao salvar perfil:', await response.text());
                alert('Erro ao salvar perfil. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
            alert('Erro ao salvar perfil. Tente novamente.');
        }
    };

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
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Building className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Carregando seu checklist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Building className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">Brasilità Wealth</h1>
                            <p className="text-xs text-muted-foreground">Checklist de Compra - Itália</p>
                        </div>
                    </div>
                    <Button variant="outline" asChild>
                        <a href="/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Voltar ao Dashboard
                        </a>
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {!userProfile ? (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Checklist Personalizado para Compra de Imóvel na Itália
                            </h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Responda algumas perguntas para criarmos um checklist personalizado com todas as etapas
                                necessárias para sua compra de imóvel na Itália, considerando sua situação específica.
                            </p>
                        </div>
                        <RequirementsForm onSubmit={handleProfileSubmit} />
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Seu Checklist Personalizado
                            </h1>
                            <p className="text-muted-foreground">
                                Acompanhe seu progresso na compra do imóvel em {userProfile.location}, Itália
                            </p>
                        </div>

                        <ChecklistView
                            categories={transformedCategories}
                            items={transformedItems}
                            userProfile={userProfile}
                            initialProgress={userProgress}
                            onProgressUpdate={handleProgressUpdate}
                            onResetProfile={handleResetProfile}
                        />
                    </div>
                )}
            </main>
        </div>
    );
}