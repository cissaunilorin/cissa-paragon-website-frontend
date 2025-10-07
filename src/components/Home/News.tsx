import React from "react";
import { AnnouncementPreviews } from "@/components/News/NewsPreview";
import { getAnnouncements } from "@/lib/news";

export default function News() {
    const announcements = getAnnouncements();
    return (
        <section id="news" className="py-20 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Latest <span className="text-primary">News</span> &amp; Announcements
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Stay updated with important faculty updates, events, and opportunities.
                    </p>
                </div>

                {announcements.length > 0 ? (
                    <AnnouncementPreviews limit={6} />
                ) : (
                    <div className="text-center py-16 opacity-70">
                        <p>No announcements available right now. Check back soon.</p>
                    </div>
                )}

                <div className="mt-10 text-center">
                    <a href="/announcements" className="btn btn-outline">
                        View all announcements
                    </a>
                </div>
            </div>
        </section>
    );
}