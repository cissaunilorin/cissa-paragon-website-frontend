"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, MapPin } from "lucide-react";

import { type Event } from "./eventsData";

function formatEventDate(event: Event) {
    const startDate = new Date(`${event.start_date}T00:00:00`);
    const startMonth = startDate.toLocaleDateString("en-US", { month: "long" });
    const startDay = startDate.getDate();
    const startYear = startDate.getFullYear();

    if (!event.end_date) {
        return `${startMonth} ${startDay}, ${startYear}`;
    }

    const endDate = new Date(`${event.end_date}T00:00:00`);
    const endMonth = endDate.toLocaleDateString("en-US", { month: "long" });
    const endDay = endDate.getDate();
    const endYear = endDate.getFullYear();

    if (startYear === endYear && startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${endYear}`;
    }

    if (startYear === endYear) {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
    }

    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
}

function LocationIcon({ locationType }: { locationType: Event["location_type"] }) {
    if (locationType === "online") {
        return <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />;
    }

    if (locationType === "hybrid") {
        return (
            <span className="inline-flex items-center gap-1.5" aria-hidden="true">
                <MapPin className="h-4 w-4 shrink-0" />
                <Globe className="h-4 w-4 shrink-0" />
            </span>
        );
    }

    return <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />;
}

export default function EventCard({ event }: { event: Event }) {
    const hasEndTime = Boolean(event.end_time);

    return (
        <article className="grid gap-6 py-8 md:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] md:items-stretch md:gap-8 md:py-10">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-300 md:aspect-auto md:min-h-[15rem] md:self-stretch">
                {event.image_url ? (
                    <Image
                        src={event.image_url}
                        alt={event.title}
                        fill
                        sizes="(min-width: 768px) 36vw, 100vw"
                        className="object-contain"
                    />
                ) : (
                    <div className="absolute inset-0 bg-base-300" aria-hidden="true" />
                )}
            </div>

            <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-base-content md:text-3xl">
                            {event.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-base-content/70 md:text-[0.98rem]">
                            <span>{formatEventDate(event)}</span>

                            <span>
                                {event.start_time}
                                {hasEndTime ? ` - ${event.end_time}` : ""}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-base-content/70 md:text-[0.98rem]">
                        <span className="mt-0.5 inline-flex items-center gap-1.5 text-base-content/70">
                            <LocationIcon locationType={event.location_type} />
                        </span>
                        <span>{event.location}</span>
                    </div>

                    <p className="line-clamp-3 max-w-3xl text-sm leading-6 text-base-content/65 md:text-base md:leading-7">
                        {event.description}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {event.requires_ticket && (
                        <span className="inline-flex items-center rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-base-content/75">
                            Ticket required
                        </span>
                    )}

                    <Link
                        href={`/events/${event.id}`}
                        className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary/80"
                    >
                        <span>View event</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}