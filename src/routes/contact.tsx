import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — IntelliForge" },
      { name: "description", content: "Talk to the IntelliForge team about your next AI-powered product." },
      { property: "og:title", content: "Contact — IntelliForge" },
      { property: "og:description", content: "Get in touch with IntelliForge." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's <span className="gradient-text">build.</span></>}
        description="Tell us about your project. We respond within one business day."
      />
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-5">
            {[
              { icon: Mail, label: "Email", value: "hello@intelliforge.io" },
              { icon: Phone, label: "Phone", value: "+1 (555) 010-2042" },
              { icon: MapPin, label: "Studio", value: "San Francisco · Remote" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Ada Lovelace" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ada@company.com" className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Analytical Engines Co." className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Project details</Label>
              <Textarea id="message" rows={5} placeholder="Tell us what you're building…" className="rounded-xl" />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-2xl gradient-hero text-primary-foreground shadow-glow hover:opacity-95">
              Send message
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
}
