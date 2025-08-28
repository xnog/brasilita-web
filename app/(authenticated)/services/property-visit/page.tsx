import { PropertyVisitClient } from "./property-visit-client";

export const metadata = {
    title: "Visita de Imóveis - Brasilità",
    description: "Serviço de visita e documentação de imóveis na Itália",
};

export default function PropertyVisitPage() {
    return (
        <div className="container mx-auto container-padding py-8">
            <PropertyVisitClient />
        </div>
    );
}