"use client";

import { useState, useEffect } from "react";
import { RequirementsForm } from "@/components/checklist/requirements-form";
import { ChecklistView } from "@/components/checklist/checklist-view";
import { checklistCategories, checklistItems } from "@/lib/checklist-data";
import { Building, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProfile {
    propertyType: "residential" | "commercial" | "investment";
    location: string;
    buyerProfile: "resident" | "italian_citizen" | "foreign_non_resident";
    usageType: "personal_use" | "long_rental" | "short_rental";
    investmentBudget: number;
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
    const [isLoading, setIsLoading] = useState(true);

    // Load user profile and progress from localStorage (in a real app, this would be from the database)
    useEffect(() => {
        const savedProfile = localStorage.getItem(`checklist-profile-${userId}`);
        const savedProgress = localStorage.getItem(`checklist-progress-${userId}`);

        if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile));
        }

        if (savedProgress) {
            setUserProgress(JSON.parse(savedProgress));
        }

        setIsLoading(false);
    }, [userId]);

    const handleProfileSubmit = (profile: UserProfile) => {
        setUserProfile(profile);
        localStorage.setItem(`checklist-profile-${userId}`, JSON.stringify(profile));
    };

    const handleProgressUpdate = (itemId: string, completed: boolean, notes?: string) => {
        const newProgress = {
            ...userProgress,
            [itemId]: {
                isCompleted: completed,
                notes: notes || userProgress[itemId]?.notes || "",
                completedAt: completed ? new Date() : undefined,
            },
        };

        setUserProgress(newProgress);
        localStorage.setItem(`checklist-progress-${userId}`, JSON.stringify(newProgress));
    };

    const handleResetProfile = () => {
        setUserProfile(null);
        setUserProgress({});
        localStorage.removeItem(`checklist-profile-${userId}`);
        localStorage.removeItem(`checklist-progress-${userId}`);
    };

    // Transform checklist data to match component interface
    const transformedCategories = checklistCategories.map((cat, index) => ({
        id: `category-${index}`,
        name: cat.name,
        description: cat.description || "",
        order: cat.order,
    }));

    const transformedItems = checklistItems.map((item, index) => {
        const categoryIndex = checklistCategories.findIndex(cat => cat.order === Math.floor(index / 10) + 1);
        return {
            id: `item-${index}`,
            categoryId: `category-${categoryIndex}`,
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
                            <h1 className="text-xl font-bold text-foreground">Brasilitá Wealth</h1>
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