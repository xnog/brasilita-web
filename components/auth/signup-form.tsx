"use client";

import { useState, useMemo } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User, Check, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    // Password strength indicator
    const passwordStrength = useMemo(() => {
        if (password.length === 0) return null;
        if (password.length < 6) return { label: "Muito curta", color: "text-red-600", valid: false };
        if (password.length < 8) return { label: "Fraca", color: "text-yellow-600", valid: true };
        if (password.length < 12) return { label: "Boa", color: "text-green-600", valid: true };
        return { label: "Forte", color: "text-green-600", valid: true };
    }, [password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Ocorreu um erro");
                return;
            }

            // Fazer login automático após o registro
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Conta criada, mas houve erro no login automático");
            } else {
                router.push("/preferences");
            }
        } catch {
            setError("Ocorreu um erro. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/preferences" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                            <Logo className="text-primary-foreground" size={48} />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Criar conta</CardTitle>
                    <CardDescription className="text-center">
                        Crie sua conta para começar
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                    >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Continuar com Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Ou continue com
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Seu nome completo"
                                    className="pl-10"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

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
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {passwordStrength && (
                                <div className="flex items-center gap-2 text-xs">
                                    {passwordStrength.valid ? (
                                        <Check className="h-3 w-3 text-green-600" />
                                    ) : (
                                        <X className="h-3 w-3 text-red-600" />
                                    )}
                                    <span className={passwordStrength.color}>
                                        Senha {passwordStrength.label.toLowerCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Criando conta..." : "Criar conta"}
                        </Button>

                        <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                                <input
                                    type="checkbox"
                                    id="acceptPrivacyPolicy"
                                    checked={acceptPrivacyPolicy}
                                    onChange={(e) => setAcceptPrivacyPolicy(e.target.checked)}
                                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    required
                                />
                                <label htmlFor="acceptPrivacyPolicy" className="text-sm text-muted-foreground leading-relaxed">
                                    Li e concordo com a{" "}
                                    <Link href="/privacy-policy" target="_blank" className="text-primary hover:underline">
                                        Política de Privacidade e Proteção de Dados
                                    </Link>{" "}
                                    da Brasilità.
                                </label>
                            </div>
                        </div>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Já tem uma conta? </span>
                        <Link href="/auth/signin" className="text-primary hover:underline">
                            Faça login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}