import { ChevronRight } from "lucide-react";
import { ChatProgramCard } from "./chat-program-card";

export const ChatMessagePrograms = () => {
  return (
    <div className="flex gap-4 relative">
      <div>
        <ChatProgramCard
          imgUrl="/assets_ai/images/gbc.jpg"
          title="Computer Systems Technician"
          description="Computer Systems Technician is a diploma program focused on systems, networking, and IT support."
          actions={[
            {
              label: "View program",
            },
          ]}
        />
      </div>
      <div>
        <ChatProgramCard
          imgUrl="/assets_ai/images/program-2.avif"
          title="Business Administration"
          description="Business Administration is a field of study that focuses on the management of businesses and organizations."
          actions={[
            {
              label: "View program",
            },
          ]}
        />
      </div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 rounded-full p-2">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
};
