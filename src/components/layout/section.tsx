import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
  bare?: boolean;
}

export function Section({
  className,
  children,
  containerClassName,
  bare = false,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
