import { z } from 'zod';
import { RoleEnum, UserStatusEnum } from './enums.js';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.array(RoleEnum),
  departmentId: z.string().nullable(),
  status: UserStatusEnum,
  lastLoginAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  role: z.array(RoleEnum).min(1),
  departmentId: z.string().nullable().optional(),
}).refine(
  (data) => {
    const needsDept = data.role.some((r) =>
      ['DEPT_ADMIN', 'BLOG_MANAGER', 'SYSTEM_AUDIT'].includes(r),
    );
    const isSuperOnly =
      data.role.every((r) => r === 'SUPER_ADMIN') || data.role.includes('EXTERNAL_PARTY');
    if (needsDept && !isSuperOnly && !data.departmentId) return false;
    return true;
  },
  { message: 'departmentId is required for DEPT_ADMIN, BLOG_MANAGER, and SYSTEM_AUDIT roles' },
);

export const UpdateUserSchema = z.object({
  role: z.array(RoleEnum).min(1).optional(),
  departmentId: z.string().nullable().optional(),
  status: UserStatusEnum.optional(),
});

export type User = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
