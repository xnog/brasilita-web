"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PreferencesForm } from "@/components/preferences/preferences-form";
import { UserProfile } from "@/lib/db/schema";

interface PreferencesClientProps {
    userId: string;
}

export function PreferencesClient({ userId }: PreferencesClientProps) {
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

    const handleSubmit = async (data: any) => {
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
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Carregando suas preferências...</p>
                </div>
            </div>
        );
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
                initialData={userProfile || undefined}
                isEditing={!!userProfile}
                isLoading={isSaving}
            />
        </div>
    );
}
