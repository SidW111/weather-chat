import { MessageType } from "@/app/page";
import { FaDownload } from "react-icons/fa";

interface ExportChatProps {
    messages:MessageType[]
}

export default function ExportChat({messages}:ExportChatProps) {
  const handleExportChat = (messages: MessageType[]) => {
    const text = messages
      .map((m) => `[${m.timeStamp}] ${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "chat.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={() => handleExportChat(messages)}
      disabled={messages.length === 0}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
               rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      <FaDownload  />
    </button>
  );
}
