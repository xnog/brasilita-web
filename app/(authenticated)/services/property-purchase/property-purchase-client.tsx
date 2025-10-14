"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, CheckCircle, FileText, Users, Shield, MessageCircle } from "lucide-react";
import { generateRepresentationServiceMessage, openWhatsApp } from "@/lib/services/whatsapp-messages";

const services = [
    {
        title: "Curadoria Personalizada",
        description: "Seleção de imóveis baseada em suas preferências específicas",
        icon: FileText,
        items: [
            "Análise detalhada do perfil do cliente",
            "Busca direcionada no mercado italiano",
            "Pré-seleção de propriedades adequadas",
            "Relatório comparativo das opções"
        ]
    },
    {
        title: "Verificação Completa",
        description: "Análise física e documental de cada propriedade",
        icon: Shield,
        items: [
            "Inspeção física da propriedade",
            "Verificação de títulos de propriedade",
            "Análise de certidões e registros",
            "Identificação de pendências legais"
        ]
    },
    {
        title: "Validação Jurídica",
        description: "Segurança legal em todo o processo de aquisição",
        icon: Users,
        items: [
            "Advogado especializado em imóveis",
            "Acompanhamento no cartório notarial",
            "Gestão de procurações legais",
            "Suporte em português durante todo processo"
        ]
    }
];

const processSteps = [
    {
        step: "1",
        title: "Curadoria Personalizada",
        description: "Identificamos imóveis que atendem exatamente suas necessidades e orçamento"
    },
    {
        step: "2",
        title: "Verificação Física e Documental",
        description: "Análise completa da propriedade e toda documentação legal"
    },
    {
        step: "3",
        title: "Validação Jurídica Completa",
        description: "Verificação legal por advogados especializados em direito imobiliário"
    },
    {
        step: "4",
        title: "Acompanhamento do Início ao Fim",
        description: "Suporte completo até a entrega das chaves do seu novo imóvel"
    }
];

export function PropertyPurchaseClient() {
    return (
        <div className="container mx-auto container-padding py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                        <Home className="h-8 w-8" />
                        Compra de Imóveis
                    </h1>
                    <p className="text-muted-foreground">
                        Da busca à escritura final, cuidamos de todo o processo de aquisição com total transparência e segurança jurídica.
                    </p>
                </div>

                {/* Visão Geral */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Assessoria completa para sua compra
                        </CardTitle>
                        <CardDescription>
                            Nosso serviço de compra de imóveis oferece acompanhamento completo desde a busca até a escritura final, garantindo total transparência e segurança jurídica em cada etapa.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium">Curadoria personalizada de imóveis</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Seleção direcionada baseada em suas preferências específicas
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium">Verificação física e documental</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Inspeção completa da propriedade e análise de toda documentação
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium">Validação jurídica completa</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Segurança legal garantida por advogados especializados
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium">Acompanhamento do processo do início ao fim</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Suporte completo até a entrega das chaves
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Serviços Incluídos */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-6">
                        Serviços Incluídos
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {services.map((service) => {
                            const IconComponent = service.icon;
                            return (
                                <Card key={service.title}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <IconComponent className="h-5 w-5" />
                                            {service.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {service.items.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Processo */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-6">
                        Como Funciona o Processo
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map((step) => (
                            <Card key={step.step}>
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                        {step.step}
                                    </div>
                                    <CardTitle className="text-lg">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl text-center">
                            Pronto para Comprar seu Imóvel na Itália?
                        </CardTitle>
                        <CardDescription className="text-center">
                            Entre em contato conosco via WhatsApp para discutir suas necessidades e receber assessoria personalizada para sua compra.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={() => {
                                    const message = generateRepresentationServiceMessage();
                                    openWhatsApp(message);
                                }}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Solicitar via WhatsApp
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
