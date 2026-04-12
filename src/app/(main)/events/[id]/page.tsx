import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ExternalLink, Globe, MapPin } from "lucide-react";

import { getEventById } from "@/lib/events";
import { formatTimeTo12Hour } from "@/lib/utils/format";
import { formatRich } from "@/lib/utils/formatRich";

import BackLink from "./_components/BackLink";

function formatEventDate(startDateString: string, endDateString: string | null) {
    const startDate = new Date(`${startDateString}T00:00:00`);
    const startMonth = startDate.toLocaleDateString("en-US", { month: "long" });
    const startDay = startDate.getDate();
    const startYear = startDate.getFullYear();

    if (!endDateString) {
        return `${startMonth} ${startDay}, ${startYear}`;
    }

    const endDate = new Date(`${endDateString}T00:00:00`);
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

function LocationIcon({ locationType }: { locationType: "online" | "physical" | null }) {
    if (locationType === "online") {
        return <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />;
    }

    if (locationType === "physical") {
        return (
            <span className="inline-flex items-center gap-1.5" aria-hidden="true">
                <MapPin className="h-4 w-4 shrink-0" />
            </span>
        );
    }

    return <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />;
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

                <article className="grid gap-8 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:items-start md:gap-10">
                    <div className="min-w-0">
                        {event.image_url ? (
                            <Image
                                src={event.image_url}
                                alt={event.title}
                                width={1400}
                                height={1050}
                                sizes="(min-width: 768px) 40vw, 100vw"
                                className="h-auto w-full object-contain"
                            />
                        ) : (
                            <div className="flex min-h-72 w-full items-center justify-center bg-base-300">
                                <Calendar className="h-12 w-12 text-base-content/40" aria-hidden="true" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-8 md:space-y-10">
                        <header className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight text-base-content md:text-6xl">
                                {event.title}
                            </h1>

                            <div className="space-y-3 text-base text-base-content/75 md:text-lg">
                                <div className="flex items-start gap-2">
                                    <Calendar className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                                    <span>{formatEventDate(event.start_date, event.end_date)}</span>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                                    <span>
                                        {formatTimeTo12Hour(event.start_time)}
                                        {event.end_time
                                            ? ` - ${formatTimeTo12Hour(event.end_time)}`
                                            : ""}
                                    </span>
                                </div>

                                <div className="flex items-start gap-2">
                                    <LocationIcon locationType={event.location_type} />
                                    <span>{event.location}</span>
                                </div>

                                {event.session && (
                                    <p className="text-sm text-base-content/55">{event.session}</p>
                                )}
                            </div>
                        </header>

                        <div className="border-t border-base-200/70 pt-6">
                            <div className="prose max-w-none text-base-content/80 md:prose-lg">
                                {formatRich(event.description)}
                            </div>

                            {event.requires_ticket && event.ticket_url && (
                                <div className="pt-8">
                                    <Link
                                        href={event.ticket_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary gap-2 rounded-full px-6 normal-case shadow-none"
                                    >
                                        <span>Get Tickets</span>
                                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}