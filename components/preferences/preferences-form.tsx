"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    MultiSelector,
    MultiSelectorTrigger,
    MultiSelectorInput,
    MultiSelectorContent,
    MultiSelectorList,
    MultiSelectorItem,
    MultiSelectValue,
} from "@/components/extension/multi-select";
import { convertEurToBrl, formatBrlCurrency, CURRENCY_CONFIG } from "@/lib/config/currency";
import { Building2, MapPin, User, Target, Euro, Phone, Goal, Wallet } from "lucide-react";

const formSchema = z.object({
    propertyType: z.enum(["residential", "investment"], {
        message: "Selecione o tipo de imóvel.",
    }),
    regions: z.array(z.string()).optional(),
    location: z.string().optional(), // Mantido para compatibilidade, agora opcional
    buyerProfile: z.enum(["resident", "italian_citizen", "foreign_non_resident", "brazilian_abroad"], {
        message: "Selecione seu perfil como comprador.",
    }),
    usageType: z.enum(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"], {
        message: "Selecione o tipo de uso pretendido.",
    }),
    investmentBudget: z.number().min(10000, {
        message: "O investimento deve ser de pelo menos €10.000.",
    }),
    hasFinancing: z.boolean().optional(),
    phone: z.string().min(8, {
        message: "Telefone deve ter pelo menos 8 dígitos.",
    }).regex(/^[+\d\s()-]+$/, {
        message: "Formato de telefone inválido.",
    }),
    investmentGoal: z.string().min(10, {
        message: "Descreva seu objetivo com pelo menos 10 caracteres.",
    }).max(500, {
        message: "Descrição deve ter no máximo 500 caracteres.",
    }),
});

type FormData = z.infer<typeof formSchema>;

interface PreferencesFormProps {
    onSubmit: (data: FormData) => void;
    availableRegions: MultiSelectValue[];
    initialData?: Partial<FormData>;
    isEditing?: boolean;
    isLoading?: boolean;
}

