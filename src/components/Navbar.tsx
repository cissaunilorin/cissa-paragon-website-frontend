"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        // guard for SSR / node environment
        if (typeof window === "undefined") return;

        const pathname = window.location.pathname;
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
    }, []);

    return (
        <div
            className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:px-46 ${
                showNavbar
                    ? "bg-base-100/95 backdrop-blur shadow-lg translate-y-0"
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
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#departments">Departments</a>
                        </li>
                        <li>
                            <a href="#executives">Executives</a>
                        </li>
                        <li>
                            <a href="#responsibilities">Responsibilities</a>
                        </li>
                        <li>
                            <a href="#news">News</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
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
                </div>
            </div>
            <div
                role="tablist"
                className="navbar-end hidden lg:flex tabs tabs-border"
            >
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a href="#home" className="hover:text-primary tab">
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            role="tab"
                            href="#about"
                            className="hover:text-primary tab"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            role="tab"
                            href="#departments"
                            className="hover:text-primary tab"
                        >
                            Departments
                        </a>
                    </li>
                    <li>
                        <a
                            role="tab"
                            href="#executives"
                            className="hover:text-primary tab"
                        >
                            Executives
                        </a>
                    </li>
                    <li>
                        <a
                            role="tab"
                            href="#responsibilities"
                            className="hover:text-primary tab"
                        >
                            Responsibilities
                        </a>
                    </li>
                    <li>
                        <a
                            role="tab"
                            href="#news"
                            className="hover:text-primary tab"
                        >
                            News
                        </a>
                    </li>
                    <li>
                        <a
                            role="tab"
                            href="#contact"
                            className="hover:text-primary tab"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
