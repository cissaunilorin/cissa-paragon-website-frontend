import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Phone } from "lucide-react";

import ImageModal from "@/components/ImageModal";
import ShareRow from "./_components/ShareRow";
import { formatRich } from "@/lib/utils/formatRich";
import { formatNumberToWhatsappLink } from "@/lib/utils/format";
import { getAnnouncementById } from "@/lib/announcements";

export default async function AnnouncementPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let announcement;
    try {
        announcement = await getAnnouncementById(id);

        if (!announcement) {
            notFound();
        }
    } catch (error) {
        console.error("Failed to fetch announcement:", error);
        notFound();
    }

    const publishedDate = new Date(announcement.published_at);
    const date = publishedDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <main className="min-h-screen bg-base-100 pb-16">
            <div className="container mx-auto px-0 max-w-4xl">
                <div className="mb-6 pt-2 px-4">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-1 text-sm text-base-content/55 underline-offset-4 transition-colors hover:text-base-content/80 hover:underline"
                        aria-label="Back to news"
                    >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        <span>Back to news</span>
                    </Link>
                </div>

                <article className="space-y-10">
                    <header className="px-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-base-content/55">
                            {date}
                        </p>
                        {announcement.session && (
                            <p className="mt-1.5 text-xs uppercase tracking-[0.22em] text-base-content/55">
                                {announcement.session}
                            </p>
                        )}
                        <h1 className="mt-4 max-w-full text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                            {announcement.title}
                        </h1>
                    </header>

                    {announcement.image_url && (
                        <div className="w-full aspect-video">
                            <ImageModal
                                imageUrl={announcement.image_url}
                                title={announcement.title}
                            />
                        </div>
                    )}

                    <div className="mx-auto flex w-full max-w-3xl justify-center px-4">
                        <section className="prose">
                            {formatRich(announcement.body)}
                        </section>
                    </div>

                    <ShareRow
                        announcementId={id}
                        announcementTitle={announcement.title}
                    />

                    {announcement.signatories &&
                        announcement.signatories.length > 0 && (
                            <footer className="pt-4 px-4">
                                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-base-content/55">
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
