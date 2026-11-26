import "server-only";
import { getStorage } from "firebase-admin/storage";
import { getFirebaseAdminApp } from "@/lib/firebase/admin";
import type { SchoolId } from "@/lib/types/school";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
const ALLOWED_DOC_TYPES = new Set(["application/pdf"]);

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10 MB

export interface UploadResult {
  url: string;
  storagePath: string;
  contentType: string;
  sizeBytes: number;
}

export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  );
}

export function validateUploadFile(
  fileName: string,
  contentType: string,
  sizeBytes: number
): { kind: "image" | "pdf"; sanitizedName: string } {
  const isImage = ALLOWED_IMAGE_TYPES.has(contentType);
  const isPdf = ALLOWED_DOC_TYPES.has(contentType);

  if (!isImage && !isPdf) {
    throw new Error("Unsupported file type. Allowed: JPEG, PNG, WebP, AVIF, PDF.");
  }
  if (isImage && sizeBytes > MAX_IMAGE_BYTES) {
    throw new Error("Image exceeds maximum size of 5 MB.");
  }
  if (isPdf && sizeBytes > MAX_PDF_BYTES) {
    throw new Error("PDF exceeds maximum size of 10 MB.");
  }

  const sanitizedName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    kind: isImage ? "image" : "pdf",
    sanitizedName: sanitizedName || `upload-${Date.now()}`,
  };
}

/**
 * Replaceable media-storage adapter.
 * Stores public school assets under `schools/{schoolId}/public/{folder}/{timestamp}-{name}`
 * in Firebase Storage when configured.
 */
export async function uploadSchoolMedia(params: {
  schoolId: SchoolId;
  folder: "images" | "documents" | "logos";
  fileName: string;
  contentType: string;
  buffer: Buffer;
}): Promise<UploadResult> {
  if (!isStorageConfigured()) {
    throw new Error(
      "Firebase Storage bucket is not configured. Set FIREBASE_STORAGE_BUCKET or provide a direct asset URL."
    );
  }

  const { sanitizedName } = validateUploadFile(
    params.fileName,
    params.contentType,
    params.buffer.byteLength
  );

  const bucketName =
    process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const app = getFirebaseAdminApp();
  const bucket = getStorage(app).bucket(bucketName);
  const storagePath = `schools/${params.schoolId}/public/${params.folder}/${Date.now()}-${sanitizedName}`;
  const file = bucket.file(storagePath);

  await file.save(params.buffer, {
    contentType: params.contentType,
    metadata: {
      cacheControl: "public, max-age=31536000",
      metadata: {
        schoolId: params.schoolId,
      },
    },
  });

  await file.makePublic();
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;

  return {
    url: publicUrl,
    storagePath,
    contentType: params.contentType,
    sizeBytes: params.buffer.byteLength,
  };
}
