"use client";

import EventCard from "./EventCard";
import { type Event } from "./eventsData";

export default function EventsList({ events }: { events: Event[] }) {
    return (
        <ul className="divide-y divide-primary/70">
            {events.map((event) => (
                <li key={event.id}>
                    <EventCard event={event} />
                </li>
            ))}
        </ul>
    );
}