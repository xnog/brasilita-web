"use client";

import { Search, CheckCircle, Target, Bell, BarChart3, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateCustomSearchServiceMessage, openWhatsApp } from "@/lib/services/whatsapp-messages";

const benefits = [
    {
        title: "Critérios Personalizados",
        description: "Busca baseada no seu perfil e preferências específicas",
        icon: Target,
        items: [
            "Localização preferencial",
            "Faixa de preço ideal",
            "Tipo de propriedade",
            "Características específicas"
        ]
    },
    {
        title: "Notificações Automáticas",
        description: "Seja o primeiro a saber sobre novos imóveis",
        icon: Bell,
        items: [
            "Alertas em tempo real",
            "Relatórios semanais",
            "Análise de tendências",
            "Oportunidades exclusivas"
        ]
    },
    {
        title: "Análise de Mercado",
        description: "Insights profissionais sobre o mercado italiano",
        icon: BarChart3,
        items: [
            "Análise de preços",
            "Tendências regionais",
            "Potencial de valorização",
            "Comparativo de mercado"
        ]
    }
];

const processSteps = [
    {
        step: "1",
        title: "Definição de Critérios",
        description: "Analisamos seu perfil e definimos os critérios de busca ideais"
    },
    {
        step: "2",
        title: "Busca Ativa",
        description: "Nossa equipe realiza busca ativa no mercado italiano"
    },
    {
        step: "3",
        title: "Seleção Qualificada",
        description: "Filtramos e qualificamos as melhores oportunidades"
    },
    {
        step: "4",
        title: "Apresentação",
        description: "Apresentamos as opções com análise detalhada"
    }
];

export function CustomSearchClient() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <Search className="h-8 w-8" />
                    Busca Dedicada
                </h1>
                <p className="text-muted-foreground">
                    Nossa equipe especializada fará uma busca completa no mercado italiano baseada no seu perfil e especificações adicionais.
                </p>
            </div>

            {/* Visão Geral */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Por que escolher nossa busca dedicada?
                    </CardTitle>
                    <CardDescription>
                        Economize tempo e encontre as melhores oportunidades com nossa busca personalizada e análise profissional do mercado.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Busca Especializada</h4>
                                <p className="text-sm text-muted-foreground">
                                    Equipe dedicada com conhecimento profundo do mercado italiano
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Acesso Exclusivo</h4>
                                <p className="text-sm text-muted-foreground">
                                    Propriedades que não estão disponíveis publicamente
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Análise Detalhada</h4>
                                <p className="text-sm text-muted-foreground">
                                    Relatórios completos sobre cada propriedade encontrada
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Suporte Contínuo</h4>
                                <p className="text-sm text-muted-foreground">
                                    Acompanhamento durante todo o processo de decisão
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Serviços Incluídos */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">
                    O que está incluído
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {benefits.map((benefit) => {
                        const IconComponent = benefit.icon;
                        return (
                            <Card key={benefit.title}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <IconComponent className="h-5 w-5" />
                                        {benefit.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {benefit.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {benefit.items.map((item, index) => (
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
                        Pronto para Solicitar sua Busca Dedicada?
                    </CardTitle>
                    <CardDescription className="text-center">
                        Entre em contato conosco via WhatsApp para discutir seus critérios específicos e iniciar sua busca personalizada.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button
                        size="lg"
                        onClick={() => {
                            const message = generateCustomSearchServiceMessage();
                            openWhatsApp(message);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Solicitar via WhatsApp
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
