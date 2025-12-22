import type { UIMessage } from "ai";

interface BubbleProps {
    message: UIMessage;
}

export default function Bubble({ message }: BubbleProps) {
    // UIMessage has a 'parts' array structure
    // We need to extract text from the parts
    const content = message.parts
        ?.filter((part) => part.type === "text")
        .map((part) => part.text)
        .join(" ") || "";

    return (
        <div className={`bubble ${message.role}`}>
            {content}
        </div>
    );
}