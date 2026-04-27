import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/sections/cta-banner";
import { SERVICES } from "@/content/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — IntelliForge" },
      { name: "description", content: "AI engineering, web platforms, mobile, cloud, design, data & MLOps. End-to-end product engineering services." },
      { property: "og:title", content: "Services — IntelliForge" },
      { property: "og:description", content: "End-to-end AI product engineering services." },
    ],
  }),
  component: ServicesPage,
});

const PROCESS = [
  { step: "01", title: "Discover", desc: "Two-week sprint to align on goals, scope, and success metrics." },
  { step: "02", title: "Design", desc: "Architecture, UX, and a build plan you can take to your board." },
  { step: "03", title: "Build", desc: "Senior engineers shipping in weekly increments with full transparency." },
  { step: "04", title: "Scale", desc: "Launch, monitor, iterate. We stay until you're confidently independent." },
];

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>End-to-end <span className="gradient-text">AI product engineering.</span></>}
        description="From discovery to launch and scale — pick a service or compose them into a full engagement. Senior delivery, every time."
      />

      <Section className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition-all group-hover:bg-accent/15 group-hover:text-accent group-hover:ring-accent/30">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-primary/80">{s.tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">How we work</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A process built for <span className="gradient-text">velocity and trust.</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="font-display text-4xl font-bold text-primary/30">{p.step}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
