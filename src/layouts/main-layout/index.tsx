"use client";

import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <div className={cn("bg-black w-full max-w-[1920px] mx-auto", className)}>
      <main>{children}</main>
    </div>
  );
};
