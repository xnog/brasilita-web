import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { FAQLandingClient } from "./faq-landing-client";

export const metadata: Metadata = {
    title: "FAQ - Perguntas Frequentes | Brasilità",
    description: "Encontre respostas para as principais dúvidas sobre compra de imóveis na Itália por brasileiros.",
};

export default async function FAQPage() {
    const session = await auth();
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <LandingHeader session={session} />

            <FAQLandingClient />

            <LandingFooter />
        </div>
    );
}
