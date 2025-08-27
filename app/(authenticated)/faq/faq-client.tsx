"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Search, HelpCircle, FileText, MapPin, DollarSign, Home, Shield, Calendar, User } from "lucide-react";

// FAQ Data inline
const faqData = {
    questions: [
        {
            id: "comprar-sem-morar",
            question: "1. Posso comprar um imóvel na Itália mesmo sem morar lá?",
            answer: "Sim. Brasileiros podem adquirir imóveis na Itália, mesmo sem residência fixa no país. O processo é formalizado em cartório por um notaio, que garante a validade da compra.",
            category: "Processo de Compra",
            tags: ["brasileiros", "residência", "notaio", "cartório"]
        },
        {
            id: "custos-adicionais",
            question: "2. Quais são os custos além do valor do imóvel?",
            answer: (
                <div>
                    <p className="mb-3">Além do preço do imóvel, você deve considerar:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Impostos de registro (normalmente 9% do valor declarado);</li>
                        <li>Taxas imobiliárias, que giram em torno de €5.000 a €6.000;</li>
                        <li>Honorários do notaio, em média €3.000;</li>
                        <li>Custos de traduções juramentadas e legalizações, se necessário.</li>
                    </ul>
                </div>
            ),
            category: "Custos e Taxas",
            tags: ["impostos", "registro", "taxas", "notaio", "traduções"]
        },
        {
            id: "impostos-anuais",
            question: "3. Quais são os impostos anuais que vou pagar como proprietário?",
            answer: (
                <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>IMU:</strong> imposto municipal sobre propriedade (obrigatório para quem não reside na Itália);</li>
                    <li><strong>TARI:</strong> taxa de lixo e coleta;</li>
                    <li><strong>IRPEF:</strong> imposto de renda sobre lucros de aluguel (se houver);</li>
                    <li><strong>Cedolare Secca:</strong> opção simplificada de tributação sobre aluguel, de 21%, pagos uma vez ao ano, que substitui outros impostos.</li>
                </ul>
            ),
            category: "Impostos e Taxas",
            tags: ["IMU", "TARI", "IRPEF", "Cedolare Secca", "propriedade"]
        },
        {
            id: "presenca-fisica",
            question: "4. Preciso ir até a Itália para concluir a compra?",
            answer: "Não necessariamente. Se não puder comparecer pessoalmente, você pode nomear um procurador para representá-lo perante o notaio.",
            category: "Processo de Compra",
            tags: ["procuração", "presença", "notaio", "representação"]
        },
        {
            id: "financiamento-estrangeiro",
            question: "5. Posso financiar um imóvel na Itália sendo estrangeiro?",
            answer: "É raro. Bancos italianos dificilmente oferecem crédito imobiliário para estrangeiros sem residência. A maioria das compras é feita à vista.",
            category: "Financiamento",
            tags: ["financiamento", "banco", "estrangeiro", "crédito", "à vista"]
        },
        {
            id: "cidadania-residencia",
            question: "6. Comprar um imóvel me dá direito à cidadania ou residência?",
            answer: "Não. A compra de um imóvel não concede cidadania nem residência automática. Porém, ter um endereço fixo pode facilitar processos de residência para quem deseja viver na Itália.",
            category: "Cidadania e Residência",
            tags: ["cidadania", "residência", "endereço", "direitos"]
        },
        {
            id: "documentacao-necessaria",
            question: "7. Qual a documentação necessária para comprar?",
            answer: (
                <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Passaporte válido;</li>
                    <li>Codice Fiscale (como se fosse um CPF italiano);</li>
                    <li>Em alguns casos, comprovantes de renda ou documentos adicionais (principalmente para abrir conta ou alugar).</li>
                </ul>
            ),
            category: "Documentação",
            tags: ["passaporte", "codice fiscale", "renda", "documentos"]
        },
        {
            id: "conta-bancaria",
            question: "8. Preciso abrir conta bancária na Itália?",
            answer: "Não é obrigatório, mas é recomendado para facilitar pagamentos e recebimentos de aluguel. Cidadãos italianos conseguem abrir conta com SPID. Estrangeiros também podem, mas o processo pode exigir documentação extra.",
            category: "Serviços Bancários",
            tags: ["conta bancária", "SPID", "pagamentos", "aluguel"]
        },
        {
            id: "beneficios-investimento",
            question: "9. Quais os principais benefícios de investir em um imóvel na Itália?",
            answer: (
                <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Valores acessíveis em cidades pequenas (a partir de €15.000 – €30.000);</li>
                    <li>Rentabilidade atrativa com aluguel, chegando a 8–12% ao ano em algumas regiões;</li>
                    <li>Segurança jurídica, já que todo processo é registrado oficialmente;</li>
                    <li>Possibilidade de valorização, especialmente em imóveis em reforma ou regiões em crescimento.</li>
                </ul>
            ),
            category: "Investimento",
            tags: ["valores", "rentabilidade", "segurança", "valorização"]
        },
        {
            id: "custos-manutencao",
            question: "10. Existem custos de manutenção?",
            answer: "Sim. Além dos impostos anuais, há despesas de condomínio (quando aplicável), contas de luz, água e gás, além de eventuais reformas. No caso de imóveis alugados, o inquilino é responsável pelo pagamento de condomínio.",
            category: "Custos e Taxas",
            tags: ["manutenção", "condomínio", "utilidades", "reformas", "inquilino"]
        },
        {
            id: "aluguel-funcionamento",
            question: "11. Como funciona o aluguel do imóvel?",
            answer: "Você pode optar por contratos tradicionais de longo prazo ou por aluguel de curta temporada (turístico). Cada modelo tem regras e tributações diferentes, mas ambos podem ser geridos mesmo à distância com apoio de imobiliárias locais.",
            category: "Aluguel",
            tags: ["contratos", "longo prazo", "curta temporada", "gestão", "imobiliárias"]
        },
        {
            id: "declaracao-brasil",
            question: "12. Preciso declarar o imóvel no Brasil?",
            answer: "Sim. Se você for residente fiscal no Brasil, deve declarar o imóvel no Imposto de Renda pelo valor de aquisição em euros, convertido para reais na data da compra.",
            category: "Obrigações Fiscais",
            tags: ["declaração", "imposto de renda", "Brasil", "conversão", "euros"]
        },
        {
            id: "processo-compra-detalhado",
            question: "13. Como funciona o processo de compra na Brasilità?",
            answer: (
                <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Busca do Imóvel na plataforma</li>
                    <li>Escolha do imóvel</li>
                    <li>Verificação de disponibilidade com a imobiliária</li>
                    <li>Visita por correspondente (vídeos e fotos)</li>
                    <li>Oferta de compra através da imobiliária</li>
                    <li>Assinatura do compromesso com pagamento de caparra (sinal)</li>
                    <li>Agendamento do atto</li>
                    <li>Procuração via cartório no Brasil (se necessário)</li>
                    <li>Escritura definitiva no notaio</li>
                    <li>Registro na Agenzia Dell Entrate, oficializando a propriedade</li>
                </ol>
            ),
            category: "Processo de Compra",
            tags: ["busca", "escolha", "disponibilidade", "visita", "oferta", "compromesso", "caparra", "atto", "procuração", "escritura", "agenzia"]
        },
        {
            id: "cidadania-necessaria",
            question: "14. Preciso de cidadania italiana para comprar?",
            answer: "Não. A cidadania facilita alguns processos (como abertura de conta), mas não é requisito para adquirir um imóvel.",
            category: "Cidadania e Residência",
            tags: ["cidadania", "requisito", "facilitação", "compra"]
        },
        {
            id: "sobre-brasilita",
            question: "15. A Brasilità é uma imobiliária?",
            answer: "Não. A Brasilità é uma plataforma de conexão que aproxima brasileiros interessados em investir na Itália com imobiliárias e empresas locais parceiras. Não atuamos como corretores nem como assessoria jurídica.",
            category: "Sobre a Brasilità",
            tags: ["plataforma", "conexão", "parceiros", "corretores", "assessoria"]
        }
    ]
};

