"use client";

import Image from "next/image";
import { ChatAgents, ChatFooter, ChatMessages } from "./components";

export const Mobile = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div id="chat-container" className="floating-container">
        <div className="w-[340px] h-[630px] border border-white/20 rounded-4xl relative floating-inner bg-black">
          <div className="border-b border-white/20 flex items-center py-4 px-6">
            <Image
              src="/assets_ai/images/logo.svg"
              alt="logo"
              width={20}
              height={20}
              priority
            />
          </div>

          <ChatMessages />

          <div className="absolute bottom-0 left-0 right-0 justify-between p-3 flex flex-col gap-4">
            <ChatFooter />
          </div>
        </div>
      </div>
      <ChatAgents />
    </div>
  );
};
