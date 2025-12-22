import PromptSuggestionButton from "./promptSuggestionButton";

const PromptSuggestionsRow = ({ onPromptClick }) => {
    const prompts = [
        "Who is the current Formula 1 World Champion?",
        "What are the latest rule changes in Formula 1?",
        "Can you provide a summary of the most recent Grand Prix?",
        "Which teams are leading the Constructors' Championship this season?"
    ];

    return (
        <>
            <div className="prompt-suggestions-row">
                {prompts.map((prompt, index) => (
                    <PromptSuggestionButton
                        key={`suggestion-${index}`}
                        text={prompt}
                        onClick={() => onPromptClick(prompt)}
                    />
                ))}
            </div>
        </>

    );
};

export default PromptSuggestionsRow;