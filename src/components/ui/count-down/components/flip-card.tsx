import { cn } from "@/lib/utils";
import { useFlipCard } from "../hooks/use-flip-card";

interface Props {
  value: number;
  label: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const FlipCard = ({ value, label, size = "md" }: Props) => {
  const { currentValue, isFlipping, formatValue, prevValueRef } =
    useFlipCard(value);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={cn(
          "relative flip-card-container",
          size === "sm" && "w-14 h-14 sm:w-16 sm:h-16",
          size === "md" && "w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28",
          size === "lg" && "w-20 h-20 sm:w-32 sm:h-32 lg:w-46 lg:h-46",
          size === "xl" && "w-24 h-24 sm:w-40 sm:h-40 xl:w-64 xl:h-64",
        )}
      >
        <div className="absolute inset-0 z-10">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#252525] to-[#1a1a1a] rounded-t-lg sm:rounded-t-xl overflow-hidden border border-white/10"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={cn(
                "text-white font-bold font-mono leading-none relative z-10",
                size === "sm" && "text-2xl sm:text-3xl",
                size === "md" && "text-3xl sm:text-5xl md:text-7xl",
                size === "lg" && "text-4xl sm:text-6xl lg:text-9xl",
                size === "xl" && "text-5xl sm:text-8xl xl:text-[10rem]",
              )}
            >
              {formatValue(currentValue)}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#252525] to-[#1a1a1a] rounded-b-lg sm:rounded-b-xl overflow-hidden border border-white/10"></div>
        </div>

        {/* Flipping Card */}
        {isFlipping && (
          <div className="absolute top-0 left-0 right-0 h-1/2 z-20 flip-card-top">
            <div className="absolute inset-0 bg-gradient-to-b from-[#252525] to-[#1a1a1a] rounded-t-lg sm:rounded-t-xl overflow-hidden border border-white/10">
              <div
                className="absolute top-0 left-0 right-0 w-full flex items-center justify-center"
                style={{ height: "200%", marginTop: "0%" }}
              >
                <span
                  className={cn(
                    "text-white font-bold font-mono leading-none relative z-10 flip-card-text",
                    size === "sm" && "text-2xl sm:text-3xl",
                    size === "md" && "text-3xl sm:text-5xl md:text-7xl",
                    size === "lg" && "text-4xl sm:text-6xl lg:text-9xl",
                    size === "xl" && "text-5xl sm:text-8xl xl:text-[10rem]",
                  )}
                >
                  {formatValue(prevValueRef.current)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Separator */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 sm:h-1 bg-[#1a1a1a] transform -translate-y-0.5 z-30 rounded-full"></div>
        <div className="absolute top-1/2 left-2 right-2 sm:left-4 sm:right-4 h-px sm:h-0.5 bg-[#0f0f0f] transform -translate-y-0.25 z-30"></div>
      </div>

      <div className="text-white/40 text-[10px] sm:text-xs md:text-base uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
};
