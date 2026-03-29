import Link from "next/link";
import { ArrowRight, GraduationCap, ShieldCheck, Users } from "lucide-react";

type WhatWeDoCard = {
    icon: typeof GraduationCap;
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
        icon: GraduationCap,
        lineOne: "Want to go further",
        lineTwo: "in your studies?",
        description:
            "From peer tutorials to tech bootcamps and career talks, CISSA connects you with the resources to grow academically and professionally.",
        ctas: [
            {
                label: "Explore resources",
                href: "#",
            },
        ],
    },
    {
        icon: Users,
        lineOne: "Looking to find",
        lineTwo: "your people?",
        description:
            "Freshers' welcome, sports, dinner and awards. CISSA brings the faculty together all year round.",
        ctas: [
            {
                label: "See upcoming events",
                href: "#",
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
                href: "#",
            },
        ],
    },
];

function IconSlot({ icon: Icon }: { icon: WhatWeDoCard["icon"] }) {
    return (
        <div className="relative flex aspect-square w-20 items-center justify-center rounded-2xl border border-base-300 bg-base-200/70 text-base-content md:w-20 lg:w-20">
            <Icon
                className="h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10"
                strokeWidth={1.8}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl border border-base-content/5"
            />
        </div>
    );
}

export default function WhatWeDo() {
    return (
        <section className="bg-base-100 py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 max-w-full text-center">
                        <p className="text-base font-bold uppercase tracking-[0.18em] text-primary md:text-2xl">
                            CISSA shows up for its members
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {cards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <article
                                    key={card.lineTwo}
                                    className="card h-full bg-base-200/50 shadow-sm"
                                >
                                    <div className="card-body gap-6 p-6 md:p-7 lg:p-8">
                                        <div className="flex justify-start">
                                            <IconSlot icon={Icon} />
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-bold leading-[1.05] tracking-tight text-base-content lg:text-[2.5rem]">
                                                <span className="block">
                                                    {card.lineOne}
                                                </span>
                                                <span className="block text-primary">
                                                    {card.lineTwo}
                                                </span>
                                            </h3>

                                            <p className="max-w-md md:text-lg text-base leading-relaxed text-base-content/80">
                                                {card.description}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex flex-wrap gap-3 pt-2">
                                            {card.ctas.map((cta) => (
                                                <Link
                                                    key={cta.label}
                                                    href={cta.href}
                                                    className="group relative btn btn-neutral btn-sm rounded-full border-0 px-5 normal-case text-base md:text-lg font-semibold text-neutral-content shadow-none"
                                                >
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        {cta.label}
                                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
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
