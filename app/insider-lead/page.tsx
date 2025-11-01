import { CheckCircle, Users, Globe, TrendingUp, Calendar, Sparkles, Video, Clock, Instagram } from "lucide-react";
import Image from "next/image";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Evento Gratuito: O Método Completo Para Comprar Seu Imóvel na Itália | Brasilità",
    description: "Aula ao vivo gratuita em 02 de Novembro revelando o passo a passo para investir no mercado imobiliário italiano com segurança. Mesmo morando no Brasil e sem cair em armadilhas.",
    keywords: [
        "comprar imóvel na Itália",
        "investir na Itália",
        "mercado imobiliário italiano",
        "imóvel Itália brasileiro",
        "como comprar casa na Itália",
        "investimento imobiliário Itália",
        "curso imóveis Itália",
        "evento gratuito Itália",
        "Brasilità"
    ],
    authors: [{ name: "Brasilità" }],
    category: "Imóveis e Investimentos",
    openGraph: {
        title: "O Método Completo Para Comprar Seu Imóvel na Itália em 2025",
        description: "Aula ao vivo e gratuita em 02/11 às 16h. Descubra as 5 melhores regiões, custos reais e como evitar armadilhas.",
        type: "website",
        locale: "pt_BR",
        siteName: "Brasilità - Seu imóvel na Itália",
        url: "/insider-lead",
        images: [
            {
                url: "/og-insider-lead.jpg",
                width: 1200,
                height: 630,
                alt: "Evento Brasilità - O Método Completo Para Comprar Seu Imóvel na Itália"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "O Método Completo Para Comprar Seu Imóvel na Itália em 2025",
        description: "Aula ao vivo e gratuita em 02/11 às 16h. Descubra as 5 melhores regiões, custos reais e como evitar armadilhas.",
        images: ["/og-insider-lead.jpg"],
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
        canonical: "/insider-lead"
    }
};

export default async function InsiderEventPage() {
    const session = await auth();
    const eventDate = new Date("2025-11-02T16:00:00-03:00"); // 02/11/2025 às 16h (horário de Brasília)

    // JSON-LD Structured Data for Event
    const eventJsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "O Método Completo Para Comprar Seu Imóvel na Itália em 2025",
        "description": "Aula ao vivo e gratuita revelando o passo a passo baseado na análise de mais de 30 cidades italianas para investir com segurança no mercado imobiliário italiano",
        "startDate": "2025-11-02T16:00:00-03:00",
        "endDate": "2025-11-02T18:00:00-03:00",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "location": {
            "@type": "VirtualLocation",
            "url": "https://brasilita.com/insider-lead"
        },
        "image": "https://brasilita.com/og-insider-lead.jpg",
        "organizer": {
            "@type": "Organization",
            "name": "Brasilità",
            "url": "https://brasilita.com"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock",
            "url": "https://brasilita.com/insider-lead"
        },
        "performer": [
            {
                "@type": "Person",
                "name": "Aloisio Cechinel"
            },
            {
                "@type": "Person",
                "name": "Olavo Ferenshitz"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
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
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-400 text-black text-xs md:text-sm font-bold mb-6 shadow-xl animate-pulse">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    EVENTO ONLINE GRATUITO
                                </div>

                                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                                    O Método Completo Para Comprar Seu
                                    <span className="block text-yellow-400 mt-2">
                                        Imóvel na Itália
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-yellow-400 font-semibold mb-6">
                                    Mesmo morando no Brasil e sem cair em armadilhas
                                </p>

                                <div className="flex items-center gap-3 mb-6 text-xl">
                                    <Calendar className="w-6 h-6 text-yellow-400" />
                                    <span className="font-semibold">02 de Novembro (Domingo)</span>
                                </div>

                                <div className="flex items-center gap-3 mb-8 text-xl">
                                    <Clock className="w-6 h-6 text-yellow-400" />
                                    <span className="font-semibold">16:00h (Horário de Brasília)</span>
                                </div>

                                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                                    Aula ao vivo e gratuita revelando o passo a passo baseado na análise de mais de 30 cidades
                                    italianas para investir com segurança no mercado imobiliário italiano
                                </p>

                                {/* Benefits */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">As 5 Melhores Regiões para Investir</p>
                                            <p className="text-white/80 text-sm">Onde o seu dinheiro rende mais e valoriza melhor</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Custos Reais e Impostos Detalhados</p>
                                            <p className="text-white/80 text-sm">Saiba exatamente quanto precisa investir (sem surpresas)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Processo Completo de Compra</p>
                                            <p className="text-white/80 text-sm">Do Brasil até a escritura, passo a passo</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Os 7 Erros Que Custam Caro</p>
                                            <p className="text-white/80 text-sm">Armadilhas que você PRECISA evitar ao comprar</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Proof */}
                                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-400" />
                                        <span>+220k seguidores</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-green-400" />
                                        <span>Vivemos na Itália</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                        <span>+30 cidades analisadas</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Form + Countdown */}
                            <div className="relative">
                                {/* Countdown Timer */}
                                <div className="mb-6">
                                    <CountdownTimer targetDate={eventDate} />
                                </div>

                                {/* Registration Form */}
                                <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-400">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Video className="w-8 h-8 text-black" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                            Garanta Sua Vaga Grátis
                                        </h2>
                                        <p className="text-muted-foreground">
                                            Preencha os dados abaixo para participar do evento ao vivo
                                        </p>
                                    </div>

                                    {/* Form Component */}
                                    <EventRegistrationForm />

                                    {/* Security Badge */}
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground text-center">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span>Você receberá o link de acesso por e-mail e WhatsApp</span>
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
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                O que você vai aprender neste evento
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Conteúdo prático e direto ao ponto, baseado em experiência real de quem vive e investe na Itália
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">As 5 Regiões Mais Rentáveis</h3>
                                        <p className="text-muted-foreground">
                                            Descubra onde seu investimento tem melhor retorno, considerando valorização,
                                            turismo e custos operacionais
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">2</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Custos Reais (Sem Esconder Nada)</h3>
                                        <p className="text-muted-foreground">
                                            Quanto você realmente precisa ter: entrada, impostos, taxas notariais,
                                            reformas e custos recorrentes
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">3</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Processo Completo Passo a Passo</h3>
                                        <p className="text-muted-foreground">
                                            Do momento que você encontra o imóvel até assinar a escritura:
                                            documentos, prazos e como fazer do Brasil
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">4</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Os 7 Erros Fatais (E Como Evitá-los)</h3>
                                        <p className="text-muted-foreground">
                                            Armadilhas que já custaram milhares de euros para outros brasileiros -
                                            e que você vai aprender a identificar antes que seja tarde
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">5</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Rentabilidade Real com Números</h3>
                                        <p className="text-muted-foreground">
                                            Casos reais de brasileiros que compraram: quanto investiram,
                                            quanto estão ganhando e em quanto tempo se paga
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Bônus Exclusivo Para Participantes</h3>
                                        <p className="text-muted-foreground">
                                            Uma oportunidade especial será revelada apenas para quem participar
                                            do evento ao vivo (não perca!)
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
                                Quem vai te guiar nesta jornada
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Conheça os especialistas que vão compartilhar sua experiência real no mercado italiano
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
                    </div>
                </div>
            </section>

            {/* Who Is This For Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                Este evento é para você se...
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Identifique-se com pelo menos um desses perfis
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card border-l-4 border-l-blue-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você tem o sonho de investir na Itália...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Mas não sabe por onde começar, tem medo de cair em armadilhas ou acha que é complicado demais fazer do Brasil
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-green-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você quer proteger seu patrimônio...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Diversificar em moeda forte (Euro), economia estável e em um ativo tangível que valoriza com o tempo
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-purple-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você sonha em morar na Itália...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer garantir sua casa antes de fazer a mudança, ou ter um pied-à-terre para suas estadias
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-yellow-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você busca renda passiva em Euro...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Através de aluguel de curta temporada (turismo) ou longa duração, aproveitando a alta demanda italiana
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-red-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você já pesquisou mas ficou perdido...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Com informações desencontradas, sites em italiano e medo de tomar decisões erradas que custem caro
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-orange-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você tem capital para investir...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer fazer isso com inteligência, maximizando retorno e minimizando riscos com orientação de quem já fez
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Us Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Por que confiar na Brasilità?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">+220k</div>
                                <div className="text-sm text-muted-foreground">Seguidores nas redes sociais</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                <div className="text-sm text-muted-foreground">Vivendo e investindo na Itália</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">+30</div>
                                <div className="text-sm text-muted-foreground">Cidades analisadas em profundidade</div>
                            </div>
                        </div>

                        <div className="professional-card text-center">
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
                            Garanta Sua Vaga Gratuita Agora!
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            02 de Novembro às 16h - Aula ao vivo com tudo que você precisa saber
                        </p>
                        <a
                            href="#top"
                            className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                        >
                            QUERO PARTICIPAR GRATUITAMENTE
                            <Video className="ml-2 h-6 w-6" />
                        </a>
                        <p className="text-white/80 text-sm mt-4">
                            ✓ 100% Gratuito ✓ Ao Vivo ✓ Com Bônus Exclusivo
                        </p>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
