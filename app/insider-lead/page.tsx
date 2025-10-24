import { CheckCircle, Users, Globe, TrendingUp, Calendar, Sparkles, Video, Clock } from "lucide-react";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { auth } from "@/lib/auth";

export default async function InsiderEventPage() {
    const session = await auth();
    const eventDate = new Date("2025-11-02T16:00:00-03:00"); // 02/11/2025 às 16h (horário de Brasília)

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
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-400 text-black text-xs md:text-sm font-bold mb-6 shadow-xl animate-pulse">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    EVENTO ONLINE GRATUITO
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                    Como Comprar Seu
                                    <span className="block text-yellow-400 mt-2">
                                        Primeiro Imóvel na Itália
                                    </span>
                                    em 2025
                                </h1>

                                <div className="flex items-center gap-3 mb-6 text-xl">
                                    <Calendar className="w-6 h-6 text-yellow-400" />
                                    <span className="font-semibold">02 de Novembro (Sábado)</span>
                                </div>

                                <div className="flex items-center gap-3 mb-8 text-xl">
                                    <Clock className="w-6 h-6 text-yellow-400" />
                                    <span className="font-semibold">16:00h (Horário de Brasília)</span>
                                </div>

                                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                                    Aula ao vivo e gratuita revelando o passo a passo completo para investir
                                    no mercado imobiliário italiano, mesmo morando no Brasil
                                </p>

                                {/* Benefits */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Consultoria Especializada</p>
                                            <p className="text-white/80 text-sm">Tire suas dúvidas com quem vive e investe na Itália</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Ferramentas Exclusivas</p>
                                            <p className="text-white/80 text-sm">Calculadora financeira e ebook de italiano</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Oportunidades Únicas</p>
                                            <p className="text-white/80 text-sm">Imóveis exclusivos antes de irem ao público</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-semibold">Oferta Especial €29</p>
                                            <p className="text-white/80 text-sm">Desconto exclusivo para participantes do evento</p>
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
                                        <span>Inúmeros de clientes atendidos</span>
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
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                O Que o Brasilità Insider Oferece
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Tudo que você precisa para comprar seu imóvel na Itália com segurança e confiança
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="professional-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Comunidade Focada</h3>
                                        <p className="text-muted-foreground">
                                            Conecte-se com outros brasileiros que também estão comprando imóveis na Itália.
                                            Compartilhe experiências, tire dúvidas e aprenda com quem está no mesmo caminho
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-7 h-7 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Consultoria Mensal no Zoom</h3>
                                        <p className="text-muted-foreground">
                                            Reuniões mensais ao vivo com a equipe Brasilità para tirar dúvidas,
                                            analisar oportunidades e receber orientação especializada de quem vive na Itália
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-7 h-7 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Acesso Garantido à Plataforma</h3>
                                        <p className="text-muted-foreground">
                                            A plataforma Brasilità será restrita em breve. Como membro Insider,
                                            você garante acesso permanente a todas as funcionalidades e atualizações
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-7 h-7 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">Oportunidades Exclusivas</h3>
                                        <p className="text-muted-foreground">
                                            Acesso antecipado a imóveis selecionados que não estarão disponíveis
                                            publicamente, dando a você vantagem na busca pela propriedade ideal
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* O Que Você Recebe */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                O Que Você Recebe Como Membro
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Oportunidades Exclusivas */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Oportunidades Únicas</h3>
                                <p className="text-muted-foreground text-sm">
                                    Acesso a imóveis e oportunidades que não estarão disponíveis publicamente
                                </p>
                            </div>

                            {/* Calculadora */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Calculadora Financeira</h3>
                                <p className="text-muted-foreground text-sm">
                                    Ferramenta exclusiva para planejar sua compra com todos os custos e impostos
                                </p>
                            </div>

                            {/* Ebook Italiano */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Ebook de Italiano</h3>
                                <p className="text-muted-foreground text-sm">
                                    Guia prático com vocabulário essencial para o processo de compra
                                </p>
                            </div>

                            {/* Relatórios IA */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Relatórios com IA</h3>
                                <p className="text-muted-foreground text-sm">
                                    Análises de regiões italianas geradas por Inteligência Artificial
                                </p>
                            </div>

                            {/* Reuniões Zoom */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Reuniões Mensais</h3>
                                <p className="text-muted-foreground text-sm">
                                    Consultoria coletiva mensal no Zoom com a equipe Brasilità
                                </p>
                            </div>

                            {/* Desconto Consulenza */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Desconto na Assessoria</h3>
                                <p className="text-muted-foreground text-sm">
                                    Desconto especial na Brasilità Consulenza (assessoria completa)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Is This For Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Este Evento é Para Você Que...
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Quer Investir na Itália</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Mas não sabe por onde começar ou tem medo de cair em armadilhas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Busca Diversificação</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Quer proteger seu patrimônio em moeda forte e economia estável
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Sonha em Morar na Itália</h3>
                                        <p className="text-sm text-muted-foreground">
                                            E quer garantir sua casa antes de fazer a mudança definitiva
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Busca Renda em Euro</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Quer rentabilizar imóveis através de aluguel de curta ou longa temporada
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
                                Por Que Confiar na Brasilità?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">+200k</div>
                                <div className="text-sm text-muted-foreground">Seguidores nas redes sociais</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                <div className="text-sm text-muted-foreground">Vivendo e investindo na Itália</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">Inúmeros</div>
                                <div className="text-sm text-muted-foreground">De clientes atendidos com sucesso</div>
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
