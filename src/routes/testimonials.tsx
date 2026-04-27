import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/sections/cta-banner";
import { TESTIMONIALS } from "@/content/site-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — IntelliForge" },
      { name: "description", content: "What founders, CTOs and product leaders say about working with IntelliForge." },
      { property: "og:title", content: "Testimonials — IntelliForge" },
      { property: "og:description", content: "Stories from the teams we've partnered with." },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [index, setIndex] = useState(0);
  const featured = TESTIMONIALS[index];
  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title={<>Words from the teams we've <span className="gradient-text">forged with.</span></>}
        description="Founders, CTOs and product leaders on what it's like to ship with IntelliForge."
      />

      <Section className="pt-0">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elegant sm:p-14">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[140%] -translate-x-1/2 opacity-50"
            style={{ background: "var(--gradient-glow)" }}
            aria-hidden
          />
          <Quote className="relative h-10 w-10 text-primary/40" />
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative mt-6"
            >
              <p className="font-display text-2xl font-medium leading-relaxed text-foreground/95 sm:text-3xl">
                "{featured.quote}"
              </p>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-semibold">{featured.name}</div>
                  <div className="text-sm text-muted-foreground">{featured.role} · {featured.company}</div>
                </div>
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative mt-10 flex items-center justify-between">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-muted hover:bg-muted-foreground/40"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prev} aria-label="Previous" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={next} aria-label="Next" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">More stories</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by teams of <span className="gradient-text">every size.</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-glow"
            >
              <Quote className="h-6 w-6 text-primary/50" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <div className="font-display text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
