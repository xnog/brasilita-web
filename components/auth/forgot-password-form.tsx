"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
            } else {
                setError(data.error || "Ocorreu um erro. Tente novamente.");
            }
        } catch {
            setError("Ocorreu um erro. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                <Logo className="text-primary-foreground" size={48} />
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center">Email enviado!</CardTitle>
                        <CardDescription className="text-center">
                            Verifique sua caixa de entrada
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground bg-green-50 p-4 rounded-md border border-green-200">
                            <p className="mb-2">
                                Se o email <strong>{email}</strong> estiver cadastrado, você receberá
                                um link para redefinir sua senha.
                            </p>
                            <p>
                                O link é válido por 1 hora. Verifique também a pasta de spam.
                            </p>
                        </div>

                        <div className="text-sm text-muted-foreground bg-blue-50 p-4 rounded-md border border-blue-200">
                            <p className="font-medium mb-1">💡 Dica:</p>
                            <p>
                                Se você fez login com Google, não precisa redefinir senha.
                                Use o botão &quot;Continuar com Google&quot; na tela de login.
                            </p>
                        </div>

                        <div className="text-center space-y-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => router.push("/auth/signin")}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar para login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                            <Logo className="text-primary-foreground" size={48} />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Esqueceu sua senha?</CardTitle>
                    <CardDescription className="text-center">
                        Digite seu email para receber um link de redefinição
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Enviando..." : "Enviar link de redefinição"}
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <Link
                            href="/auth/signin"
                            className="text-primary hover:underline inline-flex items-center"
                        >
                            <ArrowLeft className="mr-1 h-3 w-3" />
                            Voltar para login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
