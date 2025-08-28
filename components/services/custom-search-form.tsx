"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { generateCustomSearchFormMessage, openWhatsApp } from "@/lib/services/whatsapp-messages";

export function CustomSearchForm() {
    const [specificRequirements, setSpecificRequirements] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const message = generateCustomSearchFormMessage(specificRequirements);
        openWhatsApp(message);
    };

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="requirements">Especificações Adicionais</Label>
                        <Textarea
                            id="requirements"
                            placeholder="Descreva características específicas que você está procurando além das suas preferências já cadastradas. Por exemplo: número de quartos, características especiais, proximidade a serviços específicos, etc."
                            rows={6}
                            value={specificRequirements}
                            onChange={(e) => setSpecificRequirements(e.target.value)}
                            required
                        />
                        <p className="text-sm text-muted-foreground">
                            Como você já tem suas preferências configuradas no perfil, precisamos apenas de detalhes específicos adicionais.
                        </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Como funciona:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Utilizaremos suas preferências já cadastradas como base</li>
                            <li>• Consideraremos as especificações adicionais informadas</li>
                            <li>• Nossa equipe fará uma busca dedicada no mercado italiano</li>
                            <li>• Enviaremos opções que atendem seu perfil completo</li>
                        </ul>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Solicitar Busca Dedicada via WhatsApp
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                        Você será redirecionado para o WhatsApp com sua solicitação pré-preenchida
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
