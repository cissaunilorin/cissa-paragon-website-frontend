import {
	GraduationCap,
	HeartHandshake,
	Laptop,
	Megaphone,
	PartyPopper,
	Trophy,
} from "lucide-react";

type Responsibility = {
	title: string;
	description: string;
	example: string;
	icon: typeof GraduationCap;
};

const responsibilities: Responsibility[] = [
	{
		title: "Academic Empowerment",
		icon: GraduationCap,
		description:
			"CISSA organizes tutorials, revision sessions, and academic seminars to support student performance. These programs are designed to simplify complex courses and improve results.",
		example: "Faculty-wide exam revision classes before semester exams.",
	},
	{
		title: "Welfare Support",
		icon: HeartHandshake,
		description:
			"The association addresses student concerns and ensures their well-being within the faculty. It acts as a communication bridge between students and faculty authorities.",
		example:
			"Resolution of academic complaints, CISSA Mental Health Awareness, and Clean-up Fest.",
	},
	{
		title: "Social Events",
		icon: PartyPopper,
		description:
			"CISSA organizes events that promote interaction and relaxation among students. These events help build community and strengthen relationships across departments.",
		example: "CISSA Freshers' Week.",
	},
	{
		title: "Sports",
		icon: Trophy,
		description:
			"The association promotes physical activities and inter-departmental competitions. Sports help foster unity and healthy competition within the faculty.",
		example: "Dean's Cup football competition.",
	},
	{
		title: "Career & Tech",
		icon: Laptop,
		description:
			"CISSA provides opportunities for skill development and career growth through workshops and training programs. These initiatives prepare students for the job market.",
		example: "Tech bootcamps on web development and digital skills.",
	},
	{
		title: "Representation",
		icon: Megaphone,
		description:
			"CISSA represents students in discussions with faculty management and ensures their voices are heard. It advocates for policies that benefit the student body.",
		example: "Student representation in faculty meetings.",
	},
];

function ResponsibilityCard({
	responsibility,
	position,
}: {
	responsibility: Responsibility;
	position: "left" | "right";
}) {
	const Icon = responsibility.icon;
	const dividerClasses =
		position === "left"
			? "md:border-r md:border-primary/10"
			: "border-t border-primary/10 md:border-t-0";

	return (
		<article
			className={[
				"space-y-5 p-6 md:p-8 lg:p-10",
				dividerClasses,
			].join(" ")}
		>
			<div className="space-y-4">
				<div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
					<Icon className="size-7" strokeWidth={2} />
				</div>

				<h3 className="text-xl font-bold leading-tight text-base-content md:text-2xl">
					{responsibility.title}
				</h3>

				<p className="max-w-prose text-base leading-8 text-base-content/80 md:text-lg md:leading-9">
					{responsibility.description}
				</p>
			</div>

			<div className="space-y-2 border-t border-primary/10 pt-4">
				<p className="text-xs font-bold uppercase tracking-[0.22em] text-base-content/55">
					Example:
				</p>
				<p className="text-sm leading-7 text-base-content/70 md:text-base md:leading-8">
					{responsibility.example}
				</p>
			</div>
		</article>
	);
}

function ResponsibilityRow({
	left,
	right,
	showTopDivider,
}: {
	left: Responsibility;
	right: Responsibility;
	showTopDivider: boolean;
}) {
	return (
		<div
			className={[
				"grid grid-cols-1 md:grid-cols-2",
				showTopDivider ? "border-t border-primary/10" : "",
			].join(" ")}
		>
			<ResponsibilityCard responsibility={left} position="left" />
			<ResponsibilityCard responsibility={right} position="right" />
		</div>
	);
}

export default function WhatWeDo() {
	return (
		<section className="bg-base-200 py-16 md:py-20 lg:py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 text-center md:mb-14">
						<p className="text-lg font-bold uppercase tracking-[0.22em] text-primary md:text-2xl">
							What We Do
						</p>
					</div>

					<div>
						<ResponsibilityRow
							left={responsibilities[0]}
							right={responsibilities[1]}
							showTopDivider={false}
						/>
						<ResponsibilityRow
							left={responsibilities[2]}
							right={responsibilities[3]}
							showTopDivider
						/>
						<ResponsibilityRow
							left={responsibilities[4]}
							right={responsibilities[5]}
							showTopDivider
						/>
					</div>
				</div>
			</div>
		</section>
	);
}