const categories = [
    { name: "Todos", icon: HelpCircle, value: "all" },
    { name: "Processo de Compra", icon: Calendar, value: "Processo de Compra" },
    { name: "Custos e Taxas", icon: Shield, value: "Custos e Taxas" },
    { name: "Impostos e Taxas", icon: DollarSign, value: "Impostos e Taxas" },
    { name: "Documentação", icon: FileText, value: "Documentação" },
    { name: "Financiamento", icon: DollarSign, value: "Financiamento" },
    { name: "Investimento", icon: Home, value: "Investimento" },
    { name: "Cidadania e Residência", icon: MapPin, value: "Cidadania e Residência" },
    { name: "Serviços Bancários", icon: DollarSign, value: "Serviços Bancários" },
    { name: "Aluguel", icon: Home, value: "Aluguel" },
    { name: "Obrigações Fiscais", icon: FileText, value: "Obrigações Fiscais" },
    { name: "Sobre a Brasilità", icon: User, value: "Sobre a Brasilità" },
];

export function FAQClient() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const filteredFAQs = faqData.questions.filter((faq) => {
        // Convert answer to string for searching if it's JSX
        const answerText = typeof faq.answer === 'string' ? faq.answer : '';

        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            answerText.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                                <Card key={faq.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                                    <CardHeader
                                        className="pb-3 cursor-pointer hover:bg-muted/30 transition-colors duration-200"
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
                                                <div className="faq-content text-foreground leading-relaxed mb-4">
                                                    {typeof faq.answer === 'string' ? faq.answer : faq.answer}
                                                </div>
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
            </div>
        </div>
    );
}
