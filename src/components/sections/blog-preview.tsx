import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Section } from "@/components/layout/section";
import { BLOG_POSTS } from "@/content/site-data";
import { Button } from "@/components/ui/button";

export function BlogPreview() {
  return (
    <Section>
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">From the forge</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Latest <span className="gradient-text">writing.</span>
          </h2>
        </div>
        <Button asChild variant="outline" className="rounded-2xl">
          <Link to="/blog">All posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {BLOG_POSTS.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <div className="absolute inset-0 gradient-hero opacity-30" />
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at ${20 + i * 20}% 30%, oklch(1 0 0 / 0.4), transparent 50%)`,
                }}
              />
              <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {p.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{p.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{p.readTime}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
