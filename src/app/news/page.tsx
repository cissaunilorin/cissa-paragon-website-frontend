"use client";

import React from "react";
import AnnouncementPreview from "@/components/News/NewsPreview";
import { getAnnouncements } from "@/lib/news";

export default function NewsPage() {
    const announcements = getAnnouncements();

    return (
        <main className="min-h-screen bg-base-100 pt-28 md:pt-32 pb-16">
            <div className="container mx-auto px-4">
                <header className="text-center mb-12">
                    <p className="text-sm uppercase tracking-wide text-primary font-semibold">
                        Faculty Updates
                    </p>
                    <h1 className="mt-3 text-4xl md:text-5xl font-bold text-base-content">
                        <span className="text-primary">News</span> &amp;
                        Announcements
                    </h1>
                    <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
                        Dive into the latest happenings across the Faculty of
                        Communication and Information Sciences.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {announcements.length > 0 ? (
                        announcements.map((announcement) => (
                            <AnnouncementPreview
                                key={announcement.id}
                                announcement={announcement}
                            />
                        ))
                    ) : (
                        <section className="text-center py-20">
                            <p className="text-base-content/60">
                                There are no announcements right now. Please
                                check back soon.
                            </p>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
