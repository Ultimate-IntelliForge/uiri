import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/sections/hero-section";
import { CompanyIntro } from "@/components/sections/company-intro";
import { FeaturedServices } from "@/components/sections/featured-services";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsPreview } from "@/components/sections/testimonials-preview";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CTABanner } from "@/components/sections/cta-banner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IntelliForge — AI-Powered Software, Forged for Scale" },
      {
        name: "description",
        content: "Premium software engineering studio building intelligent products for ambitious teams. AI, web, mobile, cloud — forged for scale.",
      },
      { property: "og:title", content: "IntelliForge — AI-Powered Software, Forged for Scale" },
      { property: "og:description", content: "Premium AI software studio building intelligent products for ambitious teams." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <CompanyIntro />
      <FeaturedServices />
      <FeaturedProjects />
      <WhyChooseUs />
      <TestimonialsPreview />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
