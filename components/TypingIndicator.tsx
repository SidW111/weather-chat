export default function TypingIndicator() {
  return (
    <div className="flex space-x-2 items-center h-5">
      <span className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-300 rounded-full typing-dot"></span>
      <span className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-300 rounded-full typing-dot"></span>
      <span className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-300 rounded-full typing-dot"></span>
    </div>
  );
}
