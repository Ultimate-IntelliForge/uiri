import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — IntelliForge" },
      { name: "description", content: "Selected work from the IntelliForge studio." },
      { property: "og:title", content: "Projects — IntelliForge" },
      { property: "og:description", content: "A look at recent IntelliForge engagements." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={<>Selected <span className="gradient-text">work.</span></>}
        description="A few of the products we've helped forge. Many more under NDA."
      />
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-glow"
            >
              <div className="absolute inset-0 gradient-hero opacity-20 transition-opacity group-hover:opacity-40" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-wider text-primary">Case Study</p>
                <h3 className="mt-1 font-display text-xl font-semibold">Project {i}</h3>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
