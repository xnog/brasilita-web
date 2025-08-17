"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PreferencesForm } from "@/components/preferences/preferences-form";
import { UserProfile } from "@/lib/db/schema";
import { PageLoading } from "@/components/ui/page-loading";
import { MultiSelectValue } from "@/components/extension/multi-select";

interface Region {
    id: string;
    name: string;
    examples?: string;
}

export function PreferencesClient() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [availableRegions, setAvailableRegions] = useState<MultiSelectValue[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Carregar perfil e regiões em paralelo
                const [profileResponse, regionsResponse] = await Promise.all([
                    fetch("/api/preferences"),
                    fetch("/api/regions")
                ]);

                if (profileResponse.ok) {
                    const profile = await profileResponse.json();
                    setUserProfile(profile);
                }

                if (regionsResponse.ok) {
                    const regionsData = await regionsResponse.json();
                    const regionsAsOptions = regionsData.regions.map((region: Region) => ({
                        value: region.id,
                        label: region.name
                    }));
                    setAvailableRegions(regionsAsOptions);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (data: {
        propertyType: "residential" | "investment";
        location?: string;
        regions?: string[];
        buyerProfile: "resident" | "italian_citizen" | "foreign_non_resident" | "brazilian_abroad";
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
                availableRegions={availableRegions}
                initialData={userProfile ? {
                    propertyType: userProfile.propertyType as "residential" | "investment" | undefined,
                    location: userProfile.location || "",
                    regions: (userProfile as UserProfile & { regions?: string[] }).regions || [], // Incluir regiões selecionadas
                    buyerProfile: userProfile.buyerProfile as "resident" | "italian_citizen" | "foreign_non_resident" | "brazilian_abroad" | undefined,
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
