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
    <div className="w-full flex flex-col h-screen p-2 md:p-4 bg-white dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-5xl mx-auto flex flex-col h-full dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-lg font-bold">🌤️ Weather Agent</h1>
          <div className="flex gap-1 items-center">
            <ExportChat messages={messages}/>
            <ToggleButton />
          </div>
        </div>
        <div className="flex-1 w-full overflow-y-auto space-y-4 p-4">
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

        <InputForm
          setLoading={setLoading}
          setMessages={setMessages}
          loading={loading}
        />
      </div>
    </div>
  );
}
