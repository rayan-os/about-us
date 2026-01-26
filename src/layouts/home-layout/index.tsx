"use client";

import PassageLogo from "@/components/ui/passage-logo";
import { ShiningText } from "@/components/ui/shining-text";
import { useState } from "react";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="bg-black w-full px-3 max-w-[1920px] mx-auto">
      <main>
        <div className="py-3 flex flex-col md:flex-row items-center justify-between mb-4 md:mb-0 ps-4">
          <div 
            className="w-[95px] h-[59px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <PassageLogo hovered={isHovered} />
          </div>

          <ShiningText
            text="Providing access to life-changing opportunities"
            className="text-sm md:text-lg text-center select-none"
          />

          <div />
        </div>

        <div className="w-full">{children}</div>
      </main>
    </div>
  );
};
