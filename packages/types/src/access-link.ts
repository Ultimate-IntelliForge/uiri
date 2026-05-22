import { z } from 'zod';
import { LinkStatusEnum } from './enums.js';

export const AccessLinkSchema = z.object({
  id: z.string(),
  targetId: z.string(),
  targetType: z.enum(['publication', 'page', 'media_asset']),
  token: z.string(),
  createdById: z.string(),
  expiresAt: z.coerce.date(),
  usedAt: z.coerce.date().nullable(),
  status: LinkStatusEnum,
  createdAt: z.coerce.date(),
});

export const CreateAccessLinkSchema = z.object({
  targetId: z.string(),
  targetType: z.enum(['publication', 'page', 'media_asset']),
  expiresInHours: z.number().int().min(1).max(720),
});

export const AccessLinkResponseSchema = AccessLinkSchema.extend({
  accessUrl: z.string().url(),
});

export type AccessLink = z.infer<typeof AccessLinkSchema>;
export type CreateAccessLinkDto = z.infer<typeof CreateAccessLinkSchema>;
export type AccessLinkResponse = z.infer<typeof AccessLinkResponseSchema>;
