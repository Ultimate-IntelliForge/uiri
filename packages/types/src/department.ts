import { z } from 'zod';
import { DeptStatusEnum } from './enums.js';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const DepartmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase, hyphenated, no leading/trailing dashes'),
  description: z.string().nullable(),
  researchFocus: z.string().nullable(),
  headResearcherName: z.string().nullable(),
  status: DeptStatusEnum,
  accentColor: z.string().nullable(),
  secondaryColor: z.string().nullable(),
  socialAccounts: z.record(z.string()).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateDepartmentSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(3)
    .max(60)
    .regex(slugRegex, 'Slug must be lowercase, hyphenated, no leading/trailing dashes'),
  description: z.string().max(2000).optional(),
  researchFocus: z.string().max(2000).optional(),
  headResearcherName: z.string().max(100).optional(),
  accentColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color e.g. #1E3A8A')
    .optional(),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
});

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial().omit({ slug: true }).extend({
  slug: z.string().min(3).max(60).regex(slugRegex).optional(),
  socialAccounts: z.record(z.string().url()).optional(),
});

export type Department = z.infer<typeof DepartmentSchema>;
export type CreateDepartmentDto = z.infer<typeof CreateDepartmentSchema>;
export type UpdateDepartmentDto = z.infer<typeof UpdateDepartmentSchema>;
