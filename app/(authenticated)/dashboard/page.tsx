import { auth } from "@/lib/auth";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CheckSquare, ArrowRight, Home, Search, Settings, Handshake, Heart, HelpCircle, ShoppingCart, Sparkles } from "lucide-react";
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
    let formattedRegions = "Todas as regiões";
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
        formattedRegions = "Todas as regiões";
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
                                Imóveis
                            </CardTitle>
                            <CardDescription>
                                Seus imóveis favoritos e negociações
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Heart className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-blue-600">{propertyInterests}</p>
                                        <p className="text-xs text-muted-foreground">imóveis favoritos</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-2 border-t">
                                    <Handshake className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">{propertiesToProceed}</p>
                                        <p className="text-xs text-muted-foreground">imóveis em negociação</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Brasilità Insider Launch Card */}
                <Card className="mb-8 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <Sparkles className="h-6 w-6 text-yellow-600" />
                            Brasilità Insider - Lançamento Especial
                        </CardTitle>
                        <CardDescription className="text-base">
                            Junte-se à primeira comunidade em português dedicada ao mercado imobiliário italiano
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                        📚 <strong>Curso</strong> completo
                                    </span>
                                    <span className="flex items-center gap-1">
                                        💬 <strong>Comunidade</strong> VIP WhatsApp
                                    </span>
                                    <span className="flex items-center gap-1">
                                        🎥 <strong>Lives</strong> mensais
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    <strong className="text-yellow-600">Primeiros 100:</strong> apenas R$179/trimestre - Vagas limitadas!
                                </p>
                            </div>
                            <Button size="lg" className="shrink-0 bg-yellow-500 hover:bg-yellow-600 text-black font-bold" asChild>
                                <Link href="/insider-launch">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Saiba Mais
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

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
                                <Link href="/properties">
                                    <Search className="h-4 w-4 mr-2" />
                                    Ver Imóveis
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
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

                {/* Featured Section - FAQ */}
                <Card className="mb-8 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <HelpCircle className="h-6 w-6 text-blue-600" />
                            Perguntas Frequentes
                        </CardTitle>
                        <CardDescription className="text-base">
                            Tire suas dúvidas sobre compra de imóveis na Itália com nosso guia completo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                        📋 <strong>15</strong> perguntas essenciais
                                    </span>
                                    <span className="flex items-center gap-1">
                                        🔍 <strong>Busca</strong> inteligente
                                    </span>
                                    <span className="flex items-center gap-1">
                                        🏷️ <strong>Categorias</strong> organizadas
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Documentação, financiamento, impostos, processo de compra e muito mais
                                </p>
                            </div>
                            <Button size="lg" className="shrink-0 bg-blue-600 hover:bg-blue-700" asChild>
                                <a href="/faq" target="_blank" rel="noopener noreferrer">
                                    <HelpCircle className="h-4 w-4 mr-2" />
                                    Ver FAQ
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Featured Section - Property Purchase Service */}
                <Card className="mb-8 bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-purple-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <ShoppingCart className="h-6 w-6 text-purple-600" />
                            Compra de Imóveis
                        </CardTitle>
                        <CardDescription className="text-base">
                            Assessoria completa para aquisição do seu imóvel na Itália.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                        🏠 <strong>Curadoria</strong> personalizada
                                    </span>
                                    <span className="flex items-center gap-1">
                                        ✅ <strong>Verificação</strong> completa
                                    </span>
                                    <span className="flex items-center gap-1">
                                        ⚖️ <strong>Validação</strong> jurídica
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Do início à escritura final com total segurança e transparência
                                </p>
                            </div>
                            <Button size="lg" className="shrink-0 bg-purple-600 hover:bg-purple-700" asChild>
                                <Link href="/services/property-purchase">
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Saiba Mais
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}