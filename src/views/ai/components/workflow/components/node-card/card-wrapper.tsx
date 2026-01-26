import { cn } from "@/lib/utils";
import React from "react";

export const CardWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "py-2 px-6 pr-10 bg-[#1a1919] rounded-lg shadow-lg text-white flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};
