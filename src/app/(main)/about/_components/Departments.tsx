import { Clapperboard, Code2, LibraryBig, Radio, Wifi } from "lucide-react";

type Department = {
	name: string;
	description: string;
	students: string;
	focusAreas: string;
	icon: typeof Code2;
};

const departments = [
	{
		name: "Computer Science",
		icon: Code2,
		description:
			"This department focuses on computing systems, software development, and problem-solving using technology. Students are trained in programming, algorithms, and system design.",
		students:
			"Individuals interested in coding, software engineering, and tech innovation.",
		focusAreas: "Software development, AI fundamentals, data structures.",
	},
	{
		name: "Information & Communication Science",
		icon: Radio,
		description:
			"This department combines information management with communication technologies. It focuses on how information is created, processed, and shared across systems.",
		students:
			"Those interested in data handling, digital communication, and information systems.",
		focusAreas: "Information systems, data communication, digital services.",
	},
	{
		name: "Library & Information Science",
		icon: LibraryBig,
		description:
			"This department emphasizes the organization, storage, and retrieval of information resources. It prepares students for roles in libraries, archives, and data centers.",
		students:
			"Individuals interested in knowledge management and information organization.",
		focusAreas: "Archiving, cataloguing, digital libraries.",
	},
	{
		name: "Mass Communication",
		icon: Clapperboard,
		description:
			"This department focuses on media, journalism, and public communication. Students are trained in content creation, broadcasting, and media ethics.",
		students:
			"Those passionate about journalism, media production, and storytelling.",
		focusAreas: "Broadcasting, public relations, digital media.",
	},
	{
		name: "Telecommunication Science",
		icon: Wifi,
		description:
			"This department deals with communication systems, networks, security and signal transmission. It combines engineering principles with communication technologies.",
		students:
			"Individuals interested in networking, telecommunications, and infrastructure systems.",
		focusAreas:
			"Networking, signal processing, security, CCTV, mobile communication.",
	},
] satisfies Department[];

export default function Departments() {
	return (
		<section className="bg-base-100 py-16 md:py-20 lg:py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 text-center md:mb-14">
						<p className="text-lg font-bold uppercase tracking-[0.22em] text-primary md:text-2xl">
							Our Departments
						</p>
					</div>

					<div className="divide-y divide-primary/30">
						{departments.map((department) => {
							const Icon = department.icon;

							return (
							<article
								key={department.name}
								className="p-6 md:p-8"
							>
								<div className="space-y-6">
									<div className="flex items-center gap-3">
										<Icon className="size-5 shrink-0 text-primary md:size-6" />
										<h3 className="text-xl font-bold leading-tight text-base-content md:text-2xl">
											{department.name}
										</h3>
									</div>

									<div className="grid gap-6 md:grid-cols-2 md:gap-8">
										<div className="space-y-2">
											<p className="text-base leading-8 text-base-content/80 md:text-lg md:leading-9">
												{department.description}
											</p>
										</div>

										<div className="space-y-6">
											<div className="space-y-2">
												<p className="text-xs font-bold uppercase tracking-[0.22em] text-base-content/60">
													Who studies here:
												</p>
												<p className="text-base leading-7 text-base-content/80 md:text-lg md:leading-8">
													{department.students}
												</p>
											</div>

											<div className="space-y-2">
												<p className="text-xs font-bold uppercase tracking-[0.22em] text-base-content/60">
													Focus areas:
												</p>
												<p className="text-base leading-7 text-base-content/80 md:text-lg md:leading-8">
													{department.focusAreas}
												</p>
											</div>
										</div>
									</div>
								</div>
							</article>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}