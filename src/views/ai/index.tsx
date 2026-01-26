"use client";

import { MainLayout } from "@/layouts";
import dynamic from "next/dynamic";
import { HeroSection, MobileSection, WorkFlow } from "./components";

const FeaturesSection = dynamic(
  () =>
    import("./components/features").then((mod) => ({
      default: mod.FeaturesSection,
    })),
  {
    ssr: false,
  }
);

const ExamplesSection = dynamic(
  () =>
    import("./components/examples").then((mod) => ({
      default: mod.ExamplesSection,
    })),
  {
    ssr: false,
  }
);

export const AIPage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <MobileSection />
      <FeaturesSection />
      <WorkFlow />
      <ExamplesSection />
    </MainLayout>
  );
};
