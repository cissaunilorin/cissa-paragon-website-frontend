import { Crown, Landmark, Scale, Network } from "lucide-react";

type Tier = {
	number: string;
	title: string;
	members: string;
	responsibility: string;
	icon: typeof Crown;
};

const tiers: Tier[] = [
	{
		number: "01",
		title: "The Executive Council",
		members:
			"President, Vice President, General Secretary, Assistant General Secretary, Financial Secretary, Public Relations Officer, Social Director, Sports Director, Software Director.",
		responsibility:
			"Day-to-day governance, policy execution, student advocacy, organizing faculty activities, and general welfare administration.",
		icon: Crown,
	},
	{
		number: "02",
		title: "S.R.C Principal Officers",
		members: "Speaker, Deputy Speaker, Clerk, Deputy Clerk.",
		responsibility:
			"Legislative leadership, coordinating parliamentary sessions, policy formulation, and administrative oversight of decisions.",
		icon: Scale,
	},
	{
		number: "03",
		title: "The Senate Council",
		members:
			"Elected department representatives and parliamentary senators representing the faculty at the Students' Union Assembly.",
		responsibility:
			"Constitutional checks and balances, budget reviews, screening of appointments, and protecting departmental interests.",
		icon: Landmark,
	},
];

function TierCard({ tier }: { tier: Tier }) {
	const Icon = tier.icon;

	return (
		<article className="group relative rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
			<div className="space-y-5">
				{/* Top row with number & icon */}
				<div className="flex items-center justify-between">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
						<Icon className="h-6 w-6" strokeWidth={1.8} />
					</div>
					<span className="text-2xl font-black text-base-content/20 tracking-tighter">
						{tier.number}
					</span>
				</div>

				<h3 className="text-xl sm:text-2xl font-bold tracking-tight text-base-content">
					{tier.title}
				</h3>

				<div className="space-y-4 pt-1">
					<div className="rounded-2xl bg-base-200/60 p-3.5 space-y-1">
						<span className="text-[0.68rem] font-bold uppercase tracking-wider text-primary block">
							Constituency & Members
						</span>
						<p className="text-xs sm:text-sm leading-relaxed text-base-content/80">
							{tier.members}
						</p>
					</div>

					<div className="space-y-1">
						<span className="text-[0.68rem] font-bold uppercase tracking-wider text-base-content/50 block">
							Core Responsibilities
						</span>
						<p className="text-xs sm:text-sm leading-relaxed text-base-content/75">
							{tier.responsibility}
						</p>
					</div>
				</div>
			</div>
		</article>
	);
}

export default function OurStructure() {
	return (
		<section className="bg-base-100 py-16 sm:py-20 lg:py-28 relative">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					{/* Section Header */}
					<div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
							<Network className="h-3.5 w-3.5" />
							Governance & Arms
						</div>
						<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
							Our Association Structure
						</h2>
						<p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
							Structured around democratic governance, transparency, and checks and balances to safeguard student rights.
						</p>
					</div>

					<div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
						{tiers.map((tier) => (
							<TierCard key={tier.number} tier={tier} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
