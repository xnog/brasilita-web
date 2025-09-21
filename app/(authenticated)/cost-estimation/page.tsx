import { Metadata } from "next";
import { CostEstimationClient } from "./cost-estimation-client";

export const metadata: Metadata = {
    title: "Cost Estimation | Brasilità",
    description: "Calcule os custos estimados para aquisição de um imóvel na Itália",
};

export default function CostEstimationPage() {
    return <CostEstimationClient />;
}