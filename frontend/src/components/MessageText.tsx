import React from "react";

export const MessageText = ({ text }: { text: string }) => {
  const [maxChars, setMaxChars] = React.useState<number>(200);

  const needsTruncation = text.length > maxChars;
  const displayedText = needsTruncation
    ? text.slice(0, maxChars) + "..."
    : text;

  return (
    <div>
      <p>{displayedText}</p>
      {needsTruncation && (
        <button
          className="cursor-pointer"
          onClick={() => setMaxChars((prev) => prev * 2.5)}
        >
          <span className="underline">See More</span>
        </button>
      )}
    </div>
  );
};
