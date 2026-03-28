import type { Metadata } from "next";
import Hero from "./_components/Hero";
import ContactInfo from "./_components/ContactInfo";

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

export default function ContactPage() {
	return (
		<>
			<Hero />
			<ContactInfo />
		</>
	);
}
