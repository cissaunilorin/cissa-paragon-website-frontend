import { MessageCircleMore } from "lucide-react";

import { executives } from "@/lib/executives";
import { formatNumberToWhatsappLink } from "@/lib/utils/format";

const executiveContacts = executives
	.map((executive) => ({
		name: executive.name,
		position: executive.position,
		whatsapp: executive.socials?.whatsapp,
	}))
	.filter((executive) => executive.whatsapp);

export default function ExecutiveContactList() {
	return (
		<section className="bg-base-200">
			<div className="mx-auto max-w-6xl px-6 py-20 md:px-8 lg:px-10 lg:py-28">
				<div className="space-y-4">
					<h2 className="text-3xl font-bold uppercase text-neutral-950 md:text-5xl text-center">
						Chat directly with your executives
					</h2>
					<p className="text-base leading-8 text-neutral-700 md:text-lg md:leading-9 text-center">
						Reach out on WhatsApp if you need help from any of the executive team.
					</p>
				</div>

				<ul className="max-w-xl mx-auto mt-10 divide-y divide-neutral-300 overflow-hidden rounded-3xl border border-neutral-300 bg-base-100 shadow-sm">
					{executiveContacts.map((executive) => (
						<li
							key={executive.name}
							className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
						>
							<div className="space-y-1">
								<h3 className="text-lg font-bold text-neutral-950 md:text-xl">
									{executive.name}
								</h3>
								<p className="text-sm text-neutral-600 md:text-base">
									{executive.position}
								</p>
							</div>

							<a
								href={formatNumberToWhatsappLink(executive.whatsapp)}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 self-end rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors duration-200 hover:border-emerald-500/35 hover:bg-emerald-500/15 hover:text-emerald-800 md:self-auto md:text-base"
								aria-label={`${executive.name} on WhatsApp`}
							>
								<MessageCircleMore className="h-4 w-4 shrink-0" />
								<span>WhatsApp</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}