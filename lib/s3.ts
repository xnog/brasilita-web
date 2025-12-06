import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.S3_BUCKET_NAME!;

export interface S3Document {
  key: string;
  name: string;
  size: number;
  lastModified: Date;
  folder: string;
  isFolder: boolean;
}

export async function listUserDocuments(userEmail: string): Promise<S3Document[]> {
  const prefix = `${userEmail}/`;

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
      return [];
    }

    const documents: S3Document[] = response.Contents
      .filter((item) => item.Key !== prefix && item.Size && item.Size > 0) // Ignora a pasta raiz e pastas vazias
      .map((item) => {
        const key = item.Key!;
        const relativePath = key.replace(prefix, "");
        const parts = relativePath.split("/");
        const name = parts[parts.length - 1];
        const folder = parts.length > 1 ? parts.slice(0, -1).join("/") : "";

        return {
          key,
          name,
          size: item.Size || 0,
          lastModified: item.LastModified || new Date(),
          folder,
          isFolder: false,
        };
      });

    return documents;
  } catch (error) {
    console.error("Error listing S3 documents:", error);
    throw new Error("Falha ao listar documentos");
  }
}

export async function getDocumentDownloadUrl(
  key: string,
  userEmail: string
): Promise<string> {
  // Validação de segurança: garantir que o usuário só acesse seus próprios documentos
  if (!key.startsWith(`${userEmail}/`)) {
    throw new Error("Acesso negado");
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    // URL expira em 10 minutos (600 segundos)
    const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });
    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Falha ao gerar URL de download");
  }
}
