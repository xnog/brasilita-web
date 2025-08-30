import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { propertyNotifications } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { AlertListClient } from "@/components/alerts/alert-list-client";

export default async function AlertsPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/signin");
    }

    // Fetch alerts with SSR
    const alerts = await db.query.propertyNotifications.findMany({
        where: eq(propertyNotifications.userId, session.user.id),
        orderBy: [desc(propertyNotifications.createdAt)]
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Alertas de Imóveis
                    </h1>
                    <p className="text-slate-600">
                        Receba alertas por email quando novos imóveis que correspondem aos seus critérios forem cadastrados na plataforma. Para criar novos alertas, vá para a página de imóveis e use o botão &quot;Criar Alerta&quot;.
                    </p>
                </div>

                <AlertListClient initialAlerts={alerts} />
            </div>
        </div>
    );
}
