"use client";

import EventCard from "./EventCard";
import { type Event } from "@/lib/events";

export default function EventsList({ events }: { events: Event[] }) {
    return (
        <ul className="space-y-5 sm:space-y-6">
            {events.map((event) => (
                <li key={event.id}>
                    <EventCard event={event} />
                </li>
            ))}
        </ul>
    );
}
