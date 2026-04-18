import type { Metadata } from "next";

import Hero from "./_components/Hero";
import Departments from "./_components/Departments";
import WhatWeDo from "./_components/WhatWeDo";
import OurStructure from "./_components/OurStructure";
import MeetTheTeam from "./_components/MeetTheTeam";
import WhoWeAre from "./_components/WhoWeAre";

export const metadata: Metadata = {
	title: "About Us",
	description:
		"Learn about the Communication and Information Sciences Students Association, University of Ilorin. Our story, our people, and everything we stand for.",
};

export default function AboutPage() {
	return (
		<>
			<Hero />
			<WhoWeAre />
			<Departments />
			<WhatWeDo />
			<OurStructure />
			<MeetTheTeam />
		</>
	);
}