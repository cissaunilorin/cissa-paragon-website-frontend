import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";

import ImageModal from "@/components/shared/ImageModal";
import { formatRich } from "@/lib/utils/formatRich";
import { formatNumberToWhatsappLink } from "@/lib/utils/format";
import { getAnnouncementById } from "@/lib/announcements";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    try {
        const announcement = await getAnnouncementById(id);

        if (!announcement) {
            return {
                title: "Announcement Not Found",
                description: "The requested announcement could not be found.",
            };
        }

        // Ensure image URL is absolute for Open Graph/Twitter cards
        const getAbsoluteImageUrl = (imageUrl: string) => {
            if (!imageUrl) return null;

            // If already absolute URL, return as is
            if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
                return imageUrl;
            }

            // Construct absolute URL using the site's base URL
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
                           process.env.NEXT_PUBLIC_API_BASE_URL ||
                           'http://localhost:3000';

            // Remove trailing slash from baseUrl and leading slash from imageUrl if present
            const cleanBaseUrl = baseUrl.replace(/\/$/, '');
            const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;

            return `${cleanBaseUrl}${cleanImageUrl}`;
        };

        const absoluteImageUrl = announcement.image_url
            ? getAbsoluteImageUrl(announcement.image_url)
            : null;

        return {
            title: `CISSA NEWS | ${announcement.title}`,
            description: announcement.body.substring(0, 160) + "...",
            keywords: [
                "CISSA",
                "Communication and Information Sciences",
                "Student Association",
                "University of Ilorin",
                "CIS",
                "News",
                "Announcements",
                announcement.category,
                announcement.session,
            ],
            openGraph: {
                title: `CISSA NEWS | ${announcement.title}`,
                description: announcement.body.substring(0, 160) + "...",
                images: absoluteImageUrl ? [absoluteImageUrl] : [],
                type: "article",
                publishedTime: announcement.published_at,
            },
            twitter: {
                card: "summary_large_image",
                title: `CISSA NEWS | ${announcement.title}`,
                description: announcement.body.substring(0, 160) + "...",
                images: absoluteImageUrl ? [absoluteImageUrl] : [],
            },
        };
    } catch (error) {
        console.error("Failed to fetch announcement for metadata:", error);
        return {
            title: "Announcement",
            description:
                "Detailed view of news and announcements from the Faculty of Communication and Information Sciences at the University of Ilorin.",
        };
    }
}

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
