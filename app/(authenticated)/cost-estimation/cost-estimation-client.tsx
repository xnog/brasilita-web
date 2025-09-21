"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Euro } from "lucide-react";

interface CostItem {
    item: string;
    calculatedValue: number;
    percentage?: number;
    fixedValue?: number;
    observations: string;
}

export function CostEstimationClient() {
    const [valorImovel, setValorImovel] = useState<number>(20000);
    const [comissaoAgencia, setComissaoAgencia] = useState<number>(3000);

    const formatCurrency = (value: number) => {
        return `€${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const calculateCosts = (): CostItem[] => {
        const impostoRegistro = valorImovel * 0.09;
        const impostoIpotecaria = 50;
        const impostoCatastale = 50;
        const tassaArchivio = 27.50;
        const onorarioNotaio = valorImovel * 0.03;
        const contribuitoCassa = onorarioNotaio * 0.05;
        const contribuitoConsiglio = 17.05;
        const visureSpese = 200;

        const subtotaleImponibile = impostoRegistro + impostoIpotecaria + impostoCatastale +
            tassaArchivio + onorarioNotaio + contribuitoCassa +
            contribuitoConsiglio + visureSpese;

        const ivaNotaio = subtotaleImponibile * 0.22;
        const ivaAgencia = comissaoAgencia * 0.22;

        const assessoriaFixo = 1500;
        const assessoriaVariavel = valorImovel * 0.015;
        const ivaAssessoria = (assessoriaFixo + assessoriaVariavel) * 0.22;

        const totalGeral = valorImovel + subtotaleImponibile + ivaNotaio +
            comissaoAgencia + ivaAgencia + assessoriaFixo +
            assessoriaVariavel + ivaAssessoria;

        return [
            { item: "Imóvel", calculatedValue: valorImovel, observations: "" },
            { item: "Imposta di Registro", calculatedValue: impostoRegistro, percentage: 9, observations: "9%" },
            { item: "Imposta Ipotecaria", calculatedValue: impostoIpotecaria, fixedValue: 50, observations: "Fixo" },
            { item: "Imposta Catastale", calculatedValue: impostoCatastale, fixedValue: 50, observations: "Fixo" },
            { item: "Tassa Archivio", calculatedValue: tassaArchivio, fixedValue: 27.50, observations: "Fixo" },
            { item: "Onorario Notaio", calculatedValue: onorarioNotaio, percentage: 3.0, observations: "3%" },
            { item: "Contributo Cassa N.N.", calculatedValue: contribuitoCassa, percentage: 5.0, observations: "5%" },
            { item: "Contributo Consiglio N.N.", calculatedValue: contribuitoConsiglio, fixedValue: 17.05, observations: "Fixo" },
            { item: "Visure e spese de studio", calculatedValue: visureSpese, fixedValue: 200, observations: "Fixo" },
            { item: "Subtotale Imponibile (Tributável)", calculatedValue: subtotaleImponibile, observations: "" },
            { item: "IVA 22%", calculatedValue: ivaNotaio, percentage: 22.0, observations: "22%" },
            { item: "Comissione Agenzia Immobiliare", calculatedValue: comissaoAgencia, observations: "" },
            { item: "IVA 22%", calculatedValue: ivaAgencia, percentage: 22.0, observations: "22%" },
            { item: "Assessoria Brasilità Fixo", calculatedValue: assessoriaFixo, fixedValue: 1500, observations: "" },
            { item: "Assessoria Brasilità Variável", calculatedValue: assessoriaVariavel, percentage: 1.5, observations: "1,5%" },
            { item: "IVA 22%", calculatedValue: ivaAssessoria, percentage: 22.0, observations: "22%" },
            { item: "Total geral", calculatedValue: totalGeral, observations: "" }
        ];
    };

    const costs = calculateCosts();

    return (
        <div className="container mx-auto container-padding py-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                        <Calculator className="h-8 w-8" />
                        Estimativa de Custos de Aquisição
                    </h1>
                    <p className="text-muted-foreground">
                        Calcule os custos estimados para aquisição de um imóvel na Itália baseado no valor do imóvel e comissão da agência.
                    </p>
                </div>

                {/* Inputs Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Euro className="h-5 w-5" />
                            Valores de Entrada
                        </CardTitle>
                        <CardDescription>
                            Insira o valor do imóvel e a comissão da agência imobiliária para calcular todos os custos envolvidos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="valor-imovel">Valor do Imóvel (€)</Label>
                                <Input
                                    id="valor-imovel"
                                    type="number"
                                    value={valorImovel}
                                    onChange={(e) => setValorImovel(Number(e.target.value) || 0)}
                                    min="0"
                                    step="1000"
                                    className="text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="comissao-agencia">Comissão Agência Imobiliária (€)</Label>
                                <Input
                                    id="comissao-agencia"
                                    type="number"
                                    value={comissaoAgencia}
                                    onChange={(e) => setComissaoAgencia(Number(e.target.value) || 0)}
                                    min="0"
                                    step="100"
                                    className="text-lg"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cost Breakdown Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Detalhamento dos Custos
                        </CardTitle>
                        <CardDescription>
                            Breakdown completo de todos os custos envolvidos na aquisição do imóvel.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-semibold">Item</th>
                                        <th className="text-right py-3 px-4 font-semibold">Valor estimado (€)</th>
                                        <th className="text-center py-3 px-4 font-semibold">Observações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {costs.map((cost, index) => {
                                        const isSubtotal = cost.item === "Subtotale Imponibile (Tributável)";
                                        const isTotal = cost.item === "Total geral";
                                        const isHighlighted = isSubtotal || isTotal;

                                        return (
                                            <tr
                                                key={index}
                                                className={`border-b hover:bg-muted/50 ${isHighlighted ? 'bg-muted font-semibold' : ''
                                                    }`}
                                            >
                                                <td className={`py-3 px-4 ${isHighlighted ? 'font-bold' : ''}`}>
                                                    {cost.item}
                                                </td>
                                                <td className={`py-3 px-4 text-right tabular-nums ${isHighlighted ? 'font-bold' : ''}`}>
                                                    {formatCurrency(cost.calculatedValue)}
                                                </td>
                                                <td className="py-3 px-4 text-center text-sm text-muted-foreground">
                                                    {cost.observations}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Section */}
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Valor do Imóvel</p>
                                <p className="text-2xl font-bold text-primary">
                                    {formatCurrency(valorImovel)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Custos Adicionais</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {formatCurrency(costs[costs.length - 1].calculatedValue - valorImovel)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Total Geral</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(costs[costs.length - 1].calculatedValue)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Disclaimer */}
                <Card className="mt-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
                    <CardContent>
                        <p className="text-sm text-orange-800 dark:text-orange-200">
                            <strong>Nota:</strong> Esta é uma estimativa baseada em valores médios e pode variar conforme
                            o local, tipo de imóvel e condições específicas da transação. Para um cálculo preciso,
                            consulte um profissional especializado em direito imobiliário italiano.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}