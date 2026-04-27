import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Section } from "@/components/layout/section";
import { TESTIMONIALS } from "@/content/site-data";

export function TestimonialsPreview() {
  const items = TESTIMONIALS.slice(0, 3);
  return (
    <Section>
      <div className="mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Loved by teams</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          What our <span className="gradient-text">clients say.</span>
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex flex-col rounded-2xl border border-border bg-card p-7 shadow-elegant"
          >
            <Quote className="h-7 w-7 text-primary/60" />
            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-4">
              <div className="font-display text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
