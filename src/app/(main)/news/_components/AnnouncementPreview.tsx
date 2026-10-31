import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";

import { type Announcement } from "@/lib/announcements";

function getExcerpt(body: string) {
    const cleanedBody = body
        .replace(/[*_`]+/g, "")
        .replace(/\s+/g, " ")
        .trim();

    if (cleanedBody.length <= 150) {
        return cleanedBody;
    }

    return `${cleanedBody.slice(0, 150).trimEnd()}…`;
}

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
        <Link
            href={`/news/${announcement.slug}`}
            className="group block h-full focus-visible:outline-none"
            aria-label={`Read announcement: ${announcement.title}`}
        >
            <article className="flex h-full flex-col justify-between rounded-3xl border border-base-300/80 bg-base-100 p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1">
                <div className="space-y-4">
                    {/* Image with date badge */}
                    <div className="relative aspect-16/10 sm:aspect-4/3 w-full overflow-hidden rounded-2xl bg-base-300">
                        {announcement.image_url ? (
                            <Image
                                src={announcement.image_url}
                                alt={announcement.title}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-base-300 flex items-center justify-center text-base-content/40">
                                <Newspaper className="h-8 w-8" />
                            </div>
                        )}

                        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-neutral-950/80 px-2.5 py-1 text-[0.72rem] font-medium text-white backdrop-blur-md shadow-xs">
                            <Calendar className="h-3 w-3 text-amber-300" />
                            <span>{date}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <h4 className="line-clamp-2 text-base sm:text-lg font-bold leading-snug text-base-content transition-colors duration-200 group-hover:text-primary">
                            {announcement.title}
                        </h4>

                        <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-base-content/70">
                            {getExcerpt(announcement.body)}
                        </p>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3 border-t border-base-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-primary">
                    <span>Read bulletin</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </article>
        </Link>
    );
}

export function AnnouncementPreviewSkeleton() {
    return (
        <div className="rounded-3xl border border-base-300/80 bg-base-100 p-4 sm:p-5 space-y-4 shadow-xs">
            <div className="aspect-16/10 sm:aspect-4/3 w-full overflow-hidden rounded-2xl bg-base-300 animate-pulse" />

            <div className="space-y-2">
                <div className="h-5 w-4/5 rounded-full bg-base-300 animate-pulse" />
                <div className="h-5 w-3/5 rounded-full bg-base-300 animate-pulse" />
            </div>

            <div className="space-y-2 pt-1">
                <div className="h-3.5 w-full rounded-full bg-base-300 animate-pulse" />
                <div className="h-3.5 w-4/5 rounded-full bg-base-300 animate-pulse" />
            </div>

            <div className="pt-3 border-t border-base-200">
                <div className="h-4 w-24 rounded-full bg-base-300 animate-pulse" />
            </div>
        </div>
    );
}
