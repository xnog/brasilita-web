import { CheckCircle, Calendar, MessageCircle, Bell } from "lucide-react";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { auth } from "@/lib/auth";

export default async function ThankYouPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-background">
            <LandingHeader session={session} />

            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="container mx-auto container-padding">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bell className="w-12 h-12 text-yellow-600" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Ainda Não Acabou!
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8">
                            Para receber o link do evento, entre no nosso grupo <strong>GRATUITO</strong> do WhatsApp
                        </p>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-xl p-8 mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-yellow-900 dark:text-yellow-100 mb-6">
                                Entre no Grupo GRATUITO do WhatsApp
                            </h2>

                            <a
                                href="https://chat.whatsapp.com/GRmXSoC8OHZE8oG9P17njv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 mb-4"
                            >
                                <MessageCircle className="mr-2 h-6 w-6" />
                                Entrar no Grupo Gratuito
                            </a>

                            <p className="text-yellow-900 dark:text-yellow-100 text-sm">
                                O link do evento será enviado exclusivamente pelo grupo
                            </p>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            <div className="flex items-center justify-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Todo Domingo às 16h (Horário de Brasília)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                O Que Você Vai Aprender
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">As 5 Melhores Regiões para Investir</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Onde comprar para ter a melhor rentabilidade
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Custos Reais e Impostos</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Todos os custos envolvidos na compra
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Processo Completo de Compra</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Do Brasil até a escritura final
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Erros Que Custam Caro</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Armadilhas que você precisa evitar
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Rentabilidade Real</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Quanto você pode ganhar com aluguel
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Bônus Exclusivo</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Oferta especial apenas para participantes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 py-16">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Nos Vemos Todo Domingo às 16h
                        </h2>
                        <p className="text-lg text-white/90 mb-6">
                            Não esqueça de entrar no grupo gratuito para receber o link da live
                        </p>

                        <a
                            href="https://chat.whatsapp.com/GRmXSoC8OHZE8oG9P17njv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all shadow-2xl hover:scale-105"
                        >
                            <MessageCircle className="mr-2 h-6 w-6" />
                            Entrar no Grupo Gratuito
                        </a>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
