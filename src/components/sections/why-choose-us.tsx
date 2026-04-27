import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { WHY_US } from "@/content/site-data";

export function WhyChooseUs() {
  return (
    <Section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[400px] -translate-y-1/2 opacity-40"
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden
      />
      <div className="relative mx-auto mb-14 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Why IntelliForge</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Built different. <span className="gradient-text">On purpose.</span>
        </h2>
      </div>

      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_US.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all hover:border-primary/40 hover:shadow-glow"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{w.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
