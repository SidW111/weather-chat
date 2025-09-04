"use client";

import TypingIndicator from "@/components/TypingIndicator";

export default function Message({
  role,
  content,
  timeStamp,
}: {
  role: "user" | "agent";
  content: string;
  timeStamp?: string;
}) {
  const isAgent = role === "agent";
  const isTyping = isAgent && !content;

  return (
    <div className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
      <div
        className={`px-4 py-2 rounded-2xl shadow-md max-w-[70%] text-sm ${
          isAgent
            ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
            : "bg-blue-600 text-white rounded-br-none"
        }`}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <>
            <p>{content}</p>
            {timeStamp && (
              <span
                className={`block text-[10px] mt-1 text-right ${
                  isAgent ? "text-gray-500" : "opacity-80"
                }`}
              >
                {timeStamp}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
