import { CheckCircle, Calendar, Clock, Video, Bell, Users, Instagram } from "lucide-react";
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
              Inscrição Confirmada!
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Sua vaga para o evento <strong>&ldquo;Como Comprar Seu Primeiro Imóvel na Itália&rdquo;</strong> está garantida!
            </p>

            {/* Event Details Card */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-8 mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Video className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">Detalhes do Evento</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Data</p>
                    <p className="text-muted-foreground">02 de Novembro (Sábado)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Horário</p>
                    <p className="text-muted-foreground">16:00h (Brasília)</p>
                  </div>
                </div>
              </div>
            </div>
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
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <h3 className="text-lg font-semibold mb-3">Inscrição Confirmada</h3>
                <p className="text-muted-foreground text-sm">
                  Sua vaga está <strong>garantida</strong>. Anote a data no seu calendário!
                </p>
              </div>

              {/* Step 2 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <h3 className="text-lg font-semibold mb-3">Lembrete no Dia 02/11</h3>
                <p className="text-muted-foreground text-sm">
                  No dia <strong>02 de novembro</strong>, enviaremos o link de acesso
                  por e-mail e WhatsApp
                </p>
              </div>

              {/* Step 3 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <h3 className="text-lg font-semibold mb-3">Participe Ao Vivo</h3>
                <p className="text-muted-foreground text-sm">
                  Às <strong>16h</strong>, clique no link e participe
                  da aula completa com bônus exclusivo
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
                      <strong>02 de Novembro (Sábado) às 16h</strong>.
                      Coloque no calendário para não esquecer!
                    </p>
                  </div>
                </div>
              </div>

              <div className="professional-card border-l-4 border-l-blue-500">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Link de Acesso no Dia do Evento</h3>
                    <p className="text-muted-foreground text-sm">
                      No dia <strong>02 de novembro</strong>, você receberá o link de acesso
                      por e-mail e WhatsApp. Fique atento!
                    </p>
                  </div>
                </div>
              </div>

              <div className="professional-card border-l-4 border-l-green-500">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Participe Ao Vivo</h3>
                    <p className="text-muted-foreground text-sm">
                      O <strong>bônus exclusivo</strong> será revelado apenas para quem
                      participar ao vivo. Não perca!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Enquanto Isso, Siga-nos nas Redes
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Publicamos diariamente dicas, oportunidades e bastidores sobre o mercado italiano
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://instagram.com/duasmalaseumdestino"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                <Instagram className="w-5 h-5" />
                @duasmalaseumdestino (190k)
              </a>
              <a
                href="https://instagram.com/nortedaitalia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                <Instagram className="w-5 h-5" />
                @nortedaitalia (17k)
              </a>
              <a
                href="https://instagram.com/brasilita.it"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                <Instagram className="w-5 h-5" />
                @brasilita.it (7k)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 py-16">
        <div className="container mx-auto container-padding text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Nos Vemos no Dia 02 de Novembro!
            </h2>
            <p className="text-xl text-white/90 mb-4">
              Prepare-se para uma aula completa sobre como comprar seu imóvel na Itália
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
