import { TrendingUp, Key, Home, MapPin, Award, Clock } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { LandingHeader } from "@/components/layout/landing-header";
import { Logo } from "@/components/ui/logo";

export default async function PossibilitiesPage() {
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
                            Possibilidades do Seu Imóvel
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Descubra as diferentes formas de aproveitar e monetizar seu investimento imobiliário na Itália
                        </p>
                    </div>
                </div>
            </section>

            {/* Property Possibilities Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                            Maximize seu Investimento
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore as múltiplas maneiras de rentabilizar e usufruir do seu imóvel na Itália
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Airbnb / Short-term Rental */}
                        <div className="professional-card text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Key className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Aluguel por Temporada</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Monetize seu imóvel com aluguéis de curta duração através de plataformas como Airbnb e Booking.com
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Alta rentabilidade sazonal</li>
                                <li>• Gestão de reservas</li>
                                <li>• Marketing digital</li>
                            </ul>
                        </div>

                        {/* Holiday Home */}
                        <div className="professional-card text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Home className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Casa de Férias Pessoal</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Tenha seu refúgio particular na Itália para desfrutar com família e amigos
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Uso exclusivo quando desejar</li>
                                <li>• Manutenção preventiva</li>
                                <li>• Segurança patrimonial</li>
                            </ul>
                        </div>

                        {/* Long-term Investment */}
                        <div className="professional-card text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Investimento Longo Prazo</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Valorização patrimonial consistente no mercado imobiliário italiano
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Valorização histórica estável</li>
                                <li>• Diversificação de portfólio</li>
                                <li>• Proteção contra inflação</li>
                            </ul>
                        </div>

                        {/* Relocation/Living */}
                        <div className="professional-card text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Mudança Definitiva</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Realize o sonho de morar na Itália com toda segurança e suporte necessário
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Assessoria para residência</li>
                                <li>• Suporte com documentação</li>
                                <li>• Integração local</li>
                            </ul>
                        </div>

                        {/* Mixed Use */}
                        <div className="professional-card text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Uso Misto</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Combine uso pessoal com rentabilização nos períodos que não estiver utilizando
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Flexibilidade total</li>
                                <li>• Otimização de receita</li>
                                <li>• Controle personalizado</li>
                            </ul>
                        </div>

                        {/* Legacy/Heritage */}
                        <div className="professional-card text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Patrimônio Familiar</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Construa um legado duradouro para as próximas gerações da sua família
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Herança de valor</li>
                                <li>• Tradição familiar</li>
                                <li>• Cidadania italiana</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                Vantagens do Mercado Italiano
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Por que investir em imóveis na Itália é uma decisão inteligente
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Advantage 1 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Mercado Estável</h3>
                                <p className="text-sm text-muted-foreground">
                                    O mercado imobiliário italiano oferece estabilidade e crescimento consistente ao longo dos anos.
                                </p>
                            </div>

                            {/* Advantage 2 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Localização Estratégica</h3>
                                <p className="text-sm text-muted-foreground">
                                    Posição privilegiada na Europa, facilitando viagens e negócios internacionais.
                                </p>
                            </div>

                            {/* Advantage 3 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Qualidade de Vida</h3>
                                <p className="text-sm text-muted-foreground">
                                    Cultura rica, gastronomia excepcional e estilo de vida mediterrâneo incomparável.
                                </p>
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
                            Pronto para explorar as possibilidades?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Entre em contato conosco e descubra qual estratégia é ideal para seu perfil de investimento
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
