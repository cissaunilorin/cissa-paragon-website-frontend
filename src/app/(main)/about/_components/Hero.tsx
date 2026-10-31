"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Users } from "lucide-react";

export default function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const subTextRef = useRef<HTMLParagraphElement>(null);
	const badgeRef = useRef<HTMLDivElement>(null);

	const headlineText = "Our story, our people.";

	useEffect(() => {
		const headlineLength = headlineText.split(" ").length;
		const headlineStagger = Math.max(
			0.035,
			Math.min(0.06, 0.18 / headlineLength),
		);
		const headlineDuration = Math.max(
			1,
			Math.min(1.35, 0.9 + headlineLength * 0.03),
		);

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

			tl.fromTo(
				badgeRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, delay: 0.1 },
			)
				.to(".word-anim", {
					y: 0,
					opacity: 1,
					stagger: headlineStagger,
					duration: headlineDuration,
				}, "-=0.5")
				.fromTo(
					subTextRef.current,
					{ y: 25, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.9 },
					"-=0.7",
				);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div className="w-full relative overflow-hidden">
			<div
				ref={containerRef}
				id="about"
				className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
				style={{
					backgroundImage: "url(/assets/ov-2.png)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85 z-0" />

				<div className="relative z-10 w-full max-w-4xl px-5 sm:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 text-center text-white mx-auto flex flex-col items-center justify-center">
					<div
						ref={badgeRef}
						className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md mb-4 sm:mb-6 shadow-xs opacity-0"
					>
						<Users className="h-3.5 w-3.5 text-amber-300" />
						<span>About CISSA Unilorin</span>
					</div>

					<h1 className="font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.04] tracking-tight mb-4 sm:mb-6 max-w-4xl mx-auto">
						{headlineText.split(" ").map((word, index) => (
							<span
								key={index}
								className="inline-block whitespace-nowrap mr-2 sm:mr-3 md:mr-5 last:mr-0"
							>
								<span className="inline-block opacity-0 translate-y-16 word-anim will-change-transform">
									{word}
								</span>
							</span>
						))}
					</h1>

					<p
						ref={subTextRef}
						className="text-base sm:text-lg md:text-xl font-normal text-white/85 max-w-xl md:max-w-2xl mx-auto leading-relaxed opacity-0 px-2"
					>
						A legacy of leadership, representation, innovation, and unity across the Faculty of Communication and Information Sciences.
					</p>
				</div>
			</div>
		</div>
	);
}
