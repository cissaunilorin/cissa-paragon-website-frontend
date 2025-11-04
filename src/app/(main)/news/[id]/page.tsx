"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";

import ImageModal from "@/components/ImageModal";
import { formatRich } from "@/lib/utils/formatRich";
import { formatNumberToWhatsappLink } from "@/lib/utils/format";
import { getAnnouncementById, type Announcement } from "@/lib/announcements";

export default function AnnouncementPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const getParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };
        getParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchAnnouncement = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getAnnouncementById(id);
                if (!data) {
                    notFound();
                    return;
                }
                setAnnouncement(data);
            } catch (error) {
                console.error("Failed to fetch announcement:", error);
                setError(
                    "Failed to load announcement. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnnouncement();
    }, [id]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-base-100 pt-16 md:pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mt-6 space-y-6 animate-pulse">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="skeleton h-6 w-20"></div>
                                <div className="skeleton h-6 w-24"></div>
                                <div className="skeleton h-6 w-16"></div>
                            </div>
                            <div className="skeleton h-12 w-full"></div>
                        </div>
                        <div className="skeleton h-64 w-full"></div>
                        <div className="space-y-3">
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-3/4"></div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-base-100 pt-16 md:pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center py-16">
                        <div className="alert alert-error max-w-md mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                        <Link href="/news" className="btn btn-primary mt-4">
                            Back to News
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (!announcement) {
        notFound();
        return null;
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
