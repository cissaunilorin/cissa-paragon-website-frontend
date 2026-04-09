"use client";

import { type Dispatch, type SetStateAction } from "react";

import { type Event } from "@/lib/events";

import EventCardSkeleton from "./EventCardSkeleton";
import EventsList from "./EventsList";

type TabKey = "upcoming" | "past";

export default function EventTabs({
    events,
    loading,
    activeTab,
    onTabChange,
}: {
    events: Event[];
    loading: boolean;
    activeTab: TabKey;
    onTabChange: Dispatch<SetStateAction<TabKey>>;
}) {
    const isEmpty = events.length === 0;

    return (
        <section className="space-y-6">
            <div role="tablist" aria-label="Events tabs" className="tabs tabs-border tabs-xl justify-center md:justify-start">
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "upcoming"}
                    className={`tab ${activeTab === "upcoming" ? "tab-active" : ""}`}
                    onClick={() => onTabChange("upcoming")}
                >
                    Coming Up
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "past"}
                    className={`tab ${activeTab === "past" ? "tab-active" : ""}`}
                    onClick={() => onTabChange("past")}
                >
                    Past Events
                </button>
            </div>

            {loading ? (
                <ul className="divide-y divide-primary/30">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <li key={index}>
                            <EventCardSkeleton />
                        </li>
                    ))}
                </ul>
            ) : isEmpty ? (
                <div className="flex min-h-56 items-center justify-center text-center text-base-content/60">
                    {activeTab === "upcoming"
                        ? "No upcoming events right now. Check back soon."
                        : "No past events yet."}
                </div>
            ) : (
                <EventsList events={events} />
            )}
        </section>
    );
}