"use client";

import { useEffect, useState } from "react";

import EventTabs from "./_components/EventTabs";
import { type Event, getEvents } from "@/lib/events";

type TabKey = "upcoming" | "past";

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

    useEffect(() => {
        let isActive = true;

        const loadEvents = async () => {
            setLoading(true);
            setError(false);

            try {
                const response = await getEvents(1, 100, {
                    time_status: activeTab,
                });

                if (!isActive) return;

                setEvents(response.items);
            } catch {
                if (!isActive) return;

                setError(true);
                setEvents([]);
            } finally {
                if (!isActive) return;

                setLoading(false);
            }
        };

        loadEvents();

        return () => {
            isActive = false;
        };
    }, [activeTab]);

    return (
        <main className="min-h-screen bg-base-100 pb-16">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mt-12 space-y-10 md:mt-16 md:space-y-12">
                    <header className="max-w-4xl">
                        <h1 className="text-4xl font-bold tracking-tight text-base-content md:text-6xl">
                            Events
                        </h1>
                    </header>
                    {error ? null : (
                        <EventTabs
                            events={events}
                            loading={loading}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
