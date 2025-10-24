import { CheckCircle, Users, TrendingUp, Award, Globe, Calendar, Sparkles, Shield, Target, Zap, Calculator, BookOpen } from "lucide-react";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { auth } from "@/lib/auth";

export default async function InsiderLaunchPage() {
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

                <div className="container mx-auto container-padding text-center relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Badge */}
                        <div className="mb-6">
                            <span className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-400 text-black text-sm font-bold mb-4 shadow-2xl">
                                <Sparkles className="w-5 h-5 mr-2" />
                                COMUNIDADE EXCLUSIVA
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                            Brasilità Insider
                            <span className="block text-yellow-400 mt-2">
                                Sua Porta de Entrada para o Mercado Imobiliário Italiano
                            </span>
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                            A comunidade exclusiva para quem quer comprar imóveis na Itália com segurança,
                            consultoria especializada e acesso a oportunidades únicas
                        </p>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a
                                href="https://hub.la/g/6C6Rh0Mn1oqJqGEcmIHl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
                            >
                                QUERO FAZER PARTE
                                <Zap className="ml-2 h-6 w-6" />
                            </a>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span>Primeiros 100: €29/trimestre</span>
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

            {/* O Que É Section */}
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
                                    <Calculator className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Calculadora Financeira</h3>
                                <p className="text-muted-foreground text-sm">
                                    Ferramenta exclusiva para planejar sua compra com todos os custos e impostos
                                </p>
                            </div>

                            {/* Ebook Italiano */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-blue-600" />
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
                                    <Award className="w-8 h-8 text-orange-600" />
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

            {/* Para Quem É */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                O Insider é Perfeito Para Você Que...
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Quer comprar imóveis na Itália com segurança e orientação especializada
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Quer Investir com Segurança</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Busca orientação de quem vive na Itália e conhece o mercado de perto
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Tem Capital Próprio</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Está pronto para investir sem precisar de financiamento
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Quer Fazer Networking</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Deseja se conectar com outros brasileiros investindo na Itália
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Busca Oportunidades Exclusivas</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Quer ter acesso a imóveis antes de irem ao público geral
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Investimento
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Early Bird */}
                            <div className="professional-card border-4 border-yellow-400 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-6 py-2 text-sm font-bold">
                                    PRIMEIROS 100
                                </div>
                                <div className="text-center pt-8">
                                    <h3 className="text-2xl font-bold mb-4">Desconto de Lançamento</h3>
                                    <div className="mb-6">
                                        <span className="text-5xl font-bold text-primary">€29</span>
                                        <span className="text-muted-foreground">/trimestre</span>
                                    </div>
                                    <ul className="space-y-3 text-left mb-8">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Acesso à plataforma restrita</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Reuniões mensais no Zoom</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Oportunidades exclusivas</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Calculadora financeira</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Ebook de Italiano</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Relatórios com IA</span>
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

                            {/* Regular */}
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
                                            <span>Acesso à plataforma restrita</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Reuniões mensais no Zoom</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span>Todos os benefícios incluídos</span>
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
                                <h3 className="text-2xl font-bold mb-4">Cancelamento Grátis em 7 Dias</h3>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Você tem <strong>7 dias para testar o Brasilità Insider</strong>.
                                    Se não for para você, basta cancelar e devolvemos <strong>100% do seu dinheiro</strong>,
                                    sem perguntas, sem burocracias.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
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
                                <h3 className="font-bold mb-2">O que é exatamente o Brasilità Insider?</h3>
                                <p className="text-muted-foreground">
                                    É uma comunidade exclusiva que filtra e conecta pessoas realmente interessadas em comprar imóveis na Itália.
                                    Oferecemos consultoria coletiva mensal, acesso à plataforma restrita, oportunidades exclusivas e ferramentas práticas.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Vocês vendem imóveis?</h3>
                                <p className="text-muted-foreground">
                                    Não. Não somos imobiliária. Nós conectamos você a imobiliárias locais confiáveis e oferecemos consultoria
                                    para que você possa comprar com segurança. A negociação é sempre direta entre você e o vendedor/imobiliária.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Vocês trabalham com financiamento?</h3>
                                <p className="text-muted-foreground">
                                    Não. Não oferecemos nem intermediamos financiamento de imóveis. O Insider é focado em quem tem
                                    capital próprio para investir.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Como funcionam as reuniões mensais?</h3>
                                <p className="text-muted-foreground">
                                    Todo mês realizamos uma consultoria coletiva no Zoom onde tiramos dúvidas, analisamos oportunidades,
                                    compartilhamos atualizações do mercado e orientamos sobre o processo de compra.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Posso cancelar a qualquer momento?</h3>
                                <p className="text-muted-foreground">
                                    Sim! Você pode cancelar quando quiser, sem multas. Além disso, oferecemos 7 dias de garantia total
                                    para você testar sem risco.
                                </p>
                            </div>

                            <div className="professional-card">
                                <h3 className="font-bold mb-2">Qual a diferença entre Insider e Consulenza?</h3>
                                <p className="text-muted-foreground">
                                    O Insider é uma comunidade com consultoria coletiva e ferramentas para você aprender e fazer sozinho.
                                    A Consulenza (€2.500) é nossa assessoria completa onde fazemos todo o processo por você.
                                    Como membro Insider, você recebe desconto na Consulenza.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 section-padding">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            Pronto Para Fazer Parte do Brasilità Insider?
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
