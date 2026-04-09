import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Events",
	description:
		"Stay updated on upcoming and past events from the Communication and Information Sciences Students Association, University of Ilorin.",
};

export default function EventsLayout({ children }: { children: ReactNode }) {
	return children;
}