import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — IntelliForge" },
      { name: "description", content: "Essays on AI engineering, product craft, and the future of software." },
      { property: "og:title", content: "Blog — IntelliForge" },
      { property: "og:description", content: "Essays from the IntelliForge team." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>Essays from the <span className="gradient-text">forge.</span></>}
        description="Thoughts on AI engineering, product craft, and the future of intelligent software."
      />
      <Section className="pt-0">
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          New writing coming soon. Subscribe via the contact page.
        </div>
      </Section>
    </>
  );
}
