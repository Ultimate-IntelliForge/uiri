import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl gradient-hero px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0F172A" },
      { title: "IntelliForge — AI-Powered Software, Forged for Scale" },
      {
        name: "description",
        content:
          "IntelliForge designs, engineers and scales AI-powered products for ambitious teams. Premium software, intelligent by default.",
      },
      { name: "author", content: "IntelliForge" },
      { property: "og:title", content: "IntelliForge — AI-Powered Software, Forged for Scale" },
      {
        property: "og:description",
        content: "Premium AI software studio building intelligent products for ambitious teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@intelliforge" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
