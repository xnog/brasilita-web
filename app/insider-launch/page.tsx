import { CheckCircle, Users, TrendingUp, Award, Globe, Calendar, Sparkles, Shield, Target, Zap } from "lucide-react";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { auth } from "@/lib/auth";

export default async function InsiderLancamentoPage() {
    const session = await auth();
    const launchDate = new Date("2025-11-02T00:00:00-03:00"); // 02/11/2025 Brazil time

    return (
        <div className="min-h-screen bg-background">
            <LandingHeader session={session} />

            {/* Hero Section with Countdown */}
            <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 section-padding overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto container-padding text-center relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Launch Badge */}
                        <div className="mb-6 animate-fade-in-down">
                            <span className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-400 text-black text-sm font-bold mb-4 shadow-2xl animate-pulse">
                                <Sparkles className="w-5 h-5 mr-2" />
                                LANÇAMENTO EXCLUSIVO - VAGAS LIMITADAS
                            </span>
                        </div>

                        {/* Countdown Timer */}
                        <CountdownTimer targetDate={launchDate} />

                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in">
                            Desvende o Mercado Imobiliário Italiano e
                            <span className="block text-yellow-400 mt-2">
                                Invista com Segurança na Itália
                            </span>
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
                            O único programa completo em português que te ensina o passo a passo para
                            <strong className="text-yellow-400"> encontrar, negociar e comprar imóveis na Itália</strong> —
                            mesmo sem falar italiano ou estar na Europa
                        </p>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
                            <a
                                href="https://hub.la/g/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                GARANTIR MINHA VAGA AGORA
                                <Zap className="ml-2 h-6 w-6" />
                            </a>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>Primeiros 100: apenas €29/trimestre</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>Garantia de 7 dias</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>Acesso imediato à comunidade</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Assista e Descubra Como Transformar Seu Sonho Italiano em Realidade
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Veja como o Brasilità Insider pode te ajudar a investir com segurança na Itália
                            </p>
                        </div>

                        {/* Video Placeholder */}
                        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center mb-4 shadow-xl">
                                    <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <p className="text-xl font-semibold text-muted-foreground mb-2">Vídeo de Apresentação</p>
                                <p className="text-sm text-muted-foreground max-w-md">
                                    Conheça o Brasilità Insider e descubra como podemos te ajudar a realizar seu sonho italiano
                                </p>
                            </div>
                        </div>

                        {/* Video will be embedded here when available */}
                        {/* Example: <iframe className="w-full aspect-video rounded-2xl shadow-2xl" src="YOUR_VIDEO_URL" /> */}
                    </div>
                </div>
            </section>

            {/* Para Quem é Este Programa */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                O Brasilità Insider é Para Você Que...
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Target className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Quer Investir na Itália</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Mas não sabe por onde começar ou tem medo de cair em armadilhas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Busca Diversificação</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Quer proteger seu patrimônio em moeda forte e economia estável
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Sonha em Morar na Itália</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer garantir sua casa antes de fazer a mudança definitiva
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Busca Renda em Euro</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Quer rentabilizar imóveis através de aluguel de curta ou longa temporada
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Quer Fazer Sozinho</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Prefere aprender o processo e ter autonomia nas decisões
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Award className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Tem Cidadania Italiana</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer aproveitar os benefícios de investir como cidadão europeu
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* O Que Você Vai Receber */}
            <section className="bg-gradient-to-br from-primary/5 to-primary/10 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                O Que Você Recebe ao Entrar no Brasilità Insider
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Um programa completo que te leva do zero ao investidor preparado
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                            {/* Curso Gravado */}
                            <div className="professional-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Curso Completo em Módulos</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Aulas gravadas e estruturadas para você aprender no seu ritmo
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span><strong>Módulo 1:</strong> Fundamentos do Mercado Imobiliário Italiano</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span><strong>Módulo 2:</strong> Análise de Regiões e Oportunidades</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span><strong>Módulo 3:</strong> Custos, Impostos e Taxas Detalhados</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span><strong>Módulo 4:</strong> Processo de Compra Passo a Passo</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span><strong>Módulo 5:</strong> Rentabilização e Gestão de Imóveis</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span><strong>Módulo 6:</strong> Cases Reais e Bastidores</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Comunidade */}
                            <div className="professional-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-7 h-7 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Comunidade Exclusiva</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Grupo fechado no WhatsApp com outros investidores
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Networking com brasileiros investindo na Itália</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Alertas de oportunidades exclusivas de imóveis</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Dicas e insights diários da equipe Brasilità</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Compartilhamento de experiências reais</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Suporte contínuo para suas dúvidas</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Lives Mensais */}
                            <div className="professional-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-7 h-7 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Lives e Mentorias Mensais</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Sessões ao vivo com a equipe Brasilità
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Análises de mercado atualizadas mensalmente</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Q&A direto com Aloisio e equipe</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Apresentação de imóveis e regiões</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Cases de sucesso e lições aprendidas</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Gravações disponíveis para membros</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Benefícios Extras */}
                            <div className="professional-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-7 h-7 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Benefícios Exclusivos</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Vantagens que só membros do Insider têm
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Acesso antecipado a imóveis na plataforma</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Desconto especial na Brasilità Consulenza</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Materiais e templates exclusivos</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Análises de rentabilidade personalizadas</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Rede de contatos com profissionais locais</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing & Guarantee */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Oferta Especial de Lançamento
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Garanta seu lugar entre os primeiros 100 membros
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Early Bird Pricing */}
                            <div className="professional-card border-4 border-yellow-400 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-6 py-2 text-sm font-bold transform rotate-0 translate-x-0">
                                    PRIMEIROS 100
                                </div>
                                <div className="text-center pt-8">
                                    <h3 className="text-2xl font-bold mb-4">Oferta de Lançamento</h3>
                                    <div className="mb-6">
                                        <span className="text-5xl font-bold text-primary">€29</span>
                                        <span className="text-muted-foreground">/trimestre</span>
                                    </div>
                                    <ul className="space-y-3 text-left mb-8">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Acesso completo ao curso</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Comunidade exclusiva</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Lives mensais</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Todos os benefícios exclusivos</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span className="font-bold text-yellow-600">Preço garantido para sempre!</span>
                                        </li>
                                    </ul>
                                    <a
                                        href="https://hub.la/g/6C6Rh0Mn1oqJqGEcmIHl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-4 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-xl hover:scale-105 text-center"
                                    >
                                        GARANTIR VAGA €29
                                    </a>
                                </div>
                            </div>

                            {/* Regular Pricing */}
                            <div className="professional-card">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-4">Preço Regular</h3>
                                    <div className="mb-6">
                                        <span className="text-5xl font-bold text-primary">€39</span>
                                        <span className="text-muted-foreground">/trimestre</span>
                                    </div>
                                    <p className="text-muted-foreground mb-8">
                                        Após as primeiras 100 vagas, o valor será de €39 por trimestre.
                                        Garanta seu lugar agora e economize €10 a cada 3 meses!
                                    </p>
                                    <ul className="space-y-3 text-left mb-8">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Acesso completo ao curso</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Comunidade exclusiva</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Lives mensais</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Todos os benefícios exclusivos</span>
                                        </li>
                                    </ul>
                                    <div className="block w-full py-4 text-lg font-semibold rounded-xl bg-muted text-muted-foreground text-center">
                                        Em breve
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Guarantee */}
                        <div className="professional-card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Garantia de 7 Dias</h3>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Você tem <strong>7 dias para testar o Brasilità Insider</strong>.
                                    Se por qualquer motivo você não se identificar com a metodologia,
                                    basta solicitar o reembolso e devolvemos <strong>100% do seu dinheiro</strong>,
                                    sem perguntas, sem burocracias.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Perguntas Frequentes
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="professional-card">
                                <h3 className="font-bold mb-2">O Brasilità Insider é para quem já tem experiência com investimentos?</h3>
                                <p className="text-muted-foreground">
                                    Não! O curso foi desenvolvido para qualquer pessoa, desde iniciantes completos até investidores experientes.
                                    Começamos do zero e te guiamos passo a passo.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Preciso falar italiano para participar?</h3>
                                <p className="text-muted-foreground">
                                    Não é necessário. Todo o conteúdo é em português e te ensinamos como lidar com o idioma italiano
                                    durante o processo de compra, incluindo ferramentas e recursos que facilitam a comunicação.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Quanto tempo leva para completar o curso?</h3>
                                <p className="text-muted-foreground">
                                    As aulas são gravadas e você pode assistir no seu ritmo. Em média, os alunos completam o conteúdo
                                    principal em 4-6 semanas, mas você terá acesso por tempo ilimitado.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">O valor é cobrado mensalmente?</h3>
                                <p className="text-muted-foreground">
                                    A cobrança é trimestral (a cada 3 meses). Os primeiros 100 membros pagam €29 a cada 3 meses,
                                    e esse valor fica congelado para sempre enquanto mantiverem a assinatura ativa.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Posso cancelar a qualquer momento?</h3>
                                <p className="text-muted-foreground">
                                    Sim, você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais.
                                    Além disso, você tem 7 dias de garantia total para pedir reembolso.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Qual a diferença entre o Insider e a Consulenza?</h3>
                                <p className="text-muted-foreground">
                                    O Brasilità Insider é um programa educacional onde você aprende a fazer tudo sozinho.
                                    A Brasilità Consulenza é nosso serviço de assessoria completa onde fazemos tudo por você.
                                    Como membro do Insider, você recebe desconto na Consulenza caso decida contratar no futuro.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Vou conseguir comprar um imóvel mesmo morando no Brasil?</h3>
                                <p className="text-muted-foreground">
                                    Sim! Ensinamos exatamente como fazer todo o processo remotamente, incluindo visitas virtuais,
                                    assinatura de documentos e transferências. Muitos brasileiros já compraram imóveis na Itália
                                    sem sair do Brasil.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 section-padding relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto container-padding text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            Está Pronto Para Transformar Seu Sonho Italiano em Realidade?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Junte-se aos primeiros 100 membros e garanta o menor preço para sempre
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a
                                href="https://hub.la/g/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                GARANTIR MINHA VAGA POR €29
                                <Zap className="ml-2 h-6 w-6" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/90 text-sm max-w-2xl mx-auto">
                            <div className="flex flex-col items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                                <span>Acesso imediato</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                                <span>7 dias de garantia</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                                <span>Cancele quando quiser</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}

