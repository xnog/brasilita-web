import { Mail, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { PrimaryCTA } from "@/components/ui/primary-cta";

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
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Email</h3>
                                <p className="text-muted-foreground mb-4">Envie sua dúvida ou solicitação</p>
                                <a href="mailto:contato@brasilita.com" className="text-primary font-medium hover:underline">
                                    contato@brasilita.com
                                </a>
                            </div>

                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="h-8 w-8 text-green-600" />
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
                                <a href="/dashboard" className="text-primary font-medium hover:underline text-sm">
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
                            <PrimaryCTA href="/auth/signup" variant="large" />
                            <a href="mailto:contato@brasilita.com" className="btn-secondary">
                                Enviar Email
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
