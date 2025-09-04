import { SetStateAction, useState } from "react";

interface MessageType {
  role: "user" | "agent";
  content: string;
  timeStamp?:string;
}

interface InputFormProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputForm({ setMessages, setLoading }: InputFormProps) {
  const [input, setInput] = useState<string>("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    const userMessage: MessageType = { role: "user", content: trimmedInput ,timeStamp:new Date().toLocaleDateString([],{hour:'2-digit',minute:'2-digit'})};
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
                setLoading(false)

            setMessages((prev) => {
              const updated = [...prev];

              if (
                updated.length &&
                updated[updated.length - 1].role === "agent"
              ) {
                updated[updated.length - 1].content = agentResponse;
              } else {
                updated.push({ role: "agent", content: agentResponse,timeStamp:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) });
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
    <div className=" border dark:border-none rounded-lg shadow-md dark:shadow-purple-600/50 ">
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
  );
}
