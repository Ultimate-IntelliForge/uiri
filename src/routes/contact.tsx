import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — IntelliForge" },
      { name: "description", content: "Talk to the IntelliForge team about your next AI-powered product. We respond within one business day." },
      { property: "og:title", content: "Contact — IntelliForge" },
      { property: "og:description", content: "Get in touch with IntelliForge." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success("Message received — we'll be in touch within one business day.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's <span className="gradient-text">build.</span></>}
        description="Tell us about your project. We respond within one business day with a thoughtful, honest reply."
      />

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@intelliforge.io" },
              { icon: Phone, label: "Phone", value: "+1 (555) 010-2042" },
              { icon: MapPin, label: "Studio", value: "San Francisco · Remote" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="font-medium">{c.value}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <p className="font-display text-sm font-semibold text-primary">Response time</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We reply to every inquiry within one business day, usually within hours.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Ada Lovelace" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" name="email" type="email" required placeholder="ada@company.com" className="rounded-xl" />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" placeholder="Analytical Engines Co." className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Select name="budget">
                  <SelectTrigger id="budget" className="rounded-xl">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25k-50k">$25K – $50K</SelectItem>
                    <SelectItem value="50k-150k">$50K – $150K</SelectItem>
                    <SelectItem value="150k-500k">$150K – $500K</SelectItem>
                    <SelectItem value="500k+">$500K+</SelectItem>
                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">What do you need help with?</Label>
              <Select name="service">
                <SelectTrigger id="service" className="rounded-xl">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI Engineering</SelectItem>
                  <SelectItem value="web">Web Platforms</SelectItem>
                  <SelectItem value="mobile">Mobile Apps</SelectItem>
                  <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                  <SelectItem value="design">Product Design</SelectItem>
                  <SelectItem value="data">Data & Analytics</SelectItem>
                  <SelectItem value="other">Something else</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Project details</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us what you're building, who it's for, and what success looks like…"
                className="rounded-xl"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full rounded-2xl gradient-hero text-primary-foreground shadow-glow hover:opacity-95"
            >
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
              ) : (
                <>Send message <Send className="ml-2 h-4 w-4" /></>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              We reply within one business day. By submitting, you agree to our privacy policy.
            </p>
          </motion.form>
        </div>
      </Section>
    </>
  );
}
