"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            setShowNavbar(window.scrollY > heroHeight * 0.8);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const executives = [
        {
            name: "John Adebayo",
            position: "President",
            image: "/api/placeholder/300/400",
        },
        {
            name: "Sarah Johnson",
            position: "Vice President",
            image: "/api/placeholder/300/400",
        },
        {
            name: "Michael Chen",
            position: "Secretary General",
            image: "/api/placeholder/300/400",
        },
        {
            name: "Fatima Ibrahim",
            position: "Financial Secretary",
            image: "/api/placeholder/300/400",
        },
        {
            name: "David Okafor",
            position: "Public Relations Officer",
            image: "/api/placeholder/300/400",
        },
        {
            name: "Aisha Mohammed",
            position: "Social Director",
            image: "/api/placeholder/300/400",
        },
    ];

    const stats = [
        { label: "Students", value: "1,250+" },
        { label: "Departments", value: "4" },
        { label: "Faculty Members", value: "45+" },
        { label: "Years of Excellence", value: "15+" },
    ];

    return (
        <>
            {/* Fixed Navbar */}
            <Navbar showNavbar={showNavbar} />

            {/* Hero Section */}
            <div
                id="home"
                className="hero min-h-screen relative"
                style={{
                    backgroundImage: "url(/assets/ov-2.png)",
                }}
            >
                <div className="hero-overlay bg-gradient-to-r from-black/60 to-black/40"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-4xl">
                        <h1 className="mb-6 text-5xl md:text-7xl font-bold leading-tight">
                            Welcome to{" "}
                            <span className="text-primary">CISSA</span>
                        </h1>
                        <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto">
                            Communication and Information Sciences Students
                            Association - Your gateway to academic excellence,
                            professional development, and lasting connections in
                            the Faculty of Communication and Information
                            Sciences, University of Ilorin.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn btn-primary btn-lg ">
                                Explore CISSA
                            </button>
                            <button className="btn btn-outline btn-lg">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="py-16 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="stat place-items-center"
                            >
                                <div className="stat-value text-primary">
                                    {stat.value}
                                </div>
                                <div className="stat-title text-base-content/70">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="py-20 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
                                About{" "}
                                <span className="text-primary">CISSA</span>
                            </h2>
                            <p className="text-lg text-base-content/80 mb-6">
                                The Communication and Information Sciences
                                Students Association (CISSA) is the premier
                                student organization representing all
                                undergraduate and graduate students in the
                                Faculty of Communication and Information
                                Sciences at the University of Ilorin.
                            </p>
                            <p className="text-lg text-base-content/80 mb-8">
                                We are committed to fostering academic
                                excellence, professional development, and
                                creating lasting bonds among students while
                                bridging the gap between academic theory and
                                industry practice.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="badge badge-primary badge-lg">
                                    Academic Excellence
                                </div>
                                <div className="badge badge-secondary badge-lg">
                                    Professional Growth
                                </div>
                                <div className="badge badge-accent badge-lg">
                                    Community Building
                                </div>
                            </div>
                        </div>
                        <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-2xl mb-4">
                                    Our Mission
                                </h3>
                                <p className="text-base-content/80 mb-4">
                                    To empower students with the knowledge,
                                    skills, and networks necessary for success
                                    in the dynamic fields of communication and
                                    information sciences.
                                </p>
                                <h3 className="card-title text-2xl mb-4">
                                    Our Vision
                                </h3>
                                <p className="text-base-content/80">
                                    To be the leading student association that
                                    bridges academia and industry, producing
                                    graduates who are innovative leaders in
                                    communication and information sciences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Events Section */}
            {/* <div id="events" className="py-20 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                            Upcoming{" "}
                            <span className="text-primary">Events</span>
                        </h2>
                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            Stay connected with our vibrant community through
                            workshops, conferences, and networking events.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="badge badge-primary">
                                        Workshop
                                    </div>
                                    <span className="text-sm text-base-content/60">
                                        Dec 15, 2025
                                    </span>
                                </div>
                                <h3 className="card-title">
                                    Digital Media Production Workshop
                                </h3>
                                <p>
                                    Learn the latest techniques in digital
                                    content creation and multimedia production.
                                </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary btn-sm">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="badge badge-secondary">
                                        Conference
                                    </div>
                                    <span className="text-sm text-base-content/60">
                                        Jan 20, 2026
                                    </span>
                                </div>
                                <h3 className="card-title">
                                    Annual CISSA Conference
                                </h3>
                                <p>
                                    Our flagship event featuring industry
                                    leaders and academic experts.
                                </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary btn-sm">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="badge badge-accent">
                                        Networking
                                    </div>
                                    <span className="text-sm text-base-content/60">
                                        Feb 10, 2026
                                    </span>
                                </div>
                                <h3 className="card-title">
                                    Alumni Meet & Greet
                                </h3>
                                <p>
                                    Connect with successful alumni and explore
                                    career opportunities.
                                </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary btn-sm">
                                        RSVP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Contact Section */}
            {/* <div id="contact" className="py-20 bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                            Get in <span className="text-primary">Touch</span>
                        </h2>
                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            Have questions or want to get involved? We'd love to
                            hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <svg
                                            className="w-6 h-6 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            ></path>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Location
                                        </h3>
                                        <p className="text-base-content/70">
                                            Faculty of CIS, University of
                                            Ilorin, Kwara State
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <svg
                                            className="w-6 h-6 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-base-content/70">
                                            info@cissa-unilorin.org
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <svg
                                            className="w-6 h-6 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p className="text-base-content/70">
                                            +234 (0) 803 xxx xxxx
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title mb-4">
                                    Send us a Message
                                </h3>
                                <form className="space-y-4">
                                    <div className="form-control">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <input
                                            type="text"
                                            placeholder="Subject"
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <textarea
                                            className="textarea textarea-bordered h-32"
                                            placeholder="Your Message"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Footer */}
            {/* <footer className="footer footer-center bg-base-300 text-base-content p-10">
                <aside>
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                            <img
                                src="/assets/cissa.png"
                                alt="CISSA Logo"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-xl">
                        Communication and Information Sciences Students
                        Association
                        <br />
                        University of Ilorin
                    </p>
                    <p>Copyright © 2025 - All rights reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a className="text-2xl hover:text-primary transition-colors">
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a className="text-2xl hover:text-primary transition-colors">
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                            </svg>
                        </a>
                        <a className="text-2xl hover:text-primary transition-colors">
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.37 0 4.15 1.55 4.15 4.89v6.21z" />
                            </svg>
                        </a>
                        <a className="text-2xl hover:text-primary transition-colors">
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347l-.402 1.629c-.058.233-.192.286-.402.172-1.507-.7-2.448-2.893-2.448-4.658 0-3.797 2.759-7.291 7.967-7.291 4.183 0 7.433 2.978 7.433 6.96 0 4.144-2.616 7.478-6.24 7.478-1.22 0-2.367-.635-2.758-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer> */}

            {/* <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                <aside>
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current"
                    >
                        <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <p>
                        ACME Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer> */}
        </>
    );
}
