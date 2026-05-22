import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "de", "es", "pt", "ar", "zh", "ja", "ko", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
