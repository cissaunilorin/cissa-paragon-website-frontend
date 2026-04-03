import { Metadata } from "next";

import EventsHeader from "./_components/EventsHeader";
import EventTabs from "./_components/EventTabs";
import { eventsData } from "./_components/eventsData";

export const metadata: Metadata = {
	title: "Events",
	description:
		"Stay updated on upcoming and past events from the Communication and Information Sciences Students Association, University of Ilorin.",
};

export default function EventsPage() {
	return (
		<main className="min-h-screen bg-base-100 pb-16">
			<div className="container mx-auto max-w-7xl px-4">
				<div className="mt-12 space-y-10 md:mt-16 md:space-y-12">
					<EventsHeader />
					<EventTabs events={eventsData} />
				</div>
			</div>
		</main>
	);
}
