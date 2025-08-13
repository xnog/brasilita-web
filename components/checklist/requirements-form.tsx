"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertEurToBrl, formatBrlCurrency, CURRENCY_CONFIG } from "@/lib/config/currency";
import Link from "next/link";

import { Building2, MapPin, User, Target, Euro, Phone, Goal, Shield } from "lucide-react";

const formSchema = z.object({
    propertyType: z.enum(["residential", "commercial", "investment"], {
        message: "Selecione o tipo de imóvel.",
    }),
    location: z.string().min(2, {
        message: "Localização deve ter pelo menos 2 caracteres.",
    }),
    buyerProfile: z.enum(["resident", "italian_citizen", "foreign_non_resident"], {
        message: "Selecione seu perfil como comprador.",
    }),
    usageType: z.enum(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"], {
        message: "Selecione o tipo de uso pretendido.",
    }),
    investmentBudget: z.number().min(10000, {
        message: "O investimento deve ser de pelo menos €10.000.",
    }),
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

interface RequirementsFormProps {
    onSubmit: (data: FormData) => void;
    initialData?: Partial<FormData>;
}

export function RequirementsForm({ onSubmit, initialData }: RequirementsFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            propertyType: initialData?.propertyType || undefined,
            location: initialData?.location || "",
            buyerProfile: initialData?.buyerProfile || undefined,
            usageType: initialData?.usageType || undefined,
            investmentBudget: initialData?.investmentBudget || undefined,
            phone: initialData?.phone || "",
            investmentGoal: initialData?.investmentGoal || "",
        },
    });

    const handleSubmit = (data: FormData) => {
        onSubmit(data);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Building2 className="h-6 w-6 text-primary" />
                    Checklist Personalizado
                </CardTitle>
                <CardDescription>
                    Responda algumas perguntas para criarmos um checklist personalizado para sua compra de imóvel na Itália
                </CardDescription>
            </CardHeader>
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
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {[
                                                { value: "residential", label: "Residencial", desc: "Para moradia" },
                                                { value: "commercial", label: "Comercial", desc: "Escritórios, lojas" },
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
                                                    <div className="font-medium">{option.label}</div>
                                                    <div className="text-sm text-muted-foreground">{option.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Location */}
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Localização Desejada
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Roma, Milão, Toscana, Costa Amalfitana..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Região, cidade ou área específica onde deseja comprar
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
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                {
                                                    value: "foreign_non_resident",
                                                    label: "Brasileiro não-residente",
                                                    desc: "Moro no Brasil e quero comprar na Itália",
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
                                                    <div className="font-medium">{option.label}</div>
                                                    <div className="text-sm text-muted-foreground">{option.desc}</div>
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
                                                    <div className="font-medium">{option.label}</div>
                                                    <div className="text-sm text-muted-foreground">{option.desc}</div>
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
                                        Conte-nos seus planos e objetivos para personalizar melhor seu checklist (10-500 caracteres)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Privacy Policy Notice */}
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Shield className="h-3 w-3 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-foreground">Proteção dos seus dados</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        As informações fornecidas serão usadas apenas para mapear oportunidades e conectá-lo a profissionais locais, conforme nossa{" "}
                                        <Link href="/privacy-policy" target="_blank" className="text-primary hover:underline font-medium">
                                            Política de Privacidade
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                            Gerar Meu Checklist Personalizado
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}