"use client";

import scrollAnimationData from "@/assets/lottie/scroll.json";
import { BoxReveal } from "@/components/ui/box-reveal";
import { NoiseFilter } from "@/components/ui/noise-filter";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import { motion } from "motion/react";
import { FlickeringGrid } from "./flickering-grid";
import { HeroGradient } from "./hero-gradient";
import { HeroTextMotion } from "./hero-text-motion";

const AiPoweredApplicationProcessing = ({
  hideTitleOnMobile,
}: {
  hideTitleOnMobile?: boolean;
}) => {
  // const [ref, isHovered] = useHover();
  // const [shouldAutoplay, setShouldAutoplay] = useState(false);

  // useEffect(() => {
  //   // Add 1 second delay before enabling autoplay
  //   const timer = setTimeout(() => {
  //     setShouldAutoplay(true);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div
      className={cn(
        "flex flex-col scale-75 origin-left md:scale-100 gap-2",
        hideTitleOnMobile && "opacity-0 md:opacity-100",
      )}
      // ref={ref}
    >
      {/* <BoxReveal duration={0.5} boxColor="#BCBCBC">
        <div className="flex items-center gap-1">
          <h2 className={cn("text-3xl leading-none font-major")}>AI-POWERED</h2>
          <Lottie
            animationData={aiAnimationData}
            loop={isHovered}
            autoplay={shouldAutoplay}
            className="size-12"
          />
        </div>
      </BoxReveal> */}
      <div className="lg:flex flex-col gap-0 hidden">
        <BoxReveal duration={0.5} boxColor="#FFFFFF">
          <h2 className={cn("text-4xl font-light tracking-[-0.04em] w-full  ")}>
            <span className="text-4xl font-semibold tracking-normal">
              The AI application processor
            </span>
          </h2>
        </BoxReveal>
        <br />
        <BoxReveal duration={0.5} boxColor="#FFFFFF70" className=" -mt-3 ">
          <p
            className="text-2xl tracking-normal opacity-70 block lg:max-w-3xl"
            style={{
              lineHeight: "1.1em",
            }}
          >
            We use AI to process everything from school admissions to loan
            applications to job matching.
          </p>
        </BoxReveal>
      </div>
    </div>
  );
};

export function HeroSection({
  customContainer,
  hideTitleOnMobile,
}: {
  customContainer?: boolean;
  hideTitleOnMobile?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-hero-background relative overflow-hidden select-none px-4",
        customContainer && "h-full",
        !customContainer && "h-dvh",
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
        className="absolute hidden sm:block bottom-4 left-1/2 -translate-x-1/2 w-12 h-fit"
      >
        <Lottie animationData={scrollAnimationData} loop={true} />
      </motion.div>
      <div className="absolute top-0 right-0 w-full h-full opacity-5">
        <FlickeringGrid color="#ffffff" />
      </div>
      <NoiseFilter
        className="z-10 rounded-2xl overflow-hidden"
        customContainer={customContainer}
      />
      <HeroGradient customContainer={customContainer} />
      <div
        className={cn(
          "relative z-20 container mx-auto h-full flex flex-col justify-center items-start gap-14 xl:gap-32 pt:28 xl:pt-32",
          hideTitleOnMobile && "pb-10",
        )}
      >
        {/* <NumbersAnimation /> */}
        <AiPoweredApplicationProcessing hideTitleOnMobile={hideTitleOnMobile} />
        <HeroTextMotion customContainer={customContainer} />
      </div>
    </div>
  );
}
