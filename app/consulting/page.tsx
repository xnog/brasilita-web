import { CheckCircle, Users, Globe, Video, Clock, Target, ShieldCheck, Award, ArrowRight, Sparkles, Briefcase, GraduationCap, Home } from "lucide-react";
import Image from "next/image";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultoria Personalizada: Morar ou Investir na Itália | Brasilità",
    description: "Consultoria individualizada de 45 minutos com especialistas que vivem na Itália. Tire suas dúvidas sobre compra de imóveis, trabalho, educação, custo de vida e muito mais.",
    keywords: [
        "consultoria imóveis Itália",
        "comprar imóvel na Itália",
        "investir na Itália",
        "trabalhar na Itália",
        "morar na Itália",
        "consultor imobiliário Itália",
        "assessoria imóveis italianos",
        "vida na Itália",
        "escola na Itália",
        "cidadania italiana",
        "Brasilità"
    ],
    authors: [{ name: "Brasilità" }],
    category: "Consultoria e Serviços",
    openGraph: {
        title: "Consultoria Personalizada: Morar ou Investir na Itália",
        description: "45 minutos de consultoria individualizada com especialistas que vivem na Itália. Tire suas dúvidas sobre imóveis, trabalho, educação e muito mais.",
        type: "website",
        locale: "pt_BR",
        siteName: "Brasilità - Seu imóvel na Itália",
        url: "/consulting",
        images: [
            {
                url: "/og-consultoria.jpg",
                width: 1200,
                height: 630,
                alt: "Consultoria Brasilità - Seu Imóvel na Itália"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Consultoria Personalizada: Morar ou Investir na Itália",
        description: "45 minutos de consultoria individualizada com especialistas que vivem na Itália.",
        images: ["/og-consultoria.jpg"],
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
        canonical: "/consulting"
    }
};

export default async function ConsultoriaPage() {
    const session = await auth();

    // JSON-LD Structured Data for Service
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Consultoria Personalizada - Morar ou Investir na Itália",
        "description": "Consultoria individualizada de 45 minutos com especialistas sobre imóveis, trabalho, educação e vida na Itália",
        "provider": {
            "@type": "Organization",
            "name": "Brasilità",
            "url": "https://brasilita.com"
        },
        "offers": {
            "@type": "Offer",
            "price": "600",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock",
            "url": "https://pay.hub.la/lGS7PyAE2LyP9AXV7G0i"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Brazil"
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />

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
                                    CONSULTORIA PERSONALIZADA
                                </div>

                                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                                    Morar ou Investir na Itália
                                    <span className="block text-yellow-400 mt-2">
                                        Com Quem Entende
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-yellow-400 font-semibold mb-6">
                                    45 minutos de consultoria individualizada sobre imóveis, vida e trabalho na Itália
                                </p>

                                <div className="flex items-center gap-3 mb-6 text-xl">
                                    <Clock className="w-6 h-6 text-yellow-400" />
                                    <span className="font-semibold">45 minutos via Google Meet</span>
                                </div>

                                <div className="flex items-center gap-3 mb-8 text-xl">
                                    <Target className="w-6 h-6 text-yellow-400" />
                                    <span className="font-semibold">Focada nas suas necessidades</span>
                                </div>

                                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                                    Conversa direta com especialistas que vivem na Itália para esclarecer todas as suas dúvidas
                                </p>

                                {/* Social Proof */}
                                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm mb-8">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-400" />
                                        <span>+200k seguidores</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-green-400" />
                                        <span>Vivemos na Itália</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="w-5 h-5 text-green-400" />
                                        <span>Experiência comprovada</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - CTA Card */}
                            <div className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-400">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Video className="w-8 h-8 text-black" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                            Agende Sua Consultoria
                                        </h2>
                                        <p className="text-muted-foreground mb-4">
                                            Sessão individual de 45 minutos
                                        </p>
                                        <div className="text-4xl font-extrabold text-primary mb-2">
                                            R$ 600
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Pagamento único • Acesso imediato após compra
                                        </p>
                                    </div>

                                    <a
                                        href="https://pay.hub.la/lGS7PyAE2LyP9AXV7G0i"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-8 py-5 text-lg font-bold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 mb-6"
                                    >
                                        QUERO AGENDAR AGORA
                                        <ArrowRight className="inline-block ml-2 h-6 w-6" />
                                    </a>

                                    {/* Security Badges */}
                                    <div className="space-y-3 pt-6 border-t border-border">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Agendamento flexível</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Gravação disponível após a sessão</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Pagamento 100% seguro</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl transform rotate-12 hidden md:block">
                                    VAGAS LIMITADAS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                O que está incluído na consultoria
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Uma sessão personalizada focada 100% nas suas necessidades e objetivos
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Como localizar um imóvel ideal</h3>
                                        <p className="text-muted-foreground">
                                            Estratégias para encontrar as melhores oportunidades, sites confiáveis,
                                            e o que avaliar em cada propriedade
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Possibilidade de financiamento</h3>
                                        <p className="text-muted-foreground">
                                            Opções disponíveis para brasileiros, requisitos dos bancos italianos,
                                            e como maximizar suas chances de aprovação
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Melhores regiões</h3>
                                        <p className="text-muted-foreground">
                                            Análise personalizada das regiões que mais se adequam ao seu perfil,
                                            orçamento e objetivos de investimento
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Processo de compra</h3>
                                        <p className="text-muted-foreground">
                                            Passo a passo completo: documentação necessária, prazos,
                                            profissionais envolvidos e como fazer do Brasil
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Erros que custam caro</h3>
                                        <p className="text-muted-foreground">
                                            Armadilhas comuns que já custaram milhares de euros para outros brasileiros
                                            e como evitá-las
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Rentabilidade real no aluguel</h3>
                                        <p className="text-muted-foreground">
                                            Cálculos práticos de retorno, custos operacionais, temporada vs longa duração,
                                            e expectativas realistas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Cidadania e permesso di soggiorno</h3>
                                        <p className="text-muted-foreground">
                                            Como o imóvel pode ajudar no processo de cidadania, permissão de residência,
                                            requisitos e caminhos possíveis
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Briefcase className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Trabalho e oportunidades</h3>
                                        <p className="text-muted-foreground">
                                            Mercado de trabalho, setores em alta, validação de diploma e possibilidades profissionais
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Educação e sistema escolar</h3>
                                        <p className="text-muted-foreground">
                                            Escolas públicas vs privadas, matrículas, custos e adaptação de crianças ao sistema italiano
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Home className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Vida na Itália e muito mais</h3>
                                        <p className="text-muted-foreground">
                                            Custo de vida, saúde, transporte, cultura local e qualquer outra dúvida específica
                                            que você queira esclarecer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hosts Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                Quem vai te orientar
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Especialistas que vivem na Itália prontos para esclarecer todas as suas dúvidas
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
                                    <p className="text-primary font-semibold mb-4">Fundador da Brasilità</p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Criador de conteúdo de viagens com mais de 180 mil seguidores, ex-policial militar por 12 anos
                                        e especialista em vendas B2B. Na Brasilità, é responsável por oferecer
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
                                    <p className="text-primary font-semibold mb-4">Co-fundador e Especialista</p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Advogado e Planejador Financeiro CFP®, com experiência internacional no Brasil,
                                        EUA e Itália. Olavo é especialista em Investimentos Imobiliários na Itália e traz
                                        toda sua expertise jurídica e financeira para garantir segurança e estratégia nos investimentos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Is This For Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                Esta consultoria é ideal para você se...
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Identifique-se com pelo menos um desses cenários
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card border-l-4 border-l-blue-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você está sério sobre investir na Itália</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Mas precisa de orientação profissional para tomar decisões corretas e evitar erros caros
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-green-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você tem dúvidas específicas</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Sobre financiamento, regiões, processo de compra ou rentabilidade que precisa esclarecer
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-purple-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você quer validar sua estratégia</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Já tem um plano mas quer a opinião de quem conhece o mercado italiano por dentro
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-yellow-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você valoriza seu tempo</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E prefere um atalho confiável do que meses pesquisando informações desencontradas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-red-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você já encontrou um imóvel</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer uma segunda opinião especializada antes de fechar negócio
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-orange-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você busca segurança no processo</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer minimizar riscos com a orientação de quem já passou por isso
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Como funciona
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Processo simples e direto
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-white">1</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Faça o pagamento</h3>
                                <p className="text-muted-foreground">
                                    Clique no botão e complete o pagamento seguro de R$ 600
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-white">2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Agende seu horário</h3>
                                <p className="text-muted-foreground">
                                    Após a compra, você receberá o link para escolher data e horário
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-white">3</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Participe da consultoria</h3>
                                <p className="text-muted-foreground">
                                    45 minutos via Google Meet focados em resolver suas questões
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Perguntas frequentes
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="professional-card">
                                <h3 className="font-bold mb-2 text-lg">A consultoria é individual ou em grupo?</h3>
                                <p className="text-muted-foreground">
                                    A consultoria é 100% individual. Serão apenas você e o especialista, focados nas suas necessidades específicas.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2 text-lg">Posso gravar a sessão?</h3>
                                <p className="text-muted-foreground">
                                    Sim! Você receberá a gravação da sessão para poder revisar o conteúdo sempre que precisar.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2 text-lg">E se eu precisar remarcar?</h3>
                                <p className="text-muted-foreground">
                                    Não tem problema. Você pode reagendar sua consultoria com até 24 horas de antecedência sem custos adicionais.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2 text-lg">Quais formas de pagamento são aceitas?</h3>
                                <p className="text-muted-foreground">
                                    Aceitamos as principais formas de pagamento: cartão de crédito, PIX e boleto bancário através da nossa plataforma segura.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2 text-lg">Vocês oferecem garantia?</h3>
                                <p className="text-muted-foreground">
                                    Sim. Se você participar da consultoria e sentir que não agregou valor, devolvemos 100% do seu investimento, sem perguntas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 py-16">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            Pronto para dar o próximo passo?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Agende sua consultoria personalizada e esclareça todas as suas dúvidas
                        </p>
                        <a
                            href="https://pay.hub.la/lGS7PyAE2LyP9AXV7G0i"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                        >
                            AGENDAR MINHA CONSULTORIA
                            <ArrowRight className="ml-2 h-6 w-6" />
                        </a>
                        <p className="text-white/80 text-sm mt-4">
                            ✓ 45 minutos ✓ Individual ✓ Com gravação ✓ Garantia de satisfação
                        </p>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
