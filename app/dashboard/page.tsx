import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, LogOut, User, CheckSquare, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/logo";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                            <Logo className="text-primary-foreground" size={48} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">Brasilità</h1>
                            <p className="text-xs text-muted-foreground">Dashboard</p>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}
                    >
                        <Button variant="outline" size="sm" type="submit">
                            <LogOut className="h-4 w-4 mr-2" />
                            Sair
                        </Button>
                    </form>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Bem-vindo, {session.user?.name || session.user?.email}!
                        </h1>
                        <p className="text-muted-foreground">
                            Esta é sua área exclusiva para gerenciar seus investimentos imobiliários na Itália.
                        </p>
                    </div>

                    {/* Featured Section - Checklist */}
                    <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <CheckSquare className="h-6 w-6 text-primary" />
                                Checklist de Compra de Imóvel na Itália
                            </CardTitle>
                            <CardDescription className="text-base">
                                Guia completo e personalizado para sua jornada de compra de imóvel na Itália.
                                Organize todas as etapas legais, financeiras e práticas com confiança.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                        <span className="flex items-center gap-1">
                                            ✅ <strong>Personalizado</strong> para seu perfil
                                        </span>
                                        <span className="flex items-center gap-1">
                                            📋 <strong>50+</strong> itens organizados
                                        </span>
                                        <span className="flex items-center gap-1">
                                            🇮🇹 <strong>Específico</strong> para Itália
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Desde documentos iniciais até a finalização da compra
                                    </p>
                                </div>
                                <Button size="lg" className="shrink-0" asChild>
                                    <a href="/checklist">
                                        Acessar Checklist
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Perfil
                                </CardTitle>
                                <CardDescription>
                                    Gerencie suas informações pessoais
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm">
                                        <strong>Nome:</strong> {session.user?.name || "Não informado"}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Email:</strong> {session.user?.email}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Método de login:</strong> {session.user?.image ? "Google" : "Email"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Propriedades</CardTitle>
                                <CardDescription>
                                    Seus imóveis na Itália
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-xs text-muted-foreground">propriedades registradas</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}