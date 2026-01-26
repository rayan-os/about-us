"use client";

export const ChatFooter = () => {
  return (
    <div className="flex rounded-xl p-3 w-full justify-between gap-2 bg-gray-900">
      <div className="flex gap-1">
        <div className="bg-gray-800 h-3 w-20" />
        <div className="bg-gray-800 h-3 w-20" />
        <div className="bg-gray-800 h-3 w-12" />
      </div>
      <div className={`w-10 h-10 bg-indigo-500 rounded-full`} />
    </div>
  );
};
