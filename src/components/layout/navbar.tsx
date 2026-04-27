import { Link } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { NAV_LINKS } from "./nav-config";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "glass shadow-elegant"
              : "border border-transparent",
          )}
        >
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-hero shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              Intelli<span className="gradient-text">Forge</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="group relative rounded-xl px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl bg-primary/15 ring-1 ring-primary/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              className="hidden rounded-xl gradient-hero text-primary-foreground shadow-glow hover:opacity-95 sm:inline-flex"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
