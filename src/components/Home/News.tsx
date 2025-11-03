"use client";

import React from "react";
import { useEffect, useState } from "react";
import AnnouncementPreview from "../News/NewsPreview";
import { getAnnouncements, type Announcement } from "@/lib/announcements";
import Link from "next/link";

export default function News() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="card bg-base-100 shadow-md border border-base-200 overflow-hidden">
                    <div className="skeleton h-48 w-full"></div>
                    <div className="card-body p-5 space-y-3">
                        <div className="flex gap-2">
                            <div className="skeleton h-4 w-16"></div>
                            <div className="skeleton h-4 w-20"></div>
                        </div>
                        <div className="skeleton h-6 w-full"></div>
                        <div className="skeleton h-6 w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section id="news" className="py-20 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Latest <span className="text-primary">News</span> &amp;
                        Announcements
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Stay updated with important faculty updates, events, and
                        opportunities.
                    </p>
                </div>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="alert alert-error max-w-md mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {announcements.length > 0 ? (
                            announcements.map((announcement) => (
                                <AnnouncementPreview
                                    key={announcement.id}
                                    announcement={announcement}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 opacity-70">
                                <p>
                                    No announcements available right now. Check back
                                    soon.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-10 text-center">
                    <Link href="/news" className="btn btn-outline">
                        View all faculty news
                    </Link>
                </div>
            </div>
        </section>
    );
}
