import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { NAV_LINKS } from "./nav-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full lg:hidden"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-secondary/70 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[85%] max-w-sm flex-col gap-6 border-l border-border bg-background p-6 shadow-elegant lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-hero">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-display text-lg font-bold">
                    Intelli<span className="gradient-text">Forge</span>
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      to={link.to}
                      activeOptions={{ exact: link.to === "/" }}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        "data-[status=active]:bg-primary/15 data-[status=active]:text-foreground data-[status=active]:ring-1 data-[status=active]:ring-primary/30",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <Button
                  asChild
                  className="w-full rounded-xl gradient-hero text-primary-foreground shadow-glow"
                  onClick={() => setOpen(false)}
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
