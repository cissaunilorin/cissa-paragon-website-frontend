import React from "react";

/**
 * Lightweight formatter:
 * *bold*  _italics_  raw http(s):// links, single and double newlines.
 */
export function formatRich(text: string): React.ReactNode[] {
    const parts = text.split(/(\*[^*]+\*|_[^_]+_|https?:\/\/\S+|\r\n\r\n|\r\n)/g).filter(Boolean);
    return parts.map((part, idx) => {
        if (part === "\r\n") return <br key={idx} />;
        if (part === "\r\n\r\n") return <div key={idx} className="h-4" />;
        if (part.startsWith("*") && part.endsWith("*")) {
            return <strong key={idx}>{part.slice(1, -1)}</strong>;
        }
        if (part.startsWith("_") && part.endsWith("_")) {
            return (
                <em key={idx} className="italic">
                    {part.slice(1, -1)}
                </em>
            );
        }
        if (/^https?:\/\//.test(part)) {
            return (
                <a
                    key={idx}
                    href={part}
                    className="link link-primary break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {part}
                </a>
            );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
}