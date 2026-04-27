import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Cpu, Rocket, Shield, Sparkles, Zap } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IntelliForge — AI-Powered Software, Forged for Scale" },
      {
        name: "description",
        content:
          "We design, engineer and scale AI-powered products. Premium software studio for ambitious teams.",
      },
      { property: "og:title", content: "IntelliForge — AI-Powered Software, Forged for Scale" },
      {
        property: "og:description",
        content: "Premium AI software studio building intelligent products for ambitious teams.",
      },
    ],
  }),
  component: HomePage,
});

const FEATURES = [
  { icon: Brain, title: "AI-First Engineering", desc: "LLMs, agents and ML pipelines woven into every layer of the product." },
  { icon: Zap, title: "Lightning Performance", desc: "Edge-ready architectures that scale gracefully from zero to millions." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC2-aligned practices, zero-trust by default, audited end-to-end." },
  { icon: Cpu, title: "Hybrid Cloud", desc: "Multi-cloud and on-prem deployments with one unified control plane." },
  { icon: Rocket, title: "Velocity by Design", desc: "Ship in weeks, not quarters. Modular systems, ruthless DX." },
  { icon: Sparkles, title: "Crafted Experience", desc: "Interfaces users love — measured in retention, not impressions." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <Section className="relative overflow-hidden pt-12 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 h-[600px]"
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
            IntelliForge is a premium engineering studio building intelligent
            products that move markets — from concept, to launch, to scale.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="rounded-2xl gradient-hero text-primary-foreground shadow-glow hover:opacity-95"
            >
              <Link to="/contact">
                Start a project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl">
              <Link to="/services">Explore services</Link>
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-all group-hover:bg-accent/15 group-hover:text-accent group-hover:ring-accent/30">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
