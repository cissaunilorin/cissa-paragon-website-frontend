import Image from "next/image";
import Link from "next/link";
import {
    Mail,
    MessageCircleMore,
    MessagesSquare,
    Music2,
    Twitter,
    Youtube,
    Instagram,
} from "lucide-react";

export const socialLinks = [
    {
        label: "X",
        href: "https://x.com/cissa_unilorin?s=21",
        icon: Twitter,
        hoverClassName: "hover:text-sky-400",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/cissaunilorin?igsh=MWJqaXRnMXB3djJ5ag==",
        icon: Instagram,
        hoverClassName: "hover:text-fuchsia-400",
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@cissa_unilorin?_r=1&_t=ZM-91XFVYEl1uF",
        icon: Music2,
        hoverClassName: "hover:text-cyan-300",
    },
    {
        label: "YouTube",
        href: "https://youtube.com/@cissapulse?si=VJDMiDFlFSlCtSQp",
        icon: Youtube,
        hoverClassName: "hover:text-red-400",
    },
    {
        label: "WhatsApp TV",
        href: "https://wa.me/7059834118",
        icon: MessageCircleMore,
        hoverClassName: "hover:text-emerald-400",
    },
    {
        label: "WhatsApp Group",
        href: "https://chat.whatsapp.com/G5LkBmXDxQa1mYWBvhrMaa",
        icon: MessagesSquare,
        hoverClassName: "hover:text-emerald-400",
    },
];

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
                                <Link className="link link-hover text-white/75 hover:text-white" href="/about">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="/events">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="/news">
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="/about">
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link className="link link-hover text-white/75 hover:text-white" href="/contact">
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

                        <div className="flex flex-wrap gap-3 pt-1">
                            {socialLinks.map((social) => {
                                const SocialIcon = social.icon;

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        title={social.label}
                                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-white/15 ${social.hoverClassName}`}
                                    >
                                        <SocialIcon className="h-5 w-5" />
                                    </a>
                                );
                            })}
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
