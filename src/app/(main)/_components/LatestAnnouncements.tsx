"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

import AnnouncementPreview, {
    AnnouncementPreviewSkeleton,
} from "../news/_components/AnnouncementPreview";
import { getAnnouncements, type Announcement } from "@/lib/announcements";

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
                <AnnouncementPreviewSkeleton key={index} />
            ))}
        </div>
    );

    return (
        <section id="news" className="py-16 sm:py-20 lg:py-28 bg-base-200/50 relative">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
                        <Newspaper className="h-3.5 w-3.5" />
                        Faculty Newsroom
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
                        Latest Bulletins & Updates
                    </h2>
                    <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                        Stay informed with official memos, academic schedules, association press releases, and campus stories.
                    </p>
                </div>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="py-12 text-center">
                        <div className="alert alert-error mx-auto max-w-md rounded-2xl">
                            <span>{error}</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {announcements.length > 0 ? (
                            announcements.map((announcement) => (
                                <AnnouncementPreview
                                    key={announcement.id}
                                    announcement={announcement}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center text-base-content/60">
                                <p>No announcements available right now. Check back soon.</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-10 sm:mt-12 flex justify-center">
                    <Link
                        href="/news"
                        className="group inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-6 py-3 text-sm font-semibold text-base-content transition-all hover:border-primary hover:bg-primary hover:text-white active:scale-95 shadow-xs"
                    >
                        <span>View all announcements</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
