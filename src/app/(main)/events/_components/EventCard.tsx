"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, MapPin } from "lucide-react";

import { type Event } from "@/lib/eventsData";

function getStartDateParts(event: Event) {
    const startDate = new Date(`${event.start_date}T00:00:00`);
    return {
        time: event.start_time,
        day: startDate.getDate(),
        month: startDate.toLocaleDateString("en-US", { month: "short" }),
        year: startDate.getFullYear(),
    };
}

function LocationIcon({
    locationType,
}: {
    locationType: Event["location_type"];
}) {
    if (locationType === "online") {
        return <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />;
    }

    if (locationType === "hybrid") {
        return (
            <span
                className="inline-flex items-center gap-1.5"
                aria-hidden="true"
            >
                <MapPin className="h-4 w-4 shrink-0" />
                <Globe className="h-4 w-4 shrink-0" />
            </span>
        );
    }

    return <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />;
}

export default function EventCard({ event }: { event: Event }) {
    const startDate = getStartDateParts(event);

    return (
        <article className="relative bg-base-100 py-6 md:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(5.5rem,0.58fr)_minmax(14rem,1.2fr)_minmax(0,2.4fr)] md:items-center md:gap-8">
                <div className="relative flex items-center">
                    <div className="flex min-w-0 flex-1 flex-col justify-center md:max-w-24 md:flex-none md:items-start">
                        <span className="text-sm font-medium tracking-wide">
                            {startDate.time}
                        </span>
                        <span className="text-5xl font-bold leading-none tracking-tight md:text-6xl">
                            {startDate.day}
                        </span>
                        <span className="mt-1 text-sm font-medium">
                            {startDate.month}, {startDate.year}
                        </span>
                    </div>
                </div>

                <div className="relative aspect-16/10 w-full rounded-md overflow-hidden bg-base-300 md:w-64 md:self-stretch">
                    {event.image_url ? (
                        <Image
                            src={event.image_url}
                            alt={event.title}
                            fill
                            sizes="(min-width: 768px) 16rem, 100vw"
                            className="object-cover"
                        />
                    ) : (
                        <div
                            className="absolute inset-0 bg-base-300"
                            aria-hidden="true"
                        />
                    )}
                </div>

                <div className="min-w-0 space-y-3 md:pl-2">
                    <Link
                        href={`/events/${event.id}`}
                        className="inline-block text-left text-xl font-bold uppercase tracking-[0.12em] text-base-content transition-colors hover:underline focus-visible:underline focus-visible:outline-none md:text-2xl"
                    >
                        <h2>{event.title}</h2>
                    </Link>

                    <div className="flex items-start gap-2 text-sm text-base-content/70 md:text-[0.98rem]">
                        <span
                            className="mt-0.5 inline-flex items-center gap-1.5 text-primary"
                            aria-hidden="true"
                        >
                            <LocationIcon locationType={event.location_type} />
                        </span>
                        <span className="min-w-0">{event.location}</span>
                    </div>

                    <p className="line-clamp-3 max-w-3xl text-sm leading-6 text-base-content/65 md:text-base md:leading-7">
                        {event.description}
                    </p>

                    <Link
                        href={`/events/${event.id}`}
                        className="inline-flex w-fit items-center rounded-full border border-base-300 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-base-100 active:bg-primary active:text-base-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    >
                        Learn more
                    </Link>
                </div>
            </div>
        </article>
    );
}
