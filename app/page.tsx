import { Building, Home, Key, MapPin, Phone, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold gradient-text">
              Brasilitá Wealth
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#servicos" className="text-muted-foreground hover:text-foreground transition-colors">
              Serviços
            </a>
            <a href="#sobre" className="text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            SUA CASA
            <br />
            NA ITÁLIA
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transforme seu sonho italiano em realidade com assessoria completa e personalizada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contato"
              className="btn-primary"
            >
              COMEÇAR AGORA
            </a>
            <a
              href="#servicos"
              className="btn-secondary"
            >
              NOSSOS SERVIÇOS
            </a>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">VOCÊ SONHA COM UM IMÓVEL NA ITÁLIA E EXIGE:</h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <p className="text-lg">Acompanhamento discreto e personalizado em português</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <p className="text-lg">Imóveis curados — ideais para viver, investir ou descansar</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <p className="text-lg">Assessoria completa, com transparência e segurança jurídica</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                <p className="text-lg">Agilidade, discrição e expertise local a cada etapa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              NOSSOS
              <br />
              SERVIÇOS
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluções completas para seu investimento imobiliário na Itália
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group bg-card border border-border rounded-2xl p-8 card-hover">
              <div className="mb-6">
                <Home className="h-12 w-12 text-primary mb-4" />
                <h4 className="text-2xl font-bold mb-2">Compra de Imóveis</h4>
                <p className="text-muted-foreground">
                  Assessoria completa para aquisição de imóveis na Itália, desde a busca até a escritura final.
                </p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Curadoria personalizada de imóveis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Negociação e fechamento estratégico</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Validação jurídica e técnica</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Acompanhamento em português</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="group bg-card border border-border rounded-2xl p-8 card-hover">
              <div className="mb-6">
                <Key className="h-12 w-12 text-primary mb-4" />
                <h4 className="text-2xl font-bold mb-2">Gestão Airbnb</h4>
                <p className="text-muted-foreground">
                  Maximize sua rentabilidade com gestão profissional do seu Airbnb na Itália.
                </p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Otimização de preços dinâmica</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Atendimento aos hóspedes 24/7</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Limpeza e manutenção profissional</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Relatórios financeiros mensais</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="group bg-card border border-border rounded-2xl p-8 card-hover">
              <div className="mb-6">
                <Building className="h-12 w-12 text-primary mb-4" />
                <h4 className="text-2xl font-bold mb-2">Aluguel Longo Prazo</h4>
                <p className="text-muted-foreground">
                  Gestão completa de aluguéis residenciais com inquilinos locais selecionados.
                </p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Seleção rigorosa de inquilinos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Contratos seguros e conformes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Cobrança e administração</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Manutenção preventiva</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-8">
              SOBRE
              <br />
              NÓS
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nossa essência vem do amor por propriedades que contam histórias e pela honra em fazer parte
              da jornada de diversas famílias brasileiras que irão continuar essas histórias na Itália.
            </p>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              A Itália é um lugar especial que nos encanta a cada dia. A arte, a culinária, as pessoas,
              a música, as paisagens — são muitos os motivos que fizeram da Itália nossa especialidade
              e paixão.
            </p>

            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-xl font-medium mb-4">
                Atuamos com curadoria imobiliária na Itália para brasileiros exigentes
              </p>
              <p className="text-muted-foreground">
                Atendemos um número restrito de clientes com um único objetivo: oferecer uma experiência
                segura, personalizada e impecável na aquisição e gestão de imóveis na Itália.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-8">
              FALE
              <br />
              CONOSCO
            </h3>
            <p className="text-xl text-muted-foreground mb-12">
              Pronto para realizar seu sonho italiano? Entre em contato conosco.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Telefone</h4>
                <p className="text-muted-foreground">+39 331 282 8232</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Email</h4>
                <p className="text-muted-foreground">contato@brasilita.com</p>
              </div>
            </div>

            <a
              href="mailto:contato@brasilita.com"
              className="btn-primary text-xl px-12 py-4"
            >
              INICIAR CONVERSA
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Building className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Brasilitá Wealth</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Lucca, Itália</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              © 2024 Brasilitá Wealth. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
