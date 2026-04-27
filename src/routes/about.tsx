import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Compass, Heart, Shield, Sparkles, Users } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { STATS } from "@/content/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — IntelliForge" },
      { name: "description", content: "Meet IntelliForge — engineers, designers and AI researchers crafting intelligent software for ambitious teams." },
      { property: "og:title", content: "About — IntelliForge" },
      { property: "og:description", content: "The team and mission behind IntelliForge." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Sparkles, title: "Craft over hustle", desc: "We measure ourselves by the quality of what we ship, not the hours we burn." },
  { icon: Heart, title: "Partnership, not vendorship", desc: "We win when our clients win — long after the engagement ends." },
  { icon: Shield, title: "Honest by default", desc: "Hard truths over comfortable timelines. Always." },
  { icon: Compass, title: "Curious forever", desc: "The best work comes from teams that never stop learning." },
  { icon: Users, title: "Senior-only teams", desc: "No juniors hiding behind PMs. The people who pitch you build for you." },
];

const TIMELINE = [
  { year: "2018", title: "IntelliForge founded", desc: "Started in San Francisco with three engineers and a manifesto." },
  { year: "2020", title: "First Fortune 500 client", desc: "Shipped a platform now used by 80,000 daily users." },
  { year: "2022", title: "AI practice launches", desc: "Built our first production LLM systems before it was cool." },
  { year: "2024", title: "Global team", desc: "40+ senior engineers across 12 countries, fully remote-first." },
  { year: "2026", title: "$2.4B in client value", desc: "Now powering 120+ products from seed-stage to public companies." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Engineers, designers, <span className="gradient-text">researchers.</span></>}
        description="A small, senior team obsessed with building intelligent software that earns its place in people's daily workflows."
      />

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our mission</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Software should think <span className="gradient-text">with you.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              IntelliForge was founded on a simple belief: every product gets better when intelligence is built in from day one — not bolted on later.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We combine deep engineering craft with applied AI research to ship products that feel inevitable. Our partners ship faster, scale further, and sleep better.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
                <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our values</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Five things we <span className="gradient-text">won't compromise on.</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-glow"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our journey</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From three engineers to a <span className="gradient-text">global studio.</span>
          </h2>
        </div>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent sm:left-1/2" />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative pl-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0 ${i % 2 === 0 ? "" : "sm:[&>div:first-child]:order-2"}`}
              >
                <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background sm:left-1/2 sm:-translate-x-1/2" />
                <div className={`sm:text-right ${i % 2 === 1 ? "sm:text-left" : ""}`}>
                  <div className="font-display text-2xl font-bold gradient-text">{t.year}</div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex justify-center">
          <Button asChild variant="outline" className="rounded-2xl">
            <Link to="/contact">Work with us</Link>
          </Button>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
