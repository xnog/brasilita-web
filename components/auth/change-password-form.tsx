"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock } from "lucide-react";

interface ChangePasswordFormProps {
    onSuccess?: () => void;
}

export function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError("");
        setSuccess(false);
    };

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const validateForm = (): string | null => {
        if (!formData.currentPassword) {
            return "Senha atual é obrigatória";
        }
        if (!formData.newPassword) {
            return "Nova senha é obrigatória";
        }
        if (formData.newPassword.length < 6) {
            return "A nova senha deve ter pelo menos 6 caracteres";
        }
        if (formData.newPassword !== formData.confirmPassword) {
            return "A confirmação da senha não confere";
        }
        if (formData.currentPassword === formData.newPassword) {
            return "A nova senha deve ser diferente da senha atual";
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                onSuccess?.();
            } else {
                setError(data.error || "Erro ao alterar senha");
            }
        } catch {
            setError("Erro interno. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Alterar Senha
                </CardTitle>
                <CardDescription>
                    Altere sua senha de acesso à plataforma. Esta opção está disponível apenas para usuários que fazem login via email.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <div className="relative">
                            <Input
                                id="currentPassword"
                                type={showPasswords.current ? "text" : "password"}
                                value={formData.currentPassword}
                                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                                disabled={isLoading}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                                onClick={() => togglePasswordVisibility("current")}
                                tabIndex={-1}
                            >
                                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showPasswords.new ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                                disabled={isLoading}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                                onClick={() => togglePasswordVisibility("new")}
                                tabIndex={-1}
                            >
                                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Mínimo de 6 caracteres
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showPasswords.confirm ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                disabled={isLoading}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                                onClick={() => togglePasswordVisibility("confirm")}
                                tabIndex={-1}
                            >
                                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
                            Senha alterada com sucesso!
                        </div>
                    )}

                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? "Alterando..." : "Alterar Senha"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}