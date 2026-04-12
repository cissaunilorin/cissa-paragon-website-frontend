import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getEventById } from "@/lib/events";

function getAbsoluteImageUrl(imageUrl: string) {
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
        const event = await getEventById(id);

        if (!event) {
            return {
                title: "Event Not Found",
                description: "The requested event could not be found.",
            };
        }

        const absoluteImageUrl = event.image_url ? getAbsoluteImageUrl(event.image_url) : null;

        return {
            title: {
                absolute: `CISSA EVENTS | ${event.title}`,
            },
            description: event.description.substring(0, 160),
            openGraph: {
                title: `CISSA EVENTS | ${event.title}`,
                description: event.description.substring(0, 160),
                images: absoluteImageUrl ? [absoluteImageUrl] : [],
                type: "article",
            },
            twitter: {
                card: "summary_large_image",
                title: `CISSA EVENTS | ${event.title}`,
                description: event.description.substring(0, 160),
                images: absoluteImageUrl ? [absoluteImageUrl] : [],
            },
        };
    } catch (error) {
        console.error("Failed to fetch event for metadata:", error);
        return {
            title: "Events | CISSA",
            description:
                "Stay updated on upcoming and past events from the Communication and Information Sciences Students Association, University of Ilorin.",
        };
    }
}

export default function EventLayout({ children }: { children: ReactNode }) {
    return children;
}