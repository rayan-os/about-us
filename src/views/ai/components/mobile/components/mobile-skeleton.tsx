export const MobileSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="w-[340px] h-[630px] border border-white/20 rounded-4xl relative floating-inner bg-black animate-pulse" />
      <div className="flex items-center gap-2">
        <div className="w-[126px] h-[40px] rounded-full bg-white/20 animate-pulse" />
        <div className="w-[26px] h-[26px] rounded-full bg-white/20 animate-pulse" />
        <div className="w-[26px] h-[26px] rounded-full bg-white/20 animate-pulse" />
      </div>
    </div>
  );
};
