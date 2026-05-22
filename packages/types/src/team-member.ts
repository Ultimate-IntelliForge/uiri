import { z } from 'zod';
import { MemberStatusEnum } from './enums.js';

const ALLOWED_PUBLIC_FIELDS = ['fullName', 'jobTitle', 'publicBio', 'profilePhotoUrl'] as const;

export const PublicTeamMemberSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  jobTitle: z.string().nullable(),
  publicBio: z.string().nullable(),
  profilePhotoUrl: z.string().url().nullable(),
});

export const TeamMemberSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  jobTitle: z.string().nullable(),
  departmentId: z.string(),
  biography: z.string().nullable(),
  publicBio: z.string().nullable(),
  profilePhotoUrl: z.string().url().nullable(),
  publicFields: z.array(z.enum(ALLOWED_PUBLIC_FIELDS)),
  status: MemberStatusEnum,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateTeamMemberSchema = z.object({
  fullName: z.string().min(2).max(100),
  jobTitle: z.string().max(100).optional(),
  departmentId: z.string(),
  biography: z.string().max(5000).optional(),
  publicBio: z.string().max(1000).optional(),
  profilePhotoUrl: z.string().url().optional(),
  publicFields: z
    .array(z.enum(ALLOWED_PUBLIC_FIELDS))
    .default(['fullName', 'jobTitle']),
  personalContact: z.string().max(200).optional(),
  internalNotes: z.string().max(2000).optional(),
});

export const UpdateTeamMemberSchema = CreateTeamMemberSchema.partial().omit({ departmentId: true });

export type PublicTeamMember = z.infer<typeof PublicTeamMemberSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type CreateTeamMemberDto = z.infer<typeof CreateTeamMemberSchema>;
export type UpdateTeamMemberDto = z.infer<typeof UpdateTeamMemberSchema>;
