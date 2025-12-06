import { auth } from "@/lib/auth";
import { listUserDocuments, getDocumentDownloadUrl } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");
  const key = searchParams.get("key");

  try {
    // Ação de download: gerar presigned URL
    if (action === "download" && key) {
      const url = await getDocumentDownloadUrl(key, session.user.email);
      return NextResponse.json({ url });
    }

    // Ação padrão: listar documentos
    const documents = await listUserDocuments(session.user.email);
    return NextResponse.json({ documents });
  } catch (error) {
    console.error("Error in documents API:", error);
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    );
  }
}
