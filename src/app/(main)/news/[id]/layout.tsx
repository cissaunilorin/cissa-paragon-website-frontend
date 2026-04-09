import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getAnnouncementById } from "@/lib/announcements";

function getAbsoluteImageUrl(imageUrl: string) {
    if (!imageUrl) return null;

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
        return imageUrl;
    }

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "http://localhost:3000";

    const cleanBaseUrl = baseUrl.replace(/\/$/, "");
    const cleanImageUrl = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;

    return `${cleanBaseUrl}${cleanImageUrl}`;
}

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

        const absoluteImageUrl = announcement.image_url
            ? getAbsoluteImageUrl(announcement.image_url)
            : null;

        return {
            title: `CISSA NEWS | ${announcement.title}`,
            description: `${announcement.body.substring(0, 160)}...`,
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
                description: `${announcement.body.substring(0, 160)}...`,
                images: absoluteImageUrl ? [absoluteImageUrl] : [],
                type: "article",
                publishedTime: announcement.published_at,
            },
            twitter: {
                card: "summary_large_image",
                title: `CISSA NEWS | ${announcement.title}`,
                description: `${announcement.body.substring(0, 160)}...`,
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

export default function AnnouncementLayout({ children }: { children: ReactNode }) {
    return children;
}