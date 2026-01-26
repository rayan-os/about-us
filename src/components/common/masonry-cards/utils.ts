export const getCardHeight = (height?: string) => {
  switch (height) {
    case "small":
      return "min-h-[120px]";
    case "large":
      return "min-h-[280px]";
    default:
      return "min-h-[200px]";
  }
};

export const getCardStyles = (type?: string) => {
  switch (type) {
    case "feature":
      return "bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200 hover:shadow-gray-200";
    case "quote":
      return "bg-gradient-to-br from-stone-50 to-neutral-100 border-gray-200 hover:shadow-stone-200";
    case "text":
      return "bg-gradient-to-br from-zinc-50 to-gray-100 border-gray-200 hover:shadow-zinc-200";
    default:
      return "bg-gray-50 border-gray-200 hover:shadow-gray-200";
  }
};
