import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";

export default function PresidentialWelcome() {
    return (
        <section className="bg-base-200/60 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="relative rounded-3xl sm:rounded-4xl border border-base-300/90 bg-base-100 p-6 sm:p-10 lg:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden">
                        {/* Background subtle decorative gradient */}
                        <div
                            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
                            aria-hidden="true"
                        />

                        {/* Eyebrow badge */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
                                <Quote className="h-3.5 w-3.5 fill-current" />
                                <span>Presidential Address</span>
                            </div>
                            <span className="hidden sm:inline-block text-xs font-semibold tracking-wider text-base-content/50 uppercase">
                                Horizon Administration
                            </span>
                        </div>

                        {/* Quote Text */}
                        <blockquote className="relative text-lg sm:text-2xl md:text-3xl font-medium leading-relaxed sm:leading-snug tracking-tight text-base-content">
                            &ldquo;It is my great pleasure to welcome you to the official website of the Communication and Information Sciences Students&apos; Association! As the President, I am honored to lead this vibrant community of scholars, creators, and innovators. Our faculty is a powerhouse of academic excellence and boundless potential...&rdquo;
                        </blockquote>

                        {/* Read full link */}
                        <div className="mt-5 sm:mt-6">
                            <Link
                                href="/about#presidential-address"
                                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-primary transition-all hover:text-primary/80 active:translate-x-0.5"
                            >
                                <span>Read the full presidential address</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* President Info Card */}
                        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-base-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5 sm:gap-4">
                                <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-primary/20 bg-base-300">
                                    <Image
                                        src="/assets/Executives/President.jpg"
                                        alt="Kuforiji Ayobami Waris - 18th CISSA President"
                                        fill
                                        sizes="(max-width: 640px) 56px, 64px"
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <div>
                                    <div className="text-base sm:text-xl font-bold tracking-tight text-base-content">
                                        Kuforiji Ayobami Waris
                                    </div>
                                    <p className="text-xs sm:text-sm font-medium text-base-content/60">
                                        18th CISSA President • 2026/2027 Session
                                    </p>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-base-200/80 px-3.5 py-1.5 text-xs font-semibold text-base-content/70">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span>Active Administration</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
