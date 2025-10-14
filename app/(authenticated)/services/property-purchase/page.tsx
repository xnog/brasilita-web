import { Metadata } from "next";
import { PropertyPurchaseClient } from "./property-purchase-client";

export const metadata: Metadata = {
    title: "Compra de Imóveis | Brasilità",
    description: "Da busca à escritura final, cuidamos de todo o processo de aquisição com total transparência e segurança jurídica",
};

export default function PropertyPurchasePage() {
    return <PropertyPurchaseClient />;
}
