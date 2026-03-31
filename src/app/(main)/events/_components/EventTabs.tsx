"use client";

import { useEffect, useState } from "react";

import EventsList from "./EventsList";
import { getEventStatus, type Event } from "./eventsData";

type TabKey = "upcoming" | "past";

export default function EventTabs({ events }: { events: Event[] }) {
    const upcomingEvents = events.filter((event) => getEventStatus(event) === "upcoming");
    const pastEvents = events.filter((event) => getEventStatus(event) === "past");

    const [activeTab, setActiveTab] = useState<TabKey>(
        upcomingEvents.length > 0 ? "upcoming" : "past",
    );

    useEffect(() => {
        if (!upcomingEvents.length && activeTab === "upcoming") {
            setActiveTab("past");
        }
    }, [activeTab, upcomingEvents.length]);

    const activeEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;
    const isEmpty = activeEvents.length === 0;

    return (
        <section className="space-y-6">
            <div role="tablist" aria-label="Events tabs" className="tabs tabs-bordered tabs-lg">
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "upcoming"}
                    className={`tab ${activeTab === "upcoming" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("upcoming")}
                >
                    Upcoming
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "past"}
                    className={`tab ${activeTab === "past" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("past")}
                >
                    Past
                </button>
            </div>

            {isEmpty ? (
                <div className="flex min-h-56 items-center justify-center text-center text-base-content/60">
                    {activeTab === "upcoming"
                        ? "No upcoming events right now. Check back soon."
                        : "No past events yet."}
                </div>
            ) : (
                <EventsList events={activeEvents} />
            )}
        </section>
    );
}