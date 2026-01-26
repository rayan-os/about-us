import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface ChatProgramCardAction {
  label: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost" | "secondary";
  disabled?: boolean;
  loading?: boolean;
}

interface Props {
  imgUrl?: string;
  title: string;
  description: string | ReactNode;
  actions?: ChatProgramCardAction[];
  className?: string;
  imageAlt?: string;
  imageClassName?: string;
  agentColor?: string;
  icon?: ReactNode;
}

export const ChatProgramCard = ({
  imgUrl,
  title,
  description,
  actions = [],
  className,
  imageAlt,
  imageClassName,
  // agentColor,
  icon,
}: Props) => {
  return (
    <Card
      className={cn(
        "group hover:shadow-xl transition-all duration-300 overflow-hidden w-[200px] border-none p-0 bg-indigo-500",
        // agentColor,
        className
      )}
    >
      <CardContent className="p-0">
        {imgUrl && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={imgUrl}
              alt={imageAlt || title}
              fill
              className={cn(
                "object-fit transition-transform duration-300 group-hover:scale-105",
                imageClassName
              )}
              priority
            />
          </div>
        )}

        <div className="p-3 flex flex-col gap-2">
          <CardTitle className="text-sm font-bold text-white line-clamp-2">
            <div className="flex items-center gap-2">
              {icon && (
                <div className="text-xs text-gray-300 line-clamp-3">{icon}</div>
              )}
              {title}
            </div>
          </CardTitle>

          <CardDescription className="text-xs text-gray-300 line-clamp-3 mb-3">
            {description}
          </CardDescription>

          {actions.length > 0 && (
            <CardFooter className="p-0">
              <div className="flex flex-wrap gap-2 w-full justify-end">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    size="sm"
                    onClick={action.onClick}
                    disabled={action.disabled}
                    loading={action.loading}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardFooter>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
