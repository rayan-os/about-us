"use client";

import { SectionLayout } from "@/layouts";
import dynamic from "next/dynamic";
import { IndustryTabs } from "./components";
import { Agents } from "./components/agents";
import { MobileSkeleton } from "./components/mobile-skeleton";
import { MobileProvider } from "./context";
import { use3dAnimation } from "./hooks/use-3d-animation";

const Mobile = dynamic(() => import("./mobile").then((mod) => mod.Mobile), {
  ssr: false,
  loading: () => <MobileSkeleton />,
});

export const MobileSection = () => {
  const { sectionRef } = use3dAnimation();
  return (
    <MobileProvider>
      <SectionLayout>
        <IndustryTabs />
        <div
          className="w-full flex flex-col items-center gap-24 pt-24"
          ref={sectionRef}
        >
          <div className="container mx-auto w-full">
            <div className="flex items-center md:justify-evenly justify-center gap-8 w-full">
              <div className="hidden md:block">
                <Agents />
              </div>

              <Mobile />
            </div>
          </div>
        </div>
      </SectionLayout>
    </MobileProvider>
  );
};
