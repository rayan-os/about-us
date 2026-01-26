"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect, useRef, useState } from "react";

// Tab variants using CVA for consistent styling
const tabsVariants = cva(
  "relative  rounded-full p-1 transition-all duration-300 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg",
        glass:
          "bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl",
        neon: "bg-black/20 backdrop-blur-lg border border-primary/30 shadow-2xl shadow-primary/10",
        minimal: "bg-background/50 backdrop-blur-sm border border-border/50",
        outline: " border-white/20 shadow-lg",
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
    },
  },
);

const tabItemVariants = cva(
  "relative z-10 px-6 py-3 font-medium transition-all duration-300 cursor-pointer select-none flex items-center justify-center gap-2 rounded-full",
  {
    variants: {
      variant: {
        default: "text-foreground/70 hover:text-foreground",
        glass: "text-white/70 hover:text-white",
        neon: "text-primary/70 hover:text-primary",
        minimal: "text-muted-foreground hover:text-foreground",
        outline: "text-white/70 hover:text-white ",
      },
      active: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "glass",
      active: false,
    },
  },
);

const tabIndicatorVariants = cva(
  "absolute top-1 bottom-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
  {
    variants: {
      variant: {
        default:
          "bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg",
        glass: "bg-white/20 backdrop-blur-md border border-white/30 shadow-xl",
        neon: "bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-lg border border-primary/40 shadow-2xl shadow-primary/20",
        minimal: "bg-primary/10 border border-primary/20",
        outline: "border border-white shadow-xl",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  },
);

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface TabsProps extends VariantProps<typeof tabsVariants> {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
  animated?: boolean;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = "outline",
  size = "default",
  className,
  tabsClassName,
  contentClassName,
  animated = true,
  fullWidth = false,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id || "",
  );
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement>>({});

  const activeTab = controlledActiveTab ?? internalActiveTab;

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement && tabsRef.current) {
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const activeRect = activeTabElement.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        width: activeRect.width,
        transform: "translateX(0px)",
      });
    }
  }, [activeTab, tabs]);

  const handleTabClick = (tabId: string) => {
    if (tabs.find((tab) => tab.id === tabId)?.disabled) return;

    setIsTransitioning(true);

    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }

    onTabChange?.(tabId);

    // Reset transition state
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={tabsRef}
        className={cn(
          tabsVariants({ variant, size }),
          fullWidth && "w-full",
          tabsClassName,
        )}
      >
        <div
          className={cn(tabIndicatorVariants({ variant }))}
          style={indicatorStyle}
        />

        <div className="relative z-10 flex">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const isDisabled = tab.disabled;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  if (el) tabRefs.current[tab.id] = el;
                }}
                onClick={() => handleTabClick(tab.id)}
                disabled={isDisabled}
                className={cn(
                  tabItemVariants({ variant, active: isActive }),
                  "py-2 px-4 text-sm",
                  fullWidth && "flex-1",
                  isActive && "text-white font-semibold",
                  isDisabled && "opacity-50 cursor-not-allowed",
                )}
              >
                {tab.icon && (
                  <span
                    className={cn(
                      "transition-all duration-300",
                      isActive && "scale-110",
                    )}
                  >
                    {tab.icon}
                  </span>
                )}

                <span className="whitespace-nowrap">{tab.label}</span>

                {tab.badge && (
                  <span
                    className={cn(
                      "ml-2 px-2 py-0.5 text-xs rounded-full transition-all duration-300",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-primary/20 text-primary",
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {activeTabContent && (
        <div className={cn("mt-6 relative", contentClassName)}>
          <div
            className={cn(
              "transition-all duration-300",
              animated &&
                isTransitioning &&
                "opacity-0 transform translate-y-2",
              animated &&
                !isTransitioning &&
                "opacity-100 transform translate-y-0",
            )}
          >
            {activeTabContent}
          </div>
        </div>
      )}
    </div>
  );
};

export { tabIndicatorVariants, tabItemVariants, tabsVariants };
export type { TabsProps };
