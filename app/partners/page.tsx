import { CheckCircle, Users, Shield, MapPin } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { LandingHeader } from "@/components/layout/landing-header";
import { Logo } from "@/components/ui/logo";

export default async function PartnersPage() {
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
                            Seja um Parceiro Brasilità
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Conectamos brasileiros ao sonho de comprar imóveis na Itália. Buscamos parceiros locais de confiança para realizar visitas, registrar imóveis e apoiar nossos clientes em cada etapa do processo.
                        </p>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                            {/* Partner Benefits */}
                            <div className="professional-card">
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Para Profissionais Locais</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Amplie sua rede de clientes e trabalhe com brasileiros interessados em investir no mercado italiano.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Clientes pré-qualificados</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Suporte na comunicação</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Processos organizados</span>
                                    </div>
                                </div>
                            </div>

                            {/* What We Look For */}
                            <div className="professional-card">
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">O que Procuramos</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Profissionais comprometidos com excelência no atendimento e conhecimento do mercado local.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Cidadania italiana ou permesso di soggiorno</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Experiência no mercado imobiliário</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="feature-icon" />
                                        <span className="text-sm font-medium">Comprometimento e confiabilidade</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Benefícios da Parceria</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Junte-se à nossa rede e tenha acesso a oportunidades exclusivas
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Benefit 1 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Clientes Qualificados</h3>
                                <p className="text-sm text-muted-foreground">
                                    Receba leads de clientes brasileiros pré-qualificados e interessados em investir na sua região.
                                </p>
                            </div>

                            {/* Benefit 2 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Suporte Completo</h3>
                                <p className="text-sm text-muted-foreground">
                                    Nossa equipe oferece suporte na comunicação e organização de todo o processo de venda.
                                </p>
                            </div>

                            {/* Benefit 3 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Crescimento Profissional</h3>
                                <p className="text-sm text-muted-foreground">
                                    Expanda seus negócios trabalhando com um mercado em crescimento de investidores brasileiros.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Requirements Section */}
            <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Requisitos para Parceria</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Para garantir a qualidade dos nossos serviços, buscamos parceiros que atendam aos seguintes critérios
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">Documentação Legal</h4>
                                        <p className="text-sm text-muted-foreground">Cidadania italiana ou permesso di soggiorno válido</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">Experiência Comprovada</h4>
                                        <p className="text-sm text-muted-foreground">Mínimo de 2 anos de experiência no mercado imobiliário</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">Conhecimento Local</h4>
                                        <p className="text-sm text-muted-foreground">Profundo conhecimento da região de atuação</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">Comunicação</h4>
                                        <p className="text-sm text-muted-foreground">Disponibilidade para comunicação regular e responsiva</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">Ética Profissional</h4>
                                        <p className="text-sm text-muted-foreground">Comprometimento com transparência e boas práticas</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">Flexibilidade</h4>
                                        <p className="text-sm text-muted-foreground">Adaptabilidade aos processos e metodologia Brasilità</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner CTA Section */}
            <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        {/* CTA */}
                        <div className="text-center">
                            <div className="max-w-3xl mx-auto">
                                <h3 className="text-2xl font-bold mb-4 text-foreground">Cadastre-se como Parceiro</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Faça parte da nossa rede de parceiros e ajude brasileiros a realizarem o sonho de ter um imóvel na Itália.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="https://forms.gle/sZT1iTmyxWU19wr48"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                    >
                                        <Users className="w-4 h-4 mr-2" />
                                        Tornar-se Parceiro
                                    </a>
                                </div>
                                <p className="text-sm text-muted-foreground mt-4">
                                    Preencha nosso formulário e conte sobre você e seus serviços
                                </p>
                            </div>
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
