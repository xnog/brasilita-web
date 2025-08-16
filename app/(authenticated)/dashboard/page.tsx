import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CheckSquare, ArrowRight, Home, Search, Settings, Handshake, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { userProfiles, userPropertyInterests } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { formatUserRegions } from "@/lib/utils";

export default async function DashboardPage() {
    const session = await auth();

    // Get user profile
    let userProfile = null;
    let propertyInterests = 0;
    let propertiesToProceed = 0;
    let formattedRegions = "";
    try {
        if (session?.user?.id) {
            userProfile = await db.query.userProfiles.findFirst({
                where: eq(userProfiles.userId, session.user.id),
                with: {
                    userProfileRegions: {
                        with: {
                            region: true
                        }
                    }
                }
            });

            if (userProfile) {
                const interests = await db.select().from(userPropertyInterests)
                    .where(and(
                        eq(userPropertyInterests.userId, session.user.id),
                        eq(userPropertyInterests.isInterested, true)
                    ));
                propertyInterests = interests.length;

                // Count properties user wants to proceed with negotiation
                const proceedInterests = await db.select().from(userPropertyInterests)
                    .where(and(
                        eq(userPropertyInterests.userId, session.user.id),
                        eq(userPropertyInterests.wantsToProceed, true)
                    ));
                propertiesToProceed = proceedInterests.length;

                // Format regions
                formattedRegions = await formatUserRegions(userProfile);
            }
        }
    } catch (error) {
        console.log("Error fetching user data:", error);
    }

    return (
        <div className="container mx-auto container-padding py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Bem-vindo, {session?.user?.name || session?.user?.email}!
                    </h1>
                    <p className="text-muted-foreground">
                        Esta é sua área exclusiva para gerenciar seus investimentos imobiliários na Itália.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Perfil
                            </CardTitle>
                            <CardDescription>
                                Suas informações pessoais
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <strong>Nome:</strong> {session?.user?.name || "Não informado"}
                                </p>
                                <p className="text-sm">
                                    <strong>Email:</strong> {session?.user?.email}
                                </p>
                                <p className="text-sm">
                                    <strong>Método de login:</strong> {session?.user?.image ? "Google" : "Email"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Preferências
                                </div>
                                {userProfile && (
                                    <Button variant="outline" size="sm" asChild>
                                        <a href="/preferences">
                                            Editar
                                        </a>
                                    </Button>
                                )}
                            </CardTitle>
                            <CardDescription>
                                Suas preferências de investimento
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {userProfile ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckSquare className="h-4 w-4" />
                                        <span className="text-sm font-medium">Perfil completo</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {formattedRegions} • €{userProfile.investmentBudget?.toLocaleString()}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        Configure suas preferências para receber recomendações personalizadas
                                    </p>
                                    <Button size="sm" asChild>
                                        <a href="/preferences">
                                            Configurar
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Home className="h-5 w-5" />
                                Imóveis de Interesse
                            </CardTitle>
                            <CardDescription>
                                Seus imóveis marcados e negociações
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Heart className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-2xl font-bold">{propertyInterests}</p>
                                        <p className="text-xs text-muted-foreground">imóveis de interesse</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-2 border-t">
                                    <Handshake className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">{propertiesToProceed}</p>
                                        <p className="text-xs text-muted-foreground">prontos para negociar</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Featured Section - Properties */}
                <Card className="mb-8 bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <Home className="h-6 w-6 text-green-600" />
                            Imóveis
                        </CardTitle>
                        <CardDescription className="text-base">
                            Explore nossa seleção de imóveis na Itália.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                        🏠 <strong>Seleção</strong> curada
                                    </span>
                                    <span className="flex items-center gap-1">
                                        💚 <strong>Marque</strong> seus favoritos
                                    </span>
                                    <span className="flex items-center gap-1">
                                        🔍 <strong>Filtros</strong> avançados
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Seleção personalizada baseada no seu perfil
                                </p>
                            </div>
                            <Button size="lg" className="shrink-0 bg-green-600 hover:bg-green-700" asChild>
                                <a href="/properties">
                                    <Search className="h-4 w-4 mr-2" />
                                    Ver Imóveis
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Featured Section - Checklist */}
                {/* <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
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
                </Card> */}

            </div>
        </div>
    );
}