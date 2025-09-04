"use client";
import ExportChat from "@/components/ExportChat";
import InputForm from "@/components/InputForm";
import Message from "@/components/Message";
import ToggleButton from "@/components/ToggleButton";
import { useKeyboardSafeHeight } from "@/hooks/useKeyboardSafeheight";
import { useEffect, useRef, useState } from "react";

export interface MessageType {
  role: "user" | "agent";
  content: string;
  timeStamp?: string;
}
export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const safeHeight = useKeyboardSafeHeight();

  return (
    <div
      className="w-full min-h-[100svh] bg-white dark:bg-gray-900 dark:text-white flex flex-col overflow-hidden"
      // style={{
      //   height: safeHeight ?? "100dvh",
      // }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col h-full relative">
        <div
          className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center 
                    px-4 py-3 border-b border-gray-300 dark:border-gray-700 
                    bg-white dark:bg-gray-900 w-full max-w-5xl mx-auto"
        >
          <h1 className="text-lg font-bold text-black dark:text-white">
            🌤️ Weather Agent
          </h1>
          <div className="flex gap-1 items-center">
            <ExportChat messages={messages} />
            <ToggleButton />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 p-4 pt-16 pb-24">
          {messages.map((msg, index) => (
            <Message
              key={index}
              role={msg.role}
              content={msg.content}
              timeStamp={msg.timeStamp}
            />
          ))}
          {loading && <Message role="agent" content="" />}
          <div ref={messageEndRef} />
        </div>

        <div
          className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-300 dark:border-gray-700 
                    bg-white dark:bg-gray-900 p-2 md:p-4 w-full max-w-5xl mx-auto"
        >
          <InputForm
            setLoading={setLoading}
            setMessages={setMessages}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
