import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DiagramSectionProps = {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

export function DiagramSection({
  title,
  description,
  className,
  children,
}: DiagramSectionProps) {
  return (
    <section className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 md:p-8">
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h2 className="text-base font-medium text-white/90">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-white/50">{description}</p>
            )}
          </div>
        )}
        <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a]">
          {children}
        </div>
      </div>
    </section>
  );
}
