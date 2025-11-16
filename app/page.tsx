import { Home, Key, MapPin, CheckCircle, Users, User, TrendingUp, Shield, Clock, Award, Globe, Sparkles, ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { PrimaryCTA } from "@/components/ui/primary-cta";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LandingHeader session={session} />

      {/* Hero Section - Main */}
      <section className="section-padding relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/bg2-optimized.jpg)' }}>
        {/* Overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/50"></div>

        <div className="container mx-auto container-padding text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black text-sm md:text-base font-bold shadow-2xl">
                <Award className="w-5 h-5" />
                <span>O ÚNICO MARKETPLACE DE IMÓVEIS ITALIANOS PARA BRASILEIROS</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight text-shadow-hero">
              Realize seu sonho de ter uma <span className="text-yellow-400">casa na Itália</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed text-shadow-hero-subtitle font-medium">
              Conectamos você a imóveis e profissionais na Itália, eliminando barreiras de idioma e burocracia.
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm md:text-base font-medium">Suporte em português</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm md:text-base font-medium">Profissionais locais</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm md:text-base font-medium">Processo transparente</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <PrimaryCTA href="/auth/signup" variant="large" />
            </div>
          </div>
        </div>
      </section>

      {/* Brasilità Insider Section */}
      <section className="bg-background section-padding">
        <div className="container mx-auto container-padding text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black text-sm md:text-base font-bold shadow-2xl">
                <Sparkles className="w-5 h-5" />
                <span>COMUNIDADE EXCLUSIVA</span>
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Brasilità <span className="text-primary">Insider</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
              A primeira comunidade em português para brasileiros que querem investir no mercado imobiliário italiano
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm md:text-base font-medium">Aulas em 9 módulos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm md:text-base font-medium">Comunidade exclusiva</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm md:text-base font-medium">Consultoria mensal</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/insider"
                className="inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-xl hover:scale-105"
              >
                QUERO SABER MAIS
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Diferenciais */}
      <section id="diferenciais" className="bg-muted/30 section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Por que escolher a Brasilità?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Somos especialistas em conectar brasileiros ao mercado imobiliário italiano com total segurança e transparência
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expertise Local</h3>
                <p className="text-sm text-muted-foreground">Profundo conhecimento do mercado e assessoria especializada</p>
              </div>
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Em Português</h3>
                <p className="text-sm text-muted-foreground">Atendimento personalizado e discreto em português brasileiro</p>
              </div>
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">ROI Otimizado</h3>
                <p className="text-sm text-muted-foreground">Estratégias personalizadas para maximizar seu retorno</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="bg-primary/5 section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Comece sua jornada em 2 minutos
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crie sua conta e acesse nossa plataforma completa para encontrar seu imóvel dos sonhos na Itália
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="professional-card text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Criar Conta</h3>
                <p className="text-sm text-muted-foreground">Cadastro rápido</p>
              </div>

              <div className="professional-card text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Definir Preferências</h3>
                <p className="text-sm text-muted-foreground">Conte-nos sobre seu imóvel ideal</p>
              </div>

              <div className="professional-card text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Receber Suporte</h3>
                <p className="text-sm text-muted-foreground">Nossa equipe entrará em contato</p>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <PrimaryCTA href="/auth/signup" variant="large" />
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              ✓ Sem compromisso ✓ Suporte em português
            </p>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="como-funciona" className="bg-muted/30 section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Como Funciona Nosso Processo
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Entenda nossa metodologia transparente para guiar brasileiros na aquisição de imóveis na Itália
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Step 1 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Mapeamento do Perfil</h3>
                <p className="text-muted-foreground">
                  Mapeamos seu perfil e identificamos oportunidades alinhadas ao seu orçamento e preferências,
                  criando uma direção clara para sua busca.
                </p>
              </div>

              {/* Step 2 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Conexões Locais</h3>
                <p className="text-muted-foreground">
                  Conectamos você a profissionais e imobiliárias locais, facilitando a comunicação
                  e eliminando barreiras de idioma e burocracia.
                </p>
              </div>

              {/* Step 3 */}
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Organização do Processo</h3>
                <p className="text-muted-foreground">
                  Organizamos as etapas do processo para que você acompanhe cada avanço
                  com clareza e transparência.
                </p>
              </div>
            </div>

            {/* Transparency and Responsibilities */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="professional-card">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Transparência e Responsabilidades</h3>
                </div>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p className="leading-relaxed">
                    • A Brasilità não realiza transações financeiras, não retém valores e não intermedia juridicamente compra e venda.
                  </p>
                  <p className="leading-relaxed">
                    • Negociação, contratos e pagamentos são de responsabilidade exclusiva de comprador, vendedor e corretor credenciado.
                  </p>
                  <p className="leading-relaxed">
                    • Não garantimos disponibilidade de imóveis, prazos ou resultado final. Nosso papel é facilitar e organizar o processo.
                  </p>
                </div>
              </div>

              <div className="professional-card">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Prazos e Dinâmica de Mercado</h3>
                </div>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p className="leading-relaxed">
                    • Encontrar e concluir a compra pode levar de 3 meses a 1 ano.
                  </p>
                  <p className="leading-relaxed">
                    • Oferta e demanda variam por região e época; imóveis mais baratos são mais disputados e podem mudar rapidamente.
                  </p>
                  <p className="leading-relaxed">
                    • Preços e disponibilidade podem ser alterados sem aviso por imobiliárias/proprietários.
                  </p>
                  <p className="leading-relaxed">
                    • Prazos também dependem de terceiros (imobiliárias, notários/cartórios, bancos e órgãos públicos).
                  </p>
                </div>
              </div>
            </div>

            {/* Process Summary */}
            <div className="text-center bg-muted/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Nosso Compromisso</h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Organizamos cada etapa da sua jornada imobiliária na Itália com total transparência,
                oferecendo informações confiáveis e acompanhamento personalizado do início ao fim.
              </p>
              <p className="text-primary font-semibold mt-4 text-lg">
                Seu sonho italiano com segurança e clareza
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Possibilities Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Possibilidades do Seu Imóvel
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubra as diferentes formas de aproveitar e monetizar seu investimento imobiliário na Itália
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

            {/* Benefits of Italian Market */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Vantagens do Mercado Italiano
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Por que investir em imóveis na Itália é uma decisão inteligente
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Mercado Estável</h3>
                <p className="text-sm text-muted-foreground">
                  O mercado imobiliário italiano oferece estabilidade e crescimento consistente ao longo dos anos.
                </p>
              </div>

              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Localização Estratégica</h3>
                <p className="text-sm text-muted-foreground">
                  Posição privilegiada na Europa, facilitando viagens e negócios internacionais.
                </p>
              </div>

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
              Pronto para realizar seu sonho italiano?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Entre em contato conosco e descubra como podemos ajudá-lo a investir no mercado imobiliário italiano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryCTA href="/auth/signup" variant="large" />
              <a href="/contact" className="btn-secondary">
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
