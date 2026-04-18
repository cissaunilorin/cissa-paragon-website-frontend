import type { Metadata } from "next";

import Hero from "./_components/Hero";

export const metadata: Metadata = {
	title: "About Us",
	description:
		"Learn about the Communication and Information Sciences Students Association, University of Ilorin. Our story, our people, and everything we stand for.",
};

export default function AboutPage() {
	return <Hero />;
}