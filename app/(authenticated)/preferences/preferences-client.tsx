"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PreferencesForm } from "@/components/preferences/preferences-form";
import { UserProfile } from "@/lib/db/schema";
import { PageLoading } from "@/components/ui/page-loading";

export function PreferencesClient() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/preferences");
                if (response.ok) {
                    const profile = await response.json();
                    setUserProfile(profile);
                }
            } catch (error) {
                console.error("Erro ao buscar perfil:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (data: {
        propertyType: "residential" | "commercial" | "investment";
        location: string;
        buyerProfile: "resident" | "italian_citizen" | "foreign_non_resident";
        usageType: "personal_use" | "long_rental" | "short_rental" | "relocation" | "mixed_use" | "family_legacy";
        investmentBudget: number;
        phone: string;
        investmentGoal: string;
    }) => {
        setIsSaving(true);
        try {
            const method = userProfile ? "PUT" : "POST";
            const response = await fetch("/api/preferences", {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Redirect to dashboard after successful save
                router.push("/dashboard");
            } else {
                console.error("Erro ao salvar preferências");
            }
        } catch (error) {
            console.error("Erro ao salvar preferências:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <PageLoading message="Carregando suas preferências..." />;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    {userProfile ? "Editar Preferências" : "Configure suas Preferências"}
                </h1>
                <p className="text-muted-foreground">
                    {userProfile
                        ? "Atualize suas preferências para melhorar as recomendações de imóveis"
                        : "Configurar suas preferências é o primeiro passo para receber recomendações personalizadas de imóveis na Itália"
                    }
                </p>
            </div>

            <PreferencesForm
                onSubmit={handleSubmit}
                initialData={userProfile ? {
                    propertyType: userProfile.propertyType as "residential" | "commercial" | "investment" | undefined,
                    location: userProfile.location || "",
                    buyerProfile: userProfile.buyerProfile as "resident" | "italian_citizen" | "foreign_non_resident" | undefined,
                    usageType: userProfile.usageType as "personal_use" | "long_rental" | "short_rental" | "relocation" | "mixed_use" | "family_legacy" | undefined,
                    investmentBudget: userProfile.investmentBudget || undefined,
                    phone: userProfile.phone || "",
                    investmentGoal: userProfile.investmentGoal || "",
                } : undefined}
                isEditing={!!userProfile}
                isLoading={isSaving}
            />
        </div>
    );
}
