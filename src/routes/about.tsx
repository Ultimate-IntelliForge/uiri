import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — IntelliForge" },
      { name: "description", content: "Meet IntelliForge — engineers, designers and AI researchers crafting intelligent software." },
      { property: "og:title", content: "About — IntelliForge" },
      { property: "og:description", content: "The team and mission behind IntelliForge." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Engineers, designers, <span className="gradient-text">researchers.</span></>}
        description="We're a small, senior team obsessed with building intelligent software that earns its place in people's daily workflows."
      />
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground">
          <p>
            IntelliForge was founded on a simple belief: software should think
            with you, not for you. We combine deep engineering craft with
            applied AI research to ship products that feel inevitable.
          </p>
          <p>
            From early-stage startups to global enterprises, we partner with
            teams that care deeply about quality, velocity, and outcomes —
            then we deliver all three.
          </p>
        </div>
      </Section>
    </>
  );
}
