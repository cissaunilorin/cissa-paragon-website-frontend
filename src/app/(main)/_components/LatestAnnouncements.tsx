"use client";

import React from "react";
import { useEffect, useState } from "react";
import AnnouncementPreview, {
    AnnouncementPreviewSkeleton,
} from "../news/_components/AnnouncementPreview";
import { getAnnouncements, type Announcement } from "@/lib/announcements";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LatestAnnouncements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getAnnouncements(1, 3);
                setAnnouncements(data.items);
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
                setError("Failed to load announcements. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
                <AnnouncementPreviewSkeleton key={index} />
            ))}
        </div>
    );

    return (
        <section id="news" className="py-20 bg-base-200">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-10 max-w-full text-center">
                    <p className="text-base font-bold uppercase tracking-[0.18em] text-primary md:text-2xl">
                        Latest News
                    </p>
                </div>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="py-16 text-center">
                        <div className="alert alert-error mx-auto max-w-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {announcements.length > 0 ? (
                            announcements.map((announcement) => (
                                <AnnouncementPreview
                                    key={announcement.id}
                                    announcement={announcement}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center opacity-70">
                                <p>
                                    No announcements available right now. Check back
                                    soon.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-10 flex justify-center md:mt-12">
                    <Link
                        href="/news"
                        className="group inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-base-content/70 transition-all duration-200 hover:border-base-300 hover:bg-base-100 hover:text-base-content active:border-base-300 active:bg-base-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    >
                        <span className="transition-colors group-hover:underline group-active:underline">
                            View all news
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}