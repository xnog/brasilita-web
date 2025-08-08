import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ChecklistService } from "@/lib/services/checklist-service";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const report = await ChecklistService.generateProgressReport(session.user.id);

        return NextResponse.json(report);
    } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}