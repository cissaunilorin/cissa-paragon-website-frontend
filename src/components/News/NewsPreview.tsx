import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Announcement } from "@/lib/news";

export default function AnnouncementPreview({
    announcement,
}: {
    announcement: Announcement;
}) {
    return (
        <a
            href={`/news/${announcement.id}`}
            className="group block h-full"
            aria-label={`Read announcement: ${announcement.title}`}
        >
            <article className="card bg-base-100 shadow-md border border-base-200 overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
                {announcement.imageUrl && (
                    <figure className="relative w-full aspect-video">
                        <Image
                            src={announcement.imageUrl}
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
                        <span className="opacity-70">{announcement.date}</span>
                        {announcement.time && (
                            <span className="opacity-70">
                                {announcement.time}
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
