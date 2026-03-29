import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { socialLinks } from "@/components/Footer";

export default function ContactInfo() {
	return (
		<section className="bg-base-100">
			<div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:px-8 lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-28">
				<div className="space-y-6">
					<p className="max-w-xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
						Whether you have a question, a concern, or just want to get involved, CISSA is easy to reach. Pick the channel that works best for you.
					</p>

					<div className="flex items-center gap-3 text-sm font-medium text-neutral-800 md:text-lg">
						<MapPin className="mt-0.5 h-5 w-5 md:h-8 md:w-8 shrink-0 text-primary" />
						<span>Faculty of CIS, University of Ilorin, Kwara State</span>
					</div>
				</div>

				<div className="space-y-10">
					<div className="space-y-4">
						<Link
							href="mailto:info@cissa-unilorin.org"
							className="inline-flex items-center gap-3 text-base font-semibold text-neutral-900 transition-colors duration-200 hover:text-primary md:text-xl"
						>
							<Mail className="h-5 w-5 md:h-8 md:w-8 shrink-0" />
							<span>info@cissa-unilorin.org</span>
						</Link>
					</div>

					<div className="space-y-5">
						<p className="text-xs md:text-lg font-bold uppercase tracking-[0.28em] text-neutral-500">
							Socials
						</p>

						<ul className="space-y-4">
							{socialLinks.map((social) => {
								const SocialIcon = social.icon;

								return (
									<li key={social.label}>
										<a
											href={social.href}
											target="_blank"
											rel="noreferrer"
											aria-label={social.label}
											className={`group inline-flex items-center gap-3 text-sm font-medium text-neutral-700 transition-colors duration-200 ${social.hoverClassName} md:text-lg`}
										>
											<SocialIcon
												className={"h-5 w-5 md:h-8 md:w-8 shrink-0"}
											/>
											<span>{social.label}</span>
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
