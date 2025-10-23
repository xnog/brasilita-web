import { CheckCircle, Download, Calendar, Video, Users } from "lucide-react";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { auth } from "@/lib/auth";
import Link from "next/link";

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
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Parabéns! Seu Guia Está a Caminho 🎉
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Enviamos o <strong>Guia: 5 Regiões Italianas Mais Rentáveis</strong> para o seu e-mail.
              Verifique sua caixa de entrada (e também o spam, só para garantir).
            </p>

            {/* Download Button */}
            <div className="bg-muted/30 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Baixe Agora Mesmo</h2>
              <p className="text-muted-foreground mb-6">
                Não quer esperar? Clique no botão abaixo para fazer o download imediato:
              </p>
              <a
                href="/pdfs/guia-5-regioes-italianas.pdf"
                download
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black transition-all duration-300 shadow-xl hover:scale-105"
              >
                <Download className="mr-2 h-6 w-6" />
                BAIXAR GUIA EM PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                O Que Acontece Agora?
              </h2>
              <p className="text-lg text-muted-foreground">
                Você acaba de dar o primeiro passo. Veja o que vem pela frente:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <h3 className="text-lg font-semibold mb-3">Série de Vídeos Gratuitos</h3>
                <p className="text-muted-foreground text-sm">
                  Nos próximos dias, você receberá <strong>3 vídeos exclusivos</strong> revelando 
                  os segredos do mercado imobiliário italiano
                </p>
              </div>

              {/* Step 2 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <h3 className="text-lg font-semibold mb-3">Lançamento Exclusivo</h3>
                <p className="text-muted-foreground text-sm">
                  No dia <strong>02/11</strong>, abriremos as portas do <strong>Brasilità Insider</strong>, 
                  nossa comunidade exclusiva
                </p>
              </div>

              {/* Step 3 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <h3 className="text-lg font-semibold mb-3">Acesso Prioritário</h3>
                <p className="text-muted-foreground text-sm">
                  Como você está na lista, terá <strong>acesso antecipado</strong> às vagas 
                  com preço especial de €29/trimestre
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Schedule */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Cronograma dos Vídeos Gratuitos
              </h2>
              <p className="text-lg text-muted-foreground">
                Fique de olho no seu e-mail! Vamos liberar os vídeos nesta ordem:
              </p>
            </div>

            <div className="space-y-6">
              {/* Video 1 */}
              <div className="professional-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-red-600">1</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Vídeo 1: Os 7 Erros Fatais</h3>
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-bold rounded-full">
                        26/10 - Sábado
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      Por que a maioria dos brasileiros perde dinheiro ao investir na Itália 
                      (e como evitar essas armadilhas)
                    </p>
                  </div>
                </div>
              </div>

              {/* Video 2 */}
              <div className="professional-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Vídeo 2: A Verdade Sobre o Mercado</h3>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">
                        29/10 - Terça
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      Como realmente funciona o mercado imobiliário italiano 
                      (o que ninguém te conta)
                    </p>
                  </div>
                </div>
              </div>

              {/* Video 3 */}
              <div className="professional-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Vídeo 3: O Passo a Passo Completo</h3>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                        01/11 - Sexta
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      Como comprar seu primeiro imóvel na Itália em 2025 
                      (mesmo morando no Brasil)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insider Announcement */}
            <div className="mt-12 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/10 dark:to-yellow-800/10 border-2 border-yellow-400 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-bold mb-4">
                LANÇAMENTO OFICIAL
              </div>
              <h3 className="text-2xl font-bold mb-3">02/11 - Sábado</h3>
              <p className="text-lg mb-4">
                <strong>Abertura do Brasilità Insider</strong>
              </p>
              <p className="text-muted-foreground">
                Apenas 100 vagas com preço especial de <strong className="text-yellow-700 dark:text-yellow-400">€29/trimestre</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-muted/30 section-padding">
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
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center">
            <div className="professional-card">
              <h3 className="text-2xl font-bold mb-4">📧 Verifique Seu E-mail</h3>
              <p className="text-muted-foreground mb-4">
                Nos próximos minutos, você receberá um e-mail com o link para download do guia. 
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

