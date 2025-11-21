"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function EventRegistrationForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/event-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    eventDate: "2025-11-30T16:00:00-03:00",
                    eventName: "insider-launch-2-nov-2025", // Nome do evento para identificação
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao registrar");
            }

            // Redirect to thank you page
            router.push("/insider-lead/thank-you");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Erro ao enviar formulário. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name" className="text-sm font-medium">
                    Nome Completo *
                </Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="email" className="text-sm font-medium">
                    E-mail *
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                    WhatsApp *
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="+55 (11) 99999-9999"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-lg py-6"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    "GARANTIR MINHA VAGA GRÁTIS"
                )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
                Ao preencher o formulário, você concorda em receber comunicações da Brasilità.
            </p>
        </form>
    );
}

