import { cn } from "@/lib/utils";

interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLayout = ({ children, className }: SectionLayoutProps) => {
  return (
    <section className={cn("flex flex-col gap-4 py-8", className)}>
      {children}
    </section>
  );
};
