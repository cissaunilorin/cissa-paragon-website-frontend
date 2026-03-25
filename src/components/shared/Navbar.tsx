"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Home, Menu, Newspaper, Twitter, X } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "News", href: "/news", icon: Newspaper },
];

const socialLinks = [
    { label: "Facebook", href: "https://facebook.com", icon: Facebook },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMobileMenuOpen) {
            return;
        }

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
            <div className="mx-auto w-full lg:max-w-[80vw] px-3 mt-4 pointer-events-auto transition-all duration-300 sm:px-4 lg:px-6 lg:mt-8">
                <header className="flex h-16 items-center justify-between gap-4 rounded-4xl border border-[#d7d0c4] bg-[#f7f0e7]/95 px-4 shadow-[0_12px_30px_rgba(34,24,15,0.16)] backdrop-blur-xl lg:h-16 lg:px-6">
                    <Link href="/" className="flex min-w-0 items-center gap-2.5 lg:gap-3">
                        <div className="avatar shrink-0">
                            <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/5 lg:h-10 lg:w-10">
                                <Image
                                    src="/assets/cissa.png"
                                    alt="CISSA Logo"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </div>
                        <span className="truncate text-[1.05rem] font-semibold tracking-tight text-neutral-900 lg:text-[1.1rem]">
                            CISSA
                        </span>
                    </Link>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-[#cbbfb0] bg-white/55 p-2.5 text-neutral-900 shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-white/80 active:scale-[0.98] lg:hidden"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-navigation-overlay"
                        onClick={() => setIsMobileMenuOpen((current) => !current)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>

                    <nav className="ml-auto hidden items-center lg:flex" aria-label="Primary">
                        <ul className="flex items-center gap-1 pl-4">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive =
                                    pathname === link.href ||
                                    (link.href === "/news" && pathname.startsWith("/news"));

                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`flex items-center rounded-full px-4 py-2 text-sm transition-colors ${
                                                isActive
                                                    ? "text-neutral-900"
                                                    : "text-neutral-500 hover:text-neutral-900"
                                            }`}
                                        >
                                            {Icon && <Icon className="mr-2 h-4 w-4 opacity-80" />}
                                            <span className="whitespace-nowrap">{link.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </header>

                <div
                    id="mobile-navigation-overlay"
                    className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-out ${
                        isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={!isMobileMenuOpen}
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                        aria-label="Close navigation overlay"
                        tabIndex={-1}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <div className="relative flex h-full flex-col bg-[linear-gradient(180deg,#c97d3a_0%,#bb7336_48%,#ac682f_100%)] px-5 pb-6 pt-5 text-white shadow-[0_24px_80px_rgba(54,28,9,0.35)]">
                        <div className="flex items-center justify-between gap-4">
                            <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="avatar shrink-0">
                                    <div className="h-9 w-9 overflow-hidden rounded-full bg-white/90 ring-1 ring-white/15">
                                        <Image
                                            src="/assets/cissa.png"
                                            alt="CISSA Logo"
                                            width={36}
                                            height={36}
                                        />
                                    </div>
                                </div>
                                <span className="text-[1.05rem] font-semibold tracking-tight text-white">
                                    CISSA
                                </span>
                            </Link>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/18 active:bg-white/24"
                                aria-label="Close navigation menu"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex flex-1 items-center justify-center">
                            <nav aria-label="Mobile primary" className="w-full">
                                <ul className="flex flex-col items-end gap-3 sm:gap-4">
                                    {navLinks.map((link) => {
                                        const isActive =
                                            pathname === link.href ||
                                            (link.href === "/news" && pathname.startsWith("/news"));

                                        return (
                                            <li key={link.href} className="w-full text-right">
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`inline-flex min-w-[72%] justify-end rounded-full px-2 py-1 text-[clamp(2rem,6.25vw,3.45rem)] font-medium leading-none tracking-tight transition-all duration-200 sm:min-w-[65%] ${
                                                        isActive
                                                            ? "text-white"
                                                            : "text-white/80 hover:text-white"
                                                    }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-4">
                            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-white/70">
                                Connect
                            </p>

                            <div className="flex items-center gap-2.5">
                                {socialLinks.map((social) => {
                                    const SocialIcon = social.icon;

                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={social.label}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/22 bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/18 hover:border-white/35"
                                        >
                                            <SocialIcon className="h-4.5 w-4.5" />
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
