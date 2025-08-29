import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { LandingHeader } from "@/components/layout/landing-header";
import { FAQLandingClient } from "./faq-landing-client";

export const metadata: Metadata = {
    title: "FAQ - Perguntas Frequentes | Brasilità",
    description: "Encontre respostas para as principais dúvidas sobre compra de imóveis na Itália por brasileiros.",
};

export default async function FAQPage() {
    const session = await auth();
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <LandingHeader session={session} />

            <FAQLandingClient />

            {/* Footer */}
            <footer className="border-t border-border/50 bg-muted/20">
                <div className="container mx-auto container-padding py-12">
                    <div className="grid lg:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                    <div className="text-primary-foreground text-2xl font-bold">B</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Brasilità</h3>
                                    <p className="text-sm text-muted-foreground">Seu imóvel na Itália</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                Especialistas em conectar brasileiros ao mercado imobiliário italiano com total segurança e transparência.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-foreground">Navegação</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="/about" className="hover:text-foreground transition-colors">Sobre</a></li>
                                <li><a href="/partners" className="hover:text-foreground transition-colors">Parceiros</a></li>
                                <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
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
                                    <a href="/privacy-policy" className="hover:text-foreground transition-colors">
                                        Política de Privacidade
                                    </a>
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
