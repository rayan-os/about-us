import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MasonryCardProps } from "./types";
import { getCardHeight, getCardStyles } from "./utils";

interface Props {
  cards: MasonryCardProps[];
}

export const MasonryCards = ({ cards }: Props) => {
  return (
    <div>
      <div
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        style={{ columnFill: "balance" }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`
              break-inside-avoid mb-6 transition-all duration-300 
              hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full
              ${getCardHeight(card.height)} ${getCardStyles(card.type)}
            `}
          >
            <CardHeader>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-tight">
                {card.title}
              </h3>
            </CardHeader>

            <CardContent>
              <div className="flex-1">
                {card.type === "quote" ? (
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed">
                    {card.content}
                  </blockquote>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.content}
                  </p>
                )}
              </div>
            </CardContent>

            {card.type === "feature" && (
              <CardFooter>
                <div className="mt-4 pt-4 border-t border-gray-200 w-full">
                  <button className="text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors">
                    Learn More →
                  </button>
                </div>
              </CardFooter>
            )}

            {card.type === "quote" && (
              <CardFooter>
                <div className="mt-3 flex items-center">
                  <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-stone-700">★</span>
                  </div>
                  <span className="ml-2 text-xs text-gray-500">
                    Verified Review
                  </span>
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
