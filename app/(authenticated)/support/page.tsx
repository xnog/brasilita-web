import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Mail, ArrowRight, Instagram } from "lucide-react";
import { WHATSAPP_PHONE, getFormattedPhoneNumber } from "@/lib/services/whatsapp-messages";

export const metadata: Metadata = {
    title: "Suporte | Brasilità",
    description: "Central de ajuda e suporte para todas as suas dúvidas sobre imóveis na Itália",
};

export default function SupportPage() {
    return (
        <div className="container mx-auto container-padding py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Suporte
                    </h1>
                    <p className="text-muted-foreground">
                        Central de ajuda para todas as suas dúvidas sobre investimento imobiliário na Itália.
                    </p>
                </div>

                {/* FAQ - Destaque Principal */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <HelpCircle className="h-6 w-6" />
                            Perguntas Frequentes
                        </CardTitle>
                        <CardDescription className="text-base">
                            Encontre respostas para as principais dúvidas sobre compra de imóveis na Itália por brasileiros.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                        📋 <strong>15</strong> perguntas essenciais
                                    </span>
                                    <span className="flex items-center gap-1">
                                        🔍 <strong>Busca</strong> inteligente
                                    </span>
                                    <span className="flex items-center gap-1">
                                        🏷️ <strong>Categorias</strong> organizadas
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Documentação, financiamento, impostos, processo de compra e muito mais
                                </p>
                            </div>
                            <Button size="lg" className="shrink-0" asChild>
                                <Link href="/faq">
                                    <HelpCircle className="h-4 w-4 mr-2" />
                                    Ver FAQ
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Canais de Contato */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* WhatsApp */}
                    <Card className="flex flex-col h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <MessageCircle className="h-5 w-5" />
                                WhatsApp
                            </CardTitle>
                            <CardDescription>
                                Suporte imediato via WhatsApp
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <div className="flex-1">
                                <div className="text-sm space-y-1">
                                    <p className="text-muted-foreground">
                                        Número: {getFormattedPhoneNumber()}
                                    </p>
                                    <span className="flex items-center gap-1">
                                        ⚡ <strong>Resposta</strong> rápida
                                    </span>
                                    <span className="flex items-center gap-1">
                                        💬 <strong>Chat</strong> direto
                                    </span>
                                </div>
                            </div>
                            <Button className="w-full mt-3" asChild>
                                <a
                                    href={`https://wa.me/${WHATSAPP_PHONE}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Abrir WhatsApp
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* E-mail */}
                    <Card className="flex flex-col h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Mail className="h-5 w-5" />
                                E-mail
                            </CardTitle>
                            <CardDescription>
                                Dúvidas detalhadas por e-mail
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <div className="flex-1">
                                <div className="text-sm space-y-1">
                                    <p className="text-muted-foreground">
                                        suporte@brasilita.com
                                    </p>
                                    <span className="flex items-center gap-1">
                                        📧 <strong>Resposta</strong> em 24h
                                    </span>
                                    <span className="flex items-center gap-1">
                                        📋 <strong>Dúvidas</strong> complexas
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mt-3" asChild>
                                <a href="mailto:suporte@brasilita.com">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Enviar E-mail
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Instagram */}
                    <Card className="flex flex-col h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Instagram className="h-5 w-5" />
                                Instagram
                            </CardTitle>
                            <CardDescription>
                                Acompanhe e entre em contato pelo Instagram
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <div className="flex-1">
                                <div className="text-sm space-y-1">
                                    <p className="text-muted-foreground">
                                        @brasilita.it
                                    </p>
                                    <span className="flex items-center gap-1">
                                        📸 <strong>Conteúdo</strong> exclusivo
                                    </span>
                                    <span className="flex items-center gap-1">
                                        💬 <strong>Direct</strong> message
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mt-3" asChild>
                                <a
                                    href="https://www.instagram.com/brasilita.it/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram className="h-4 w-4 mr-2" />
                                    Seguir no Instagram
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
