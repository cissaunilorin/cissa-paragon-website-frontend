import { Compass, Eye, History, Sparkles } from "lucide-react";

const stats = [
	{ label: "Founded", value: "June 2008" },
	{ label: "Departments", value: "6 Fields" },
	{ label: "Undergraduate Body", value: "3,000+ Members" },
	{ label: "Active Administration", value: "Horizon Era" },
];

export default function WhoWeAre() {
	return (
		<section className="bg-base-100 py-16 sm:py-20 lg:py-28 relative">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-6xl">
					{/* Section Header */}
					<div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
							<Sparkles className="h-3.5 w-3.5" />
							Identity & Purpose
						</div>
						<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
							Who We Are
						</h2>
						<p className="text-base sm:text-lg text-base-content/80 leading-relaxed max-w-3xl mx-auto">
							CISSA is the official student body for all students in the Faculty of Communication and Information Sciences at the University of Ilorin, uniting scholars across media, computing, and information disciplines.
						</p>
					</div>

					{/* Quick Stats Grid */}
					<div className="mb-14 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="rounded-3xl border border-base-300/80 bg-base-200/50 p-4 sm:p-6 text-center shadow-xs"
							>
								<div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
									{stat.value}
								</div>
								<div className="mt-1 text-xs sm:text-sm font-medium text-base-content/65">
									{stat.label}
								</div>
							</div>
						))}
					</div>

					{/* Story, Mission & Vision Cards */}
					<div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
						{/* Story */}
						<div className="rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-8 shadow-xs space-y-4 hover:border-primary/40 transition-colors">
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
								<History className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold text-base-content">
								Our Story
							</h3>
							<p className="text-sm sm:text-base leading-relaxed text-base-content/75">
								Established in June 2008, CISSA was created to unify students across all departments within the Faculty. It provides structured representation, fosters academic collaboration, and coordinates impactful campus initiatives.
							</p>
						</div>

						{/* Mission */}
						<div className="rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-8 shadow-xs space-y-4 hover:border-primary/40 transition-colors">
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
								<Compass className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold text-base-content">
								Our Mission
							</h3>
							<p className="text-sm sm:text-base leading-relaxed text-base-content/75">
								To advocate, support, and empower students of Communication and Information Sciences through rigorous academic support, career development, and transformative social programs.
							</p>
						</div>

						{/* Vision */}
						<div className="rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-8 shadow-xs space-y-4 hover:border-primary/40 transition-colors">
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
								<Eye className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold text-base-content">
								Our Vision
							</h3>
							<p className="text-sm sm:text-base leading-relaxed text-base-content/75">
								To build a dynamic, inclusive student community that produces globally competitive innovators, researchers, journalists, and tech leaders ready to shape tomorrow.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
