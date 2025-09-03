// // export default function InputForm() {
//   return (
//     <form
//       onSubmit={handleSendMessage}
//       className="flex items-center gap-2 p-3 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
//     >
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type your message..."
//         className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         type="submit"
//         disabled={!input.trim()}
//         className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
//       >
//         Send
//       </button>
//     </form>
//   );
// }
