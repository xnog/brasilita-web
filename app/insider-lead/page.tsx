import { CheckCircle, Download, Globe, TrendingUp, Users, Lock, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { auth } from "@/lib/auth";

export default async function InsiderLeadPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-background">
            <LandingHeader session={session} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 section-padding overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto container-padding relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Column - Content */}
                            <div className="text-white">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-400 text-black text-xs md:text-sm font-bold mb-6 shadow-xl">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    GUIA GRATUITO - LANÇAMENTO EXCLUSIVO
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                    Descubra as
                                    <span className="block text-yellow-400 mt-2">
                                        5 Regiões Italianas Mais Rentáveis
                                    </span>
                                    para Investir em 2025
                                </h1>

                                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                                    Guia completo e gratuito revelando onde investir, quanto custa e
                                    qual rentabilidade esperar em cada região da Itália
                                </p>

                                {/* Benefits */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Análise Completa de 5 Regiões</p>
                                            <p className="text-white/80 text-sm">Toscana, Puglia, Abruzzo, Sicília e Piemonte</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Preços Médios e Rentabilidade Real</p>
                                            <p className="text-white/80 text-sm">Dados atualizados do mercado italiano</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Custos Ocultos e Impostos</p>
                                            <p className="text-white/80 text-sm">Tudo que você precisa saber antes de investir</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Cases Reais de Brasileiros</p>
                                            <p className="text-white/80 text-sm">Exemplos práticos e resultados comprovados</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Proof */}
                                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-400" />
                                        <span>+200k seguidores</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-green-400" />
                                        <span>Vivemos na Itália</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                        <span>Dezenas de clientes atendidos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Form */}
                            <div className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-400">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Download className="w-8 h-8 text-black" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                            Baixe Grátis Agora
                                        </h2>
                                        <p className="text-muted-foreground">
                                            Preencha os dados abaixo para receber o guia completo
                                        </p>
                                    </div>

                                    {/* Form Component */}
                                    <LeadCaptureForm />

                                    {/* Security Badge */}
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                            <Lock className="w-4 h-4" />
                                            <span>Seus dados estão seguros. Não enviamos spam.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl transform rotate-12 hidden md:block">
                                    100% GRATUITO
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You'll Learn Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                O Que Você Vai Descobrir no Guia
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Informações valiosas que podem economizar milhares de euros na sua jornada
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Item 1 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Análise de Cada Região</h3>
                                <p className="text-muted-foreground text-sm">
                                    Características, infraestrutura, turismo e potencial de valorização
                                </p>
                            </div>

                            {/* Item 2 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Preços Reais</h3>
                                <p className="text-muted-foreground text-sm">
                                    Quanto custa realmente comprar um imóvel em cada região
                                </p>
                            </div>

                            {/* Item 3 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Rentabilidade</h3>
                                <p className="text-muted-foreground text-sm">
                                    ROI esperado em aluguel de curta e longa temporada
                                </p>
                            </div>

                            {/* Item 4 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Armadilhas a Evitar</h3>
                                <p className="text-muted-foreground text-sm">
                                    Erros comuns que podem custar caro para brasileiros
                                </p>
                            </div>

                            {/* Item 5 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Documentação</h3>
                                <p className="text-muted-foreground text-sm">
                                    O que você precisa providenciar antes de comprar
                                </p>
                            </div>

                            {/* Item 6 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Cases de Sucesso</h3>
                                <p className="text-muted-foreground text-sm">
                                    Histórias reais de brasileiros que já investiram
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Us Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Por Que Confiar na Brasilità?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">+200k</div>
                                <div className="text-sm text-muted-foreground">Seguidores nas redes sociais</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                <div className="text-sm text-muted-foreground">Vivendo e investindo na Itália</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">5+</div>
                                <div className="text-sm text-muted-foreground">Anos de experiência no mercado</div>
                            </div>
                        </div>

                        <div className="mt-12 professional-card text-center">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Somos a <strong className="text-foreground">única plataforma em português</strong> especializada
                                em conectar brasileiros ao mercado imobiliário italiano. Nossa equipe vive na Itália e
                                acompanha o mercado diariamente, trazendo informações atualizadas e confiáveis.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 py-16">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            Pronto Para Descobrir as Melhores Oportunidades?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Baixe agora o guia gratuito e dê o primeiro passo para investir na Itália com segurança
                        </p>
                        <a
                            href="#top"
                            className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                        >
                            BAIXAR GUIA GRATUITO AGORA
                            <Download className="ml-2 h-6 w-6" />
                        </a>
                        <p className="text-white/80 text-sm mt-4">
                            ✓ 100% Gratuito ✓ Sem Compromisso ✓ Acesso Imediato
                        </p>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}

