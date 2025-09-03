"use client";
import Message from "@/components/Message";
import ToggleButton from "@/components/ToggleButton";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { LuLightbulb } from "react-icons/lu";
interface MessageType {
  role: "user" | "agent";
  content: string;
}
export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    const userMessage: MessageType = { role: "user", content: trimmedInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [userMessage],
          threadId: "21",
        }),
      });

      console.log(response);

      if (!response.ok || !response.body) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "agent", content: "An error occurred. Please try again." },
        ]);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let agentResponse = "";
      let isFirstChunk = true;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("0:")) {
            let content = line.substring(2).trim();

            if (content.startsWith(`"`) && content.endsWith(`"`)) {
              content = content.slice(1, -1);
            }

            content = content.replace(/\\n/g, "\n");

            agentResponse += content;

            setMessages((prev) => {
              const updated = [...prev];

              if (
                updated.length &&
                updated[updated.length - 1].role === "agent"
              ) {
                updated[updated.length - 1].content = agentResponse;
              } else {
                updated.push({ role: "agent", content: agentResponse });
              }
              return updated;
            });
          }
        }
      }
    } catch (error) {
      console.error("Streaming failed:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "agent", content: "Network or server error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  flex flex-col h-screen p-4 bg-white dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-5xl mx-auto flex flex-col h-screen dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-lg font-bold">🌤️ Weather Agent</h1>
          <ToggleButton />
        </div>
        <div className="flex-1 w-full overflow-y-auto space-y-4 p-4">
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} content={msg.content} />
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="mb-10 border dark:border-none rounded-lg shadow-md dark:shadow-purple-600/50">
          <form
            onSubmit={handleSendMessage}
            className="flex p-4 bg-white dark:bg-gray-900 rounded-lg"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border dark:border-none rounded-lg focus:outline-none dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-gray-900/50 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
