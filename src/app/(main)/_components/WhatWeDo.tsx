import Link from "next/link";
import { ArrowRight, Megaphone, ShieldCheck, Users, Sparkles } from "lucide-react";

type WhatWeDoCard = {
    icon: typeof Megaphone;
    lineOne: string;
    lineTwo: string;
    description: string;
    ctas: Array<{
        label: string;
        href: string;
    }>;
};

const cards: WhatWeDoCard[] = [
    {
        icon: Megaphone,
        lineOne: "Stay in the know",
        lineTwo: "with CISSA news",
        description:
            "Updates, official announcements, and inspiring stories from across the CISSA community and departments.",
        ctas: [
            {
                label: "Read latest news",
                href: "/news",
            },
        ],
    },
    {
        icon: Users,
        lineOne: "Looking to find",
        lineTwo: "your people?",
        description:
            "Freshers' welcome, faculty sports, tech symposiums, dinner and awards. CISSA brings everyone together all year round.",
        ctas: [
            {
                label: "See upcoming events",
                href: "/events",
            },
        ],
    },
    {
        icon: ShieldCheck,
        lineOne: "Need support or",
        lineTwo: "a listening ear?",
        description:
            "Whether it's an academic concern or a personal challenge, CISSA is your voice and your safety net within the faculty.",
        ctas: [
            {
                label: "Reach out to us",
                href: "/contact",
            },
        ],
    },
];

function IconSlot({ icon: Icon }: { icon: WhatWeDoCard["icon"] }) {
    return (
        <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
            <Icon className="h-7 w-7 sm:h-8 sm:w-8 transition-colors duration-300" strokeWidth={1.8} />
        </div>
    );
}

export default function WhatWeDo() {
    return (
        <section className="bg-base-100 py-16 sm:py-20 lg:py-28 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {/* Section Header */}
                    <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                            Community & Impact
                        </div>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
                            CISSA shows up for every member
                        </h2>
                        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                            We empower students across all departments through representation, vibrant social life, and career-defining initiatives.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                        {cards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <article
                                    key={card.lineTwo}
                                    className="group relative flex flex-col justify-between rounded-3xl border border-base-300/80 bg-base-100 p-6 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/40"
                                >
                                    <div className="space-y-6">
                                        <div className="flex justify-start">
                                            <IconSlot icon={Icon} />
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-base-content">
                                                <span className="block text-base-content">
                                                    {card.lineOne}
                                                </span>
                                                <span className="block text-primary">
                                                    {card.lineTwo}
                                                </span>
                                            </h3>

                                            <p className="text-sm sm:text-base leading-relaxed text-base-content/75">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3 pt-2">
                                        {card.ctas.map((cta) => (
                                            <Link
                                                key={cta.label}
                                                href={cta.href}
                                                className="group/btn inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:bg-neutral-800 active:scale-95"
                                            >
                                                <span>{cta.label}</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
