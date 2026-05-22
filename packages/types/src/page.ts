import { z } from 'zod';
import { VisibilityEnum } from './enums.js';

export const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  bodyContent: z.string().nullable(),
  visibility: VisibilityEnum,
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  departmentId: z.string().nullable(),
  publishedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreatePageSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  bodyContent: z.string().optional(),
  visibility: VisibilityEnum.default('PUBLIC'),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  departmentId: z.string().optional(),
});

export const UpdatePageSchema = CreatePageSchema.partial();

export const SetVisibilitySchema = z.object({
  visibility: VisibilityEnum,
});

export type Page = z.infer<typeof PageSchema>;
export type CreatePageDto = z.infer<typeof CreatePageSchema>;
export type UpdatePageDto = z.infer<typeof UpdatePageSchema>;
export type SetVisibilityDto = z.infer<typeof SetVisibilitySchema>;
