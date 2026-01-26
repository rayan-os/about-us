import { cn } from "@/lib/utils";
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { MessageProps } from "../types";
import { ChatMessagePlaceholder } from "./chat-message-placeholder";

interface Props {
  message: MessageProps & {
    agentColor?: string;
  };
}

const renderMessageContent = (
  content: string | ReactNode,
  agentColor?: string,
  placeholder?: number
): ReactNode => {
  if (typeof content === "string") {
    return <p className="relative z-10 p-3 text-sm text-white">{content}</p>;
  }

  // If it's a React element, clone it and pass the agentColor as a prop
  if (isValidElement(content)) {
    return (
      <div className="relative z-10">
        {cloneElement(content as ReactElement<{ agentColor?: string }>, {
          agentColor,
        })}
      </div>
    );
  }

  if (placeholder) {
    return <ChatMessagePlaceholder numberOfLines={placeholder} />;
  }

  return <div className={cn("relative z-10")}>{content}</div>;
};

export const ChatMessage = ({ message }: Props) => {
  const username = message.username;
  const country = message.country;
  const fullWidth = message.fullWidth;

  return (
    <>
      <div
        className={cn(
          "flex w-full",
          message.sender === "user" ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={cn(
            "text-sm rounded-xl message-bubble-3d transition-all duration-300 ease-out overflow-hidden",
            message.sender === "user" ? "bg-gray-800" : "bg-indigo-500",
            message.placeholder && "bg-gray-600/50 opacity-50",
            fullWidth
              ? "w-full bg-transparent rounded-r-none"
              : "w-fit max-w-[80%]"
          )}
          style={{
            transform: "var(--message-transform, translateZ(0px))",
            opacity: "var(--message-opacity, 1)",
            scale: "var(--message-scale, 1)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {renderMessageContent(
            message.message,
            message.agentColor,
            message.placeholder
          )}
        </div>
      </div>

      {username && country && (
        <div
          className={cn(
            "flex w-full text-xs text-gray-500 mt-2",
            message.sender === "user" ? "justify-end" : "justify-start"
          )}
        >
          {username} from {country}
        </div>
      )}
    </>
  );
};
