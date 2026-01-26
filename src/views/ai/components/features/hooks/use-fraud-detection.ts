import { useEffect, useState } from "react";

export const useFraudDetection = (isActive: boolean) => {
  const [scanningAngle, setScanningAngle] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    // Continuous scanning animation
    const scanInterval = setInterval(() => {
      setScanningAngle((prev) => (prev + 5) % 360);
    }, 1000);

    return () => {
      clearInterval(scanInterval);
    };
  }, [isActive]);

  return {
    scanningAngle,
  };
};
