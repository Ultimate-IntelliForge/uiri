export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/academy", label: "Academy" },
  { to: "/contact", label: "Contact" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
