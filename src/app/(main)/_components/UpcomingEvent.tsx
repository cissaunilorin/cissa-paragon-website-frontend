import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type UpcomingEventData = {
    imageUrl: string;
    name: string;
    date: string;
    time: string;
    location: string;
    ctaLabel: string;
    ctaHref: string;
};

const upcomingEvent: UpcomingEventData = {
    imageUrl: "/assets/ov-2.png",
    name: "CISSA Freshers' Welcome Night",
    date: "Saturday, April 12 2026",
    time: "4:00 PM",
    location: "Faculty of CIS Auditorium, University of Ilorin",
    ctaLabel: "View Event",
    ctaHref: "/events/freshers-welcome-night-2026",
};

type UpcomingEventProps = {
    event?: UpcomingEventData;
};

export default function UpcomingEvent({ event = upcomingEvent }: UpcomingEventProps) {
    return (
        <section className="px-6 py-16 md:px-10 md:py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
                <div
                    className="relative aspect-4/3 w-full overflow-hidden bg-base-300/30"
                >
                    <Image
                        src={event.imageUrl}
                        alt="CISSA upcoming event"
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="max-w-2xl space-y-7 md:space-y-8">
                    <p className="text-sm md:text-lg font-bold uppercase tracking-[0.28em] text-base-content/55">
                        What&apos;s coming up
                    </p>

                    <div className="space-y-4 md:space-y-5">
                        <h2 className="text-3xl font-bold tracking-tight text-base-content md:text-5xl">
                            {event.name}
                        </h2>

                        <p className="text-base font-medium text-base-content/75 md:text-lg">
                            {event.date} · {event.time}
                        </p>

                        <div className="flex items-start gap-2 text-sm text-base-content/70 md:text-base">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <Link
                        href={event.ctaHref}
                        className="group btn btn-ghost px-4 text-sm font-semibold text-base-content hover:bg-transparent hover:text-base-content/70 md:px-5 md:text-base"
                    >
                        <span className="inline-flex items-center gap-2">
                            {event.ctaLabel}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </Link>
                </div>
            </div>

            <div className="mt-10 flex justify-center md:mt-12">
                <Link
                    href="/events"
                    className="btn btn-outline btn-primary rounded-full px-6 text-base font-bold normal-case shadow-none transition-transform duration-200 hover:-translate-y-0.5 md:text-lg"
                >
                    <span className="inline-flex items-center gap-2">
                        View all events
                        <ArrowRight className="h-4 w-4" />
                    </span>
                </Link>
            </div>
        </section>
    );
}