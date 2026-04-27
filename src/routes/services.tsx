import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — IntelliForge" },
      { name: "description", content: "AI product engineering, custom LLM platforms, MLOps, design and more." },
      { property: "og:title", content: "Services — IntelliForge" },
      { property: "og:description", content: "End-to-end AI product engineering services." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>End-to-end <span className="gradient-text">AI product engineering.</span></>}
        description="From discovery to launch and scale — pick a service or compose them into a full engagement."
      />
      <Section className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "AI Product Strategy",
            "Custom LLM Platforms",
            "Agentic Workflows",
            "MLOps & Infrastructure",
            "Product Design",
            "Full-Stack Engineering",
          ].map((s) => (
            <div key={s} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-glow">
              <h3 className="font-display text-lg font-semibold">{s}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Production-grade delivery with measurable outcomes from day one.
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
