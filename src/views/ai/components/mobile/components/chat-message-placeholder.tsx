interface Props {
  numberOfLines: number;
}

export const ChatMessagePlaceholder = ({ numberOfLines }: Props) => {
  return (
    <div className="relative z-10 p-3 overflow-hidden min-w-[180px]">
      <div className="space-y-2">
        {Array.from({ length: numberOfLines }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-2 bg-white/10 rounded-md w-full animate-pulse" />
            <div className="h-2 bg-white/10 rounded-md w-1/3 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
