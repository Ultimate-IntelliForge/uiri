import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/sections/cta-banner";
import { FAQS } from "@/content/site-data";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — IntelliForge" },
      { name: "description", content: "Answers to common questions about working with IntelliForge: pricing, process, team, and more." },
      { property: "og:title", content: "FAQ — IntelliForge" },
      { property: "og:description", content: "Common questions about engaging IntelliForge." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={<>Questions, <span className="gradient-text">answered.</span></>}
        description="Everything you might want to know before reaching out. Don't see your question? Just ask."
      />

      <Section className="pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-4 shadow-elegant sm:p-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Section>

      <CTABanner />
    </>
  );
}
