"use client";

import { type Dispatch, type SetStateAction } from "react";
import { CalendarDays, History } from "lucide-react";

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
        <section className="space-y-8">
            {/* Custom Tab Selector */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-base-200/70 w-fit max-w-full overflow-x-auto border border-base-300">
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "upcoming"}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                        activeTab === "upcoming"
                            ? "bg-primary text-white shadow-xs"
                            : "text-base-content/70 hover:text-base-content hover:bg-base-100"
                    }`}
                    onClick={() => onTabChange("upcoming")}
                >
                    <CalendarDays className="h-4 w-4" />
                    <span>Coming Up</span>
                </button>

                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "past"}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                        activeTab === "past"
                            ? "bg-primary text-white shadow-xs"
                            : "text-base-content/70 hover:text-base-content hover:bg-base-100"
                    }`}
                    onClick={() => onTabChange("past")}
                >
                    <History className="h-4 w-4" />
                    <span>Past Events</span>
                </button>
            </div>

            {loading ? (
                <ul className="space-y-5 sm:space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <li key={index}>
                            <EventCardSkeleton />
                        </li>
                    ))}
                </ul>
            ) : isEmpty ? (
                <div className="rounded-3xl border border-dashed border-base-300 bg-base-200/40 p-12 text-center text-base-content/60">
                    <CalendarDays className="mx-auto h-10 w-10 text-base-content/30 mb-3" />
                    <p className="font-medium">
                        {activeTab === "upcoming"
                            ? "No upcoming events scheduled right now. Check back soon!"
                            : "No past event archives recorded yet."}
                    </p>
                </div>
            ) : (
                <EventsList events={events} />
            )}
        </section>
    );
}
