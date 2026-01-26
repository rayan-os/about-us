"use client";

import { Button } from "@/components/ui/button";
import PassageLogo from "@/components/ui/passage-logo";
import { cn } from "@/lib/utils";
import { useHover } from "@uidotdev/usehooks";
import { motion, useScroll, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Navigation = () => {
  const [ref, hovered] = useHover();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const bgColor = useTransform(scrollY, [0, 800], ["#00000000", "#000000"]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 0);
    });

    return unsubscribe;
  }, [scrollY]);

  return (
    <motion.header
      className={cn("fixed top-0 z-50 w-full", {
        "backdrop-blur-sm": isScrolled,
      })}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="container max-auto py-4">
        <div className="flex items-center justify-between  h-8 md:h-12">
          <div
            className="flex cursor-pointer active:scale-95 items-center gap-2 w-24 md:w-36 ml-2 transition-all duration-300 md:hover:border-2 border-white/20  md:px-5 py-3 rounded-full"
            ref={ref}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <PassageLogo hovered={hovered} />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-black rounded-full hover:border-black"
            onClick={() => {
              router.push("/ai/contact");
            }}
          >
            Get started
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
