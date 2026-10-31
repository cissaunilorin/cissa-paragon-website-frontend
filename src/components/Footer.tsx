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
    ArrowUpRight,
    Heart,
} from "lucide-react";

export const socialLinks = [
    {
        label: "X (Twitter)",
        href: "https://x.com/cissa_unilorin?s=21",
        icon: Twitter,
        hoverClassName: "hover:bg-sky-500/20 hover:text-sky-300 hover:border-sky-500/40",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/cissaunilorin?igsh=MWJqaXRnMXB3djJ5ag==",
        icon: Instagram,
        hoverClassName: "hover:bg-pink-500/20 hover:text-pink-300 hover:border-pink-500/40",
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@cissaunilorin",
        icon: Music2,
        hoverClassName: "hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40",
    },
    {
        label: "YouTube",
        href: "https://youtube.com/@cissapulse?si=VJDMiDFlFSlCtSQp",
        icon: Youtube,
        hoverClassName: "hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40",
    },
    {
        label: "WhatsApp TV",
        href: "https://wa.me/7061835134",
        icon: MessageCircleMore,
        hoverClassName: "hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40",
    },
    {
        label: "WhatsApp Group",
        href: "https://chat.whatsapp.com/G5LkBmXDxQa1mYWBvhrMaa",
        icon: MessagesSquare,
        hoverClassName: "hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40",
    },
];

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-white border-t border-white/10 relative overflow-hidden">
            {/* Top Community Banner */}
            <div className="border-b border-white/10 bg-white/5 py-8 sm:py-10">
                <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                                Stay connected with CISSA
                            </h3>
                            <p className="text-xs sm:text-sm text-white/60">
                                Get immediate notifications, lecture updates, and community links on WhatsApp.
                            </p>
                        </div>
                        <a
                            href="https://chat.whatsapp.com/G5LkBmXDxQa1mYWBvhrMaa"
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-500 active:scale-95"
                        >
                            <MessagesSquare className="h-4 w-4" />
                            <span>Join Community</span>
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                    {/* Brand */}
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-primary/40">
                                <Image
                                    src="/assets/cissa.png"
                                    alt="CISSA Logo"
                                    fill
                                    sizes="44px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-bold tracking-tight text-white">
                                    CISSA
                                </span>
                                <span className="text-[0.68rem] uppercase tracking-wider text-white/50">
                                    University of Ilorin
                                </span>
                            </div>
                        </Link>

                        <p className="text-xs sm:text-sm leading-relaxed text-white/70 max-w-sm">
                            The official student association representing students across Computer Science, Information & Communication Science, Library & Information Science, Mass Communication, Telecommunication Science, and Cybersecurity.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400/90">
                            Navigation
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link className="text-white/70 hover:text-white transition-colors" href="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="text-white/70 hover:text-white transition-colors" href="/about">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link className="text-white/70 hover:text-white transition-colors" href="/events">
                                    Events Calendar
                                </Link>
                            </li>
                            <li>
                                <Link className="text-white/70 hover:text-white transition-colors" href="/news">
                                    News & Memos
                                </Link>
                            </li>
                            <li>
                                <Link className="text-white/70 hover:text-white transition-colors" href="/materials">
                                    Study Materials
                                </Link>
                            </li>
                            <li>
                                <Link className="text-white/70 hover:text-white transition-colors" href="/contact">
                                    Contact Executives
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Resources */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400/90">
                            Departments
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                            <li>Computer Science</li>
                            <li>Information & Comm. Science</li>
                            <li>Library & Info Science</li>
                            <li>Mass Communication</li>
                            <li>Telecommunication Science</li>
                            <li>Cybersecurity</li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400/90">
                            Contact
                        </p>

                        <a
                            href="mailto:officialcissaunilorin1@gmail.com"
                            className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-colors break-all"
                        >
                            <Mail className="h-4 w-4 shrink-0 text-amber-300" />
                            <span>officialcissaunilorin1@gmail.com</span>
                        </a>

                        <div className="pt-2">
                            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                                Social Channels
                            </p>
                            <div className="flex flex-wrap gap-2">
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
                                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all ${social.hoverClassName}`}
                                        >
                                            <SocialIcon className="h-4 w-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-white/50">
                    <p>© 2026 CISSA University of Ilorin. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        <span>Crafted with</span>
                        <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                        <span>by CISSA TECH</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
