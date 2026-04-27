import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SERVICES } from "@/content/site-data";
import { Button } from "@/components/ui/button";

export function FeaturedServices() {
  const featured = SERVICES.slice(0, 6);
  return (
    <Section>
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">What we do</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Services <span className="gradient-text">forged for outcomes.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Compose any of our capabilities into a tailored engagement. Every service ships with senior leadership and zero hand-offs.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link to="/services">All services <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-all group-hover:bg-accent/15 group-hover:text-accent group-hover:ring-accent/30">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-primary/80">{s.tagline}</p>
            <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
