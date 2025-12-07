import { CheckCircle, Users, TrendingUp, Globe, Calendar, Sparkles, Shield, Target, Zap, Calculator, BookOpen, Instagram } from "lucide-react";
import Image from "next/image";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Brasilità Insider - A Comunidade Exclusiva Para Investir na Itália | Brasilità",
    description: "Transforme o sonho italiano em realidade. Consultoria mensal, ferramentas exclusivas e comunidade de apoio por apenas R$179/trimestre.",
    keywords: [
        "Brasilità Insider",
        "comunidade investimento Itália",
        "comprar imóvel Itália",
        "investir na Itália",
        "aulas imóveis Itália",
        "consultoria imobiliária Itália",
        "brasileiros na Itália",
        "mercado imobiliário italiano",
        "assessoria imóveis Itália",
        "grupo investidores Itália"
    ],
    authors: [{ name: "Brasilità" }],
    category: "Imóveis e Investimentos",
    openGraph: {
        title: "Brasilità Insider - Comunidade Exclusiva de Investimento Imobiliário na Itália",
        description: "Acesso à plataforma restrita, reuniões mensais no Zoom e oportunidades exclusivas por R$179/trimestre.",
        type: "website",
        locale: "pt_BR",
        siteName: "Brasilità - Seu imóvel na Itália",
        url: "/insider",
        images: [
            {
                url: "/og-insider-launch.jpg",
                width: 1200,
                height: 630,
                alt: "Brasilità Insider - Comunidade Exclusiva"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Brasilità Insider - Comunidade Exclusiva de Investimento Imobiliário na Itália",
        description: "Acesso à plataforma restrita, reuniões mensais no Zoom e oportunidades exclusivas por R$179/trimestre.",
        images: ["/og-insider-launch.jpg"],
        creator: "@brasilita.it"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },
    alternates: {
        canonical: "/insider"
    }
};

export default async function InsiderLaunchPage() {
    const session = await auth();

    // JSON-LD Structured Data for Product/Service
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Brasilità Insider",
        "description": "Comunidade exclusiva com consultoria mensal, ferramentas exclusivas e suporte para brasileiros que desejam investir no mercado imobiliário italiano",
        "image": "https://brasilita.com/og-insider-launch.jpg",
        "brand": {
            "@type": "Organization",
            "name": "Brasilità"
        },
        "offers": {
            "@type": "Offer",
            "price": "179",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/LimitedAvailability",
            "priceValidUntil": "2025-12-31",
            "url": "https://brasilita.com/insider",
            "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "value": "100"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "1"
        }
    };

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Brasilità",
        "url": "https://brasilita.com",
        "logo": "https://brasilita.com/logo.svg",
        "description": "Plataforma especializada em conectar brasileiros ao mercado imobiliário italiano",
        "sameAs": [
            "https://www.instagram.com/brasilita.it"
        ]
    };

    return (
        <div className="min-h-screen bg-background">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />

            {/* Meta Pixel */}
            <MetaPixel />

            <LandingHeader session={session} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 section-padding overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto container-padding text-center relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Badge */}
                        <div className="mb-6">
                            <span className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-400 text-black text-sm font-bold mb-4 shadow-2xl">
                                <Sparkles className="w-5 h-5 mr-2" />
                                COMUNIDADE EXCLUSIVA
                            </span>
                        </div>

                        {/* Tagline Emocional */}
                        <p className="text-lg md:text-xl text-yellow-400 font-semibold mb-4">
                            Seu sonho italiano começa aqui ↓
                        </p>

                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
                            Compre seu imóvel na Itália sem cair em armadilhas
                            <span className="block text-yellow-400 mt-2">
                                que podem custar milhares de euros
                            </span>
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Junte-se aos primeiros brasileiros que estão transformando o sonho italiano em realidade com orientação, ferramentas exclusivas e uma comunidade que entende sua jornada
                        </p>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a
                                href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                QUERO PARTICIPAR
                                <Zap className="ml-2 h-6 w-6" />
                            </a>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>A partir de R$179/trimestre</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>Cancelamento grátis em 7 dias</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>Acesso à plataforma restrita</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Section - Números Reais */}
            <section className="py-12 bg-primary/5">
                <div className="container mx-auto container-padding">
                    <div className="text-center mb-8">
                        <p className="text-lg text-muted-foreground">
                            Junte-se à comunidade de investidores
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">+258k</p>
                            <p className="text-sm text-muted-foreground">Seguidores Combinados</p>
                        </div>

                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">9</p>
                            <p className="text-sm text-muted-foreground">Módulos de Conteúdo</p>
                        </div>

                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">R$179</p>
                            <p className="text-sm text-muted-foreground">Por Trimestre</p>
                        </div>

                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">7 dias</p>
                            <p className="text-sm text-muted-foreground">Garantia Total</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VSL Video Section - MOVIDO PARA CIMA */}
            <section className="section-padding bg-muted/50">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                Veja como funciona o Brasilità Insider
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Descubra tudo que você precisa saber antes de tomar sua decisão
                            </p>
                        </div>

                        <div className="professional-card overflow-hidden">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src="https://www.youtube.com/embed/nSIHX8hq83Y"
                                    title="Brasilità Insider - Vídeo de Apresentação"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Por Que Agora - Nova Seção */}
            <section className="section-padding bg-muted/30">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground">
                            Por que esta é a hora de agir?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                            O mercado imobiliário italiano está passando por um momento único para investidores brasileiros
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            <div className="professional-card text-center border-t-4 border-t-blue-500">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Euro Ainda Acessível</h3>
                                <p className="text-sm text-muted-foreground">
                                    Antes que o Real se desvalorize ainda mais, proteja seu patrimônio em moeda forte
                                </p>
                            </div>

                            <div className="professional-card text-center border-t-4 border-t-green-500">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Alta Demanda Turística</h3>
                                <p className="text-sm text-muted-foreground">
                                    Turismo em crescimento recorde = oportunidade de renda em aluguel de temporada
                                </p>
                            </div>

                            <div className="professional-card text-center border-t-4 border-t-purple-500">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Imóveis Acessíveis</h3>
                                <p className="text-sm text-muted-foreground">
                                    Oportunidades em diversas regiões com preços atrativos para brasileiros
                                </p>
                            </div>
                        </div>

                        <div className="professional-card border-2 border-primary/20">
                            <p className="text-lg md:text-xl leading-relaxed">
                                <strong className="text-foreground">Mas tem um problema:</strong> Fazer isso sozinho, sem orientação,
                                pode custar milhares de euros em erros evitáveis. É por isso que criamos o <strong className="text-primary">Brasilità Insider</strong>,
                                para você ter o suporte necessário sem precisar pagar o preço de uma assessoria completa que não te dá nenhuma certeza de sucesso no negócio.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-10">
                            <a
                                href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                QUERO EVITAR ESSES ERROS
                                <Zap className="ml-2 h-6 w-6" />
                            </a>
                            <p className="text-sm text-muted-foreground mt-3">
                                A partir de R$179/trimestre • Acesso imediato
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* O Que Você Recebe - Merged Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
                                O que você recebe
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Tudo que você precisa para comprar seu imóvel na Itália com segurança
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Aulas Gravadas */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Aulas em 9 Módulos</h3>
                                <p className="text-muted-foreground text-sm">
                                    Conteúdo completo sobre mercado imobiliário italiano, burocracia, impostos e estratégias
                                </p>
                            </div>

                            {/* Comunidade WhatsApp */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Comunidade Focada</h3>
                                <p className="text-muted-foreground text-sm">
                                    Conecte-se com outros brasileiros que também estão comprando imóveis na Itália
                                </p>
                            </div>

                            {/* Reuniões Zoom */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Consultoria Mensal no Zoom</h3>
                                <p className="text-muted-foreground text-sm">
                                    Reuniões mensais ao vivo com a equipe Brasilità para tirar dúvidas e receber orientação
                                </p>
                            </div>

                            {/* Plataforma */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Acesso à Plataforma Restrita</h3>
                                <p className="text-muted-foreground text-sm">
                                    Acesso permanente a todas as funcionalidades e atualizações da plataforma
                                </p>
                            </div>

                            {/* Oportunidades Exclusivas */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Oportunidades Exclusivas</h3>
                                <p className="text-muted-foreground text-sm">
                                    Acesso antecipado a imóveis selecionados antes de irem ao mercado público
                                </p>
                            </div>

                            {/* Calculadora e Ferramentas */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Calculator className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Ferramentas Exclusivas</h3>
                                <p className="text-muted-foreground text-sm">
                                    Calculadora financeira e relatórios com IA sobre regiões italianas
                                </p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-10">
                            <a
                                href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                QUERO ACESSO COMPLETO
                                <Sparkles className="ml-2 h-6 w-6" />
                            </a>
                            <p className="text-sm text-muted-foreground mt-3">
                                Acesso imediato a todos os benefícios • 7 dias de garantia
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Módulos das Aulas */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
                                Estrutura dos Módulos
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Conteúdo completo e estruturado para você dominar o mercado imobiliário italiano
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Módulo 1 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 1 — Bem-vindo</h3>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Boas-vindas ao Insider: visão, propósito e o que você vai descobrir</li>
                                            <li>• A Itália que os brasileiros não veem: mentalidade, demografia e a verdade sobre o mercado imobiliário</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Módulo 2 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 2 — Panorama do Mercado Imobiliário Italiano</h3>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Por que existem imóveis tão baratos na Itália?</li>
                                            <li>• O que os italianos fazem com seus imóveis</li>
                                            <li>• Taxa de natalidade e herança: a raiz do fenômeno</li>
                                            <li>• O mapa do valor do metro quadrado na Itália (por regiões)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Módulo 3 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Target className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 3 — Como Comprar um Imóvel na Itália</h3>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Do clique ao contrato: a jornada completa de compra</li>
                                            <li>• Como funcionam os anúncios, corretores e imobiliárias</li>
                                            <li>• O papel do notário e da &ldquo;visura catastale&rdquo;</li>
                                            <li>• Checklist antes da proposta</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Módulo 4 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 4 — Burocracia e Documentação</h3>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Como comprar com ou sem cidadania</li>
                                            <li>• Fiscal Code, conta bancária, SPID e outros cadastros</li>
                                            <li>• Registro no Catasto e Imposta di Registro</li>
                                            <li>• Erros que podem travar seu contrato</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Módulo 5 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Calculator className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 5 — Finanças, Taxas e Impostos</h3>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• IMU, TARI e taxas municipais explicadas de forma simples</li>
                                            <li>• O que é Cedolare Secca e como declarar aluguel</li>
                                            <li>• Custo real de manter um imóvel na Itália</li>
                                            <li>• Comparativo: investir na Itália x investir no Brasil</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Módulo 6 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 6 — Estratégias de Investimento</h3>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Aluguel tradicional (long stay): vantagens e riscos</li>
                                            <li>• Turismo e locação de curta duração</li>
                                            <li>• Reforma e revenda: como gerar lucro com imóveis baratos</li>
                                            <li>• Rent-to-own e oportunidades fora do radar</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Módulo 7 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 7 — Morar na Itália</h3>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Como escolher a cidade certa para viver</li>
                                            <li>• Diferenças entre norte, centro e sul</li>
                                            <li>• Custo de vida real em 2025</li>
                                            <li>• Como funciona o aluguel residencial e o contrato 4+4</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Módulo 8 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 8 — Casos Reais</h3>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Como encontramos um imóvel de €19.000 que rende 15% ao ano</li>
                                            <li>• Erro real de um comprador brasileiro</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Módulo 9 */}
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500/10 to-teal-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2">Módulo 9 — Encerramento</h3>
                                        <p className="text-sm text-muted-foreground">Conclusão e próximos passos na sua jornada</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-muted-foreground mb-4">
                                + Acesso vitalício a todos os módulos e atualizações futuras
                            </p>
                            <a
                                href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                GARANTIR MINHA VAGA AGORA
                                <Sparkles className="ml-2 h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hosts Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                Quem está por trás do Brasilità Insider
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Conheça quem vai te guiar nesta jornada
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Aloisio */}
                            <div className="professional-card">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                                        <Image
                                            src="/aloisio-insider.jpg"
                                            alt="Aloisio Cechinel"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Aloisio Cechinel</h3>
                                    <p className="text-primary font-semibold mb-2">Fundador da Brasilità</p>
                                    <a
                                        href="https://www.instagram.com/duasmalaseumdestino/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                                    >
                                        <Instagram className="w-4 h-4" />
                                        @duasmalaseumdestino
                                    </a>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Criador de conteúdo de viagens com mais de 190 mil seguidores, investidor no mercado imobiliário italiano,
                                        e especialista em vendas. Na Brasilità, é responsável por oferecer
                                        suporte próximo e transparente a dezenas de famílias brasileiras que realizam o sonho
                                        de investir em imóveis italianos.
                                    </p>
                                </div>
                            </div>

                            {/* Olavo */}
                            <div className="professional-card">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                                        <Image
                                            src="/olavo-insider.jpg"
                                            alt="Olavo Ferenshitz"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Olavo Ferenshitz</h3>
                                    <p className="text-primary font-semibold mb-2">Co-fundador e Especialista</p>
                                    <a
                                        href="https://www.instagram.com/nortedaitalia/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                                    >
                                        <Instagram className="w-4 h-4" />
                                        @nortedaitalia
                                    </a>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Advogado e Planejador Financeiro CFP®, com experiência internacional no Brasil,
                                        EUA e Itália. Olavo é especialista em Investimentos Imobiliários na Itália e traz
                                        toda sua expertise jurídica e financeira para garantir segurança e estratégia nos investimentos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-10">
                            <a
                                href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                COMEÇAR MINHA JORNADA AGORA
                                <Target className="ml-2 h-6 w-6" />
                            </a>
                            <p className="text-sm text-muted-foreground mt-3">
                                Junte-se aos especialistas • Cancele quando quiser
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Para Quem É */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
                                Este programa é perfeito para você se...
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Identifique-se com pelo menos um desses perfis
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card border-l-4 border-l-blue-500 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-2 text-lg">Quer Investir com Segurança</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Busca orientação de quem vive na Itália e conhece o mercado de perto,
                                            sem depender de informações genéricas da internet
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-green-500 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-2 text-lg">Tem ou Está Juntando Capital</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Tem capital próprio para investir ou está se preparando financeiramente
                                            para fazer isso nos próximos 1-2 anos
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-purple-500 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-2 text-lg">Quer Fazer Networking</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Deseja se conectar com outros brasileiros que estão na mesma jornada,
                                            trocar experiências e aprender em comunidade
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-yellow-500 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-2 text-lg">Busca Oportunidades Exclusivas</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Quer ter acesso a imóveis selecionados antes de irem ao mercado público
                                            e ter vantagem competitiva na busca
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-10">
                            <a
                                href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                SIM, ESTE É O MEU PERFIL
                                <CheckCircle className="ml-2 h-6 w-6" />
                            </a>
                            <p className="text-sm text-muted-foreground mt-3">
                                Comece sua jornada hoje • Garantia de 7 dias
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section-padding bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/50 dark:to-gray-950/50">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
                                Escolha seu plano
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                Investimento muito menor que o risco de errar sozinho
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
                            {/* Plano Trimestral */}
                            <div className="professional-card border-4 border-yellow-400 relative overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300">
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 text-sm font-extrabold shadow-xl">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        MAIS POPULAR
                                    </div>
                                </div>
                                <div className="text-center pt-12 pb-6 px-6">
                                    <h3 className="text-2xl font-extrabold mb-1">Plano Trimestral</h3>
                                    <p className="text-muted-foreground text-sm mb-6">Renovação a cada 3 meses</p>
                                    <div className="mb-6">
                                        <div className="flex items-center justify-center gap-3 mb-1">
                                            <span className="text-xl text-muted-foreground line-through">R$239</span>
                                            <span className="text-5xl font-extrabold text-yellow-600">R$179</span>
                                        </div>
                                        <span className="text-base text-muted-foreground">/trimestre (R$59,67/mês)</span>
                                    </div>
                                    <ul className="space-y-2.5 text-left mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Acesso à plataforma restrita</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Reuniões mensais no Zoom</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Oportunidades exclusivas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Calculadora financeira</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Relatórios com IA</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Comunidade WhatsApp</span>
                                        </li>
                                        <li className="flex items-start gap-2 bg-yellow-50 dark:bg-yellow-900/20 p-2.5 rounded-lg -mx-2">
                                            <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">Acesso completo imediato</span>
                                        </li>
                                    </ul>

                                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                        <p className="text-xs text-green-700 dark:text-green-400 font-semibold">
                                            Economia de <strong>R$60 no primeiro trimestre</strong>
                                        </p>
                                    </div>

                                    <a
                                        href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full px-6 py-4 text-base md:text-lg font-extrabold rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black transition-all duration-300 shadow-xl hover:shadow-2xl text-center mb-3"
                                    >
                                        GARANTIR VAGA POR R$179
                                    </a>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Acesso imediato • Cancele quando quiser • 7 dias de garantia
                                    </p>
                                </div>
                            </div>

                            {/* Plano Semestral */}
                            <div className="professional-card border-4 border-green-400 relative overflow-hidden shadow-2xl hover:shadow-green-400/20 transition-all duration-300">
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-green-400 to-green-500 text-black px-6 py-2 text-sm font-extrabold shadow-xl">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        MELHOR CUSTO-BENEFÍCIO
                                    </div>
                                </div>
                                <div className="text-center pt-12 pb-6 px-6">
                                    <h3 className="text-2xl font-extrabold mb-1">Plano Semestral</h3>
                                    <p className="text-muted-foreground text-sm mb-6">Renovação a cada 6 meses</p>
                                    <div className="mb-6">
                                        <div className="flex items-center justify-center gap-3 mb-1">
                                            <span className="text-xl text-muted-foreground line-through">R$449</span>
                                            <span className="text-5xl font-extrabold text-green-600">R$249</span>
                                        </div>
                                        <span className="text-base text-muted-foreground">/semestre (R$41,50/mês)</span>
                                    </div>
                                    <ul className="space-y-2.5 text-left mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Acesso à plataforma restrita</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Reuniões mensais no Zoom</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Oportunidades exclusivas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Calculadora financeira</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Relatórios com IA</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Comunidade WhatsApp</span>
                                        </li>
                                        <li className="flex items-start gap-2 bg-green-50 dark:bg-green-900/20 p-2.5 rounded-lg -mx-2">
                                            <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm font-bold text-green-700 dark:text-green-400">Acesso completo imediato</span>
                                        </li>
                                    </ul>

                                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                        <p className="text-xs text-green-700 dark:text-green-400 font-semibold">
                                            Economize <strong>R$109 vs 2 trimestres</strong> (R$179 x 2 = R$358)
                                        </p>
                                    </div>

                                    <a
                                        href="https://pay.hub.la/SzVlCNLHq17ZmOmCIkkW"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full px-6 py-4 text-base md:text-lg font-extrabold rounded-xl bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black transition-all duration-300 shadow-xl hover:shadow-2xl text-center mb-3"
                                    >
                                        GARANTIR VAGA POR R$249
                                    </a>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Acesso imediato • Cancele quando quiser • 7 dias de garantia
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Guarantee */}
                        <div className="professional-card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Cancelamento Grátis em 7 Dias</h3>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Você tem <strong>7 dias para testar o Brasilità Insider</strong>.
                                    Se não for para você, basta cancelar e devolvemos <strong>100% do seu dinheiro</strong>,
                                    sem perguntas, sem burocracias.
                                </p>
                            </div>
                        </div>

                        {/* CTA After Guarantee */}
                        <div className="text-center mt-10">
                            <a
                                href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                QUERO COMEÇAR SEM RISCOS
                                <Shield className="ml-2 h-6 w-6" />
                            </a>
                            <p className="text-sm text-muted-foreground mt-3">
                                Teste por 7 dias sem compromisso • Reembolso garantido
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
                                Perguntas frequentes
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Tudo que você precisa saber antes de tomar sua decisão
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <h3 className="font-bold mb-3 text-lg">O que é exatamente o Brasilità Insider?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    É uma comunidade exclusiva que filtra e conecta pessoas realmente interessadas em comprar imóveis na Itália.
                                    Oferecemos consultoria coletiva mensal, acesso à plataforma restrita, oportunidades exclusivas e ferramentas práticas.
                                    Pense nisso como ter um time de especialistas no seu bolso, sem pagar o preço de uma assessoria completa.
                                </p>
                            </div>

                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <h3 className="font-bold mb-3 text-lg">Preciso ter dinheiro reservado já para entrar?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Não necessariamente! Muitos membros entram para <strong>se preparar</strong> enquanto juntam o capital.
                                    Você aprende, planeja, entende custos e quando estiver pronto, já sabe exatamente o que fazer.
                                    Imóveis na Itália variam de €30.000 (interior) até €300.000+ (grandes cidades).
                                </p>
                            </div>

                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <h3 className="font-bold mb-3 text-lg">Quanto custa um imóvel na Itália em média?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Depende muito da região. No sul e interior: €30k-€80k por apartamentos ou casas pequenas.
                                    Norte e grandes cidades: €150k-€300k+. Nas reuniões mensais, mostramos oportunidades reais
                                    com análise de ROI para você entender o que cabe no seu bolso.
                                </p>
                            </div>

                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <h3 className="font-bold mb-3 text-lg">Vocês vendem imóveis?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Não. Não somos imobiliária. Nós <strong>conectamos</strong> você a imobiliárias locais confiáveis
                                    e oferecemos consultoria para que você possa comprar com segurança. A negociação é sempre direta
                                    entre você e o vendedor/imobiliária. Nosso papel é te orientar e evitar que você caia em ciladas.
                                </p>
                            </div>

                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <h3 className="font-bold mb-3 text-lg">Vocês trabalham com financiamento?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Não. Não oferecemos nem intermediamos financiamento de imóveis. O Insider é focado em quem tem
                                    ou está juntando capital próprio para investir. Financiamento na Itália para não-residentes é
                                    extremamente difícil e geralmente inviável.
                                </p>
                            </div>

                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <h3 className="font-bold mb-3 text-lg">Como funcionam as reuniões mensais?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Todo mês realizamos uma consultoria coletiva no Zoom (1-2h) onde tiramos dúvidas ao vivo,
                                    analisamos oportunidades que surgiram, compartilhamos atualizações do mercado e orientamos
                                    sobre o processo de compra. É gravado, então se não puder participar ao vivo, assiste depois.
                                </p>
                            </div>

                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <h3 className="font-bold mb-3 text-lg">E se eu não comprar no primeiro ano?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Sem problema! Muitos membros levam 1-2 anos planejando e se preparando. O importante é que
                                    quando você decidir comprar, vai fazer com confiança e conhecimento. Não há pressão - você
                                    continua tendo acesso à comunidade e consultorias enquanto for membro.
                                </p>
                            </div>

                            <div className="professional-card hover:shadow-lg transition-shadow">
                                <h3 className="font-bold mb-3 text-lg">Posso cancelar a qualquer momento?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Sim! Você pode cancelar quando quiser, sem multas ou burocracia. Além disso, oferecemos
                                    <strong> 7 dias de garantia total</strong> para você testar sem risco. Se não gostar, devolvemos
                                    100% do valor. Simples assim.
                                </p>
                            </div>

                            <div className="professional-card hover:shadow-lg transition-shadow bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-2 border-yellow-400">
                                <h3 className="font-bold mb-3 text-lg">O Insider é uma assessoria completa?</h3>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    Não. O Insider é uma <strong className="text-foreground">comunidade de aprendizado e suporte</strong>
                                    onde você tem acesso a consultoria coletiva, ferramentas e orientação para fazer o processo
                                    de compra por conta própria.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    Pense no Insider como ter um <strong className="text-foreground">&ldquo;GPS e um grupo de amigos experientes&rdquo;</strong>
                                    te guiando na jornada. Você ainda dirige o carro (faz o processo), mas tem todo o suporte
                                    necessário para não se perder no caminho.
                                </p>
                                <p className="text-sm text-yellow-700 dark:text-yellow-400 font-semibold">
                                    💡 É perfeito para quem quer <strong>autonomia com segurança</strong>, sem pagar
                                    o preço alto de uma assessoria full-service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 section-padding relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto container-padding text-center relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Urgência Visual */}
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white text-sm font-bold mb-6 shadow-2xl">
                            <Target className="w-5 h-5 mr-2" />
                            COMUNIDADE EXCLUSIVA
                        </div>

                        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
                            Seu Investimento na Itália
                            <span className="block text-yellow-400 mt-2">
                                Começa Agora
                            </span>
                        </h2>

                        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Daqui 1 ano, você pode estar na Itália assinando a escritura do seu imóvel.
                            Ou pode ainda estar procrastinando, pesquisando sozinho e com medo de errar.
                            <strong className="block mt-4 text-yellow-400">A escolha é sua. Mas ela precisa ser feita hoje.</strong>
                        </p>

                        {/* Comparação Rápida */}
                        <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-3xl mx-auto">
                            <div className="professional-card bg-red-950/50 border-2 border-red-500/50">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Shield className="w-6 h-6 text-red-400" />
                                    </div>
                                    <h3 className="font-bold text-white mb-3">Fazer Sozinho</h3>
                                    <ul className="text-sm text-white/80 space-y-2 text-left">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400">×</span>
                                            <span>Risco de erros que custam €€€</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400">×</span>
                                            <span>Informações desencontradas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400">×</span>
                                            <span>Sem suporte quando precisar</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400">×</span>
                                            <span>Perder oportunidades boas</span>
                                        </li>
                                        <li className="text-red-400 font-bold pt-2 text-center">= Stress e incerteza</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="professional-card bg-green-950/50 border-2 border-green-500/50">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Target className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h3 className="font-bold text-white mb-3">Com o Insider</h3>
                                    <ul className="text-sm text-white/80 space-y-2 text-left">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Orientação de quem já fez</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Comunidade para tirar dúvidas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Oportunidades exclusivas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Ferramentas práticas</span>
                                        </li>
                                        <li className="text-green-400 font-bold pt-2 text-center">= Confiança e segurança</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a
                                href="https://pay.hub.la/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-16 py-6 text-xl font-extrabold rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                SIM, QUERO PARTICIPAR
                                <Zap className="ml-3 h-7 w-7" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white/90 text-sm max-w-2xl mx-auto mb-6">
                            <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <CheckCircle className="w-7 h-7 text-green-400" />
                                <span className="font-semibold">Acesso imediato</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <CheckCircle className="w-7 h-7 text-green-400" />
                                <span className="font-semibold">7 dias de garantia</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <CheckCircle className="w-7 h-7 text-green-400" />
                                <span className="font-semibold">Cancele quando quiser</span>
                            </div>
                        </div>

                        <p className="text-white/70 text-sm max-w-2xl mx-auto">
                            Pagamento 100% seguro via Hubla • Seus dados são protegidos com criptografia de ponta
                        </p>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
