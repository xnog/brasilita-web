import { Metadata } from "next";
import { FAQClient } from "./faq-client";

export const metadata: Metadata = {
    title: "FAQ - Perguntas Frequentes | Brasilità",
    description: "Encontre respostas para as principais dúvidas sobre compra de imóveis na Itália por brasileiros.",
};

export default function FAQPage() {
    return <FAQClient />;
}
