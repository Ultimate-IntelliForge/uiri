import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/sections/cta-banner";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/content/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — IntelliForge" },
      { name: "description", content: "Selected work from the IntelliForge studio across AI, web, mobile, cloud and data." },
      { property: "og:title", content: "Projects — IntelliForge" },
      { property: "og:description", content: "A look at recent IntelliForge engagements." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={<>Selected <span className="gradient-text">work.</span></>}
        description="A few of the products we've helped forge across industries. Many more under NDA."
      />

      <Section className="pt-0">
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full gradient-hero shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-glow"
              >
                <div className="absolute inset-0 gradient-hero opacity-25 transition-opacity duration-500 group-hover:opacity-50" />
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(circle at ${20 + (i * 17) % 60}% ${20 + (i * 23) % 60}%, oklch(1 0 0 / 0.35), transparent 50%), radial-gradient(circle at 70% 80%, oklch(0.62 0.23 295 / 0.4), transparent 50%)`,
                  }}
                />
                <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {p.category}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs uppercase tracking-wider text-primary">{p.client}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-white/70">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-accent/40">
                      {p.metric}
                    </span>
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                        {t}
                      </span>
                    ))}
                    <ArrowUpRight className="ml-auto h-4 w-4 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <CTABanner />
    </>
  );
}
