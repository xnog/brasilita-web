import { Metadata } from "next";
import Link from "next/link";
import { Search, Home, CheckCircle, Camera } from "lucide-react";

export const metadata: Metadata = {
    title: "Serviços | Brasilità",
    description: "Serviços especializados para sua jornada imobiliária na Itália",
};

export default function ServicesPage() {
    return (
        <div className="container mx-auto container-padding py-8">
            <div className="w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Serviços
                    </h1>
                    <p className="text-muted-foreground">
                        Serviços especializados para facilitar sua jornada de investimento imobiliário na Itália.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Busca Dedicada */}
                    <Link href="/services/custom-search" className="block">
                        <div className="professional-card hover:scale-105 transition-transform">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                                    <Search className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Busca Dedicada</h3>
                                    <p className="text-sm text-muted-foreground">Encontramos para você</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                Não encontrou o imóvel ideal? Nossa equipe fará uma busca dedicada no mercado italiano baseada nas suas especificações.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Busca direcionada conforme seus critérios</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Acesso a propriedades não públicas</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Relatório detalhado das opções</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Atendimento em português</span>
                                </li>
                            </ul>
                        </div>
                    </Link>

                    {/* Visita de Imóveis */}
                    <Link href="/services/property-visit" className="block">
                        <div className="professional-card hover:scale-105 transition-transform">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                                    <Camera className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Visita de Imóveis</h3>
                                    <p className="text-sm text-muted-foreground">Documentação completa</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                Solicite uma visita presencial em imóveis de interesse. Receba fotos, vídeos e relatório técnico para decidir com segurança.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Fotos profissionais em alta resolução</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Vídeo tour completo da propriedade</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Relatório técnico detalhado</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Entrega em até 48 horas</span>
                                </li>
                            </ul>
                        </div>
                    </Link>

                    {/* Compra de Imóveis */}
                    <Link href="/services/compra-imoveis" className="block">
                        <div className="professional-card hover:scale-105 transition-transform">
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
                                    <span className="text-sm">Verificação física e documental</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Validação jurídica completa</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle className="feature-icon mt-0.5" />
                                    <span className="text-sm">Acompanhamento do processo do início ao fim</span>
                                </li>
                            </ul>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
