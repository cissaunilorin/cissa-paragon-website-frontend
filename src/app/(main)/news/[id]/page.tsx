import { Metadata } from "next";

import AnnouncementPage from "@/components/News/AnnouncementPage";

export const metadata: Metadata = {
    title: "Announcement",
    description:
        "Detailed view of news and announcements from the Faculty of Communication and Information Sciences at the University of Ilorin.",
    keywords: [
        "CISSA",
        "Communication and Information Sciences",
        "Student Association",
        "University of Ilorin",
        "CIS",
        "News",
        "Announcements",
        "Updates",
        "Details",
    ],
};

export default function AnnouncementPageWrapper({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return <AnnouncementPage params={params} />;
}
