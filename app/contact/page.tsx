import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { LandingHeader } from "@/components/layout/landing-header";
import { Logo } from "@/components/ui/logo";

export default async function ContactPage() {
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
                            Entre em Contato
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Estamos aqui para responder suas dúvidas e ajudá-lo em cada etapa
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 mb-16">
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Email</h3>
                                <p className="text-muted-foreground mb-4">Envie sua dúvida ou solicitação</p>
                                <a href="mailto:contato@brasilita.com" className="text-primary font-medium hover:underline">
                                    contato@brasilita.com
                                </a>
                            </div>

                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Experiência</h3>
                                <p className="text-muted-foreground mb-4">Profundo conhecimento do mercado</p>
                                <p className="text-primary font-medium">
                                    Assessoria especializada
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Hours Section */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Horário de Atendimento</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Nossa equipe está disponível nos seguintes horários para atendê-lo
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-3 text-foreground">Segunda a Sexta</h3>
                                <p className="text-lg text-muted-foreground">09:00 - 18:00 (CET)</p>
                                <p className="text-sm text-muted-foreground mt-2">Horário da Itália</p>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-3 text-foreground">Sábados</h3>
                                <p className="text-lg text-muted-foreground">09:00 - 13:00 (CET)</p>
                                <p className="text-sm text-muted-foreground mt-2">Horário da Itália</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Methods Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        {/* Contact Methods */}
                        <div className="grid md:grid-cols-3 gap-6 mb-16">
                            {/* General Inquiries */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Consultas Gerais</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Para dúvidas sobre nossos serviços e como podemos ajudá-lo
                                </p>
                                <a href="mailto:contato@brasilita.com" className="text-primary font-medium hover:underline text-sm">
                                    contato@brasilita.com
                                </a>
                            </div>

                            {/* Property Search */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Busca de Imóveis</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Para iniciar sua busca por imóveis na Itália
                                </p>
                                <a href="/auth/signin?callbackUrl=/dashboard" className="text-primary font-medium hover:underline text-sm">
                                    Acessar Plataforma
                                </a>
                            </div>

                            {/* Partnership */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Parcerias</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Para profissionais interessados em se tornar parceiros
                                </p>
                                <a href="/partners" className="text-primary font-medium hover:underline text-sm">
                                    Saiba Mais
                                </a>
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
                            <a href="mailto:contato@brasilita.com" className="btn-secondary">
                                Enviar Email
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
