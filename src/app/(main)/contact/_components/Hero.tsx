"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const subTextRef = useRef<HTMLParagraphElement>(null);
	const [headlineText, setHeadlineText] = useState(
		"We're closer than you think.",
	);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const headlines = [
			"CISSAite, we're listening.",
			"Don't be a stranger, CISSAite.",
			"Got something on your mind?",
			"We're closer than you think.",
			"You talk, we listen.",
			"Your association is one message away.",
		];

		setHeadlineText(
			headlines[Math.floor(Math.random() * headlines.length)],
		);
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted) return;

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

			tl.to(".word-anim", {
				y: 0,
				opacity: 1,
				stagger: headlineStagger,
				duration: headlineDuration,
				delay: 0.2,
			}).fromTo(
				subTextRef.current,
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1 },
				"-=0.8",
			);
		}, containerRef);

		return () => ctx.revert();
	}, [headlineText, isMounted]);

	return (
		<div className="bg-base-100 p-0 lg:p-4 min-h-screen flex flex-col justify-center">
			<div
				ref={containerRef}
				id="contact"
				className="hero min-h-screen lg:min-h-full relative overflow-hidden flex items-end justify-start lg:items-center lg:justify-center lg:rounded-2xl flex-1"
				style={{
					backgroundImage: "url(/assets/fac4.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-0 bg-black/65 z-0"></div>

				<div className="relative z-10 w-full max-w-[90vw] px-6 md:px-10 pb-20 md:pb-10 lg:pb-0 text-left lg:text-center text-white lg:max-w-7xl lg:mx-auto">
					<h1 className="font-bold text-5xl md:text-8xl leading-[1.06] md:leading-none tracking-tight mb-4 md:mb-8 max-w-full lg:max-w-7xl lg:mx-auto">
						{headlineText.split(" ").map((word, index) => (
							<span
								key={index}
								className="inline-block whitespace-nowrap mr-3 md:mr-6 last:mr-0 lg:mr-4"
							>
								<span className="inline-block opacity-0 translate-y-20 word-anim will-change-transform">
									{word}
								</span>
							</span>
						))}
					</h1>

					<p
						ref={subTextRef}
						className="text-lg md:text-2xl font-normal text-gray-200 max-w-2xl lg:max-w-2xl mx-auto mb-4 md:mb-8 leading-relaxed opacity-0"
					>
						Find the best way to reach CISSA below.
					</p>
				</div>
			</div>
		</div>
	);
}
