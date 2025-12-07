import { CheckCircle, Users, Globe, TrendingUp, Calendar, Sparkles, Video, Clock, Instagram } from "lucide-react";
import Image from "next/image";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { auth } from "@/lib/auth";
import { getNextSundayAt16hBrasilia } from "@/lib/utils/date";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Casas na Itália por €25 mil - Live Gratuita | Brasilità",
    description: "Live gratuita domingo às 16h revelando onde encontrar e como comprar casas de €25.000 na Itália sem precisar de cidadania. Descubra as melhores oportunidades.",
    keywords: [
        "casas baratas itália",
        "imóveis 25 mil euros",
        "comprar casa itália sem cidadania",
        "imóveis baratos itália",
        "investir na itália",
        "casas acessíveis itália",
        "como comprar imóvel itália",
        "Brasilità"
    ],
    authors: [{ name: "Brasilità" }],
    category: "Imóveis e Investimentos",
    openGraph: {
        title: "Casas na Itália por €25 mil: Onde estão?",
        description: "Live gratuita domingo às 16h. Descubra onde encontrar e como comprar casas de €25.000 na Itália sem precisar de cidadania.",
        type: "website",
        locale: "pt_BR",
        siteName: "Brasilità - Seu imóvel na Itália",
        url: "/insider-lead",
        images: [
            {
                url: "/og-insider-lead.jpg",
                width: 1200,
                height: 630,
                alt: "Brasilità - Casas na Itália por €25 mil"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Casas na Itália por €25 mil: Onde estão?",
        description: "Live gratuita domingo às 16h. Descubra onde encontrar e como comprar casas de €25.000 na Itália sem precisar de cidadania.",
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

export default async function InsiderCohort2PreLaunch() {
    const session = await auth();
    const launchDate = getNextSundayAt16hBrasilia();

    // JSON-LD Structured Data for Recurring Event Series
    const eventJsonLd = {
        "@context": "https://schema.org",
        "@type": "EventSeries",
        "name": "Casas na Itália por €25 mil: Onde estão?",
        "description": "Live gratuita domingo às 16h revelando onde encontrar e como comprar casas de €25.000 na Itália sem precisar de cidadania italiana. Descubra as melhores regiões e o processo completo de compra.",
        "eventSchedule": {
            "@type": "Schedule",
            "repeatFrequency": "P1W",
            "byDay": "https://schema.org/Sunday",
            "startTime": "16:00:00-03:00",
            "endTime": "16:30:00-03:00"
        },
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
            <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 section-padding overflow-hidden">
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
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500 text-white text-xs md:text-sm font-bold mb-6 shadow-xl animate-pulse">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    LIVE ONLINE GRATUITA - DOMINGO
                                </div>

                                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                                    Casas na Itália por €25 mil:
                                    <span className="block text-emerald-400 mt-2">
                                        Onde estão?
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-emerald-300 font-semibold mb-6">
                                    Descubra onde encontrar e como comprar imóveis de €25.000 na Itália sem precisar de cidadania
                                </p>

                                <div className="flex items-center gap-3 mb-6 text-xl">
                                    <Calendar className="w-6 h-6 text-emerald-400" />
                                    <span className="font-semibold">Domingo</span>
                                </div>

                                <div className="flex items-center gap-3 mb-8 text-xl">
                                    <Clock className="w-6 h-6 text-emerald-400" />
                                    <span className="font-semibold">16:00h (Horário de Brasília)</span>
                                </div>

                                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                                    Live ao vivo e gratuita domingo revelando onde estão as casas de €25.000 na Itália e
                                    como você pode comprar mesmo sem ter cidadania italiana
                                </p>

                                {/* Benefits */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Onde Encontrar Casas de €25.000</p>
                                            <p className="text-white/80 text-sm">As regiões exatas e como identificar as melhores oportunidades</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Como Comprar Sem Ter Cidadania</p>
                                            <p className="text-white/80 text-sm">O processo completo para brasileiros sem passaporte italiano</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Documentação e Burocracia Simplificada</p>
                                            <p className="text-white/80 text-sm">Tudo que você precisa providenciar para fechar o negócio</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Custos Reais da Compra</p>
                                            <p className="text-white/80 text-sm">Impostos, taxas e reformas - quanto você vai gastar de verdade</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Armadilhas Que Custam Caro</p>
                                            <p className="text-white/80 text-sm">Erros comuns que já custaram milhares para outros brasileiros</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Proof */}
                                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-400" />
                                        <span>+258k seguidores</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-green-400" />
                                        <span>Vivemos na Itália</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                        <span>Dezenas de brasileiros orientados</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Form + Countdown */}
                            <div className="relative">
                                {/* Countdown Timer */}
                                <div className="mb-6">
                                    <CountdownTimer targetDate={launchDate} />
                                </div>

                                {/* Registration Form */}
                                <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-emerald-500">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Video className="w-8 h-8 text-white" />
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
                                O que você vai aprender na live
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Tudo sobre como comprar casas de €25.000 na Itália sem precisar de cidadania
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card border-t-4 border-t-blue-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Onde Estão as Casas de €25.000</h3>
                                        <p className="text-muted-foreground">
                                            Descubra as regiões exatas da Itália onde você encontra imóveis a partir de €25.000
                                            e como identificar as melhores oportunidades
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-t-4 border-t-green-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">2</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Como Comprar Sem Cidadania Italiana</h3>
                                        <p className="text-muted-foreground">
                                            O processo completo passo a passo para brasileiros comprarem imóvel na Itália
                                            mesmo sem ter passaporte europeu
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-t-4 border-t-purple-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">3</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Documentação Para Estrangeiros</h3>
                                        <p className="text-muted-foreground">
                                            Todos os documentos que você precisa providenciar no Brasil e na Itália
                                            para concretizar a compra legalmente
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-t-4 border-t-red-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">4</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Custos Reais: Quanto Você Vai Gastar</h3>
                                        <p className="text-muted-foreground">
                                            Além dos €25.000: impostos, taxas notariais, reformas necessárias
                                            e todos os custos ocultos que você precisa conhecer
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-t-4 border-t-yellow-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">5</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Financiamento e Formas de Pagamento</h3>
                                        <p className="text-muted-foreground">
                                            Como financiar a compra, transferir dinheiro do Brasil para a Itália
                                            e as melhores formas de pagamento para estrangeiros
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-t-4 border-t-indigo-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">6</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Armadilhas Que Custam Milhares</h3>
                                        <p className="text-muted-foreground">
                                            Os erros mais comuns que brasileiros cometem ao comprar casas baratas na Itália
                                            e que já custaram muito caro
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-t-4 border-t-teal-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">7</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Como a Comunidade Insider Pode Ajudar</h3>
                                        <p className="text-muted-foreground">
                                            Conheça a comunidade de brasileiros que já estão comprando imóveis na Itália
                                            e como você pode fazer parte dessa jornada
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-t-4 border-t-orange-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Bônus Exclusivo Para Participantes</h3>
                                        <p className="text-muted-foreground">
                                            Uma oportunidade especial será revelada apenas para quem participar
                                            da live ao vivo (não perca!)
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
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                Quem vai te guiar nesta jornada
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Especialistas com experiência prática morando na Itália e investindo no mercado imobiliário italiano
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                                        @duasmalaseumdestino (190k)
                                    </a>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Morador da Itália e especialista em ajudar brasileiros a realizarem o sonho de
                                        ter uma vida e imóvel na Itália. Combina experiência prática de quem vive no país
                                        com profundo conhecimento do mercado imobiliário italiano.
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
                                    <p className="text-primary font-semibold mb-2">Co-fundador & Especialista Imobiliário</p>
                                    <a
                                        href="https://www.instagram.com/nortedaitalia/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                                    >
                                        <Instagram className="w-4 h-4" />
                                        @nortedaitalia (25k)
                                    </a>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Advogado e Planejador Financeiro CFP® especializado em investimentos imobiliários
                                        na Itália. Traz expertise jurídica e financeira para garantir segurança nas
                                        decisões de compra e investimento.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Attend */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                Esta live é para você?
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Esta live é perfeita se você se identifica com pelo menos um desses perfis
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card border-l-4 border-l-blue-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você quer comprar um imóvel na Itália mas não tem cidadania...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer entender se é possível e como fazer isso sem precisar esperar anos
                                            pelo processo de cidadania italiana
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-green-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você busca um investimento acessível na Europa...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E ficou interessado em saber onde estão essas casas de €25.000
                                            e se é realmente possível comprar com esse valor
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-purple-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você quer saber se essas oportunidades são reais...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E não quer cair em armadilhas ou golpes, querendo entender
                                            os custos reais e o processo legítimo de compra
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-yellow-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você quer fazer parte de uma comunidade...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            De brasileiros que já estão comprando imóveis na Itália e querem
                                            ter suporte durante todo o processo
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
                                <div className="text-4xl font-bold text-primary mb-2">+258k</div>
                                <div className="text-sm text-muted-foreground">Seguidores nas redes sociais</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                <div className="text-sm text-muted-foreground">Vivendo e investindo na Itália</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">Dezenas</div>
                                <div className="text-sm text-muted-foreground">De brasileiros já orientados</div>
                            </div>
                        </div>

                        <div className="professional-card text-center">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Combinamos <strong className="text-foreground">expertise jurídica em cidadania italiana</strong> com
                                <strong className="text-foreground"> conhecimento profundo do mercado imobiliário</strong>. Nossa equipe
                                une advogados especializados com moradores da Itália que conhecem a realidade prática de construir
                                uma vida no país.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 py-16">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            Garanta Sua Vaga Gratuita Agora!
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Domingo às 16h - Live ao vivo revelando onde estão e como comprar casas de €25.000 na Itália sem cidadania
                        </p>
                        <a
                            href="#top"
                            className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105"
                        >
                            QUERO PARTICIPAR GRATUITAMENTE
                            <Video className="ml-2 h-6 w-6" />
                        </a>
                        <p className="text-white/80 text-sm mt-4">
                            100% Gratuito • Ao Vivo • Com Bônus Exclusivo
                        </p>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
