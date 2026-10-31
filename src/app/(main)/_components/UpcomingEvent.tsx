"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

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
        <section className="bg-base-100 py-16 sm:py-20 lg:py-28 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {/* Section Header */}
                    <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
                            <CalendarDays className="h-3.5 w-3.5" />
                            Events Calendar
                        </div>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
                            What&apos;s Coming Up
                        </h2>
                        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                            Join us for intellectual symposiums, sporting events, career bootcamps, and celebratory gatherings.
                        </p>
                    </div>

                    {loading ? (
                        <div className="space-y-6">
                            <EventCardSkeleton />
                            <EventCardSkeleton />
                        </div>
                    ) : events.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-base-300 bg-base-200/40 px-6 py-12 text-center">
                            <CalendarDays className="mx-auto h-10 w-10 text-base-content/30 mb-3" />
                            <h3 className="text-base font-semibold text-base-content">
                                No upcoming events scheduled right now
                            </h3>
                            <p className="text-sm text-base-content/60 mt-1 max-w-sm mx-auto">
                                Keep an eye on our announcements and social channels for upcoming faculty events.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-5 sm:space-y-6">
                                {events.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>

                            <div className="mt-10 sm:mt-12 flex justify-center">
                                <Link
                                    href="/events"
                                    className="group inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-6 py-3 text-sm font-semibold text-base-content transition-all hover:border-primary hover:bg-primary hover:text-white active:scale-95 shadow-xs"
                                >
                                    <span>View all faculty events</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
