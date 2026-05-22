import { z } from 'zod';
import { MediaTypeEnum } from './enums.js';

export const MediaAssetSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  fileType: MediaTypeEnum,
  storageUrl: z.string().url(),
  downloadUrl: z.string().url().nullable(),
  storageProviderRef: z.string(),
  uploadedById: z.string(),
  departmentId: z.string().nullable(),
  uploadedAt: z.coerce.date(),
});

export const UploadResponseSchema = MediaAssetSchema;

export type MediaAsset = z.infer<typeof MediaAssetSchema>;
export type UploadResponse = z.infer<typeof UploadResponseSchema>;
