"use client";

import { Slider } from "@/components/ui/slider";
import { PASSAGE_INTERNATIONAL_STUDENTS_URL } from "@/constants";
import { programs } from "../constants";
import { InternationalStudentsProps } from "../types";
import { SectionCard } from "./section-card";

export const InternationalStudents = ({
  data = programs,
  autoSlide = true,
  slideInterval = 4000,
}: InternationalStudentsProps) => {
  return (
    <div className="h-full select-none *:select-none">
      <SectionCard
        title="International students pathway"
        description="Opportunity & financing for the most ambitious international students"
        onClick={() => {
          window.open(PASSAGE_INTERNATIONAL_STUDENTS_URL, "_blank");
        }}
        className="min-h-[650px]"
      >
        <Slider
          data={data}
          autoSlide={autoSlide}
          slideInterval={slideInterval}
        />
      </SectionCard>
    </div>
  );
};
