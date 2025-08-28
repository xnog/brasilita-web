import { CustomSearchClient } from "./custom-search-client";

export const metadata = {
    title: "Busca Dedicada - Brasilità",
    description: "Serviço de busca dedicada de imóveis na Itália",
};

export default function CustomSearchPage() {
    return (
        <div className="container mx-auto container-padding py-8">
            <CustomSearchClient />
        </div>
    );
}
