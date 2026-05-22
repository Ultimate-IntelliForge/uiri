import { z } from 'zod';

export const DeptStatusEnum = z.enum(['ACTIVE', 'ARCHIVED']);
export const VisibilityEnum = z.enum(['PUBLIC', 'PRIVATE']);
export const PubTypeEnum = z.enum(['ARTICLE', 'PROJECT_UPDATE', 'NEWS', 'ANNOUNCEMENT']);
export const PubStatusEnum = z.enum(['DRAFT', 'PENDING', 'PUBLISHED', 'REJECTED']);
export const MemberStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);
// EXTERNAL_PARTY reserved for future partner account support
export const RoleEnum = z.enum([
  'SUPER_ADMIN',
  'DEPT_ADMIN',
  'BLOG_MANAGER',
  'SYSTEM_AUDIT',
  'EXTERNAL_PARTY',
]);
export const UserStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);
export const MediaTypeEnum = z.enum(['IMAGE', 'DOCUMENT']);
export const LinkStatusEnum = z.enum(['ACTIVE', 'USED', 'EXPIRED']);

export type DeptStatus = z.infer<typeof DeptStatusEnum>;
export type Visibility = z.infer<typeof VisibilityEnum>;
export type PubType = z.infer<typeof PubTypeEnum>;
export type PubStatus = z.infer<typeof PubStatusEnum>;
export type MemberStatus = z.infer<typeof MemberStatusEnum>;
export type Role = z.infer<typeof RoleEnum>;
export type UserStatus = z.infer<typeof UserStatusEnum>;
export type MediaType = z.infer<typeof MediaTypeEnum>;
export type LinkStatus = z.infer<typeof LinkStatusEnum>;
