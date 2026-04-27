import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";

export function CompanyIntro() {
  return (
    <Section className="py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Who we are</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            A premium studio for <span className="gradient-text">intelligent software.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            IntelliForge is where senior engineers, designers, and AI researchers ship
            products that earn their place in people's daily workflows. We've built
            platforms for Fortune 500s, scaled startups to unicorn status, and put
            AI in the hands of millions.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            No juniors. No bloat. Just craft, velocity, and the kind of partnership
            that compounds over years.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl gradient-hero opacity-20 blur-2xl" aria-hidden />
          <div className="relative grid grid-cols-2 gap-4">
            {[
              { v: "2018", l: "Founded" },
              { v: "12", l: "Countries" },
              { v: "40+", l: "Engineers" },
              { v: "120+", l: "Products" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-6 shadow-elegant">
                <div className="font-display text-3xl font-bold gradient-text">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
