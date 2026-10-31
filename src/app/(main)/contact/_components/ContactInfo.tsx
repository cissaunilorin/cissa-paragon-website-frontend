import { Mail, MapPin, MessagesSquare, Sparkles } from "lucide-react";
import { socialLinks } from "@/components/Footer";

export default function ContactInfo() {
	return (
		<section className="bg-base-100 py-16 sm:py-20 lg:py-28 relative">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
					<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
						<Sparkles className="h-3.5 w-3.5" />
						Channels & Helpdesk
					</div>
					<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
						How to Reach Us
					</h2>
					<p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
						Whether you have academic inquiries, partnership proposals, or general feedback, we are here for you.
					</p>
				</div>

				{/* Cards Grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{/* Email Card */}
					<div className="rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
						<div className="space-y-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
								<Mail className="h-6 w-6" />
							</div>
							<h3 className="text-lg sm:text-xl font-bold text-base-content">
								Official Email
							</h3>
							<p className="text-xs sm:text-sm leading-relaxed text-base-content/70">
								For formal correspondence, partnerships, sponsorships, and official queries.
							</p>
						</div>

						<a
							href="mailto:officialcissaunilorin1@gmail.com"
							className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:underline break-all"
						>
							<span>officialcissaunilorin1@gmail.com</span>
						</a>
					</div>

					{/* Physical Location Card */}
					<div className="rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
						<div className="space-y-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
								<MapPin className="h-6 w-6" />
							</div>
							<h3 className="text-lg sm:text-xl font-bold text-base-content">
								Faculty Secretariat
							</h3>
							<p className="text-xs sm:text-sm leading-relaxed text-base-content/70">
								Faculty of Communication & Information Sciences, Permanent Site, University of Ilorin, Kwara State.
							</p>
						</div>

						<span className="mt-4 text-xs font-semibold text-base-content/60 uppercase tracking-wider">
							Open Monday – Friday
						</span>
					</div>

					{/* Community Hub Card */}
					<div className="rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors sm:col-span-2 lg:col-span-1">
						<div className="space-y-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
								<MessagesSquare className="h-6 w-6" />
							</div>
							<h3 className="text-lg sm:text-xl font-bold text-base-content">
								Social Platforms
							</h3>
							<p className="text-xs sm:text-sm leading-relaxed text-base-content/70">
								Follow our active social channels for breaking news, event highlights, and discussions.
							</p>
						</div>

						<div className="flex flex-wrap gap-2 pt-2">
							{socialLinks.map((social) => {
								const SocialIcon = social.icon;
								return (
									<a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noreferrer"
										aria-label={social.label}
										title={social.label}
										className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-base-300 bg-base-200/50 text-base-content/70 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
									>
										<SocialIcon className="h-4 w-4" />
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
