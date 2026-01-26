import { useEffect, useRef, useState } from "react";
import { parseAgentId, useMobileContext } from "../context";
import { AgentEnum, MessageProps } from "../types";

interface CombinedMessage extends MessageProps {
  isFirstOfAgent: boolean;
  isFirstBotOfAgent: boolean;
  messageIndex: number;
  agentColor: string;
  sectionIndex: number;
}

export const useChatMessages = () => {
  const {
    activeAgentId,
    springConfig,
    currentSections,
    activeTab,
    setActiveAgentId,
    getNextAgentId,
    isManuallySelected,
  } = useMobileContext();

  const [allMessages, setAllMessages] = useState<CombinedMessage[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scaledMessageIndex, setScaledMessageIndex] = useState<number | null>(
    null
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const autoCycleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollSequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const combined: CombinedMessage[] = [];
    let globalIndex = 0;

    currentSections.forEach((section, sectionIndex) => {
      section.messages.forEach((message, messageIndex) => {
        const isFirstBotOfAgent =
          message.sender === "bot" &&
          section.messages
            .slice(0, messageIndex)
            .every((m) => m.sender === "user");

        combined.push({
          ...message,
          agent: section.name as AgentEnum,
          isFirstOfAgent: messageIndex === 0,
          isFirstBotOfAgent,
          messageIndex: globalIndex++,
          agentColor: section.color,
          sectionIndex,
        });
      });
    });

    setAllMessages(combined);
  }, [currentSections, activeTab]);

  useEffect(() => {
    if (isManuallySelected || isInitialLoad || allMessages.length === 0) return;

    if (autoCycleTimeoutRef.current) {
      clearTimeout(autoCycleTimeoutRef.current);
    }

    autoCycleTimeoutRef.current = setTimeout(() => {
      const nextAgentId = getNextAgentId(activeAgentId);
      setActiveAgentId(nextAgentId, false);
    }, 8000);

    return () => {
      if (autoCycleTimeoutRef.current) {
        clearTimeout(autoCycleTimeoutRef.current);
      }
    };
  }, [
    activeAgentId,
    isManuallySelected,
    isInitialLoad,
    allMessages,
    getNextAgentId,
    setActiveAgentId,
  ]);

  useEffect(() => {
    if (allMessages.length === 0) return;

    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // Clear any existing scroll sequence
    if (scrollSequenceTimeoutRef.current) {
      clearTimeout(scrollSequenceTimeoutRef.current);
    }

    // Get the active agent name and index from the activeAgentId
    const { name: activeAgentName, index: activeAgentIndex } =
      parseAgentId(activeAgentId);

    // Find all messages with scroll: true for the specific agent instance
    const scrollMessages = allMessages.filter(
      (msg) =>
        msg.agent === activeAgentName &&
        msg.sectionIndex === activeAgentIndex &&
        msg.scroll === true
    );

    if (scrollMessages.length === 0) return;

    // Function to scroll to a specific message with animation
    const scrollToMessage = (message: CombinedMessage) => {
      const messageElement = messageRefs.current.get(message.messageIndex);

      if (messageElement && scrollContainerRef.current) {
        setIsScrolling(true);

        const container = scrollContainerRef.current;

        // Calculate the scroll position relative to the container
        const containerRect = container.getBoundingClientRect();
        const messageRect = messageElement.getBoundingClientRect();
        const scrollTop =
          container.scrollTop +
          (messageRect.top - containerRect.top) -
          (containerRect.height / 2 - messageRect.height / 2);

        // Scroll within the container only
        container.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });

        setTimeout(() => {
          setIsScrolling(false);

          // Trigger scale animation for the message
          setScaledMessageIndex(message.messageIndex);

          // Reset scale after animation
          setTimeout(() => {
            setScaledMessageIndex(null);
          }, 600);
        }, 500);

        // Clean up transition
        setTimeout(() => {
          container.style.transition = "";
        }, 800);
      }
    };

    // Function to handle sequential scrolling
    const startScrollSequence = () => {
      if (scrollMessages.length === 0) return;

      let currentIndex = 0;

      const scrollToNext = () => {
        if (currentIndex < scrollMessages.length) {
          scrollToMessage(scrollMessages[currentIndex]);
          currentIndex++;

          // If there are more messages to scroll to, schedule the next scroll
          if (currentIndex < scrollMessages.length) {
            scrollSequenceTimeoutRef.current = setTimeout(scrollToNext, 4000); // 2 seconds delay between scrolls
          }
        }
      };

      // Start the scroll sequence
      scrollToNext();
    };

    // Start scrolling sequence
    startScrollSequence();

    // Cleanup function
    return () => {
      if (scrollSequenceTimeoutRef.current) {
        clearTimeout(scrollSequenceTimeoutRef.current);
      }
    };
  }, [activeAgentId, allMessages, isInitialLoad, currentSections]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, [activeTab]);

  const setMessageRef = (index: number, element: HTMLDivElement | null) => {
    if (element) {
      messageRefs.current.set(index, element);
    } else {
      messageRefs.current.delete(index);
    }
  };

  return {
    allMessages,
    activeAgentId,
    springConfig,
    scrollContainerRef,
    setMessageRef,
    isScrolling,
    scaledMessageIndex,
  };
};
