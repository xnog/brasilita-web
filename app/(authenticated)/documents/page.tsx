"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2, AlertCircle } from "lucide-react";

interface Document {
  key: string;
  name: string;
  size: number;
  lastModified: string;
  folder: string;
  isFolder: boolean;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/documents");

      if (!response.ok) {
        throw new Error("Falha ao carregar documentos");
      }

      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Erro ao carregar documentos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      setDownloadingKey(doc.key);
      const response = await fetch(
        `/api/documents?action=download&key=${encodeURIComponent(doc.key)}`
      );

      if (!response.ok) {
        throw new Error("Falha ao gerar link de download");
      }

      const data = await response.json();
      window.open(data.url, "_blank");
    } catch (err) {
      console.error("Error downloading document:", err);
      alert("Erro ao baixar documento. Tente novamente.");
    } finally {
      setDownloadingKey(null);
    }
  };


  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDisplayPath = (doc: Document): string => {
    if (doc.folder) {
      // Substitui todas as barras por barras com espaços
      const folderWithSpaces = doc.folder.replace(/\//g, ' / ');
      return `${folderWithSpaces} / ${doc.name}`;
    }
    return doc.name;
  };

  // Ordena documentos: primeiro por pasta (alfabético), depois por nome
  const sortedDocuments = [...documents].sort((a, b) => {
    const folderA = a.folder || "";
    const folderB = b.folder || "";
    if (folderA !== folderB) {
      return folderA.localeCompare(folderB);
    }
    return a.name.localeCompare(b.name);
  });

  if (loading) {
    return (
      <div className="container mx-auto container-padding py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto container-padding py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
              <Button
                onClick={fetchDocuments}
                variant="outline"
                className="mt-4"
              >
                Tentar novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto container-padding py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <FileText className="h-8 w-8" />
            Meus Documentos
          </h1>
          <p className="text-muted-foreground">
            Acesse todos os documentos relacionados à sua assessoria de compra de imóvel.
          </p>
        </div>

        {documents.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhum documento disponível
                </h3>
                <p className="text-muted-foreground">
                  Seus documentos aparecerão aqui assim que forem adicionados pela nossa equipe.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Documentos Disponíveis</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {documents.length} {documents.length === 1 ? "documento" : "documentos"}
                </span>
              </CardTitle>
              <CardDescription>
                Clique para baixar seus documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sortedDocuments.map((doc) => (
                  <div
                    key={doc.key}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">
                          {getDisplayPath(doc)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(doc.size)} • {formatDate(doc.lastModified)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        disabled={downloadingKey === doc.key}
                      >
                        {downloadingKey === doc.key ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Baixar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
