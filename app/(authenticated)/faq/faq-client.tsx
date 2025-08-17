"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Search, HelpCircle, FileText, MapPin, DollarSign, Home, Shield, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import faqData from "@/lib/data/faq-data.json";

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
    tags: string[];
}

interface FAQCategory {
    name: string;
    value: string;
}

const categories = [
    { name: "Todos", icon: HelpCircle, value: "all" },
    { name: "Processo de Compra", icon: Calendar, value: "Processo de Compra" },
    { name: "Custos e Taxas", icon: Shield, value: "Custos e Taxas" },
    { name: "Impostos e Taxas", icon: DollarSign, value: "Impostos e Taxas" },
    { name: "Documentação", icon: FileText, value: "Documentação" },
    { name: "Investimento", icon: Home, value: "Investimento" },
    { name: "Cidadania e Residência", icon: MapPin, value: "Cidadania e Residência" },
    { name: "Sobre a Brasilità", icon: User, value: "Sobre a Brasilità" },
];

export function FAQClient() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const filteredFAQs = faqData.questions.filter((faq) => {
        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const toggleExpanded = (id: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    return (
        <div className="container mx-auto container-padding py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Perguntas Frequentes
                    </h1>
                    <p className="text-muted-foreground">
                        Encontre respostas para as principais dúvidas sobre compra de imóveis na Itália por brasileiros.
                        Nosso guia completo vai te ajudar em cada etapa do processo.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Buscar por palavra-chave..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <Button
                                    key={category.value}
                                    variant={selectedCategory === category.value ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.value)}
                                    className="flex items-center gap-2"
                                >
                                    <Icon className="h-4 w-4" />
                                    {category.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-sm text-gray-600">
                        {filteredFAQs.length} {filteredFAQs.length === 1 ? 'pergunta encontrada' : 'perguntas encontradas'}
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredFAQs.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    Nenhuma pergunta encontrada
                                </h3>
                                <p className="text-muted-foreground">
                                    Tente ajustar sua busca ou selecionar uma categoria diferente.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredFAQs.map((faq) => {
                            const isExpanded = expandedItems.has(faq.id);
                            return (
                                <Card key={faq.id} className="overflow-hidden">
                                    <CardHeader
                                        className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
                                        onClick={() => toggleExpanded(faq.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-base font-medium text-left leading-relaxed">
                                                    {faq.question}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge variant="secondary" className="text-xs">
                                                        {faq.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="ml-2 flex-shrink-0">
                                                {isExpanded ? (
                                                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    {isExpanded && (
                                        <>
                                            <Separator />
                                            <CardContent className="pt-4">
                                                <p className="text-foreground leading-relaxed mb-4">
                                                    {faq.answer}
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {faq.tags.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </>
                                    )}
                                </Card>
                            );
                        })
                    )}
                </div>

                {/* Important Notice */}
                <Card className="mt-12 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border-amber-500/20">
                    <CardHeader>
                        <CardTitle className="text-center flex items-center justify-center gap-2">
                            <Shield className="h-5 w-5 text-amber-600" />
                            Aviso Importante
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            👉 <strong>Importante:</strong> Antes de confirmar o interesse em qualquer imóvel, esteja ciente de que existem
                            custos fixos e obrigatórios (taxas, impostos e notaio). Confirme sua intenção apenas se tiver real interesse em prosseguir.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
