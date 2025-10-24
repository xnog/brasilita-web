import { CheckCircle, Calendar, Clock, Video, Bell, Users } from "lucide-react";
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
              Inscrição Confirmada! 🎉
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

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <h3 className="text-lg font-semibold mb-3">Confirmação Enviada</h3>
                <p className="text-muted-foreground text-sm">
                  Você receberá um <strong>e-mail de confirmação</strong> com todos os detalhes.
                  Verifique também o spam!
                </p>
              </div>

              {/* Step 2 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <h3 className="text-lg font-semibold mb-3">Link de Acesso</h3>
                <p className="text-muted-foreground text-sm">
                  <strong>1 dia antes</strong> do evento, enviaremos o link de acesso
                  por e-mail e WhatsApp
                </p>
              </div>

              {/* Step 3 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <h3 className="text-lg font-semibold mb-3">Participe Ao Vivo</h3>
                <p className="text-muted-foreground text-sm">
                  No dia <strong>02/11 às 16h</strong>, entre no link e participe
                  da aula completa
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
      <section className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/10 dark:to-yellow-800/10 section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">⚠️ Importante!</h2>
            </div>

            <div className="space-y-6">
              <div className="professional-card">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Verifique Seu E-mail</h3>
                    <p className="text-muted-foreground text-sm">
                      Nos próximos minutos, você receberá um e-mail de confirmação.
                      Se não encontrar, <strong>verifique a caixa de spam</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="professional-card">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">2</span>
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

              <div className="professional-card">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">3</span>
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
                @duasmalaseumdestino (190k)
              </a>
              <a
                href="https://instagram.com/nortedaitalia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
                @nortedaitalia (17k)
              </a>
              <a
                href="https://instagram.com/brasilita.it"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
                @brasilita.it (7k)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final Note */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center">
            <div className="professional-card">
              <h3 className="text-2xl font-bold mb-4">📧 Verifique Seu E-mail</h3>
              <p className="text-muted-foreground mb-4">
                Enviamos um e-mail de confirmação com todos os detalhes do evento.
                Se não encontrar na caixa de entrada, <strong>verifique o spam</strong>.
              </p>
              <p className="text-sm text-muted-foreground">
                Problemas para receber? Entre em contato pelo WhatsApp ou Instagram.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
