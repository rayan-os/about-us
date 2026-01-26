import { useMobileContext } from "../context";

export const ChatTypingIndicator = () => {
  const { currentAgent } = useMobileContext();

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-1">
        <div
          className={`w-2 h-2 rounded-full ${currentAgent?.color} typing-dot`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ${currentAgent?.color} typing-dot`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ${currentAgent?.color} typing-dot`}
        ></div>
      </div>
    </div>
  );
};
