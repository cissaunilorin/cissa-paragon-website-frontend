"use client";

import { useEffect, useState } from "react";
import { Link as LinkIcon, MessageCircle, Twitter } from "lucide-react";

function getCurrentPageUrl(announcementId: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

    return `${siteUrl}/news/${announcementId}`;
}

export default function ShareRow({
    announcementId,
    announcementTitle,
}: {
    announcementId: string;
    announcementTitle: string;
}) {
    const [copied, setCopied] = useState(false);

    const currentPageUrl = getCurrentPageUrl(announcementId);

    const xShareUrl = `https://x.com/intent/tweet?${new URLSearchParams({
        url: currentPageUrl,
        text: announcementTitle,
    }).toString()}`;
    
    const whatsappShareUrl = `https://wa.me/?${new URLSearchParams({
        text: `${announcementTitle} ${currentPageUrl}`,
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

    const sharedButtonClassName =
        "inline-flex items-center gap-2 rounded-full border border-base-300 px-4 py-2 text-sm font-medium text-base-content transition-colors hover:border-base-content/30 hover:bg-base-200";

    return (
        <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/55">
                Share
            </p>
            <div className="flex flex-wrap gap-3">
                <a
                    href={xShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={sharedButtonClassName}
                >
                    <Twitter className="h-4 w-4" aria-hidden="true" />
                    <span>Share on X</span>
                </a>
                <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={sharedButtonClassName}
                >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                </a>
                <button
                    type="button"
                    onClick={handleCopyLink}
                    className={sharedButtonClassName}
                >
                    <LinkIcon className="h-4 w-4" aria-hidden="true" />
                    <span>{copied ? "Copied!" : "Copy link"}</span>
                </button>
            </div>
        </section>
    );
}