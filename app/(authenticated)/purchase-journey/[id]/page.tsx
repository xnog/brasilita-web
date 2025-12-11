import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { purchaseJourneys } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PurchaseJourneyClient } from "./purchase-journey-client";

export default async function PurchaseJourneyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session) {
        redirect("/auth/signin");
    }

    const { id } = await params;

    // Buscar a jornada com todas as informações
    const journey = await db.query.purchaseJourneys.findFirst({
        where: eq(purchaseJourneys.id, id),
        with: {
            property: {
                with: {
                    region: true,
                },
            },
            steps: {
                orderBy: (steps, { asc }) => [asc(steps.stepNumber)],
                with: {
                    uploads: true,
                },
            },
        },
    });

    if (!journey) {
        redirect("/dashboard");
    }

    // Verificar autorização
    if (journey.userId !== session.user.id) {
        redirect("/dashboard");
    }

    return <PurchaseJourneyClient initialJourney={journey} />;
}

