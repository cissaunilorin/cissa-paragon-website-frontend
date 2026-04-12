"use client";

import { useEffect, useState } from "react";
import { Link as LinkIcon, MessageCircle, Twitter } from "lucide-react";

function getCurrentPageUrl(eventId: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

    return `${siteUrl}/events/${eventId}`;
}

export default function ShareRow({
    eventId,
    eventTitle,
}: {
    eventId: string;
    eventTitle: string;
}) {
    const [copied, setCopied] = useState(false);

    const currentPageUrl = getCurrentPageUrl(eventId);

    const xShareUrl = `https://x.com/intent/tweet?${new URLSearchParams({
        url: currentPageUrl,
        text: eventTitle,
    }).toString()}`;

    const whatsappShareUrl = `https://wa.me/?${new URLSearchParams({
        text: `${eventTitle} ${currentPageUrl}`,
    }).toString()}`;

    useEffect(() => {
        if (!copied) return;

        const timeoutId = window.setTimeout(() => setCopied(false), 2000);
        return () => window.clearTimeout(timeoutId);
    }, [copied]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentPageUrl);
            setCopied(true);
        } catch {
            // Ignore clipboard failures.
        }
    };

    const sharedButtonBaseClassName =
        "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-base-content transition-all duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-base-content/20 active:scale-[0.98]";

    const xButtonClassName = `${sharedButtonBaseClassName} border-base-300 hover:border-neutral-900/20 hover:bg-neutral-900/5 hover:text-neutral-900 active:bg-neutral-900/10`;
    const whatsappButtonClassName = `${sharedButtonBaseClassName} border-base-300 hover:border-green-500/30 hover:bg-green-500/10 hover:text-green-600 active:bg-green-500/15`;
    const copyButtonClassName = `${sharedButtonBaseClassName} border-base-300 hover:border-sky-500/30 hover:bg-sky-500/10 hover:text-sky-600 active:bg-sky-500/15`;

    return (
        <section className="space-y-3 px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/55">
                Share
            </p>
            <div className="flex flex-wrap gap-3">
                <a
                    href={xShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={xButtonClassName}
                >
                    <Twitter className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>Share on X</span>
                </a>
                <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={whatsappButtonClassName}
                >
                    <MessageCircle className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>WhatsApp</span>
                </a>
                <button
                    type="button"
                    onClick={handleCopyLink}
                    className={copyButtonClassName}
                >
                    <LinkIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                    <span>{copied ? "Copied!" : "Copy link"}</span>
                </button>
            </div>
        </section>
    );
}