export const runtime = "nodejs";

import { streamText, embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { DataAPIClient } from "@datastax/astra-db-ts";

type UIMessage = {
    id: string;
    role: "system" | "user" | "assistant";
    parts?: { type: "text"; text: string }[];
};

/* -----------------------------
   Astra DB Setup
-------------------------------- */
const {
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
} = process.env;

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN!);
const db = client.db(ASTRA_DB_API_ENDPOINT!, {
    keyspace: ASTRA_DB_NAMESPACE!,
});

/* -----------------------------
   UI → Model Message Conversion
-------------------------------- */
function convertToModelMessages(uiMessages: UIMessage[]) {
    return uiMessages.map((m) => ({
        role: m.role,
        content:
            m.parts
                ?.filter((p) => p.type === "text")
                .map((p) => p.text)
                .join(" ") ?? "",
    }));
}

/* -----------------------------
   Chat Route (OPTIMIZED FOR SPEED)
-------------------------------- */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const uiMessages: UIMessage[] = Array.isArray(body)
            ? body
            : body.messages ?? [];

        if (uiMessages.length === 0) {
            return new Response("No messages provided", { status: 400 });
        }

        // Extract the latest user message for embedding
        const latestMessage = uiMessages
            .filter((m) => m.role === "user")
            .pop();

        const latestMessageText = latestMessage?.parts
            ?.filter((p) => p.type === "text")
            .map((p) => p.text)
            .join(" ") ?? "";

        if (!latestMessageText) {
            return new Response("No valid user message found", { status: 400 });
        }

        /* ---- Generate embedding & Vector search ---- */
        const embeddingResult = await embed({
            model: openai.embedding("text-embedding-3-small"),
            value: latestMessageText,
        });

        let docContext = "";

        try {
            const collection = await db.collection(ASTRA_DB_COLLECTION!);

            const cursor = collection.find(
                {},
                {
                    sort: {
                        $vector: embeddingResult.embedding,
                    },
                    limit: 5, // Reduced from 10 to 5 for faster processing
                }
            );

            const documents = await cursor.toArray();

            // Limit context length for faster processing
            docContext = documents
                .map((doc: any) => doc.content)
                .join("\n\n")
                .substring(0, 2000); // Limit to 2000 chars max
        } catch (err) {
            console.error("Astra DB error:", err);
            docContext = "";
        }

        /* ---- System prompt ---- */
        const systemPrompt: UIMessage = {
            id: "system",
            role: "system",
            parts: [
                {
                    type: "text",
                    text: `
You are an AI assistant who knows everything about Formula One.

Use the context below to enhance your answers with the most recent and accurate information.
If the context is not relevant, answer using your general knowledge.
Do not mention the context or its source.

----------------------
${docContext}
----------------------
`.trim(),
                },
            ],
        };

        /* ---- Stream response ---- */
        const result = streamText({
            model: openai("gpt-4o-mini"),
            messages: convertToModelMessages([systemPrompt, ...uiMessages]),
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Server error:", error);
        return new Response(
            JSON.stringify({
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : "Unknown error",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}