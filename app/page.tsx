"use client";
import ExportChat from "@/components/ExportChat";
import InputForm from "@/components/InputForm";
import Message from "@/components/Message";
import ToggleButton from "@/components/ToggleButton";
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

  return (
    <div className="w-full flex flex-col min-h-[100dvh] bg-white dark:bg-gray-900 dark:text-white">
  
  {/* Header (pinned at top) */}
  <div className="fixed top-0 z-10 w-full bg-white dark:bg-gray-900 ">
    <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
      <h1 className="text-lg font-bold text-black dark:text-white">🌤️ Weather Agent</h1>
      <div className="flex gap-1 items-center">
        <ExportChat messages={messages} />
        <ToggleButton />
      </div>
    </div>
  </div>

  {/* Messages (scrollable area) */}
  <div className="flex-1 overflow-y-auto space-y-4 p-4" style={{ paddingTop: '5rem', paddingBottom: '7rem' }}>
    <div className="max-w-5xl mx-auto">
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
  </div>

  {/* Input bar (always at bottom) */}
  <div className="fixed bottom-0 z-10 w-full bg-white dark:bg-gray-900 ">
    <div className="max-w-5xl mx-auto p-2 md:p-4 border-t border-gray-300 dark:border-gray-700">
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
