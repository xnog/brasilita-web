import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FavoritesClient } from "./favorites-client";

export default async function FavoritesPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="container-padding py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Favoritos</h1>
                <p className="text-muted-foreground mt-2">
                    Gerencie e acompanhe os imóveis que você favoritou.
                </p>
            </div>
            <FavoritesClient />
        </div>
    );
}

