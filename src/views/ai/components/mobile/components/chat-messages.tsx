"use client";

import { motion } from "motion/react";
import { useChatMessages } from "../hooks/use-chat-messages";
import { ChatMessage } from "./chat-message";

export const ChatMessages = () => {
  const {
    allMessages,
    springConfig,
    scrollContainerRef,
    setMessageRef,
    scaledMessageIndex,
  } = useChatMessages();

  return (
    <div
      ref={scrollContainerRef}
      className="flex flex-col gap-4 p-5 overflow-hidden h-[500px] relative scrollbar-hide messages-container-3d"
    >
      {allMessages.map((message, index) => (
        <motion.div
          key={`${message.agent}-${message.messageIndex}`}
          ref={(el) => setMessageRef(message.messageIndex, el)}
          initial={{
            y: 20,
            opacity: 0,
            skewY: message.sender === "bot" ? 4 : -4,
          }}
          animate={{
            y: 0,
            opacity: 1,
            skewY: 0,
            scale: scaledMessageIndex === message.messageIndex ? 1.2 : 1,
          }}
          transition={{
            ...springConfig,
            delay: index * 0.1,
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.6,
            },
          }}
          style={{
            transformOrigin: "left center",
          }}
          className={`flex-shrink-0 chat-message-3d message-layer-${
            index % 5
          } ${
            scaledMessageIndex === message.messageIndex ? "message-scaled" : ""
          }`}
          data-message-index={index}
        >
          <ChatMessage message={message} />
        </motion.div>
      ))}
    </div>
  );
};
