"use client";

import { Camera, FileText, Clock, Home, CheckCircle, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generatePropertyVisitServiceMessage, openWhatsApp } from "@/lib/services/whatsapp-messages";

const services = [
    {
        title: "Documentação Visual",
        description: "Registro completo da propriedade em alta qualidade",
        icon: Camera,
        items: [
            "Fotos profissionais em alta resolução",
            "Vídeo tour com narração detalhada",
            "Imagens de todos os cômodos",
            "Registro da área externa e fachada"
        ]
    },
    {
        title: "Análise Técnica",
        description: "Avaliação profissional do estado da propriedade",
        icon: FileText,
        items: [
            "Relatório de conservação",
            "Identificação de melhorias necessárias",
            "Análise de aspectos estruturais",
            "Observações sobre acabamentos"
        ]
    },
    {
        title: "Entrega Rápida",
        description: "Material completo em tempo hábil",
        icon: Clock,
        items: [
            "Entrega em até 48 horas",
            "Relatório organizado e detalhado",
            "Acesso online ao material",
            "Suporte para esclarecimentos"
        ]
    }
];

const processSteps = [
    {
        step: "1",
        title: "Solicitação",
        description: "Clique em 'Solicitar Visita' no imóvel de interesse"
    },
    {
        step: "2",
        title: "Agendamento",
        description: "Nossa equipe agenda com proprietário ou imobiliária"
    },
    {
        step: "3",
        title: "Visita Técnica",
        description: "Realizamos visita completa com documentação"
    },
    {
        step: "4",
        title: "Entrega",
        description: "Você recebe todo o material para decisão"
    }
];

export function PropertyVisitClient() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <Home className="h-8 w-8" />
                    Visita de Imóveis
                </h1>
                <p className="text-muted-foreground">
                    Solicite que nossa equipe visite um imóvel de seu interesse e produza conteúdo detalhado para auxiliar na sua decisão.
                </p>
            </div>

            {/* Visão Geral */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Por que solicitar uma visita profissional?
                    </CardTitle>
                    <CardDescription>
                        Tome decisões informadas com nossa documentação completa e análise técnica especializada da propriedade.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Visão Completa</h4>
                                <p className="text-sm text-muted-foreground">
                                    Documentação visual e técnica de toda a propriedade
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Economia de Tempo</h4>
                                <p className="text-sm text-muted-foreground">
                                    Evite viagens desnecessárias com nossa pré-avaliação
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Análise Profissional</h4>
                                <p className="text-sm text-muted-foreground">
                                    Avaliação técnica por especialistas locais
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Decisão Segura</h4>
                                <p className="text-sm text-muted-foreground">
                                    Todas as informações necessárias para decidir
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
                        Pronto para Solicitar uma Visita?
                    </CardTitle>
                    <CardDescription className="text-center">
                        Entre em contato conosco via WhatsApp para agendar uma visita profissional e receber informações sobre valores.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button
                        size="lg"
                        onClick={() => {
                            const message = generatePropertyVisitServiceMessage();
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
