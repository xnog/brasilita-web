import { CheckCircle, Users, Shield, Award, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { LandingHeader } from "@/components/layout/landing-header";
import { Logo } from "@/components/ui/logo";

export default async function AboutPage() {
    const session = await auth();
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <LandingHeader session={session} />

            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                            Sobre a Brasilità
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            A ponte entre o sonho brasileiro e a realidade italiana
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        {/* Main Story */}
                        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 mb-12">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    <Award className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                                    Como Nascemos
                                </h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    A Brasilità nasceu de um sonho simples, mas desafiador: tornar possível para brasileiros
                                    realizarem o desejo de ter um imóvel na Itália, de forma clara, segura e acessível.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Percebemos que muitos desistiam no meio do caminho diante da burocracia, da falta de
                                    informações confiáveis e das diferenças culturais. Foi aí que surgiu a ideia de criar
                                    uma ponte entre o Brasil e a Itália, conectando pessoas que sonham em investir ou morar
                                    no país com quem conhece o mercado local.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Conheça Nossa História</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Assista ao vídeo e descubra como a Brasilità nasceu do sonho de conectar brasileiros ao mercado imobiliário italiano
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    src="https://www.youtube.com/embed/IGgq1I9ldpc"
                                    title="Vídeo sobre a Brasilità"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission and Values Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        {/* Mission Cards */}
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            <div className="professional-card">
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Nossa Missão</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Acompanhar você do início ao fim: desde a busca pelo imóvel até o momento
                                            de receber as chaves, oferecendo suporte completo em todas as etapas.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Acompanhamento integral</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Suporte jurídico especializado</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Experiência personalizada</span>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Nossos Valores</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Somos mais que uma plataforma: oferecemos confiança, proximidade e dedicação
                                            para que você realize seu sonho sem inseguranças ou burocracias.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Transparência total</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Proximidade e cuidado</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Segurança em cada etapa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4 text-foreground">Nossa Equipe</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Conheça os profissionais dedicados que tornam possível a realização do seu sonho italiano
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Aloisio */}
                            <div className="professional-card text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/Aloisio.png"
                                        alt="Aloisio Cechinel"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-lg font-semibold mb-1">Aloisio Cechinel</h4>
                                <p className="text-sm text-primary font-medium mb-3">Fundador</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Criador de conteúdo de viagens, com mais de 180 mil seguidores. Ex-policial militar por 12 anos,
                                    especialista em vendas B2B. Na Brasilità, oferece suporte próximo e transparente aos clientes.
                                </p>
                            </div>

                            {/* Bassani */}
                            <div className="professional-card text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/Bassani.png"
                                        alt="Rodrigo Bassani"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-lg font-semibold mb-1">Rodrigo Bassani</h4>
                                <p className="text-sm text-primary font-medium mb-3">Fundador</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Fundador da Hat Thinking e CMO da DreamExperience. Mais de 20 anos em tecnologia e estratégia.
                                    Pilar estratégico da Brasilità na governança e estratégia.
                                </p>
                            </div>

                            {/* Felipe */}
                            <div className="professional-card text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/Felipe.png"
                                        alt="Felipe Gaudio"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-lg font-semibold mb-1">Felipe Gaudio</h4>
                                <p className="text-sm text-primary font-medium mb-3">Fundador</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Fundador da Translate AI. Mais de 20 anos em desenvolvimento e arquitetura de sistemas críticos.
                                    Na Brasilità, combina inovação e tecnologia para criar soluções escaláveis.
                                </p>
                            </div>

                            {/* Rafael */}
                            <div className="professional-card text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/Rafael.png"
                                        alt="Rafael Gaudio"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-lg font-semibold mb-1">Rafael Gaudio</h4>
                                <p className="text-sm text-primary font-medium mb-3">Co-fundador e Consultor</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Engenheiro Civil com 8 anos de experiência em administração de imóveis.
                                    Expertise em análise estrutural e cadastral dos imóveis.
                                </p>
                            </div>

                            {/* Camila */}
                            <div className="professional-card text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/Camila.png"
                                        alt="Camila Locks"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-lg font-semibold mb-1">Camila Locks</h4>
                                <p className="text-sm text-primary font-medium mb-3">Analista de Marketing</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Analista de Marketing com experiência em comunicação e design. Criadora do @duasmalaeseumdestino.
                                    Fortalece a presença da marca com estratégias transparentes.
                                </p>
                            </div>

                            {/* Silvana */}
                            <div className="professional-card text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/Silvana.png"
                                        alt="Silvana Beckhauser"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-lg font-semibold mb-1">Silvana Beckhauser</h4>
                                <p className="text-sm text-primary font-medium mb-3">Assessora Jurídica</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Advogada especialista em Direito Internacional. Mais de 17 anos de experiência em cidadania italiana.
                                    Oferece solidez e confiança jurídica aos processos.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Legacy Section */}
            <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center">
                            <div className="max-w-3xl mx-auto">
                                <h3 className="text-2xl font-bold mb-4 text-foreground">Nosso Legado</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Nossa essência vem do amor por propriedades que contam histórias e pela honra em fazer parte
                                    da jornada de diversas famílias brasileiras que realizaram o sonho de ter uma casa na Itália.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    A Itália é um lugar especial que nos encanta a cada dia. A arte, a culinária, as pessoas,
                                    a música, as paisagens — são muitos os motivos que fizeram da Itália nossa especialidade e paixão.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a href="/auth/signin?callbackUrl=/dashboard" className="btn-primary">
                                        Conhecer a Brasilità
                                    </a>
                                    <div className="text-sm text-muted-foreground sm:text-left text-center">
                                        <p className="font-semibold">Atendimento Especializado</p>
                                        <p>Sua jornada italiana começa aqui</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 section-padding">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                            Pronto para realizar seu sonho italiano?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Entre em contato conosco e descubra como podemos ajudá-lo a investir no mercado imobiliário italiano
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/auth/signin?callbackUrl=/dashboard" className="btn-primary">
                                Começar Agora
                            </a>
                            <a href="/contact" className="btn-secondary">
                                Fale Conosco
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border/50 bg-muted/20">
                <div className="container mx-auto container-padding py-12">
                    <div className="grid lg:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                    <Logo className="text-primary-foreground" size={48} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Brasilità</h3>
                                    <p className="text-sm text-muted-foreground">Seu imóvel na Itália</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                Especialistas em conectar brasileiros ao mercado imobiliário italiano com total segurança e transparência.
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>Assessoria Especializada</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-foreground">Navegação</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="/possibilities" className="hover:text-foreground transition-colors">Possibilidades</a></li>
                                <li><a href="/about" className="hover:text-foreground transition-colors">Sobre</a></li>
                                <li><a href="/partners" className="hover:text-foreground transition-colors">Parceiros</a></li>
                                <li><a href="/contact" className="hover:text-foreground transition-colors">Contato</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-foreground">Contato</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="mailto:contato@brasilita.com" className="hover:text-foreground transition-colors">
                                        contato@brasilita.com
                                    </a>
                                </li>
                                <li><a href="/contact" className="hover:text-foreground transition-colors">Página de Contato</a></li>
                                <li>Segunda a Sexta: 09:00 - 18:00 CET</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-foreground">Empresa</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>DUAS MALAS E UM DESTINO PRODUCAO DE CONTEUDO</li>
                                <li className="pt-2">
                                    46.438.133/0001-45
                                </li>
                                <li className="pt-2">
                                    <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                                        Política de Privacidade
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-border/50 mt-12 pt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            © 2025 Brasilità. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
