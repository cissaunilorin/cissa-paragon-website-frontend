import React from "react";
import Image from "next/image";
import { getAnnouncements } from "@/lib/news";
import { formatRich } from "@/lib/formatRich";

// Helper to truncate plain text while respecting word boundaries
function truncateBody(body: string, max = 260): string {
    if (body.length <= max) return body;
    const slice = body.slice(0, max);
    const lastSpace = slice.lastIndexOf(" ");
    return (lastSpace > 120 ? slice.slice(0, lastSpace) : slice).trimEnd() + "...";
}

interface AnnouncementPreviewProps {
    limit?: number; // optionally limit number of items displayed
    showReadMore?: boolean;
}

export const AnnouncementPreviews: React.FC<AnnouncementPreviewProps> = ({ limit, showReadMore = true }) => {
    const announcements = getAnnouncements().slice(0, limit || undefined);
    const [modalImage, setModalImage] = React.useState<{ src: string; alt: string } | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.map(a => {
                    const truncated = truncateBody(a.body);
                    return (
                        <div key={a.id} className="card bg-base-100 shadow-md border border-base-200 flex flex-col overflow-hidden">
                            {a.imageUrl && (
                                <figure
                                    className="relative w-full aspect-video group cursor-zoom-in"
                                    role="button"
                                    tabIndex={0}
                                    aria-label="View full image"
                                    onClick={() => setModalImage({ src: a.imageUrl!, alt: a.title })}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setModalImage({ src: a.imageUrl!, alt: a.title });
                                        }
                                    }}
                                >
                                    <Image src={a.imageUrl} alt={a.title} fill className="object-cover transition-transform group-hover:scale-[1.02]" />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white tracking-wide">
                                        Click to view
                                    </div>
                                </figure>
                            )}
                            <div className="card-body p-5 flex flex-col gap-3">
                                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
                                    <span className="badge badge-primary badge-sm font-semibold">{a.category}</span>
                                    <span className="opacity-70">{a.date}</span>
                                    {a.time && <span className="opacity-70">{a.time}</span>}
                                </div>
                                <h3 className="card-title text-base leading-snug line-clamp-3">{a.title}</h3>
                                <div className="prose prose-sm max-w-none text-sm leading-relaxed">
                                    {formatRich(truncated)}
                                </div>
                                {a.hashtags && a.hashtags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {a.hashtags.map(h => (
                                            <span key={h} className="badge badge-outline badge-sm">
                                                #{h}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {showReadMore && (
                                    <div className="mt-auto pt-2">
                                        <a href={`/announcements/${a.id}`} className="btn btn-sm btn-primary">
                                            Read more
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {modalImage && (
                <dialog className="modal modal-open" onClose={() => setModalImage(null)}>
                    <div className="modal-box max-w-5xl p-2 shadow-xl border-0 bg-base-100">
                        <div className="relative w-full">
                            <Image
                                src={modalImage.src}
                                alt={modalImage.alt}
                                width={1600}
                                height={900}
                                className="w-full h-auto object-contain rounded"
                                priority={false}
                            />
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop" onClick={() => setModalImage(null)}>
                        <button aria-label="Close" />
                    </form>
                </dialog>
            )}
        </>
    );
};

export default AnnouncementPreviews;
