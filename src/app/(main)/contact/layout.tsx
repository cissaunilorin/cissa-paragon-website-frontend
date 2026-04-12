import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch with the Communication and Information Sciences Students Association, University of Ilorin.",
	keywords: [
		"CISSA",
		"Contact CISSA",
		"University of Ilorin",
		"Communication and Information Sciences Students Association",
		"Reach CISSA",
	],
};

export default function ContactLayout({ children }: { children: ReactNode }) {
	return children;
}