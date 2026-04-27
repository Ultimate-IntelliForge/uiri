import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Sparkles, Mail } from "lucide-react";
import { Container } from "./container";
import { NAV_LINKS } from "./nav-config";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-secondary text-secondary-foreground">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--gradient-hero)" }}
      />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero shadow-glow">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">
                Intelli<span className="gradient-text">Forge</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-secondary-foreground/70">
              Forging the next generation of intelligent software. We design,
              engineer, and scale AI-powered products for ambitious teams.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-secondary-foreground/80 transition-all hover:border-primary/40 hover:bg-primary/15 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-secondary-foreground/60">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[...NAV_LINKS, { to: "/testimonials", label: "Testimonials" } as const, { to: "/faq", label: "FAQ" } as const].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-secondary-foreground/75 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-secondary-foreground/60">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-secondary-foreground/75">
              <li>hello@intelliforge.io</li>
              <li>+1 (555) 010-2042</li>
              <li>San Francisco · Remote</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-secondary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} IntelliForge. All rights reserved.</p>
          <p>Crafted with precision and a touch of neon.</p>
        </div>
      </Container>
    </footer>
  );
}
