import Image from "next/image";
import { MessageCircleMore } from "lucide-react";

import { executives } from "@/lib/executives";
import { formatNumberToWhatsappLink } from "@/lib/utils/format";

const executiveContacts = executives
	.map((executive) => ({
		name: executive.name,
		position: executive.position,
		image: executive.image,
		whatsapp: executive.socials?.whatsapp,
	}))
	.filter((executive) => executive.whatsapp);

export default function ExecutiveContactList() {
	return (
		<section className="bg-base-200/50 py-16 sm:py-20 lg:py-28 relative">
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
					<div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700">
						<MessageCircleMore className="h-3.5 w-3.5" />
						Direct Line
					</div>
					<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
						Chat Directly with Executives
					</h2>
					<p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
						Reach out on WhatsApp if you need support, clarification, or guidance from any officer.
					</p>
				</div>

				<ul className="divide-y divide-base-200 overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 shadow-sm">
					{executiveContacts.map((executive) => (
						<li
							key={executive.name}
							className="group flex flex-col gap-3.5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 hover:bg-base-200/30 transition-colors"
						>
							<div className="flex items-center gap-3.5">
								<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 bg-base-300">
									<Image
										src={executive.image}
										alt={executive.name}
										fill
										sizes="48px"
										className="object-cover"
									/>
								</div>

								<div className="space-y-0.5">
									<h3 className="text-sm sm:text-base font-bold text-base-content leading-tight">
										{executive.name}
									</h3>
									<p className="text-xs sm:text-sm font-medium text-primary">
										{executive.position}
									</p>
								</div>
							</div>

							<a
								href={formatNumberToWhatsappLink(executive.whatsapp)}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-center gap-2 self-stretch sm:self-auto rounded-full bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-500 active:scale-95"
								aria-label={`Chat with ${executive.name} on WhatsApp`}
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
