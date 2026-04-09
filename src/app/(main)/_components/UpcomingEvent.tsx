"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import EventCard from "@/app/(main)/events/_components/EventCard";
import EventCardSkeleton from "@/app/(main)/events/_components/EventCardSkeleton";
import { type Event, getEvents } from "@/lib/events";

export default function UpcomingEvent() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isActive = true;

        const loadEvents = async () => {
            try {
                const response = await getEvents(1, 3, {
                    time_status: "upcoming",
                });

                if (!isActive) return;

                setEvents(response.items);
            } catch {
                if (!isActive) return;

                setError(true);
            } finally {
                if (!isActive) return;

                setLoading(false);
            }
        };

        loadEvents();

        return () => {
            isActive = false;
        };
    }, []);

    if (error) {
        return null;
    }

    return (
        <section className="px-6 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 max-w-full text-center">
                    <p className="text-base font-bold uppercase tracking-[0.18em] text-primary md:text-2xl">
                        What&apos;s coming up
                    </p>
                </div>

                {loading ? (
                    <EventCardSkeleton />
                ) : events.length === 0 ? (
                    <div className="rounded-2xl border border-base-200 bg-base-100 px-6 py-10 text-center text-base-content/60">
                        No upcoming events right now. Check back soon.
                    </div>
                ) : (
                    <>
                        <ul className="divide-y divide-primary/30">
                            {events.map((event) => (
                                <li key={event.id}>
                                    <EventCard event={event} />
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex justify-center md:mt-10">
                            <Link
                                href="/events"
                                className="group inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-base-content/70 transition-all duration-200 hover:border-base-300 hover:bg-base-100 hover:text-base-content active:border-base-300 active:bg-base-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                            >
                                <span className="transition-colors group-hover:underline group-active:underline">
                                    View all events
                                </span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
