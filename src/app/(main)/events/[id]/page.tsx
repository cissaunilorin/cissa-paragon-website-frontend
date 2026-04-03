import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { eventsData } from "../_components/eventsData";

import BackLink from "./_components/BackLink";
import EventDetails from "./_components/EventDetails";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const event = eventsData.find((item) => item.id === id);

    if (!event) {
        return {
            title: "Event Not Found",
            description: "The requested event could not be found.",
        };
    }

    return {
        title: `${event.title}`,
        description: event.description.slice(0, 160),
    };
}

export default async function EventPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const event = eventsData.find((item) => item.id === id);

    if (!event) {
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