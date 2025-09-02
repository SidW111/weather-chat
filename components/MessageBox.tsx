"use client";

import { error } from "console";
import { read } from "fs";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};
export default function MessageBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const submitHandle = async (userInput: string) => {
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    const res = await fetch(
      "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          "x-mastra-dev-playground": "true",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: userInput }],
          runId: "weatherAgent",
          maxRetries: 2,
          maxSteps: 5,
          temperature: 0.5,
          topP: 1,
          runtimeContext: {},
          threadId: "21",
          resourceId: "weatherAgent",
        }),
      }
    );

    if (!res) {
      throw new Error("res not fetched");
    }

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let fullMessage = "";

    while (true) {
      //@ts-ignore
      const { done, value } = await reader?.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop()!;

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const msg = JSON.parse(line);

          // Tool + metadata events
          if (msg.toolCallId) {
            console.log("Tool called:", msg.toolName, msg.args);
          } else if (msg.result) {
            console.log("Tool result:", msg.result);
          } else if (msg.finishReason) {
            console.log("Stream finished:", msg.finishReason);
          }
        } catch {
          let cleanText = line
            // remove JSON-like tool calls/metadata
            .replace(/^\{.*?\}$/, "")
            // unwrap quotes if any
            .replace(/"([^"]*)"/g, "$1")
            // normalize spaces
            .replace(/\s+/g, " ")
            .trim();

          if (cleanText) {
            fullMessage += cleanText + " ";

            setMessages((prev) => {
              const updated = [...prev];
              if (
                updated.length &&
                updated[updated.length - 1].role === "assistant"
              ) {
                // Update the last assistant message (for streaming effect)
                updated[updated.length - 1].content = fullMessage.trim();
              } else {
                // Push a new assistant message
                updated.push({
                  role: "assistant",
                  content: fullMessage.trim(),
                });
              }
              return updated;
            });
          }
        }
      }
    }
    console.log("Stream Finished fullmsg:", fullMessage);
  };
  return (
    <div className="p-2 space-x-2">
      <div>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[70%] px-4 py-2 rounded-lg ${
              m.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>
      <input
        className="px-8 py-2 border"
        type="text"
        placeholder="type your text here..."
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        className="cursor-pointer px-4 py-2 border"
        type="submit"
        onClick={() => {
          console.log(input);
          submitHandle(input);
        }}
      >
        Send
      </button>
    </div>
  );
}
