import { CheckCircle, Users, Globe, TrendingUp, Calendar, Sparkles, Video, Clock, Instagram } from "lucide-react";
import Image from "next/image";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Evento Gratuito: Cidadania Italiana e Imóveis - O Guia Completo | Brasilità",
    description: "Evento ao vivo gratuito em 30 de Novembro revelando como conquistar sua cidadania italiana e garantir seu imóvel na Itália. Com orientação jurídica especializada.",
    keywords: [
        "cidadania italiana",
        "imóveis na Itália",
        "comprar imóvel Itália",
        "processo cidadania italiana",
        "residência na Itália",
        "advogada cidadania italiana",
        "evento gratuito cidadania",
        "Brasilità"
    ],
    authors: [{ name: "Brasilità" }],
    category: "Imóveis e Investimentos",
    openGraph: {
        title: "Cidadania Italiana e Imóveis - O Guia Completo",
        description: "Evento ao vivo e gratuito em 30/11 às 16h. Descubra como conquistar sua cidadania e garantir seu imóvel na Itália.",
        type: "website",
        locale: "pt_BR",
        siteName: "Brasilità - Seu imóvel na Itália",
        url: "/insider-lead",
        images: [
            {
                url: "/og-insider-lead.jpg",
                width: 1200,
                height: 630,
                alt: "Evento Brasilità - Cidadania Italiana e Imóveis"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Cidadania Italiana e Imóveis - O Guia Completo",
        description: "Evento ao vivo e gratuito em 30/11 às 16h. Descubra como conquistar sua cidadania e garantir seu imóvel na Itália.",
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
    const launchDate = new Date("2025-11-30T16:00:00-03:00"); // 30 de Novembro de 2025 às 16h (horário de Brasília)

    // JSON-LD Structured Data for Event
    const eventJsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Cidadania Italiana e Imóveis: O Guia Completo",
        "description": "Evento ao vivo e gratuito revelando como conquistar sua cidadania italiana e garantir seu imóvel na Itália com orientação jurídica especializada",
        "startDate": "2025-11-30T16:00:00-03:00",
        "endDate": "2025-11-30T18:00:00-03:00",
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
            },
            {
                "@type": "Person",
                "name": "Silvana Beckhauser"
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
                                    EVENTO ONLINE GRATUITO
                                </div>

                                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                                    Cidadania Italiana e Imóveis:
                                    <span className="block text-emerald-400 mt-2">
                                        O Guia Completo Para Brasileiros
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-emerald-300 font-semibold mb-6">
                                    Descubra como realizar o duplo sonho: conquistar sua cidadania e ter seu imóvel na Itália
                                </p>

                                <div className="flex items-center gap-3 mb-6 text-xl">
                                    <Calendar className="w-6 h-6 text-emerald-400" />
                                    <span className="font-semibold">30 de Novembro (Domingo)</span>
                                </div>

                                <div className="flex items-center gap-3 mb-8 text-xl">
                                    <Clock className="w-6 h-6 text-emerald-400" />
                                    <span className="font-semibold">16:00h (Horário de Brasília)</span>
                                </div>

                                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                                    Evento ao vivo e gratuito com orientação jurídica especializada sobre como navegar o processo
                                    de cidadania italiana e planejar seu futuro imobiliário na Europa
                                </p>

                                {/* Benefits */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Processo de Cidadania Italiana Explicado</p>
                                            <p className="text-white/80 text-sm">Passo a passo, documentos e prazos com advogada especialista</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Imóvel Para Quem Tem Cidadania</p>
                                            <p className="text-white/80 text-sm">Como comprar seu imóvel após conquistar a cidadania</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Melhores Regiões Para Viver e Investir</p>
                                            <p className="text-white/80 text-sm">Onde morar e investir quando conquistar sua cidadania</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Planejando Sua Vida na Itália</p>
                                            <p className="text-white/80 text-sm">Da cidadania ao seu próprio imóvel - o caminho completo</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Erros Jurídicos Que Custam Caro</p>
                                            <p className="text-white/80 text-sm">Armadilhas na compra e no processo de cidadania</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Proof */}
                                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-400" />
                                        <span>+238k seguidores</span>
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
                                O que você vai aprender neste evento
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Conteúdo jurídico e prático com orientação especializada sobre cidadania italiana e imóveis
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card border-t-4 border-t-blue-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-xl">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Seu Processo de Cidadania do Zero</h3>
                                        <p className="text-muted-foreground">
                                            Entenda os diferentes tipos de processos, documentação necessária, prazos reais
                                            e como evitar erros que podem travar seu processo por anos
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
                                        <h3 className="text-xl font-bold mb-2">Residência na Itália: O Que Você Precisa Saber</h3>
                                        <p className="text-muted-foreground">
                                            Como estabelecer residência legalmente, onde fazer, requisitos burocráticos
                                            e praticidades para quem tem ou busca cidadania
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
                                        <h3 className="text-xl font-bold mb-2">Planejamento: Cidadania e Imóvel</h3>
                                        <p className="text-muted-foreground">
                                            Como planejar sua jornada completa: da cidadania até ter seu próprio
                                            imóvel na Itália, com todos os passos práticos
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
                                        <h3 className="text-xl font-bold mb-2">Melhores Regiões Para Sua Nova Vida</h3>
                                        <p className="text-muted-foreground">
                                            Onde morar levando em conta custo de vida, qualidade, proximidade com consulados,
                                            facilidade para cidadania e oportunidades imobiliárias
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
                                        <h3 className="text-xl font-bold mb-2">Comprar Imóvel na Itália: Guia Prático</h3>
                                        <p className="text-muted-foreground">
                                            Processo de compra, custos reais, impostos, documentação necessária
                                            e diferenças entre comprar com ou sem cidadania
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
                                        <h3 className="text-xl font-bold mb-2">Erros Jurídicos Que Custam Milhares</h3>
                                        <p className="text-muted-foreground">
                                            Armadilhas comuns na documentação de cidadania e na compra de imóveis
                                            que já custaram caro para outros brasileiros
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
                                        <h3 className="text-xl font-bold mb-2">Documentação e Burocracia Explicada</h3>
                                        <p className="text-muted-foreground">
                                            Todos os documentos necessários tanto para cidadania quanto para compra
                                            de imóvel, sem termos complicados
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
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">
                                Quem vai te guiar nesta jornada
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Especialistas com décadas de experiência em cidadania italiana e mercado imobiliário
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Silvana */}
                            <div className="professional-card">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                                        <Image
                                            src="/Silvana.png"
                                            alt="Silvana Beckhauser"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Silvana Beckhauser</h3>
                                    <p className="text-primary font-semibold mb-2">Advogada Especialista em Cidadania Italiana</p>
                                    <a
                                        href="https://www.instagram.com/advbeckhauser/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                                    >
                                        <Instagram className="w-4 h-4" />
                                        @advbeckhauser (3.5k)
                                    </a>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Advogada especialista em Direito Internacional com mais de 17 anos de experiência
                                        em processos de cidadania italiana. Já orientou centenas de famílias brasileiras
                                        a conquistarem seu passaporte europeu com segurança jurídica.
                                    </p>
                                </div>
                            </div>

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
                                Este evento é para você?
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Este evento é perfeito se você se identifica com pelo menos um desses perfis
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card border-l-4 border-l-blue-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você está no processo de cidadania italiana...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Mas está perdido com documentação, prazos, ou não sabe se está fazendo tudo certo
                                            e quer evitar erros que podem custar anos de atraso
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-green-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você sonha em morar na Itália...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer planejar sua jornada: primeiro conquistar sua cidadania,
                                            depois ter seu próprio imóvel para uma vida estável na Europa
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-purple-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você já tem cidadania ou está próximo...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E agora quer saber os próximos passos: onde morar, como comprar imóvel,
                                            custos reais e onde estabelecer sua residência
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-yellow-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold mb-1 text-lg">Você quer planejar estrategicamente...</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Seu caminho completo desde o início do processo de cidadania até
                                            ter seu próprio imóvel na Itália
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
                                <div className="text-4xl font-bold text-primary mb-2">+238k</div>
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
                            30 de Novembro às 16h - Evento ao vivo com orientação jurídica especializada sobre cidadania italiana e imóveis
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
