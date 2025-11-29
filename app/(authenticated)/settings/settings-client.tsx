"use client";

import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User, Mail } from "lucide-react";
import { useState } from "react";

interface SettingsClientProps {
    userHasPassword: boolean;
    loginProvider: string;
    userInfo: {
        name?: string | null;
        email?: string | null;
    } | null;
    emailPreferences: {
        weeklySuggestions?: boolean;
    };
}

export function SettingsClient({ userHasPassword, loginProvider, userInfo, emailPreferences }: SettingsClientProps) {
    const [weeklySuggestions, setWeeklySuggestions] = useState(emailPreferences.weeklySuggestions ?? true);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggleWeeklySuggestions = async (checked: boolean) => {
        setIsUpdating(true);
        try {
            const response = await fetch("/api/user/email-preferences", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ weeklySuggestions: checked }),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar preferências");
            }

            setWeeklySuggestions(checked);
        } catch (error) {
            console.error("Erro ao atualizar preferências:", error);
            // Revert on error
            setWeeklySuggestions(!checked);
        } finally {
            setIsUpdating(false);
        }
    };

    const getProviderName = (provider: string) => {
        switch (provider.toLowerCase()) {
            case 'google':
                return 'Google';
            case 'email':
            case 'credentials':
                return 'Email/Senha';
            default:
                return provider;
        }
    };

    const getProviderBadgeVariant = (provider: string) => {
        switch (provider.toLowerCase()) {
            case 'google':
                return 'secondary';
            case 'email':
            case 'credentials':
                return 'default';
            default:
                return 'outline';
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Configurações da Conta
                </h1>
                <p className="text-muted-foreground">
                    Gerencie as informações e configurações de segurança da sua conta
                </p>
            </div>

            <div className="space-y-6">
                {/* Account Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Informações da Conta
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground w-20">Nome:</span>
                            <span className="font-medium">{userInfo?.name || 'Não informado'}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground w-20">Email:</span>
                            <span className="font-medium">{userInfo?.email || 'Não informado'}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground w-20">Login via:</span>
                            <Badge variant={getProviderBadgeVariant(loginProvider)} className="text-xs">
                                {getProviderName(loginProvider)}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Email Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Preferências de Email
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium cursor-pointer">
                                    Sugestões Semanais
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    Receba até 3 imóveis selecionados toda segunda-feira às 9h
                                </p>
                            </div>
                            <Switch
                                checked={weeklySuggestions}
                                onCheckedChange={handleToggleWeeklySuggestions}
                                disabled={isUpdating}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Password Section - Only show for email/password users */}
                {userHasPassword && <ChangePasswordForm />}
            </div>
        </div>
    );
}