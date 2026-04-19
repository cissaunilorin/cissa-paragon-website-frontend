import { Crown, Landmark, Scale } from "lucide-react";

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
		title: "Executives",
		members:
			"President, Vice President, General Secretary, Assistant General Secretary, Financial Secretary, Public Relations Officer, Social Director, Sports Director, Software Director",
		responsibility:
			"Day-to-day administration and execution of CISSA activities.",
		icon: Crown,
	},
	{
		number: "02",
		title: "S.R.C Principal Officers",
		members: "Speaker, Deputy Speaker, Clerk, Deputy Clerk",
		responsibility:
			"Policy implementation and coordination. Key administrative officers supporting executive decisions.",
		icon: Scale,
	},
	{
		number: "03",
		title: "Senate",
		members:
			"Legislative arm of the association representing the faculty at the Students' Union Assembly.",
		responsibility:
			"Oversight, checks and balances, and policy review.",
		icon: Landmark,
	},
];

function TierCard({ tier }: { tier: Tier }) {
	const Icon = tier.icon;

	return (
		<article className="relative space-y-5 lg:space-y-6 p-6 md:p-2">
			<div className="flex items-start gap-4">
				<div className="space-y-4">
					<div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
						<Icon className="size-7" strokeWidth={2} />
					</div>

					<h3 className="text-2xl font-bold leading-tight text-base-content md:text-[2rem]">
						{tier.title}
					</h3>
				</div>
			</div>

			<div className="space-y-4 pl-0">
				<div className="space-y-1.5">
					<p className="text-xs font-bold uppercase tracking-[0.24em] text-base-content/55">
						Members:
					</p>
					<p className="text-base leading-8 text-base-content/80 md:text-lg md:leading-9">
						{tier.members}
					</p>
				</div>

				<div className="space-y-1.5">
					<p className="text-xs font-bold uppercase tracking-[0.24em] text-base-content/55">
						Responsibility:
					</p>
					<p className="text-base leading-8 text-base-content/80 md:text-lg md:leading-9">
						{tier.responsibility}
					</p>
				</div>
			</div>
		</article>
	);
}

export default function OurStructure() {
	return (
		<section className="bg-base-100 py-16 md:py-20 lg:py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 text-center md:mb-14">
						<p className="text-lg font-bold uppercase tracking-[0.22em] text-primary md:text-2xl">
							Our Structure
						</p>
					</div>

					<div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
						{tiers.map((tier) => (
							<TierCard key={tier.number} tier={tier} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
