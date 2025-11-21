import { CheckCircle, Calendar, Clock, MessageCircle, Bell, Users, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { auth } from "@/lib/auth";

export default async function ThankYouPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-background">
            <LandingHeader session={session} />

            {/* Success Section */}
            <section className="section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Success Icon */}
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Vaga Confirmada!
                        </h1>

                        <p className="text-xl text-muted-foreground mb-4">
                            Sua vaga para o evento <strong>&ldquo;O Guia Completo Para Investir em Imóveis na Itália&rdquo;</strong> está garantida!
                        </p>

                        <p className="text-lg text-muted-foreground mb-8">
                            <strong>30 de Novembro (Domingo)</strong> às <strong>16h (Horário de Brasília)</strong>
                        </p>

                        {/* WhatsApp Alert */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-500 rounded-2xl p-6 mb-8">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <MessageCircle className="w-8 h-8 text-green-600" />
                                <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">Próximo Passo Importante!</h2>
                            </div>
                            <p className="text-green-900 dark:text-green-100 text-lg font-semibold">
                                Entre agora no nosso grupo exclusivo do WhatsApp para não perder nenhuma atualização!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WhatsApp CTA Section - DESTAQUE PRINCIPAL */}
            <section className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 py-20">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                            <MessageCircle className="w-14 h-14 text-green-600" />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                            Entre Agora no Grupo do WhatsApp!
                        </h2>
                        <p className="text-2xl text-white font-semibold mb-4">
                            Este é o nosso canal principal de comunicação
                        </p>
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                            No grupo você vai receber conteúdos exclusivos, lembretes sobre o evento
                            e ter contato direto com nossa equipe e outros participantes.
                        </p>

                        <a
                            href="https://chat.whatsapp.com/GRmXSoC8OHZE8oG9P17njv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-16 py-6 text-xl font-extrabold rounded-2xl bg-white hover:bg-gray-100 text-green-600 transition-all duration-300 shadow-2xl hover:scale-110 mb-6"
                        >
                            <MessageCircle className="mr-3 h-8 w-8" />
                            ENTRAR NO GRUPO AGORA
                        </a>

                        <div className="grid md:grid-cols-3 gap-4 mt-8 text-white">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-300" />
                                <p className="font-semibold">Atualizações em Tempo Real</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <Sparkles className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                                <p className="font-semibold">Conteúdos Exclusivos</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <Users className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                                <p className="font-semibold">Contato Direto com a Equipe</p>
                            </div>
                        </div>

                        <p className="text-white/80 text-lg mt-8 font-semibold">
                            Importante: O link do evento será enviado PRIMEIRO no WhatsApp!
                        </p>
                    </div>
                </div>
            </section>

            {/* What Happens Next */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                                O Que Acontece Agora?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Step 1 */}
                            {/* Step 1 - WHATSAPP */}
                            <div className="professional-card text-center border-2 border-green-500">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-green-600 mb-2">1</div>
                                <h3 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100">
                                    Entre no Grupo do WhatsApp AGORA
                                </h3>
                                <p className="text-muted-foreground text-sm mb-3">
                                    Este é nosso canal principal! Você vai receber conteúdos exclusivos,
                                    lembretes e o link do evento.
                                </p>
                                <a
                                    href="https://chat.whatsapp.com/GRmXSoC8OHZE8oG9P17njv"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors text-sm"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Entrar Agora
                                </a>
                            </div>

                            {/* Step 2 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="text-3xl font-bold text-primary mb-2">2</div>
                                <h3 className="text-lg font-semibold mb-3">Receba Conteúdos Exclusivos</h3>
                                <p className="text-muted-foreground text-sm">
                                    No grupo do WhatsApp, vamos compartilhar dicas, casos reais e
                                    preparar você para o evento.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="professional-card text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Bell className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="text-3xl font-bold text-primary mb-2">3</div>
                                <h3 className="text-lg font-semibold mb-3">Participe do Evento ao Vivo</h3>
                                <p className="text-muted-foreground text-sm">
                                    No dia 30/11 às 16h, você receberá o link direto no WhatsApp
                                    para participar do evento.
                                </p>
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
                                Prepare-se! Você Vai Aprender:
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

            {/* Important Reminders */}
            <section className="bg-muted/30 section-padding">
                <div className="container mx-auto container-padding">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4 text-foreground">Importante!</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="professional-card border-l-4 border-l-yellow-500">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Salve a Data</h3>
                                        <p className="text-muted-foreground text-sm">
                                            <strong>30 de Novembro (Domingo) às 16h</strong>.
                                            Coloque no calendário para não esquecer!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/10">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2 text-green-900 dark:text-green-100 text-lg">
                                            AÇÃO NECESSÁRIA: Entre no WhatsApp
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-3 font-semibold">
                                            Este é o nosso canal principal de comunicação. Você PRECISA estar no grupo
                                            para receber o link do evento e conteúdos exclusivos!
                                        </p>
                                        <a
                                            href="https://chat.whatsapp.com/GRmXSoC8OHZE8oG9P17njv"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors text-sm shadow-lg hover:shadow-xl hover:scale-105 transform"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            Entrar no Grupo Agora
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="professional-card border-l-4 border-l-blue-500">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Participe Ao Vivo</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Os <strong>benefícios exclusivos</strong> serão revelados apenas para quem
                                            participar ao vivo. Não perca!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 py-16">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            Nos Vemos no Dia 30 de Novembro!
                        </h2>
                        <p className="text-xl text-white/90 mb-4">
                            Prepare-se para uma aula completa sobre como investir em imóveis na Itália
                        </p>
                        <p className="text-white/80 text-sm">
                            Dúvidas? Entre em contato pelo WhatsApp ou Instagram
                        </p>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
