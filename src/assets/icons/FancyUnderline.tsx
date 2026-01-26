export const FancyUnderline = () => {
  return (
    <svg className="w-full h-4" viewBox="0 0 100 16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="swooshGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="50%" stopColor="#ff8c42" />
          <stop offset="100%" stopColor="#ffa726" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 2,10 Q 15,4 35,6 Q 55,8 75,5 Q 85,4 98,3 L 98,6 Q 85,7 75,8 Q 55,11 35,9 Q 15,7 2,12 Z"
        fill="url(#swooshGradient)"
        filter="url(#glow)"
        className="drop-shadow-sm"
      />
    </svg>
  );
};
