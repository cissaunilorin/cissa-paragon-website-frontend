"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Home, Newspaper, Phone } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" , icon: Home},
    { label: "News", href: "/news" , icon: Newspaper},
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
            <div className="mx-auto w-full lg:max-w-[80vw] px-3 mt-4 pointer-events-auto transition-all duration-300 sm:px-4 lg:px-6 lg:mt-8">
                <header className="flex h-16 items-center gap-4 rounded-4xl border border-[#d7d0c4] bg-[#f7f0e7]/95 px-4 shadow-[0_12px_30px_rgba(34,24,15,0.16)] backdrop-blur-xl lg:h-16 lg:px-6">
                    <div className="flex shrink-0 items-center gap-3">
                        <div className="dropdown lg:hidden">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-sm p-2 text-neutral-700 hover:bg-black/5"
                                aria-label="Open navigation menu"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-20 w-56 rounded-2xl border border-[#d7d0c4] bg-[#f7f0e7] p-2 shadow-[0_12px_30px_rgba(34,24,15,0.16)]"
                            >
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="rounded-xl py-2.5">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="avatar">
                                <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/5 lg:h-10 lg:w-10">
                                    <Image
                                        src="/assets/cissa.png"
                                        alt="CISSA Logo"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </div>
                            <span className="text-[1.05rem] font-semibold tracking-tight text-neutral-900 lg:text-[1.1rem]">
                                CISSA
                            </span>
                        </Link>
                    </div>

                    <nav className="ml-auto hidden items-center lg:flex" aria-label="Primary">
                        <ul className="flex items-center gap-1 pl-4">
                            {navLinks.map((link, index) => {
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
                                            } ${index === 0 ? "pl-2" : ""}`}
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
            </div>
        </div>
    );
}
