import { motion } from "framer-motion";
import { Section } from "./section";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <Section className="relative overflow-hidden pt-12 sm:pt-16">
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-[500px]"
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
      </div>
    </Section>
  );
}
