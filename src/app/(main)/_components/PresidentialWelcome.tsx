import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function PresidentialWelcome() {
    return (
        <section className="bg-base-100 pb-16 pt-12 md:pb-20 md:pt-14 lg:pb-24 lg:pt-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 max-w-full text-center">
                        <p className="text-base font-bold uppercase tracking-[0.18em] text-primary md:text-2xl">
                            From the president&apos;s desk
                        </p>
                    </div>

                    <div className="mx-auto max-w-5xl">
                        <blockquote className="relative text-balance px-1 text-[1.5rem] font-medium leading-[1.12] tracking-[-0.03em] text-base-content md:text-5xl md:leading-[1.08]">
                            <span
                                aria-hidden="true"
                                className="absolute -right-2 -top-8 text-6xl leading-none text-primary/15 md:-right-4 md:-top-10 md:text-8xl"
                            >
                                &ldquo;
                            </span>
                            It is my great pleasure to welcome you to the
                            official website of the Faculty Student
                            Association. Through this platform, we aim to keep
                            you informed about the events, achievements, and
                            opportunities that shape our community. Together,
                            let&apos;s make our mark.
                        </blockquote>

                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                href="#"
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-base-content/70 transition-colors hover:text-primary md:text-base"
                            >
                                Read the full presidential address
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-row items-start gap-4 sm:items-center md:mt-10 md:gap-5">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-sm md:h-20 md:w-20">
                                <Image
                                    src="/assets/Executives/President.jpg"
                                    alt="Sanni Nurudeen Akorede - CISSA President"
                                    fill
                                    sizes="(max-width: 767px) 64px, 80px"
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.24em] text-base-content/55 md:text-sm">
                                    17th CISSA President
                                </p>
                                <h3 className="mt-1 text-xl font-medium leading-tight tracking-tight text-base-content md:text-[2rem]">
                                    SANNI, Nurudeen Akorede
                                </h3>
                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-base-content/60 md:text-sm">
                                    2025/2026 Academic Session
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
