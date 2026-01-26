import { SliderData } from "@/components/ui/slider/types";

export type Section = {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
  hoverEnabled?: boolean;
  onClick?: () => void;
  navigateTo?: string;
};

export interface InternationalStudentsProps {
  data?: SliderData[];
  autoSlide?: boolean;
  slideInterval?: number;
}
