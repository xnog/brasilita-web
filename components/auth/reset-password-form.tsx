"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [token, setToken] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tokenParam = searchParams.get("token");
        if (!tokenParam) {
            setError("Token inválido. Solicite um novo link de redefinição de senha.");
        } else {
            setToken(tokenParam);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Validações
        if (password.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            setIsLoading(false);
            return;
        }

        if (!token) {
            setError("Token inválido. Solicite um novo link de redefinição de senha.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                // Redirecionar para login após 3 segundos
                setTimeout(() => {
                    router.push("/auth/signin");
                }, 3000);
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
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="text-green-600" size={32} />
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center text-green-600">
                            Senha redefinida!
                        </CardTitle>
                        <CardDescription className="text-center">
                            Sua senha foi alterada com sucesso
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground bg-green-50 p-4 rounded-md border border-green-200 text-center">
                            <p>
                                Você será redirecionado para a página de login em alguns segundos...
                            </p>
                        </div>

                        <Button
                            className="w-full"
                            onClick={() => router.push("/auth/signin")}
                        >
                            Ir para login agora
                        </Button>
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
                    <CardTitle className="text-2xl text-center">Redefinir senha</CardTitle>
                    <CardDescription className="text-center">
                        Digite sua nova senha
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!token && error ? (
                        <div className="space-y-4">
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                            <Link href="/auth/forgot-password">
                                <Button className="w-full">
                                    Solicitar novo link
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Nova senha</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Digite sua nova senha"
                                        className="pl-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        minLength={6}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Mínimo de 6 caracteres
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Digite a senha novamente"
                                        className="pl-10"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Redefinindo..." : "Redefinir senha"}
                            </Button>
                        </form>
                    )}

                    <div className="text-center text-sm">
                        <Link href="/auth/signin" className="text-primary hover:underline">
                            Voltar para login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
