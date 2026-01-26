import { useEffect, useState } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

export const useCountDown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);

      // Handle invalid dates
      if (isNaN(target.getTime())) {
        return [
          { value: 0, label: "Months" },
          { value: 0, label: "Days" },
          { value: 0, label: "Hours" },
          { value: 0, label: "Minutes" },
          { value: 0, label: "Seconds" },
        ];
      }

      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        // More robust month calculation
        let months = 0;
        let tempDate = new Date(now);

        // Count full months by incrementing month by month
        while (tempDate.getTime() < target.getTime()) {
          const nextMonth = new Date(tempDate);
          nextMonth.setMonth(nextMonth.getMonth() + 1);

          // If adding a month would exceed the target, break
          if (nextMonth.getTime() > target.getTime()) {
            break;
          }

          months++;
          tempDate = nextMonth;
        }

        // Calculate remaining time after full months
        const remainingTime = target.getTime() - tempDate.getTime();

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        return [
          { value: months, label: "Months" },
          { value: Math.max(0, days), label: "Days" },
          { value: Math.max(0, hours), label: "Hours" },
          { value: Math.max(0, minutes), label: "Minutes" },
          { value: Math.max(0, seconds), label: "Seconds" },
        ];
      }

      return [
        { value: 0, label: "Months" },
        { value: 0, label: "Days" },
        { value: 0, label: "Hours" },
        { value: 0, label: "Minutes" },
        { value: 0, label: "Seconds" },
      ];
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate, mounted]);

  return {
    timeLeft,
  };
};
