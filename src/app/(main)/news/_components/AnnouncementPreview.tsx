import Image from "next/image";
import Link from "next/link";

import { type Announcement } from "@/lib/announcements";

function getExcerpt(body: string) {
    const cleanedBody = body
        .replace(/[*_`]+/g, "")
        .replace(/\s+/g, " ")
        .trim();

    if (cleanedBody.length <= 180) {
        return cleanedBody;
    }

    return `${cleanedBody.slice(0, 180).trimEnd()}…`;
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
            href={`/news/${announcement.id}`}
            className="group block h-full"
            aria-label={`Read announcement: ${announcement.title}`}
        >
            <article className="flex h-full flex-col gap-3">
                <div
                    className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-base-300"
                >
                    {announcement.image_url ? (
                        <Image
                            src={announcement.image_url}
                            alt={announcement.title}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-base-300 transition duration-300 group-hover:scale-105 group-hover:brightness-105" />
                    )}
                </div>

                <div className="space-y-2 px-0">
                    <h4 className="line-clamp-2 text-lg uppercase font-bold leading-snug text-base-content transition-colors duration-200 group-hover:text-base-content/90 md:text-xl">
                        {announcement.title}
                    </h4>

                    <p className="line-clamp-2 text-sm leading-6 text-base-content/65 md:text-[0.95rem]">
                        {getExcerpt(announcement.body)}
                    </p>

                    <p className="text-sm text-base-content/55">{date}</p>
                </div>
            </article>
        </Link>
    );
}

export function AnnouncementPreviewSkeleton() {
    return (
        <div className="space-y-3">
            <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-base-300 animate-pulse" />

            <div className="space-y-2">
                <div className="skeleton h-6 w-full" />
                <div className="skeleton h-6 w-4/5" />
            </div>

            <div className="space-y-2">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-11/12" />
            </div>

            <div className="skeleton h-4 w-24" />
        </div>
    );
}
