import { z } from 'zod';
import { RoleEnum } from './enums.js';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.array(RoleEnum),
  departmentId: z.string().nullable(),
});

export const AuthResponseSchema = z.object({
  user: AuthUserSchema,
});

export type LoginDto = z.infer<typeof LoginSchema>;
export type AuthUser = z.infer<typeof AuthUserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
