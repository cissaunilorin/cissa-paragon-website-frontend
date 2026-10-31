import {
	Clapperboard,
	Code2,
	LibraryBig,
	Radio,
	Wifi,
	Shield,
	GraduationCap,
} from "lucide-react";

type Department = {
	name: string;
	description: string;
	students: string;
	focusAreas: string[];
	icon: typeof Code2;
	color: string;
};

const departments: Department[] = [
	{
		name: "Computer Science",
		icon: Code2,
		color: "text-blue-600 bg-blue-500/10 border-blue-500/20",
		description:
			"Focuses on computing architecture, modern software engineering, and computational problem-solving. Students master algorithms, data structures, and intelligent systems.",
		students:
			"Individuals passionate about coding, software architecture, and technology innovation.",
		focusAreas: ["Software Engineering", "AI & ML", "Algorithms", "Cloud Computing"],
	},
	{
		name: "Information & Communication Science",
		icon: Radio,
		color: "text-amber-600 bg-amber-500/10 border-amber-500/20",
		description:
			"Bridges data science, modern communication technologies, and digital information management to optimize how information is processed and deployed across enterprises.",
		students:
			"Those interested in systems analysis, database design, and enterprise digital solutions.",
		focusAreas: ["Information Systems", "Database Design", "Data Networks", "IT Management"],
	},
	{
		name: "Library & Information Science",
		icon: LibraryBig,
		color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
		description:
			"Emphasizes the curation, preservation, and retrieval of human knowledge resources. Prepares students for roles in modern digital archives, information governance, and research institutions.",
		students:
			"Individuals dedicated to information organization, archival sciences, and data governance.",
		focusAreas: ["Digital Libraries", "Knowledge Management", "Archiving", "Information Ethics"],
	},
	{
		name: "Mass Communication",
		icon: Clapperboard,
		color: "text-purple-600 bg-purple-500/10 border-purple-500/20",
		description:
			"Focuses on contemporary journalism, broadcast media, public relations, and multimedia storytelling across global digital and traditional channels.",
		students:
			"Storytellers, journalists, broadcast producers, and corporate communications strategists.",
		focusAreas: ["Broadcast Journalism", "Public Relations", "Digital Media", "Film & TV Production"],
	},
	{
		name: "Telecommunication Science",
		icon: Wifi,
		color: "text-rose-600 bg-rose-500/10 border-rose-500/20",
		description:
			"Encompasses wireless systems, RF engineering, satellite communications, and network infrastructure, merging fundamental physics with modern communication protocols.",
		students:
			"Engineers enthusiastic about telecommunications, signal processing, and network topology.",
		focusAreas: ["Wireless Networks", "Signal Processing", "Satellite Comm.", "Network Security"],
	},
	{
		name: "Cybersecurity",
		icon: Shield,
		color: "text-teal-600 bg-teal-500/10 border-teal-500/20",
		description:
			"Dedicated to safeguarding critical digital assets, networks, and infrastructure against adversarial threats through ethical hacking, cryptography, and defense architecture.",
		students:
			"Security analysts, ethical hackers, and defensive computing specialists.",
		focusAreas: ["Ethical Hacking", "Cryptography", "Incident Response", "Network Defense"],
	},
];

export default function Departments() {
	return (
		<section className="bg-base-200/50 py-16 sm:py-20 lg:py-28 relative">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					{/* Section Header */}
					<div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
							<GraduationCap className="h-3.5 w-3.5" />
							Academic Fields
						</div>
						<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
							Our Departments
						</h2>
						<p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
							Six distinct disciplines uniting under one visionary faculty to pioneer technology, communication, and information governance.
						</p>
					</div>

					{/* Departments Grid */}
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{departments.map((dept) => {
							const Icon = dept.icon;

							return (
								<article
									key={dept.name}
									className="group rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-7 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
								>
									<div className="space-y-4">
										{/* Icon & Title */}
										<div className="flex items-center gap-3.5">
											<div
												className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${dept.color}`}
											>
												<Icon className="h-6 w-6" strokeWidth={1.8} />
											</div>
											<h3 className="text-lg sm:text-xl font-bold tracking-tight text-base-content">
												{dept.name}
											</h3>
										</div>

										{/* Description */}
										<p className="text-xs sm:text-sm leading-relaxed text-base-content/75">
											{dept.description}
										</p>

										{/* Who Studies Here */}
										<div className="rounded-2xl bg-base-200/60 p-3 text-xs leading-relaxed text-base-content/80">
											<span className="font-semibold text-base-content block mb-0.5">
												Who studies here:
											</span>
											{dept.students}
										</div>
									</div>

									{/* Focus Area Tags */}
									<div className="mt-5 pt-4 border-t border-base-200">
										<p className="text-[0.68rem] font-bold uppercase tracking-wider text-base-content/50 mb-2">
											Key Focus Areas
										</p>
										<div className="flex flex-wrap gap-1.5">
											{dept.focusAreas.map((area) => (
												<span
													key={area}
													className="rounded-full bg-base-200 px-2.5 py-1 text-[0.72rem] font-medium text-base-content/80"
												>
													{area}
												</span>
											))}
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
