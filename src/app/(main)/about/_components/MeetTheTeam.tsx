"use client";

import { Ghost, Instagram, Linkedin, MessageCircle, Music2, Twitter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { executives, type Executive } from "@/lib/executives";

function formatWhatsAppLink(value: string) {
	const digits = value.replace(/\D/g, "");
	return digits.length > 0 ? `https://wa.me/${digits}` : null;
}

function ExecutiveCard({ executive }: { executive: Executive }) {
	const [imageUnavailable, setImageUnavailable] = useState(false);
	const whatsappLink = executive.socials?.whatsapp
		? formatWhatsAppLink(executive.socials.whatsapp)
		: null;

	return (
		<article className="group flex h-full flex-col space-y-4">
			<div className="overflow-hidden rounded-3xl bg-base-300">
				<div className="relative aspect-4/5 w-full bg-base-300">
					{!imageUnavailable ? (
						<Image
							src={executive.image}
							alt={executive.name}
							fill
							sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
							className="object-cover transition duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
							onError={() => setImageUnavailable(true)}
						/>
					) : null}
				</div>
			</div>

			<div className="space-y-1.5 px-0 pt-1">
				<h3 className="text-lg font-bold leading-snug text-base-content md:text-xl">
					{executive.name}
				</h3>
				<p className="text-sm leading-6 text-base-content/65 md:text-base">
					{executive.position}
				</p>
			</div>

			<div className="mt-auto flex items-center gap-4 pt-2">
				{whatsappLink ? (
					<a
						href={whatsappLink}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on WhatsApp`}
						className="text-base-content/55 transition-colors duration-200 hover:text-emerald-500"
					>
						<MessageCircle className="size-5" />
					</a>
				) : null}

				{executive.socials?.twitter ? (
					<a
						href={executive.socials.twitter}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on Twitter/X`}
						className="text-base-content/55 transition-colors duration-200 hover:text-sky-500"
					>
						<Twitter className="size-5" />
					</a>
				) : null}

				{executive.socials?.instagram ? (
					<a
						href={executive.socials.instagram}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on Instagram`}
						className="text-base-content/55 transition-colors duration-200 hover:text-pink-500"
					>
						<Instagram className="size-5" />
					</a>
				) : null}

				{executive.socials?.tiktok ? (
					<a
						href={executive.socials.tiktok}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on TikTok`}
						className="text-base-content/55 transition-colors duration-200 hover:text-cyan-500"
					>
						<Music2 className="size-5" />
					</a>
				) : null}

				{executive.socials?.snapchat ? (
					<a
						href={executive.socials.snapchat}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on Snapchat`}
						className="text-base-content/55 transition-colors duration-200 hover:text-yellow-400"
					>
						<Ghost className="size-5" />
					</a>
				) : null}

				{executive.socials?.linkedin ? (
					<a
						href={executive.socials.linkedin}
						target="_blank"
						rel="noreferrer"
						aria-label={`${executive.name} on LinkedIn`}
						className="text-base-content/55 transition-colors duration-200 hover:text-blue-700"
					>
						<Linkedin className="size-5" />
					</a>
				) : null}
			</div>
		</article>
	);
}

export default function MeetTheTeam() {
	return (
		<section className="bg-base-100 py-16 md:py-20 lg:py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 text-center md:mb-14">
						<p className="text-lg font-bold uppercase tracking-[0.22em] text-primary md:text-2xl">
							Meet Your Executives
						</p>
					</div>

					<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12">
						{executives.map((executive) => (
							<ExecutiveCard key={executive.name} executive={executive} />
						))}
					</div>

					<p className="mt-12 text-center text-sm leading-7 text-base-content/55 md:mt-14 md:text-base">
						Principal Officers and Senate members coming soon.
					</p>
				</div>
			</div>
		</section>
	);
}