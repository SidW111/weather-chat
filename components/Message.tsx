interface Message {
  role: "user" | "agent";
  content: string;
}

export default function Message({ role, content }: Message) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-xs ${
          isUser ? "bg-blue-100" : "bg-blue-300"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
