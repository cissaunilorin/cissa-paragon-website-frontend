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

    return (
        <a
            href={`/news/${announcement.id}`}
            className="group block h-full"
            aria-label={`Read announcement: ${announcement.title}`}
        >
            <article className="relative aspect-square overflow-hidden rounded-2xl bg-base-300 shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                {announcement.image_url ? (
                    <Image
                        src={announcement.image_url}
                        alt={announcement.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                ) : (
                    <div className="absolute inset-0 bg-base-300" />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent transition duration-300 group-hover:brightness-110" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                    <div className="mb-3 flex items-center justify-start gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
                        <span>{date}</span>
                    </div>

                    <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white transition-colors duration-200 group-hover:text-white/95 md:text-xl">
                        {announcement.title}
                    </h3>
                </div>
            </article>
        </a>
    );
}
