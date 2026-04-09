import { Metadata } from "next";
import EventsDashboardClient from "./_components/EventsDashboardClient";

export const metadata: Metadata = {
    title: "Events",
    description: "Manage site events",
};

export default function EventsPage() {
    return <EventsDashboardClient />;
}