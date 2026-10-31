"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Globe, MapPin } from "lucide-react";

import { type Event } from "@/lib/events";
import { formatTimeTo12Hour } from "@/lib/utils/format";

function getExcerpt(body: string) {
    const cleanedBody = body
        .replace(/[*_`]+/g, "")
        .replace(/\s+/g, " ")
        .trim();

    if (cleanedBody.length <= 160) {
        return cleanedBody;
    }

    return `${cleanedBody.slice(0, 160).trimEnd()}…`;
}

function getStartDateParts(event: Event) {
    const startDate = new Date(`${event.start_date}T00:00:00`);
    return {
        time: formatTimeTo12Hour(event.start_time),
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

    return <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />;
}

export default function EventCard({ event }: { event: Event }) {
    const startDate = getStartDateParts(event);

    return (
        <article className="group relative rounded-3xl border border-base-300/80 bg-base-100 p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[auto_16rem_1fr] lg:grid-cols-[auto_18rem_1fr] md:items-center md:gap-7">
                {/* Date display (Desktop) */}
                <div className="hidden md:flex min-w-24 flex-col items-center justify-center rounded-2xl bg-base-200/60 p-4 text-center border border-base-200">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {startDate.month}
                    </span>
                    <span className="text-4xl font-black leading-none tracking-tight text-base-content my-1">
                        {startDate.day}
                    </span>
                    <span className="text-xs font-medium text-base-content/60">
                        {startDate.year}
                    </span>
                    <div className="mt-2.5 flex items-center gap-1 text-[0.72rem] font-medium text-base-content/70">
                        <Clock className="h-3 w-3" />
                        <span>{startDate.time}</span>
                    </div>
                </div>

                {/* Event Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-base-300 md:self-stretch">
                    {event.image_url ? (
                        <Image
                            src={event.image_url}
                            alt={event.title}
                            fill
                            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 100vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div
                            className="absolute inset-0 bg-base-300 flex items-center justify-center text-base-content/40"
                            aria-hidden="true"
                        >
                            <Calendar className="h-8 w-8" />
                        </div>
                    )}

                    {/* Mobile Floating Date Badge */}
                    <div className="md:hidden absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-neutral-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-md">
                        <Calendar className="h-3 w-3 text-amber-300" />
                        <span>{startDate.month} {startDate.day}, {startDate.year}</span>
                        <span className="text-white/40">•</span>
                        <span>{startDate.time}</span>
                    </div>
                </div>

                {/* Content details */}
                <div className="min-w-0 space-y-3">
                    <Link
                        href={`/events/${event.slug}`}
                        className="group/title block focus-visible:outline-none"
                    >
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-base-content transition-colors group-hover/title:text-primary">
                            {event.title}
                        </h2>
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-base-content/70">
                        <span className="text-primary" aria-hidden="true">
                            <LocationIcon locationType={event.location_type} />
                        </span>
                        <span className="truncate">{event.location}</span>
                    </div>

                    <p className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm leading-relaxed text-base-content/70">
                        {getExcerpt(event.description)}
                    </p>

                    <div className="pt-1">
                        <Link
                            href={`/events/${event.slug}`}
                            className="group/link inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-base-content transition-all hover:border-primary hover:bg-primary hover:text-white active:scale-95"
                        >
                            <span>Learn more</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
