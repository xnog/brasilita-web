import { Building, Home, Key, MapPin, Mail, CheckCircle, Users, TrendingUp, Shield, Clock, Award, Globe } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/ui/logo";
import { LandingHeader } from "@/components/layout/landing-header";

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LandingHeader session={session} />

      {/* Hero Section */}
      <section className="section-padding relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/bg.jpeg)' }}>
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>
        <div className="container mx-auto container-padding text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-gray-800 text-sm font-medium mb-4 shadow-xl border border-white/50">
                <Award className="w-4 h-4 mr-2" />
                O único marketplace de imóveis italianos
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>
              Realize seu sonho de ter uma
              <span className="text-yellow-400" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}> casa na Itália</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              Encontramos seu imóvel dos sonhos e conectamos você a profissionais e imobiliárias locais, facilitando a comunicação e a organização das etapas, eliminando barreiras de idioma e burocracia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/auth/signin?callbackUrl=/dashboard" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Buscar Imóveis
              </a>
              <a href="#servicos" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold border-2 border-white/70 hover:border-white transition-all duration-300 shadow-lg hover:scale-105">
                Ver Nossos Serviços
              </a>
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
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Expertise Local</h3>
                <p className="text-sm text-muted-foreground">Profundo conhecimento do mercado e assessoria especializada</p>
              </div>
              <div className="professional-card text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Em Português</h3>
                <p className="text-sm text-muted-foreground">Atendimento personalizado e discreto em português brasileiro</p>
              </div>
              <div className="professional-card text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ROI Otimizado</h3>
                <p className="text-sm text-muted-foreground">Estratégias personalizadas para maximizar seu retorno</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Nossos Serviços
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluções completas para seu investimento imobiliário na Itália, desde a compra até a gestão
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="professional-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Compra de Imóveis</h3>
                  <p className="text-sm text-muted-foreground">Assessoria completa</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Da busca à escritura final, cuidamos de todo o processo de aquisição com total transparência e segurança jurídica.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Curadoria personalizada de imóveis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Negociação estratégica de preços</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Validação jurídica completa</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Acompanhamento em português</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="professional-card">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Aluguel Longo Prazo</h3>
                  <p className="text-sm text-muted-foreground">Renda estável</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Gestão completa de aluguéis residenciais com seleção criteriosa de inquilinos e administração total.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Seleção rigorosa de inquilinos</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Contratos seguros e conformes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Cobrança e administração</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Manutenção preventiva</span>
                </li>
              </ul>
            </div>
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
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-900">Transparência e Responsabilidades</h3>
                </div>
                <div className="space-y-3 text-amber-800 text-sm">
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

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-900">Prazos e Dinâmica de Mercado</h3>
                </div>
                <div className="space-y-3 text-blue-800 text-sm">
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

      {/* Navigation Cards Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Explore Mais
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubra tudo sobre nossos serviços e como podemos ajudá-lo
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Possibilities Card */}
              <a href="/possibilities" className="professional-card text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Possibilidades</h3>
                <p className="text-sm text-muted-foreground">Descubra as diferentes formas de aproveitar seu imóvel</p>
              </a>

              <a href="/about" className="professional-card text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Sobre Nós</h3>
                <p className="text-sm text-muted-foreground">Nossa história e equipe especializada</p>
              </a>

              <a href="/partners" className="professional-card text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Parceiros</h3>
                <p className="text-sm text-muted-foreground">Faça parte da nossa rede de profissionais</p>
              </a>

              <a href="/contact" className="professional-card text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fale Conosco</h3>
                <p className="text-sm text-muted-foreground">Tire suas dúvidas e comece agora</p>
              </a>
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
