import Link from "next/link";
import { Phone } from "lucide-react";

import ImageModal from "@/components/ImageModal";
import { formatRich } from "@/lib/utils/formatRich";
import { formatNumberToWhatsappLink } from "@/lib/utils/format";
import { type Announcement } from "@/lib/announcements";

export default function AnnouncementPage({
    announcement,
}: {
    announcement: Announcement;
}) {

    const publishedDate = new Date(announcement.published_at);
    const date = publishedDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const time = publishedDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <main className="min-h-screen bg-base-100 pt-16 md:pt-20 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <article className="mt-6 space-y-6">
                    <header className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide font-semibold">
                            <span className="badge badge-primary badge-sm">
                                {announcement.category}
                            </span>
                            <span className="opacity-70">{date}</span>
                            {time && <span className="opacity-70">{time}</span>}
                            {announcement.session && (
                                <span className="opacity-70">
                                    {announcement.session}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                            {announcement.title}
                        </h1>
                    </header>

                    {announcement.image_url && (
                        <ImageModal
                            imageUrl={announcement.image_url}
                            title={announcement.title}
                        />
                    )}

                    <section className="prose max-w-none">
                        {formatRich(announcement.body)}
                    </section>

                    {announcement.signatories &&
                        announcement.signatories.length > 0 && (
                            <footer className="border-t border-base-200 pt-6">
                                <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">
                                    Signed By
                                </h2>
                                <ul className="space-y-4">
                                    {announcement.signatories.map(
                                        (signatory) => (
                                            <li key={signatory.id}>
                                                <p className="font-semibold">
                                                    {signatory.name}
                                                    {signatory.alias && (
                                                        <span className="opacity-70">
                                                            {" "}
                                                            ({signatory.alias})
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm opacity-70">
                                                    {signatory.role}
                                                </p>
                                                {signatory.contact && (
                                                    <a
                                                        href={formatNumberToWhatsappLink(
                                                            signatory.contact
                                                        )}
                                                        className="link link-primary text-sm inline-flex items-center gap-1"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Phone
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                        />
                                                        <span>Contact</span>
                                                    </a>
                                                )}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </footer>
                        )}

                    <div className="pt-8 text-center">
                        <Link
                            href="/news"
                            className="btn btn-outline btn-primary btn-wide"
                            aria-label="View all news and announcements"
                        >
                            View all announcements
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}
