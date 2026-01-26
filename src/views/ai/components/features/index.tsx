"use client";

import { AnimatedBeamDemo } from "@/components/views/animated-beam";
import { SectionLayout } from "@/layouts";
import { FraudDetectionVisual } from "@/views/ai/components/features/fraud-detection-visual";
import { useHover } from "@uidotdev/usehooks";
import Image from "next/image";
import { DocumentAnalysis } from "./document-analysis";
import { FeatureCard } from "./feature-card";
import { MultiLingual } from "./multi-lingual";
import { RequirementChecker } from "./requirement-checker";

export const FeaturesSection = () => {
  const [fraudCardRef, fraudCardHovered] = useHover();
  return (
    <SectionLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full container mx-auto">
        <FeatureCard
          title="AI interviewer"
          description="Real-time video interviews and assessments"
          image={
            <div className="w-full h-117 group overflow-hidden">
              <Image
                src="/assets_ai/images/ella.png"
                alt="jackie"
                width={100}
                height={100}
                className="w-full h-full object-top object-cover transition-transform duration-800 ease-in-out group-hover:scale-105"
                priority
              />
            </div>
          }
        />
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            <FeatureCard
              title="Multilingual"
              description="Support for 40+ languages"
              image={<MultiLingual />}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                title="Document analysis"
                description="Extract, analyze, verify"
                image={<DocumentAnalysis />}
              />
              <FeatureCard
                title="Fraud detection"
                description="Catch fraudulent documents and applications"
                ref={fraudCardRef}
                image={
                  <div className="relative h-46 w-full overflow-hidden">
                    <FraudDetectionVisual
                      isActive={fraudCardHovered}
                      className="absolute inset-0"
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full container mx-auto">
        <FeatureCard
          title="Requirement checker"
          description="Check eligibility for complex programs"
          image={<RequirementChecker />}
        />
        <FeatureCard
          title="Opportunity matching"
          description="AI-based opportunity and program matching engine"
          image={<AnimatedBeamDemo />}
        />
      </div>
    </SectionLayout>
  );
};
