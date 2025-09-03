"use client";
import Message from "@/components/Message";
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
  const { theme, setTheme } = useTheme();
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
        <div className="flex justify-end">
          <div
            className={`
             w-14 h-8 flex items-center rounded-full transition-colors duration-300
            ${
              theme === "dark"
                ? "justify-end bg-gray-700"
                : "justify-start bg-gray-200"
            }
          `}
          >
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
              className={`
              w-7 h-7 flex items-center justify-center rounded-full shadow-md
              transition-all duration-500
              ${theme === "dark" ? "bg-white" : "bg-gray-900"}
            `}
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 11a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-11a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm14 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM6.586 4.707a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm4.828 10.166a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zm-1.414-8.828a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707zm5.536 7.232a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
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
