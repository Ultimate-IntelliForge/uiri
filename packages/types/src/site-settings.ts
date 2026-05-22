import { z } from 'zod';

export const SiteSettingsSchema = z.object({
  id: z.string(),
  instituteName: z.string(),
  tagline: z.string().nullable(),
  contactEmail: z.string().email().nullable(),
  contactPhone: z.string().nullable(),
  address: z.string().nullable(),
  globalSocialLinks: z.record(z.string().url()).nullable(),
  googleAnalyticsId: z.string().nullable(),
  searchConsoleVerifyToken: z.string().nullable(),
  homepageFeaturedDeptIds: z.array(z.string()),
  homepageFeaturedPubIds: z.array(z.string()),
  updatedAt: z.coerce.date(),
});

export const UpdateSiteSettingsSchema = SiteSettingsSchema.omit({
  id: true,
  updatedAt: true,
}).partial();

// Public shape — strips analytics keys
export const PublicSiteSettingsSchema = SiteSettingsSchema.omit({
  googleAnalyticsId: true,
  searchConsoleVerifyToken: true,
  homepageFeaturedDeptIds: true,
  homepageFeaturedPubIds: true,
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
export type UpdateSiteSettingsDto = z.infer<typeof UpdateSiteSettingsSchema>;
export type PublicSiteSettings = z.infer<typeof PublicSiteSettingsSchema>;
