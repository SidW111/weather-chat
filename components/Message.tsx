export default function Message({
  role,
  content,
}: {
  role: "user" | "agent";
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg whitespace-pre-line ${
          isUser
            ? "bg-blue-500 text-white text-right dark:bg-gray-800/90 dark:text-white/80"
            : "bg-gray-200 text-black text-left dark:bg-gray-700/10 dark:text-white/80"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
