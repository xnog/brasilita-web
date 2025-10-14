import { MapPin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function LandingFooter() {
    return (
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
                            <li><a href="/about" className="hover:text-foreground transition-colors">Sobre</a></li>
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
                            <li>BRASILITÀ NEGÓCIOS DIGITAIS LTDA</li>
                            <li>
                                62.481.530/0001-56
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
    );
}
