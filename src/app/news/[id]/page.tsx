import ImageModal from "@/components/ImageModal";
import { notFound } from "next/navigation";
import { formatRich } from "@/lib/formatRich";
import { getAnnouncementById, getAnnouncements } from "@/lib/news";
import Link from "next/link";

import { Phone } from "lucide-react";

export function generateStaticParams() {
    return getAnnouncements().map(({ id }) => ({ id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const announcement = await getAnnouncementById(id);
    if (!announcement) {
        return { title: "Announcement not found | CISSA News" };
    }
    return { title: `${announcement.title} | CISSA News` };
}

export default async function AnnouncementPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const announcement = await getAnnouncementById(id);

    if (!announcement) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-base-100 pt-16 md:pt-20 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <article className="mt-6 space-y-6">
                    <header className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide font-semibold">
                            <span className="badge badge-primary badge-sm">
                                {announcement.category}
                            </span>
                            <span className="opacity-70">
                                {announcement.date}
                            </span>
                            {announcement.time && (
                                <span className="opacity-70">
                                    {announcement.time}
                                </span>
                            )}
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

                    {announcement.imageUrl && (
                        <ImageModal
                            imageUrl={announcement.imageUrl}
                            title={announcement.title}
                        />
                    )}

                    <section className="prose max-w-none">
                        {formatRich(announcement.body)}
                    </section>

                    {announcement.hashtags &&
                        announcement.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {announcement.hashtags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="badge badge-soft badge-secondary badge-sm md:badge-md font-semibold"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                    {announcement.signatories &&
                        announcement.signatories.length > 0 && (
                            <footer className="border-t border-base-200 pt-6">
                                <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">
                                    Signed By
                                </h2>
                                <ul className="space-y-4">
                                    {announcement.signatories.map(
                                        (signatory) => (
                                            <li key={signatory.name}>
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
                                                        href={signatory.contact}
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
