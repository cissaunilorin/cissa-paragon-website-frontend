"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const subTextRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    const [headlineText, setHeadlineText] = useState("Hello, CISSAite. You're in the right place.");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const headlines = [
            "Hello, CISSAite. You're in the right place.",
            "Hello, CISSAite. We've been expecting you.",
            "Hey CISSAite, your association is here.",
            "Welcome, CISSAite. This one's built for you.",
            "CISSAite? You belong here."
        ];
        setHeadlineText(headlines[Math.floor(Math.random() * headlines.length)]);
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.to(".word-anim", {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 1.2,
                delay: 0.2
            })
            .fromTo(subTextRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            )
            .fromTo(btnRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            );

        }, containerRef);

        return () => ctx.revert();
    }, [isMounted, headlineText]);

    return (
        <div
            ref={containerRef}
            id="home"
            className="hero min-h-screen relative overflow-hidden flex items-end justify-start"
            style={{
                backgroundImage: "url(/assets/ov-3.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="relative z-10 w-full max-w-[90vw] px-6 md:px-10 pb-20 md:pb-10 text-left text-white">
                <h1 className="font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.1] md:leading-none tracking-tight mb-4 md:mb-8 max-w-full">
                     {headlineText.split(" ").map((word, index) => (
                        <span key={index} className="inline-block whitespace-nowrap mr-3 md:mr-6 last:mr-0">
                             <span className="inline-block opacity-0 translate-y-20 word-anim will-change-transform">
                                {word}
                             </span>
                        </span>
                    ))}
                </h1>

                <p 
                    ref={subTextRef} 
                    className="text-lg md:text-2xl font-normal text-gray-200 max-w-2xl mb-4 md:mb-8 leading-relaxed opacity-0"
                >
                    Your hub for academics, events, opportunities, and everything in between.
                </p>

                <Link 
                    ref={btnRef}
                    href="#about" 
                    className="group relative inline-flex items-center justify-center px-4 py-2 md:px-8 md:py-4 text-md md:text-lg font-bold text-black transition-all duration-300 bg-white hover:bg-gray-200 rounded-md overflow-hidden opacity-0"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Explore Now
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
