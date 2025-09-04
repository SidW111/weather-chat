export default function TypingIndicator() {
  return (
    <div className="flex spcae-x-1 items-center">
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-150"></span>
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-300"></span>
    </div>
  );
}
