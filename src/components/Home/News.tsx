import React from "react";
import AnnouncementPreview from "../News/NewsPreview";
import { getAnnouncements } from "@/lib/news";

export default function News() {
    const announcements = getAnnouncements().slice(0, 3); // Show only the latest 3 announcements
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.length > 0 ? (
                        announcements.map((announcement) => (
                            <AnnouncementPreview
                                key={announcement.id}
                                announcement={announcement}
                            />
                        ))
                    ) : (
                        <div className="text-center py-16 opacity-70">
                            <p>
                                No announcements available right now. Check back
                                soon.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-10 text-center">
                    <a href="/news" className="btn btn-outline">
                        View all faculty news
                    </a>
                </div>
            </div>
        </section>
    );
}
