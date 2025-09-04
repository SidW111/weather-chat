import { SetStateAction, useEffect, useRef, useState } from "react";

interface MessageType {
  role: "user" | "agent";
  content: string;
  timeStamp?: string;
}

interface InputFormProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export default function InputForm({
  setMessages,
  setLoading,
  loading,
}: InputFormProps) {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const CHAR_LIMIT = 150;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length <= CHAR_LIMIT) {
      setInput(text); // allow typing
    }
  };

  const charCount = input.length;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    const userMessage: MessageType = {
      role: "user",
      content: trimmedInput,
      timeStamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMessage], threadId: "21" }),
      });

      if (!response.ok || !response.body) {
        setMessages((prev) => [
          ...prev,
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

            // Properly parse JSON string to remove internal quotes
            try {
              content = JSON.parse(content);
            } catch (err) {
              console.warn("Failed to parse chunk:", content);
            }

            agentResponse += content;

            if (isFirstChunk) {
              setLoading(false);
              isFirstChunk = false;
            }

            setMessages((prev) => {
              const updated = [...prev];
              if (
                updated.length &&
                updated[updated.length - 1].role === "agent"
              ) {
                updated[updated.length - 1].content = agentResponse;
              } else {
                updated.push({
                  role: "agent",
                  content: agentResponse,
                  timeStamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                });
              }
              return updated;
            });
          }
        }
      }
    } catch (error) {
      console.error("Streaming failed:", error);
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "Network or server error." },
      ]);
    } finally {
      inputRef.current?.focus();
      setLoading(false);
    }
  };

  return (
    <div className=" border dark:border-none rounded-lg shadow-md dark:shadow-purple-600/50 ">
      <form
        onSubmit={handleSendMessage}
        className="flex p-4 bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-lg"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            placeholder={loading ? "Please Wait..." : "Type your message..."}
            disabled={loading}
            className="w-full p-2 pr-16 border border-gray-300 dark:border-gray-700 
                      dark:bg-gray-800 rounded-lg focus:outline-none focus:border-blue-500
                      dark:focus:border-purple-600/50 disabled:opacity-50 transition-colors duration-200"
          />
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
              charCount >= CHAR_LIMIT ? "text-red-500" : "text-gray-400"
            } pointer-events-none`}
          >
            {charCount}/{CHAR_LIMIT}
          </span>
        </div>

        <button
          type="submit"
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400  focus:outline-none focus:ring-0 focus:border-blue-500 dark:focus:border-purple-400
"
          disabled={!input.trim() || loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
