"use client";

import { read } from "fs";
import { useState } from "react";

interface Message {}
export default function MessageBox() {
  const [input, setInput] = useState("");
  const submitHandle = async (userInput: string) => {
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
          console.log("parsed message", msg);
        } catch (error) {
            fullMessage += line.replace(/^\d+:/, "");
          console.log("non json chunk:", line);
        }
      }
      console.log("Stream Finished fullmsg:", fullMessage);
    }
    console.log(reader);
  };
  return (
    <div className="p-2 space-x-2">
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
