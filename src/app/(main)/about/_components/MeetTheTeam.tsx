"use client";

import { Ghost, Instagram, Linkedin, MessageCircle, Music2, Sparkles, Twitter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { executives, type Executive } from "@/lib/executives";
import { formatNumberToWhatsappLink } from "@/lib/utils/format";

function ExecutiveCard({ executive }: { executive: Executive }) {
	const [imageUnavailable, setImageUnavailable] = useState(false);
	const whatsappLink = executive.socials?.whatsapp
		? formatNumberToWhatsappLink(executive.socials.whatsapp)
		: null;

	return (
		<article className="group flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-base-300/80 bg-base-100 p-3 sm:p-4 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1">
			<div className="space-y-3">
				{/* Executive Image */}
				<div className="relative aspect-square sm:aspect-4/5 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-base-300">
					{!imageUnavailable ? (
						<Image
							src={executive.image}
							alt={executive.name}
							fill
							sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
							className="object-cover transition duration-300 ease-out group-hover:scale-105"
							onError={() => setImageUnavailable(true)}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-base-300 text-xs text-base-content/40">
							Photo
						</div>
					)}
				</div>

				{/* Executive Info */}
				<div className="space-y-1 text-left">
					<h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight text-base-content line-clamp-1 group-hover:text-primary transition-colors">
						{executive.name}
					</h3>
					<p className="text-xs sm:text-sm font-medium text-primary line-clamp-1">
						{executive.position}
					</p>
				</div>
			</div>

			{/* Social Links Row */}
			<div className="mt-3 pt-2.5 border-t border-base-200/80 flex flex-wrap items-center gap-2 sm:gap-2.5 text-base-content/60">
				{whatsappLink ? (
					<a
						href={whatsappLink}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on WhatsApp`}
						className="transition-colors hover:text-emerald-500"
					>
						<MessageCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
					</a>
				) : null}

				{executive.socials?.twitter ? (
					<a
						href={executive.socials.twitter}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on Twitter/X`}
						className="transition-colors hover:text-sky-500"
					>
						<Twitter className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
					</a>
				) : null}

				{executive.socials?.instagram ? (
					<a
						href={executive.socials.instagram}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on Instagram`}
						className="transition-colors hover:text-pink-500"
					>
						<Instagram className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
					</a>
				) : null}

				{executive.socials?.linkedin ? (
					<a
						href={executive.socials.linkedin}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on LinkedIn`}
						className="transition-colors hover:text-blue-600"
					>
						<Linkedin className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
					</a>
				) : null}

				{executive.socials?.tiktok ? (
					<a
						href={executive.socials.tiktok}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on TikTok`}
						className="transition-colors hover:text-cyan-500"
					>
						<Music2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
					</a>
				) : null}

				{executive.socials?.snapchat ? (
					<a
						href={executive.socials.snapchat}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on Snapchat`}
						className="transition-colors hover:text-amber-500"
					>
						<Ghost className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
					</a>
				) : null}
			</div>
		</article>
	);
}

export default function MeetTheTeam() {
	return (
		<section className="bg-base-200/50 py-16 sm:py-20 lg:py-28 relative">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					{/* Section Header */}
					<div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
							<Sparkles className="h-3.5 w-3.5" />
							Leadership Body
						</div>
						<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
							Meet Your Executives
						</h2>
						<p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
							The dedicated student leaders steering the Horizon Administration to serve and champion the faculty.
						</p>
					</div>

					{/* 2-column mobile, 3-column tablet, 4-column desktop grid */}
					<div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
						{executives.map((executive) => (
							<ExecutiveCard key={executive.name} executive={executive} />
						))}
					</div>

					<div className="mt-12 text-center">
						<div className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-xs sm:text-sm font-medium text-base-content/70 shadow-xs">
							<span>Principal Officers and Senate members directory coming soon</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
