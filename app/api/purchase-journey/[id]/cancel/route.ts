import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { purchaseJourneys } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

/**
 * POST /api/purchase-journey/[id]/cancel
 * Cancela a jornada (apenas se estiver em andamento).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await params;

    const journey = await db.query.purchaseJourneys.findFirst({
      where: eq(purchaseJourneys.id, id),
    });

    if (!journey) {
      return NextResponse.json({ error: "Jornada não encontrada" }, { status: 404 });
    }

    if (journey.userId !== session.user.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    if (journey.status === "completed") {
      return NextResponse.json(
        { error: "Este processo já foi concluído e não pode ser cancelado." },
        { status: 400 }
      );
    }

    if (journey.status === "cancelled") {
      return NextResponse.json(
        { message: "Processo já está cancelado." },
        { status: 200 }
      );
    }

    // Atualizar status para cancelado
    await db
      .update(purchaseJourneys)
      .set({ status: "cancelled", updatedAt: sql`now()` })
      .where(eq(purchaseJourneys.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error cancelling journey:", error);
    return NextResponse.json(
      { error: "Não foi possível cancelar o processo agora. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

