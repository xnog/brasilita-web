import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, LogOut, User } from "lucide-react";
import { redirect } from "next/navigation";

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
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Building className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">Brasilitá Wealth</h1>
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

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

                        <Card>
                            <CardHeader>
                                <CardTitle>Consultoria</CardTitle>
                                <CardDescription>
                                    Agende uma consulta
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    Agendar Consulta
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Próximos Passos</CardTitle>
                                <CardDescription>
                                    Complete seu perfil para uma experiência personalizada
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        Complete suas informações de perfil
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-muted rounded-full"></div>
                                        Defina suas preferências de investimento
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-muted rounded-full"></div>
                                        Agende uma consulta inicial
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}