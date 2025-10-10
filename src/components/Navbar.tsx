"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Home, Newspaper, Phone } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" , icon: Home},
    { label: "News", href: "/news" , icon: Newspaper},
    { label: "Contact", href: "/#contact", icon: Phone },
];

export default function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        console.log("Current pathname:", pathname);
        const isHome = pathname === "/";

        if (isHome) {
            // start hidden on home, show when scrolled past hero
            setShowNavbar(false);

            const handleScroll = () => {
                const heroHeight = window.innerHeight;
                setShowNavbar(window.scrollY > heroHeight * 0.8);
            };

            window.addEventListener("scroll", handleScroll);
            // run once to set initial state based on current scroll
            handleScroll();

            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            // non-home pages: always show navbar
            setShowNavbar(true);
        }
    }, [pathname]);

    return (
        <div
            className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:px-46 ${
                showNavbar
                    ? "bg-base-100/95 backdrop-blur shadow-md translate-y-0"
                    : "-translate-y-full"
            }`}
        >
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            ></path>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <Link href="/" className="flex items-center gap-2">
                    <div className="avatar">
                        <div className="w-8 h-8 rounded-full">
                            <Image
                                src="/assets/cissa.png"
                                alt="CISSA Logo"
                                width={32}
                                height={32}
                            />
                        </div>
                    </div>
                    <span className="text-xl font-bold">CISSA</span>
                </Link>
            </div>
            <div
                role="tablist"
                className="navbar-end hidden lg:flex tabs tabs-border"
            >
                <ul className="menu menu-horizontal px-1">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                role="tab"
                                href={link.href}
                                className={`hover:text-primary tab ${
                                    pathname === link.href ? "tab-active" : ""
                                }`}
                            >
                                {link.icon && <link.icon className="w-4 h-4 mr-2 inline" />}
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
