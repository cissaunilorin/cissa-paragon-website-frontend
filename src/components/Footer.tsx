import Image from "next/image";
import Link from "next/link";
import { Mail, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:px-8 lg:px-10 lg:pb-12 lg:pt-20">
                <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
                    <aside className="space-y-4 text-left">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="avatar">
                                <div className="h-12 w-12 overflow-hidden rounded-full">
                                    <Image
                                        src="/assets/cissa.png"
                                        alt="CISSA Logo"
                                        width={48}
                                        height={48}
                                    />
                                </div>
                            </div>
                            <span className="text-sm md:text-sm font-bold tracking-[0.24em] text-white/80">
                                CISSA
                            </span>
                        </Link>

                        <p className="max-w-sm text-sm leading-7 text-white/70 md:text-[0.95rem]">
                            The official student association of the Faculty of
                            Communication and Information Sciences, University of
                            Ilorin.
                        </p>
                    </aside>

                    <nav aria-label="Quick links" className="space-y-4 text-left">
                        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-white/50">
                            Quick Links
                        </p>

                        <ul className="space-y-2 text-sm md:text-[0.95rem]">
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="#">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="#">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="#">
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="#">
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="#">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="space-y-4 text-left">
                        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-white/50">
                            Connect
                        </p>

                        <a
                            href="mailto:info@cissa-unilorin.org"
                            className="inline-flex items-center gap-2 text-sm text-white/75 transition-colors duration-200 hover:text-white md:text-[0.95rem]"
                        >
                            <Mail className="h-4 w-4 shrink-0" />
                            <span>info@cissa-unilorin.org</span>
                        </a>

                        <div className="flex items-center gap-3 pt-1">
                            <a
                                href="#"
                                aria-label="CISSA on X"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:text-sky-400 hover:bg-white/15"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                aria-label="CISSA on YouTube"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:text-red-400 hover:bg-white/15"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-8 lg:mt-12 lg:pt-10" />

                <div className="flex flex-col items-center justify-between gap-3 text-center text-sm md:text-md text-white/60 lg:flex-row lg:text-left">
                    <p>Copyright © 2026 CISSA. All rights reserved.</p>
                    <p>Built with ❤️ by CISSA TECH</p>
                </div>
            </div>
        </footer>
    );
}
