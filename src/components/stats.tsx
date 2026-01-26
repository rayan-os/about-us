"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import NumberFlow from "@number-flow/react";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

function StatItem({ value, suffix, label, delay = 0 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  // Animation when in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
      className="text-center"
    >
      <div className="font-body text-5xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight mb-2">
        <NumberFlow
          value={displayValue}
          format={{ useGrouping: true }}
          transformTiming={{ duration: 700, easing: "ease-out" }}
          spinTiming={{ duration: 700, easing: "ease-out" }}
        />
        <span>{suffix}</span>
      </div>
      <p className="text-white/60 text-base md:text-lg max-w-[200px] mx-auto">{label}</p>
    </motion.div>
  );
}

export function Stats() {
  const stats = [
    { value: 5000, suffix: "+", label: "Applications per week" },
    { value: 90, suffix: "%", label: "Processed same day" },
    { value: 20, suffix: "+", label: "Institutions" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="pt-32 pb-24 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Impact at Scale
          </h2>
          <p className="font-body text-lg md:text-xl text-white/50">
            How do you process thousands of applications without adding headcount?
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
