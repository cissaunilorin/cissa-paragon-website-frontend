import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getEventById } from "@/lib/events";

import BackLink from "./_components/BackLink";
import EventDetails from "./_components/EventDetails";

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

        const getAbsoluteImageUrl = (imageUrl: string) => {
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
        };

        const absoluteImageUrl = event.image_url
            ? getAbsoluteImageUrl(event.image_url)
            : null;

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

export default async function EventPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let event;
    try {
        event = await getEventById(id);

        if (!event) {
            notFound();
        }
    } catch (error) {
        console.error("Failed to fetch event:", error);
        notFound();
    }

    return (
        <main className="min-h-screen bg-base-100 pb-16">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="py-6 md:py-8">
                    <BackLink />
                </div>

                <EventDetails event={event} />
            </div>
        </main>
    );
}