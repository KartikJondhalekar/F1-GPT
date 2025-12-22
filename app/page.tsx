"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import F1GPTLogo from "./assets/F1GPTLogo.png";
import Bubble from "./components/bubble";
import LoadingBubble from "./components/loadingBubble";
import PromptSuggestionsRow from "./components/promptSuggestionRow";

export default function Home() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const noMessages = messages.length === 0;

  // Loading = last message is from user
  const isLoading =
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  const makeUserMessage = (text: string): UIMessage => ({
    id: crypto.randomUUID(),
    role: "user",
    parts: [
      {
        type: "text",
        text,
      },
    ],
  });

  const handlePrompt = (promptText: string) => {
    sendMessage(makeUserMessage(promptText));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage(makeUserMessage(input));
    setInput("");
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <main>
      {/* Logo container with smooth background blend */}
      <div className="logo-container">
        <Image
          src={F1GPTLogo}
          alt="F1GPT Logo"
          width={280}
          height={150}
          priority
          className="logo-image"
        />
      </div>

      <section className={noMessages ? "" : "populated"}>
        {noMessages ? (
          <>
            <p className="starter-text">
              The ultimate place for Formula 1 super fans. <br />
              Ask F1-GPT anything about Formula 1 racing.
            </p>
            <PromptSuggestionsRow onPromptClick={handlePrompt} />
          </>
        ) : (
          <>
            {messages.map((message, index) => (
              <Bubble key={message.id ?? index} message={message} />
            ))}
            {isLoading && <LoadingBubble />}
          </>
        )}
      </section>

      <form onSubmit={handleSubmit}>
        <input
          className="question-box"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
        />
        <input type="submit" value="Send" />
      </form>
    </main>
  );
}