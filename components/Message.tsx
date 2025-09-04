"use client";

import { motion, AnimatePresence } from "framer-motion";
import TypingIndicator from "@/components/TypingIndicator";

export default function Message({
  role,
  content,
  timeStamp,
}: {
  role: string;
  content: string;
  timeStamp?: string;
}) {
  const isAgent = role === "agent";
  const isAgentTyping = isAgent && !content; // show dots when agent's message is empty

  return (
    <div className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className={`px-4 py-2 rounded-2xl shadow-md max-w-[70%] text-sm ${
          isAgent
            ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
            : "bg-blue-600 text-white rounded-br-none"
        }`}
      >
        <AnimatePresence mode="wait">
          {isAgentTyping ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TypingIndicator />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>{content}</p>
              {timeStamp && (
                <span
                  className={`block text-[10px] mt-1 text-right ${
                    isAgent ? "text-gray-500" : "opacity-80"
                  }`}
                >
                  {timeStamp}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