export function PreferencesForm({ onSubmit, availableRegions, initialData, isEditing = false, isLoading = false }: PreferencesFormProps) {

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            propertyType: initialData?.propertyType || undefined,
            location: initialData?.location || "",
            regions: initialData?.regions || [],
            buyerProfile: initialData?.buyerProfile || undefined,
            usageType: initialData?.usageType || undefined,
            investmentBudget: initialData?.investmentBudget || undefined,
            hasFinancing: initialData?.hasFinancing || false,
            phone: initialData?.phone || "",
            investmentGoal: initialData?.investmentGoal || "",
        },
    });

    const handleSubmit = (data: FormData) => {
        onSubmit(data);
    };

    return (
        <Card className="w-full">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Property Type */}
                        <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4" />
                                        Tipo de Imóvel
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {[
                                                { value: "residential", label: "Residencial", desc: "Para moradia" },
                                                { value: "investment", label: "Investimento", desc: "Para renda" },
                                            ].map((option) => (
                                                <div
                                                    key={option.value}
                                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${field.value === option.value
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                        }`}
                                                    onClick={() => field.onChange(option.value)}
                                                >
                                                    <div className="text-sm font-medium">{option.label}</div>
                                                    <div className="text-xs text-muted-foreground">{option.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Regions */}
                        <FormField
                            control={form.control}
                            name="regions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Regiões de Interesse (opcional)
                                    </FormLabel>
                                    <FormControl>
                                        <div className="min-w-0">
                                            <MultiSelector
                                                values={field.value?.map(regionId =>
                                                    availableRegions.find(region => region.value === regionId)
                                                ).filter((region): region is MultiSelectValue => region !== undefined) || []}
                                                onValuesChange={(selected) => {
                                                    field.onChange(selected.map(option => option.value));
                                                }}
                                            >
                                                <MultiSelectorTrigger className="min-w-0">
                                                    <MultiSelectorInput
                                                        placeholder="Todas as regiões..."
                                                    />
                                                </MultiSelectorTrigger>
                                                <MultiSelectorContent>
                                                    <MultiSelectorList>
                                                        {availableRegions.map((region) => (
                                                            <MultiSelectorItem
                                                                key={region.value}
                                                                value={region.value}
                                                                label={region.label}
                                                                description={region.description}
                                                            >
                                                                {region.label}
                                                            </MultiSelectorItem>
                                                        ))}
                                                    </MultiSelectorList>
                                                </MultiSelectorContent>
                                            </MultiSelector>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Selecione uma ou mais regiões da Itália onde deseja comprar propriedades. Deixe vazio para todas as regiões.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Location - Mantido como campo opcional para detalhes específicos */}
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Detalhes de Localização (opcional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Centro histórico, proximidade ao mar, áreas específicas..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Informações adicionais sobre a localização desejada dentro das regiões selecionadas
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Buyer Profile */}
                        <FormField
                            control={form.control}
                            name="buyerProfile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Seu Perfil como Comprador
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {[
                                                {
                                                    value: "foreign_non_resident",
                                                    label: "Brasileiro não-residente",
                                                    desc: "Moro no Brasil e quero comprar na Itália",
                                                },
                                                {
                                                    value: "brazilian_abroad",
                                                    label: "Brasileiro no exterior",
                                                    desc: "Moro em outro país (que não seja Brasil ou Itália)",
                                                },
                                                {
                                                    value: "italian_citizen",
                                                    label: "Cidadão italiano",
                                                    desc: "Tenho cidadania italiana (dupla cidadania)",
                                                },
                                                {
                                                    value: "resident",
                                                    label: "Residente na Itália",
                                                    desc: "Já moro na Itália legalmente",
                                                },
                                            ].map((option) => (
                                                <div
                                                    key={option.value}
                                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${field.value === option.value
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                        }`}
                                                    onClick={() => field.onChange(option.value)}
                                                >
                                                    <div className="text-sm font-medium">{option.label}</div>
                                                    <div className="text-xs text-muted-foreground">{option.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Usage Type */}
                        <FormField
                            control={form.control}
                            name="usageType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Target className="h-4 w-4" />
                                        Como Pretende Usar o Imóvel
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {[
                                                {
                                                    value: "short_rental",
                                                    label: "Aluguel por Temporada",
                                                    desc: "Airbnb, Booking.com - alta rentabilidade sazonal"
                                                },
                                                {
                                                    value: "personal_use",
                                                    label: "Casa de Férias Pessoal",
                                                    desc: "Refúgio particular para família e amigos"
                                                },
                                                {
                                                    value: "long_rental",
                                                    label: "Investimento Longo Prazo",
                                                    desc: "Aluguel residencial + valorização patrimonial"
                                                },
                                                {
                                                    value: "relocation",
                                                    label: "Mudança Definitiva",
                                                    desc: "Morar na Itália com suporte completo"
                                                },
                                                {
                                                    value: "mixed_use",
                                                    label: "Uso Misto",
                                                    desc: "Combinação de uso pessoal e rentabilização"
                                                },
                                                {
                                                    value: "family_legacy",
                                                    label: "Patrimônio Familiar",
                                                    desc: "Legado duradouro para próximas gerações"
                                                },
                                            ].map((option) => (
                                                <div
                                                    key={option.value}
                                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${field.value === option.value
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                        }`}
                                                    onClick={() => field.onChange(option.value)}
                                                >
                                                    <div className="text-sm font-medium">{option.label}</div>
                                                    <div className="text-xs text-muted-foreground">{option.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Investment Budget */}
                        <FormField
                            control={form.control}
                            name="investmentBudget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Euro className="h-4 w-4" />
                                        Orçamento de Investimento
                                    </FormLabel>
                                    <FormControl>
                                        <div className="space-y-3">
                                            <div className="relative">
                                                <Euro className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    type="number"
                                                    placeholder="100000"
                                                    className="pl-10"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                />
                                            </div>
                                            {field.value > 0 && (
                                                <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Valor aproximado em reais:</span>
                                                        <span className="font-medium text-foreground">
                                                            {formatBrlCurrency(convertEurToBrl(field.value))}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        Cotação aproximada: €1 = R$ {CURRENCY_CONFIG.EUR_TO_BRL_RATE.toFixed(2)}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Valor total disponível em euros (incluindo custos adicionais: impostos, notário, reforma).
                                        <br />
                                        <span className="text-xs text-muted-foreground">
                                            * A conversão para reais é apenas uma referência aproximada.
                                        </span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Has Financing */}
                        <FormField
                            control={form.control}
                            name="hasFinancing"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Wallet className="h-4 w-4" />
                                        Você já tem o valor disponível para investir?
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {[
                                                {
                                                    value: true,
                                                    label: "Sim",
                                                    desc: "Já tenho o valor total disponível"
                                                },
                                                {
                                                    value: false,
                                                    label: "Não",
                                                    desc: "Estou me preparando para investir"
                                                },
                                            ].map((option) => (
                                                <div
                                                    key={option.value.toString()}
                                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${field.value === option.value
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                        }`}
                                                    onClick={() => field.onChange(option.value)}
                                                >
                                                    <div className="text-sm font-medium">{option.label}</div>
                                                    <div className="text-xs text-muted-foreground">{option.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Essa informação nos ajuda a entender melhor seu momento de investimento
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        Telefone
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="tel"
                                                placeholder="+55 11 99999-9999"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Seu telefone para contato (incluir código do país, ex: +55)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Investment Goal */}
                        <FormField
                            control={form.control}
                            name="investmentGoal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Goal className="h-4 w-4" />
                                        Objetivo do Investimento
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descreva o que você pretende fazer com este imóvel na Itália. Ex: Casa de férias para a família, investimento para aposentadoria, mudança definitiva para a Europa, renda com aluguel de temporada, etc."
                                            className="min-h-[100px] resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Conte-nos seus planos e objetivos para personalizar melhor suas recomendações (10-500 caracteres)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading
                                ? "Salvando..."
                                : isEditing
                                    ? "Atualizar Preferências"
                                    : "Salvar Preferências"
                            }
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
