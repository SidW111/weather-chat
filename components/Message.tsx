export default function Message({ role, content }: { role: string; content: string }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl shadow-md max-w-[70%] text-sm ${
          role === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
