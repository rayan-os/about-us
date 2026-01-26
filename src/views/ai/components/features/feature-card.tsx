import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  image: React.ReactNode;
  className?: string;
}

export const FeatureCard = React.forwardRef<HTMLDivElement, Props>(
  ({ title, description, image, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-3xl flex flex-col overflow-hidden", className)}
        {...props}
      >
        <div className="bg-white/5">{image}</div>
        <div className="bg-white/10 flex flex-col py-4 px-6 gap-0">
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-md text-muted-foreground/80">{description}</p>
        </div>
      </div>
    );
  },
);

FeatureCard.displayName = "FeatureCard";
