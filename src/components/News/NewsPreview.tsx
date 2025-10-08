import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Announcement } from "@/lib/news";
import { formatRich } from "@/lib/formatRich";

// Helper to truncate plain text while respecting word boundaries
function truncateBody(body: string, max = 260): string {
    if (body.length <= max) return body;
    const slice = body.slice(0, max);
    const lastSpace = slice.lastIndexOf(" ");
    return (
        (lastSpace > 120 ? slice.slice(0, lastSpace) : slice).trimEnd() + "..."
    );
}

export default function AnnouncementPreview({
    announcement,
}: {
    announcement: Announcement;
}) {
    const [showModal, setShowModal] = useState(false);
    const truncated = truncateBody(announcement.body);
    return (
        <>
            <div
                key={announcement.id}
                className="card bg-base-100 shadow-md border border-base-200 flex flex-col overflow-hidden"
            >
                {announcement.imageUrl && (
                    <figure
                        className="relative w-full aspect-video group cursor-zoom-in"
                        role="button"
                        tabIndex={0}
                        aria-label="View full image"
                        onClick={() => setShowModal(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setShowModal(true);
                            }
                        }}
                    >
                        <Image
                            src={announcement.imageUrl}
                            alt={announcement.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white tracking-wide">
                            Click to view
                        </div>
                    </figure>
                )}
                <div className="card-body p-5 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
                        <span className="badge badge-primary badge-sm font-semibold">
                            {announcement.category}
                        </span>
                        <span className="opacity-70">{announcement.date}</span>
                        {announcement.time && (
                            <span className="opacity-70">
                                {announcement.time}
                            </span>
                        )}
                    </div>
                    <h3 className="card-title text-base leading-snug line-clamp-3">
                        {announcement.title}
                    </h3>
                    <div className="prose prose-sm max-w-none text-sm leading-relaxed">
                        {formatRich(truncated)}
                    </div>
                    {announcement.hashtags &&
                        announcement.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {announcement.hashtags.map((h) => (
                                    <span
                                        key={h}
                                        className="badge badge-outline badge-sm"
                                    >
                                        #{h}
                                    </span>
                                ))}
                            </div>
                        )}

                    <div className="mt-auto pt-2">
                        <a
                            href={`/announcements/${announcement.id}`}
                            className="btn btn-sm btn-primary"
                        >
                            Read more
                        </a>
                    </div>
                </div>
            </div>

            {announcement.imageUrl && showModal && (
                <dialog
                    className="modal modal-open"
                    onClose={() => setShowModal(false)}
                >
                    <div className="modal-box max-w-5xl p-0 shadow-xl rounded-md">
                        <div className="relative w-full">
                            <Image
                                src={announcement.imageUrl}
                                alt={announcement.title}
                                width={1600}
                                height={900}
                                className="w-full h-auto object-contain rounded"
                                priority={false}
                            />
                        </div>
                    </div>
                    <form
                        method="dialog"
                        className="modal-backdrop"
                        onClick={() => setShowModal(false)}
                    >
                        <button aria-label="Close" />
                    </form>
                </dialog>
            )}
        </>
    );
}
