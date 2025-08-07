import { Building, Home, Key, MapPin, Phone, Mail, CheckCircle, Star, Users, TrendingUp, Shield, Clock, Award, Globe } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto container-padding py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Brasilitá Wealth</h1>
              <p className="text-xs text-muted-foreground">Real Estate Italy</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#servicos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Serviços
            </a>
            <a href="#sobre" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSf9g6IP9r91YeX0MExvMrbI2C40AXgqZkhyuXoibUvXXoThpA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-6 py-2">
              Começar
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Assessoria Especializada em Imóveis Italianos
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Realize seu sonho de ter uma
              <span className="gradient-text"> casa na Itália</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Assessoria completa e personalizada para brasileiros que desejam investir no mercado imobiliário italiano.
              Da compra à gestão, cuidamos de cada detalhe com expertise local.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf9g6IP9r91YeX0MExvMrbI2C40AXgqZkhyuXoibUvXXoThpA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Iniciar Consulta Gratuita
              </a>
              <a href="#servicos" className="btn-secondary">
                Ver Nossos Serviços
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="stats-number">50+</div>
                <div className="stats-label">Imóveis Vendidos</div>
              </div>
              <div className="text-center">
                <div className="stats-number">100%</div>
                <div className="stats-label">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="stats-number">5+</div>
                <div className="stats-label">Anos Experiência</div>
              </div>
              <div className="text-center">
                <div className="stats-number">15</div>
                <div className="stats-label">Cidades Cobertas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Por que escolher a Brasilitá Wealth?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Somos especialistas em conectar brasileiros ao mercado imobiliário italiano com total segurança e transparência
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="professional-card text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">100% Seguro</h3>
                <p className="text-sm text-muted-foreground">Assessoria jurídica completa e validação de todos os documentos</p>
              </div>
              <div className="professional-card text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Expertise Local</h3>
                <p className="text-sm text-muted-foreground">Equipe baseada na Itália com profundo conhecimento do mercado</p>
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

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Gestão Airbnb</h3>
                  <p className="text-sm text-muted-foreground">Maximize rentabilidade</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Gestão profissional completa do seu Airbnb com otimização de preços e atendimento aos hóspedes 24/7.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Otimização dinâmica de preços</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Atendimento 24/7 aos hóspedes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Limpeza e manutenção</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="feature-icon mt-0.5" />
                  <span className="text-sm">Relatórios financeiros mensais</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
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

      {/* Testimonials */}
      <section className="bg-muted/30 section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de brasileiros que realizaram o sonho de ter uma casa na Itália
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 italic">
                &ldquo;A Brasilitá Wealth tornou possível o que parecia impossível. Compramos nossa casa dos sonhos em Toscana com total segurança e transparência.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">MC</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Maria Clara</p>
                  <p className="text-xs text-muted-foreground">São Paulo, BR</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 italic">
                &ldquo;Excelente gestão do nosso Airbnb em Roma. A rentabilidade superou nossas expectativas e o atendimento é impecável.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">RS</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Ricardo Silva</p>
                  <p className="text-xs text-muted-foreground">Rio de Janeiro, BR</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 italic">
                &ldquo;Profissionalismo e expertise únicos. Nos ajudaram desde a escolha até a documentação. Recomendo sem hesitar.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">AL</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Ana Luiza</p>
                  <p className="text-xs text-muted-foreground">Belo Horizonte, BR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Sobre a Brasilitá Wealth
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nossa essência vem do amor por propriedades que contam histórias e pela honra em fazer parte
                  da jornada de diversas famílias brasileiras que realizaram o sonho de ter uma casa na Itália.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  A Itália é um lugar especial que nos encanta a cada dia. A arte, a culinária, as pessoas,
                  a música, as paisagens — são muitos os motivos que fizeram da Itália nossa especialidade
                  e paixão.
                </p>
                <div className="flex items-center space-x-4">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSf9g6IP9r91YeX0MExvMrbI2C40AXgqZkhyuXoibUvXXoThpA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Fale Conosco
                  </a>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold">Baseados em Lucca, Itália</p>
                    <p>Atendemos todo o território italiano</p>
                  </div>
                </div>
              </div>
              <div className="lg:pl-8">
                <div className="professional-card">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Nossa Missão</h3>
                  <p className="text-muted-foreground mb-6">
                    Atendemos um número restrito de clientes com um único objetivo: oferecer uma experiência
                    segura, personalizada e impecável na aquisição e gestão de imóveis na Itália.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="feature-icon" />
                      <span className="text-sm font-medium">Segurança Jurídica Total</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="feature-icon" />
                      <span className="text-sm font-medium">Atendimento Personalizado</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="feature-icon" />
                      <span className="text-sm font-medium">Acompanhamento Contínuo</span>
                    </div>
                  </div>
                </div>
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
              Agende uma consulta gratuita e descubra como podemos ajudá-lo a investir no mercado imobiliário italiano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf9g6IP9r91YeX0MExvMrbI2C40AXgqZkhyuXoibUvXXoThpA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Consulta Gratuita
              </a>
              <a href="tel:+393312828232" className="btn-secondary">
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Entre em Contato
              </h2>
              <p className="text-lg text-muted-foreground">
                Estamos aqui para responder suas dúvidas e ajudá-lo em cada etapa
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="professional-card text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                <p className="text-muted-foreground mb-4">Fale diretamente conosco</p>
                <a href="tel:+393312828232" className="text-primary font-medium hover:underline">
                  +39 331 282 8232
                </a>
              </div>

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
                <h3 className="text-xl font-semibold mb-2">Localização</h3>
                <p className="text-muted-foreground mb-4">Baseados na Itália</p>
                <p className="text-primary font-medium">
                  Lucca, Toscana
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="bg-muted/30 rounded-xl p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-4 text-foreground">Horário de Atendimento</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Segunda a Sexta</p>
                    <p className="text-muted-foreground">09:00 - 18:00 (CET)</p>
                  </div>
                  <div>
                    <p className="font-medium">Sábados</p>
                    <p className="text-muted-foreground">09:00 - 13:00 (CET)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/20">
        <div className="container mx-auto container-padding py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Brasilitá Wealth</h3>
                  <p className="text-sm text-muted-foreground">Real Estate Italy</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Especialistas em conectar brasileiros ao mercado imobiliário italiano com total segurança e transparência.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Lucca, Itália</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Serviços</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#servicos" className="hover:text-foreground transition-colors">Compra de Imóveis</a></li>
                <li><a href="#servicos" className="hover:text-foreground transition-colors">Gestão Airbnb</a></li>
                <li><a href="#servicos" className="hover:text-foreground transition-colors">Aluguel Longo Prazo</a></li>
                <li><a href="#sobre" className="hover:text-foreground transition-colors">Consultoria</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="tel:+393312828232" className="hover:text-foreground transition-colors">
                    +39 331 282 8232
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@brasilita.com" className="hover:text-foreground transition-colors">
                    contato@brasilita.com
                  </a>
                </li>
                <li>Segunda a Sexta: 09:00 - 18:00 CET</li>
                <li>Sábado: 09:00 - 13:00 CET</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Brasilitá Wealth. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
