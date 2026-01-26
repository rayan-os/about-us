"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const MissionCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const targetDate = new Date("2030-12-31T23:59:59Z");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initialize immediately
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        {/* Flip clock style container */}
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
          <div className="px-4 py-6 md:px-6 md:py-8">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground font-mono tabular-nums">
              {value.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Flip effect line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 dark:bg-gray-500 transform -translate-y-0.5" />
      </div>

      <span className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Mission Statement */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Providing Life-Changing Access to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Opportunities
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform helps talent connect to opportunities
              worldwide. Together, we&apos;re building bridges to brighter
              futures.
            </p>
          </div>

          {/* Our Goal */}
          <div className="bg-card border rounded-2xl p-8 shadow-lg">
            <div className="text-center space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Our 2030 Mission
              </h3>
              <div className="flex items-center justify-center space-x-2 text-2xl md:text-4xl font-bold">
                <span className="text-primary">1,000,000</span>
                <span className="text-muted-foreground">lives transformed</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Time Remaining
              </h3>
              <p className="text-muted-foreground">Until December 31, 2030</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-8">
            <p className="text-lg text-muted-foreground mb-6">
              Be part of this transformation. Every application processed brings
              us closer to our goal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
                Join Our Mission
              </button>
              <button className="border border-border hover:bg-muted text-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
