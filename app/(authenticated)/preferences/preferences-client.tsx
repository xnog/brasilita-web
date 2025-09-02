"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PreferencesForm } from "@/components/preferences/preferences-form";
import { UserProfile } from "@/lib/db/schema";
import { MultiSelectValue } from "@/components/extension/multi-select";



interface PreferencesClientProps {
    initialUserProfile: UserProfile | null;
    availableRegions: MultiSelectValue[];
}

export function PreferencesClient({ initialUserProfile, availableRegions }: PreferencesClientProps) {
    const [userProfile] = useState<UserProfile | null>(initialUserProfile);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();



    const handleSubmit = async (data: {
        propertyType: "residential" | "investment";
        location?: string;
        regions?: string[];
        buyerProfile: "resident" | "italian_citizen" | "foreign_non_resident" | "brazilian_abroad";
        usageType: "personal_use" | "long_rental" | "short_rental" | "relocation" | "mixed_use" | "family_legacy";
        investmentBudget: number;
        hasFinancing?: boolean;
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
                    hasFinancing: (userProfile as UserProfile & { hasFinancing?: boolean }).hasFinancing || false,
                    phone: userProfile.phone || "",
                    investmentGoal: userProfile.investmentGoal || "",
                } : undefined}
                isEditing={!!userProfile}
                isLoading={isSaving}
            />
        </div>
    );
}
