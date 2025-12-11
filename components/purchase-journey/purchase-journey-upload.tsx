"use client";

import { useState, useRef } from "react";
import { PurchaseJourneyStep, PurchaseJourneyUpload } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X, Loader2 } from "lucide-react";
import Link from "next/link";

interface PurchaseJourneyUploadComponentProps {
    step: PurchaseJourneyStep & {
        uploads: PurchaseJourneyUpload[];
    };
    journeyId: string;
    onUploadComplete: () => void;
}

export function PurchaseJourneyUploadComponent({
    step,
    journeyId,
    onUploadComplete,
}: PurchaseJourneyUploadComponentProps) {
    const [uploading, setUploading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validações
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert(`Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`);
            return;
        }

        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Tipo de arquivo não permitido. Use PDF, JPG, PNG ou DOC/DOCX");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("stepNumber", step.stepNumber.toString());

            const response = await fetch(`/api/purchase-journey/${journeyId}/uploads`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Erro ao fazer upload");
            }

            onUploadComplete();
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error: any) {
            alert(error.message || "Erro ao fazer upload do arquivo");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (uploadId: string) => {
        if (!confirm("Tem certeza que deseja excluir este arquivo?")) return;

        setDeletingId(uploadId);
        try {
            const response = await fetch(
                `/api/purchase-journey/${journeyId}/uploads/${uploadId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao excluir arquivo");
            }

            onUploadComplete();
        } catch (error: any) {
            alert(error.message || "Erro ao excluir arquivo");
        } finally {
            setDeletingId(null);
        }
    };

    const formatFileSize = (bytes: number | null) => {
        if (!bytes) return "N/A";
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    };

    return (
        <div className="space-y-3">
            {/* Lista de arquivos */}
            {step.uploads && step.uploads.length > 0 && (
                <div className="space-y-2">
                    {step.uploads.map((upload) => (
                        <div
                            key={upload.id}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <FileText className="h-5 w-5 text-slate-500 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <Link
                                        href={upload.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-slate-900 hover:text-emerald-600 truncate block"
                                    >
                                        {upload.fileName}
                                    </Link>
                                    <p className="text-xs text-slate-500">
                                        {formatFileSize(upload.fileSize)}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(upload.id)}
                                disabled={deletingId === upload.id}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                {deletingId === upload.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <X className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Botão de upload */}
            <div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading}
                />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Upload className="h-4 w-4 mr-2" />
                            {step.uploads && step.uploads.length > 0
                                ? "Adicionar Outro Arquivo"
                                : "Enviar Arquivo"}
                        </>
                    )}
                </Button>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                    PDF, JPG, PNG ou DOC/DOCX (máx. 10MB)
                </p>
            </div>
        </div>
    );
}

