"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    ChevronRight,
    Home,
    Info,
    Instagram,
    Menu,
    MessageCircleMore,
    MessagesSquare,
    Music2,
    Newspaper,
    Twitter,
    X,
    Youtube,
} from "lucide-react";

const navLinks = [
    { label: "Home", href: "/", icon: Home, description: "Welcome & overview" },
    { label: "About", href: "/about", icon: Info, description: "Our story & leaders" },
    { label: "Events", href: "/events", icon: CalendarDays, description: "Upcoming & past faculty events" },
    { label: "News", href: "/news", icon: Newspaper, description: "Official announcements" },
    { label: "Resources", href: "/materials", icon: BookOpen, description: "Lecture notes & past questions" },
    { label: "Contact", href: "/contact", icon: MessageCircleMore, description: "Get in touch with executives" },
];

const socialLinks = [
    { label: "X", href: "https://x.com/cissa_unilorin?s=21", icon: Twitter },
    { label: "Instagram", href: "https://www.instagram.com/cissaunilorin?igsh=MWJqaXRnMXB3djJ5ag==", icon: Instagram },
    { label: "TikTok", href: "https://www.tiktok.com/@cissa_unilorin?_r=1&_t=ZM-91XFVYEl1uF", icon: Music2 },
    { label: "YouTube", href: "https://youtube.com/@cissapulse?si=VJDMiDFlFSlCtSQp", icon: Youtube },
    { label: "WhatsApp TV", href: "https://wa.me/7059834118", icon: MessageCircleMore },
    { label: "WhatsApp Group", href: "https://chat.whatsapp.com/G5LkBmXDxQa1mYWBvhrMaa", icon: MessagesSquare },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setHasMounted(true);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMobileMenuOpen]);

    return (
        <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
            <div
                className={`mx-auto w-full transition-all duration-300 pointer-events-auto px-3 sm:px-5 lg:px-8 ${
                    isScrolled
                        ? "mt-2 sm:mt-3 lg:max-w-6xl"
                        : "mt-3 sm:mt-4 lg:mt-6 lg:max-w-6xl"
                }`}
            >
                <header
                    className={`flex items-center justify-between gap-4 rounded-full border px-3.5 py-2 sm:px-5 sm:py-2.5 transition-all duration-300 ${
                        isScrolled
                            ? "border-base-300/80 bg-base-100/90 shadow-[0_12px_32px_rgba(20,15,10,0.12)] backdrop-blur-xl"
                            : "border-base-300/70 bg-base-100/75 shadow-[0_8px_24px_rgba(20,15,10,0.08)] backdrop-blur-lg"
                    }`}
                >
                    <Link
                        href="/"
                        className="group flex min-w-0 items-center gap-2.5 sm:gap-3 transition-transform duration-200 active:scale-95"
                    >
                        <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40 group-hover:scale-105">
                            <Image
                                src="/assets/cissa.png"
                                alt="CISSA Logo"
                                fill
                                sizes="40px"
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[1.05rem] font-bold tracking-tight text-neutral-900 sm:text-[1.12rem] leading-none">
                                CISSA
                            </span>
                            <span className="hidden sm:inline-block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-neutral-500 mt-0.5">
                                Unilorin
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="ml-auto hidden items-center lg:flex" aria-label="Primary">
                        <ul className="flex items-center gap-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive =
                                    hasMounted &&
                                    (pathname === link.href ||
                                        ((link.href === "/news" ||
                                            link.href === "/events" ||
                                            link.href === "/materials") &&
                                            pathname.startsWith(link.href)));

                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`relative flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                                                isActive
                                                    ? "bg-primary text-white shadow-xs"
                                                    : "text-neutral-600 hover:text-neutral-950 hover:bg-black/5"
                                            }`}
                                        >
                                            {Icon && (
                                                <Icon
                                                    className={`mr-1.5 h-4 w-4 transition-transform ${
                                                        isActive
                                                            ? "text-white"
                                                            : "opacity-70 group-hover:scale-110"
                                                    }`}
                                                />
                                            )}
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Mobile Menu Trigger Button */}
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-base-300/80 bg-base-100 text-neutral-900 shadow-xs transition-all duration-200 hover:bg-base-200 active:scale-95 lg:hidden"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-navigation-overlay"
                        onClick={() => setIsMobileMenuOpen((current) => !current)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5 text-neutral-900" />
                        ) : (
                            <Menu className="h-5 w-5 text-neutral-900" />
                        )}
                    </button>
                </header>

                {/* Mobile Navigation Drawer */}
                <div
                    id="mobile-navigation-overlay"
                    className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
                        isMobileMenuOpen
                            ? "pointer-events-auto opacity-100"
                            : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={!isMobileMenuOpen}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Sheet Drawer */}
                    <div
                        className={`absolute inset-x-0 top-0 max-h-[92vh] flex flex-col overflow-y-auto rounded-b-3xl border-b border-white/10 bg-neutral-950 text-white shadow-2xl transition-transform duration-300 ease-out ${
                            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
                        }`}
                        style={{
                            paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.25rem)",
                            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
                        }}
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between border-b border-white/10 px-5 pb-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2.5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40">
                                    <Image
                                        src="/assets/cissa.png"
                                        alt="CISSA Logo"
                                        fill
                                        sizes="36px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-bold tracking-tight text-white leading-tight">
                                        CISSA
                                    </span>
                                    <span className="text-[0.68rem] font-medium tracking-wider text-white/60 uppercase">
                                        Faculty of CIS • Unilorin
                                    </span>
                                </div>
                            </Link>

                            <button
                                type="button"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
                                aria-label="Close menu"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav aria-label="Mobile primary" className="px-4 py-4">
                            <ul className="space-y-1.5">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isActive =
                                        hasMounted &&
                                        (pathname === link.href ||
                                            ((link.href === "/news" ||
                                                link.href === "/events" ||
                                                link.href === "/materials") &&
                                                pathname.startsWith(link.href)));

                                    return (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`group flex items-center justify-between rounded-2xl p-3 transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-primary text-white shadow-md font-semibold"
                                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3.5">
                                                    <div
                                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                                            isActive
                                                                ? "bg-white/20 text-white"
                                                                : "bg-white/5 text-amber-300 group-hover:bg-white/10"
                                                        }`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="text-base leading-tight">
                                                            {link.label}
                                                        </div>
                                                        <div
                                                            className={`text-xs ${
                                                                isActive
                                                                    ? "text-white/80"
                                                                    : "text-white/50"
                                                            }`}
                                                        >
                                                            {link.description}
                                                        </div>
                                                    </div>
                                                </div>

                                                <ChevronRight
                                                    className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${
                                                        isActive
                                                            ? "text-white"
                                                            : "text-white/30"
                                                    }`}
                                                />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Quick Action Button */}
                        <div className="px-4 pt-1 pb-3">
                            <a
                                href="https://chat.whatsapp.com/G5LkBmXDxQa1mYWBvhrMaa"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-emerald-300 transition-all hover:bg-emerald-500/25 active:scale-[0.99]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-neutral-950 font-bold">
                                        <MessagesSquare className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">
                                            Join CISSA WhatsApp
                                        </div>
                                        <div className="text-xs text-emerald-300/80">
                                            Get daily faculty updates
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* Social Links Footer */}
                        <div className="mt-auto border-t border-white/10 px-5 pt-4">
                            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/50 mb-3">
                                Stay Connected
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                                {socialLinks.map((social) => {
                                    const SocialIcon = social.icon;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={social.label}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-white/40 hover:bg-white/15 hover:text-white active:scale-95"
                                        >
                                            <SocialIcon className="h-4 w-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
