import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Academy — IntelliForge" },
      { name: "description", content: "Hands-on courses and workshops on AI engineering and product." },
      { property: "og:title", content: "Academy — IntelliForge" },
      { property: "og:description", content: "Learn AI engineering from the IntelliForge team." },
    ],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="Academy"
        title={<>Learn to <span className="gradient-text">forge.</span></>}
        description="Cohort-based programs and self-paced tracks for engineers leveling up into AI."
      />
      <Section className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2">
          {["AI Engineering Foundations", "Production LLM Systems", "Agentic Architectures", "MLOps in Practice"].map((c) => (
            <div key={c} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-glow">
              <p className="text-xs uppercase tracking-wider text-accent">Cohort</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{c}</h3>
              <p className="mt-2 text-sm text-muted-foreground">8 weeks · Live sessions · Build a real product.</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
