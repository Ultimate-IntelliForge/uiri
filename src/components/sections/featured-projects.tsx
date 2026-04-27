import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PROJECTS } from "@/content/site-data";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  const featured = PROJECTS.slice(0, 4);
  return (
    <Section>
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Selected work</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Projects we're <span className="gradient-text">proud of.</span>
          </h2>
        </div>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link to="/projects">View all projects</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link
              to="/projects"
              className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-glow"
            >
              <div className="absolute inset-0 gradient-hero opacity-25 transition-opacity duration-500 group-hover:opacity-50" />
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, oklch(1 0 0 / 0.3), transparent 50%), radial-gradient(circle at 70% 80%, oklch(0.62 0.23 295 / 0.4), transparent 50%)",
                }}
              />
              <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {p.category}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-xs uppercase tracking-wider text-primary">{p.client}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 max-w-md text-sm text-white/70">{p.summary}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-accent/40">
                    {p.metric}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
