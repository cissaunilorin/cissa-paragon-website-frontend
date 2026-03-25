import Image from "next/image";

export default function PresidentialWelcome() {
    return (
        <section className="bg-base-100 py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-10 max-w-full text-center">
                    <p className="text-base font-bold uppercase tracking-[0.18em] text-primary md:text-2xl">
                        From the president&apos;s desk
                    </p>
                </div>

                <article className="card mx-auto max-w-5xl border border-base-300 bg-base-200/50 shadow-sm">
                    <div className="card-body gap-8 p-6 md:p-7 lg:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                            <div className="flex items-center md:items-start gap-4">
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full md:rounded-2xl border border-base-300 bg-base-100 md:h-100 md:w-80">
                                    <Image
                                        src="/assets/Executives/President.jpg"
                                        alt="Sanni Nurudeen Akorede - CISSA President"
                                        fill
                                        sizes="(max-width: 767px) 80px, (max-width: 1023px) 320px, 320px"
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold leading-tight tracking-tight text-base-content lg:text-3xl">
                                        SANNI, Nurudeen Akorede
                                    </h3>
                                    <p className="mt-1 text-base font-medium text-base-content/80">
                                        17th CISSA President
                                    </p>
                                    <p className="text-sm uppercase tracking-[0.18em] text-base-content/55">
                                        2025/2026 Academic Session
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="lg:ml-auto lg:max-w-2xl">
                                    <div className="rounded-2xl border border-base-300 bg-base-100/70 p-5 shadow-sm">
                                        <blockquote className="border-l-4 border-primary/70 pl-4 text-base leading-relaxed italic text-base-content/80 md:text-2xl">
                                            It is my great pleasure to welcome
                                            you to the official website of the
                                            Faculty Student Association. Through
                                            this platform, we aim to keep you
                                            informed about the events,
                                            achievements, and opportunities that
                                            shape our community. Together,
                                            let&apos;s make our mark.
                                        </blockquote>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    disabled
                                    className="group inline-flex w-fit self-start items-center gap-2 rounded-full border border-base-content/15 bg-base-100 px-4 py-2.5 text-base font-bold text-base-content transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
                                    aria-disabled="true"
                                    title="Full message coming soon"
                                >
                                    View full message
                                    <span
                                        aria-hidden="true"
                                        className="transition-transform group-hover:translate-x-1"
                                    >
                                        &gt;
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
