import { Metadata } from "next";
import { notFound } from "next/navigation";

import AnnouncementPage from "@/components/News/AnnouncementPage";
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

export default async function AnnouncementPageWrapper({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    try {
        const announcement = await getAnnouncementById(id);

        if (!announcement) {
            notFound();
        }

        return <AnnouncementPage announcement={announcement} />;
    } catch (error) {
        console.error("Failed to fetch announcement:", error);
        notFound();
    }
}
