"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Building, Phone, CheckCircle } from "lucide-react";

interface SuccessBannerProps {
    userProfile: {
        propertyType: string;
        location: string;
        buyerProfile: string;
        usageType: string;
        investmentBudget: number;
        phone: string;
        investmentGoal: string;
    };
}

export function SuccessBanner({ userProfile }: SuccessBannerProps) {
    return (
        <Card className="border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                    <Search className="h-5 w-5" />
                    <Building className="h-4 w-4" />
                    Estamos Buscando os Melhores Imóveis para Você
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300 text-base">
                    Com base no seu perfil, estamos analisando as melhores oportunidades em <strong>{userProfile.location}</strong> dentro
                    do seu orçamento de <strong>€{userProfile.investmentBudget.toLocaleString()}</strong>. Nossa equipe de especialistas
                    entrará em contato em breve para apresentar as opções selecionadas especialmente para você.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Próximos Passos
                            </Badge>
                        </div>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-2 ml-6">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span>Análise detalhada do seu perfil de investimento</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span>Seleção de imóveis que atendem seus critérios</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span>Apresentação de oportunidades personalizadas</span>
                            </li>
                        </ul>
                    </div>

                    {/* <div className="flex items-center gap-2 pt-2 border-t border-green-200 dark:border-green-800">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700 dark:text-green-300">
                            Entraremos em contato pelo telefone: <strong>{userProfile.phone}</strong>
                        </span>
                    </div> */}
                </div>
            </CardContent>
        </Card>
    );
}