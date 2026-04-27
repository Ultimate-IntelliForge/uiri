import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { STATS } from "@/content/site-data";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden pb-12 pt-12 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-[700px]"
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Now forging the next AI era
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          AI-powered software, <br className="hidden sm:block" />
          <span className="gradient-text">forged for scale.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          IntelliForge is a premium engineering studio building intelligent products
          that move markets — from concept to launch to global scale.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="rounded-2xl gradient-hero text-primary-foreground shadow-glow hover:opacity-95">
            <Link to="/contact">
              Start a project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-2xl">
            <Link to="/projects">
              <Play className="mr-2 h-4 w-4" /> See our work
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
              <div className="font-display text-2xl font-bold gradient-text sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
