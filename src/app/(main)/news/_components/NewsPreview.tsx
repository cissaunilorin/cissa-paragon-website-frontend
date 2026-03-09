import React from "react";
import Image from "next/image";
import { type Announcement } from "@/lib/announcements";

export default function AnnouncementPreview({
    announcement,
}: {
    announcement: Announcement;
}) {

    const publishedDate = new Date(announcement.published_at);
    const date = publishedDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const time = publishedDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <a
            href={`/news/${announcement.id}`}
            className="group block h-full"
            aria-label={`Read announcement: ${announcement.title}`}
        >
            <article className="card bg-base-100 shadow-md border border-base-200 overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
                {announcement.image_url && (
                    <figure className="relative w-full aspect-video">
                        <Image
                            src={announcement.image_url}
                            alt={announcement.title}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        />
                    </figure>
                )}
                <div className="card-body p-5 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide">
                        <span className="badge badge-primary badge-sm font-semibold">
                            {announcement.category}
                        </span>
                        <span className="opacity-70">{date}</span>
                        {time && (
                            <span className="opacity-70">
                                {time}
                            </span>
                        )}
                    </div>
                    <h3 className="card-title text-base leading-snug line-clamp-3 group-hover:text-primary transition-colors duration-200">
                        {announcement.title}
                    </h3>
                </div>
            </article>
        </a>
    );
}
