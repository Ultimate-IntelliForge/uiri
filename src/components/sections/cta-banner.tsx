import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <Section className="pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-primary/30 bg-secondary p-10 text-center shadow-elegant sm:p-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: "var(--gradient-glow)" }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -inset-px rounded-3xl gradient-hero opacity-20" aria-hidden />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Ready when you are
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-secondary-foreground sm:text-5xl">
            Let's <span className="gradient-text">forge</span> something extraordinary.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-secondary-foreground/70 sm:text-lg">
            Tell us about your project. We'll come back within one business day with a thoughtful response.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-2xl gradient-hero text-primary-foreground shadow-glow hover:opacity-95">
              <Link to="/contact">
                Start a project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl border-white/20 bg-white/5 text-secondary-foreground hover:bg-white/10">
              <Link to="/projects">See our work</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
