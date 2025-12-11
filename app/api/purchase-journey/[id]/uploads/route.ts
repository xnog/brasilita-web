import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { purchaseJourneys, purchaseJourneySteps, purchaseJourneyUploads } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

// Configurações de upload
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * POST /api/purchase-journey/[id]/uploads
 * Faz upload de arquivo para uma etapa específica
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

        // Buscar a jornada
        const journey = await db.query.purchaseJourneys.findFirst({
            where: eq(purchaseJourneys.id, id),
            with: {
                steps: {
                    with: {
                        uploads: true,
                    },
                },
            },
        });

        if (!journey) {
            return NextResponse.json({ error: "Jornada não encontrada" }, { status: 404 });
        }

        // Verificar autorização
        if (journey.userId !== session.user.id) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;
        const stepNumber = formData.get("stepNumber") as string;

        if (!file) {
            return NextResponse.json({ error: "Arquivo não fornecido" }, { status: 400 });
        }

        if (!stepNumber) {
            return NextResponse.json({ error: "StepNumber obrigatório" }, { status: 400 });
        }

        const stepNum = parseInt(stepNumber);
        if (isNaN(stepNum) || stepNum < 1 || stepNum > 24) {
            return NextResponse.json({ error: "Número de etapa inválido" }, { status: 400 });
        }

        // Buscar a etapa
        const step = journey.steps.find((s) => s.stepNumber === stepNum);
        if (!step) {
            return NextResponse.json({ error: "Etapa não encontrada" }, { status: 404 });
        }

        // Validações de arquivo
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
                { status: 400 }
            );
        }

        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Tipo de arquivo não permitido. Use PDF, JPG, PNG ou DOC/DOCX" },
                { status: 400 }
            );
        }

        // Criar diretório de uploads se não existir
        const uploadsDir = join(process.cwd(), "public", "uploads", "purchase-journeys", id);
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        // Gerar nome único para o arquivo
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${stepNum}_${timestamp}_${sanitizedFileName}`;
        const filePath = join(uploadsDir, fileName);

        // Salvar arquivo
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // URL relativa para acesso
        const fileUrl = `/uploads/purchase-journeys/${id}/${fileName}`;

        // Salvar metadados no banco
        const [upload] = await db
            .insert(purchaseJourneyUploads)
            .values({
                journeyId: id,
                stepId: step.id,
                fileName: file.name,
                fileUrl: fileUrl,
                fileSize: file.size,
                mimeType: file.type,
                uploadedBy: session.user.id,
            })
            .returning();

        return NextResponse.json({ upload });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}

