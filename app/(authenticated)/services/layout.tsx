import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Serviços - Brasilità",
    description: "Serviços especializados da Brasilità para brasileiros investindo na Itália",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
