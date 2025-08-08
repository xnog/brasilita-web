"use client";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Building2, MapPin, User, Target, Euro, Phone } from "lucide-react";

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
    usageType: z.enum(["personal_use", "long_rental", "short_rental"], {
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
            investmentBudget: initialData?.investmentBudget || 0,
            phone: initialData?.phone || "",
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
                                        Tipo de Uso
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {[
                                                { value: "personal_use", label: "Uso Próprio", desc: "Casa de férias ou moradia" },
                                                { value: "long_rental", label: "Aluguel Longo", desc: "Aluguel anual/residencial" },
                                                { value: "short_rental", label: "Aluguel Curto", desc: "Airbnb, turismo" },
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
                                        <div className="relative">
                                            <Euro className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="number"
                                                placeholder="100000"
                                                className="pl-10"
                                                {...field}
                                                value={field.value || ""}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Valor total disponível em euros (incluindo custos adicionais: impostos, notário, reforma)
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

                        <Button type="submit" className="w-full" size="lg">
                            Gerar Meu Checklist Personalizado
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}