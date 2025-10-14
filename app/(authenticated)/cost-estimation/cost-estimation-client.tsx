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
    entity: 'brasilita' | 'notario' | 'imobiliaria' | 'imposto' | 'total';
}

export function CostEstimationClient() {
    const [valorImovel, setValorImovel] = useState<number>(20000);
    const [comissaoAgencia, setComissaoAgencia] = useState<number>(3000);

    const formatCurrency = (value: number) => {
        return `€${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const getEntityLabel = (entity: string) => {
        switch (entity) {
            case 'brasilita': return 'Brasilità';
            case 'notario': return 'Notário';
            case 'imobiliaria': return 'Imobiliária';
            case 'imposto': return 'Impostos';
            case 'total': return '';
            default: return '';
        }
    };

    const getEntityColor = (entity: string) => {
        switch (entity) {
            case 'brasilita': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'notario': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'imobiliaria': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'imposto': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            default: return '';
        }
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

        const assessoriaFixo = 2500;
        const assessoriaVariavel = valorImovel * 0.015;

        const totalGeral = valorImovel + subtotaleImponibile + ivaNotaio +
            comissaoAgencia + ivaAgencia + assessoriaFixo +
            assessoriaVariavel;

        return [
            { item: "Imóvel", calculatedValue: valorImovel, observations: "", entity: "total" },
            { item: "Imposta di Registro", calculatedValue: impostoRegistro, percentage: 9, observations: "9%", entity: "imposto" },
            { item: "Imposta Ipotecaria", calculatedValue: impostoIpotecaria, fixedValue: 50, observations: "Fixo", entity: "imposto" },
            { item: "Imposta Catastale", calculatedValue: impostoCatastale, fixedValue: 50, observations: "Fixo", entity: "imposto" },
            { item: "Tassa Archivio", calculatedValue: tassaArchivio, fixedValue: 27.50, observations: "Fixo", entity: "imposto" },
            { item: "Onorario Notaio", calculatedValue: onorarioNotaio, percentage: 3.0, observations: "3%", entity: "notario" },
            { item: "Contributo Cassa N.N.", calculatedValue: contribuitoCassa, percentage: 5.0, observations: "5%", entity: "notario" },
            { item: "Contributo Consiglio N.N.", calculatedValue: contribuitoConsiglio, fixedValue: 17.05, observations: "Fixo", entity: "notario" },
            { item: "Visure e spese de studio", calculatedValue: visureSpese, fixedValue: 200, observations: "Fixo", entity: "notario" },
            { item: "IVA 22% (Notário)", calculatedValue: ivaNotaio, percentage: 22.0, observations: "22%", entity: "notario" },
            { item: "Comissione Agenzia Immobiliare", calculatedValue: comissaoAgencia, observations: "", entity: "imobiliaria" },
            { item: "IVA 22% (Imobiliária)", calculatedValue: ivaAgencia, percentage: 22.0, observations: "22%", entity: "imobiliaria" },
            { item: "Assessoria Brasilità Fixo", calculatedValue: assessoriaFixo, fixedValue: 2500, observations: "", entity: "brasilita" },
            { item: "Assessoria Brasilità Variável", calculatedValue: assessoriaVariavel, percentage: 1.5, observations: "1,5%", entity: "brasilita" },
            { item: "Total geral", calculatedValue: totalGeral, observations: "", entity: "total" }
        ];
    };

    const costs = calculateCosts();

    const calculateTotalsByEntity = () => {
        const totals = {
            brasilita: 0,
            notario: 0,
            imobiliaria: 0,
            imposto: 0
        };

        costs.forEach(cost => {
            if (cost.entity in totals) {
                totals[cost.entity as keyof typeof totals] += cost.calculatedValue;
            }
        });

        return totals;
    };

    const entityTotals = calculateTotalsByEntity();

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
                            Valores
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
                                        <th className="text-center py-3 px-4 font-semibold">Responsável</th>
                                        <th className="text-right py-3 px-4 font-semibold">Valor estimado (€)</th>
                                        <th className="text-center py-3 px-4 font-semibold">Observações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {costs.map((cost, index) => {
                                        const isTotal = cost.item === "Total geral";
                                        const isHighlighted = isTotal;

                                        return (
                                            <tr
                                                key={index}
                                                className={`border-b hover:bg-muted/50 ${isHighlighted ? 'bg-muted font-semibold' : ''
                                                    }`}
                                            >
                                                <td className={`py-3 px-4 ${isHighlighted ? 'font-bold' : ''}`}>
                                                    {cost.item}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {cost.entity !== 'total' && (
                                                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getEntityColor(cost.entity)}`}>
                                                            {getEntityLabel(cost.entity)}
                                                        </span>
                                                    )}
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

                {/* Summary by Entity */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Resumo por Responsável</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardContent>
                                <div className="text-center">
                                    <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-2 ${getEntityColor('brasilita')}`}>
                                        Brasilità
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(entityTotals.brasilita)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="text-center">
                                    <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-2 ${getEntityColor('notario')}`}>
                                        Notário
                                    </div>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(entityTotals.notario)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="text-center">
                                    <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-2 ${getEntityColor('imobiliaria')}`}>
                                        Imobiliária
                                    </div>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {formatCurrency(entityTotals.imobiliaria)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="text-center">
                                    <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-2 ${getEntityColor('imposto')}`}>
                                        Impostos
                                    </div>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {formatCurrency(entityTotals.imposto)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Summary totals */}
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
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