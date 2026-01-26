import { CardWrapper } from "./card-wrapper";

export const VerticalCard = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 text-white">
      <CardWrapper className="p-4">
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
      </CardWrapper>
      <div className="text-sm font-medium text-center">{title}</div>
    </div>
  );
};
