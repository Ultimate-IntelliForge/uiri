import { z } from 'zod';
import { PubTypeEnum, PubStatusEnum, VisibilityEnum } from './enums.js';

export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string().nullable(),
  bodyContent: z.string().nullable(),
  type: PubTypeEnum,
  slug: z.string(),
  authorId: z.string().nullable(),
  departmentId: z.string(),
  visibility: VisibilityEnum,
  status: PubStatusEnum,
  rejectionReason: z.string().nullable(),
  submittedAt: z.coerce.date().nullable(),
  publishedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreatePublicationSchema = z.object({
  title: z.string().min(3).max(200),
  summary: z.string().max(500).optional(),
  slug: z.string().min(3).max(200),
  bodyContent: z.string().optional(),
  type: PubTypeEnum.default('ARTICLE'),
  visibility: VisibilityEnum.default('PUBLIC'),
  authorId: z.string().optional(),
  departmentId: z.string(),
  attachmentIds: z.array(z.string()).optional(),
});

export const UpdatePublicationSchema = CreatePublicationSchema.partial().omit({ departmentId: true });

export const RejectPublicationSchema = z.object({
  reason: z.string().min(10, 'Please provide a meaningful rejection reason').max(1000),
});

export type Publication = z.infer<typeof PublicationSchema>;
export type CreatePublicationDto = z.infer<typeof CreatePublicationSchema>;
export type UpdatePublicationDto = z.infer<typeof UpdatePublicationSchema>;
export type RejectPublicationDto = z.infer<typeof RejectPublicationSchema>;
