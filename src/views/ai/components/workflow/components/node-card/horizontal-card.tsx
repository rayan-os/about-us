import { CardWrapper } from "./card-wrapper";

export const HorizontalCard = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <CardWrapper>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10">{icon}</div>
        <div className="text-lg font-medium">{title}</div>
      </div>
    </CardWrapper>
  );
};
