"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Footer from "@/components/Footer";

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

    // const executives = [
    //     {
    //         name: "John Adebayo",
    //         position: "President",
    //         image: "/api/placeholder/300/400",
    //     },
    //     {
    //         name: "Sarah Johnson",
    //         position: "Vice President",
    //         image: "/api/placeholder/300/400",
    //     },
    //     {
    //         name: "Michael Chen",
    //         position: "Secretary General",
    //         image: "/api/placeholder/300/400",
    //     },
    //     {
    //         name: "Fatima Ibrahim",
    //         position: "Financial Secretary",
    //         image: "/api/placeholder/300/400",
    //     },
    //     {
    //         name: "David Okafor",
    //         position: "Public Relations Officer",
    //         image: "/api/placeholder/300/400",
    //     },
    //     {
    //         name: "Aisha Mohammed",
    //         position: "Social Director",
    //         image: "/api/placeholder/300/400",
    //     },
    // ];

    const stats = [
        { label: "Years of Excellence", value: "17" },
        { label: "Departments", value: "5" },
        { label: "Executive Officers", value: "10" },
        { label: "Principal Officers", value: "4" },
        { label: "Honourables", value: "20" },
        { label: "Senators", value: "3" },
        { label: "Students", value: "1,250" },
    ];

    return (
        <>
            {/* Fixed Navbar */}
            <Navbar showNavbar={showNavbar} />

            {/* Hero Section */}
            <Hero />

            {/* Statistics Section */}
            <Statistics stats={stats} />

            {/* About Section */}
            <div id="about" className="py-20 bg-base-200">
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

            {/* Responsibilities Section */}
            <div className="py-20 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                            Our{" "}
                            <span className="text-primary">
                                Responsibilities
                            </span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-primary">
                                    Academic Empowerment
                                </h3>
                                <p className="text-base-content/80">
                                    Organizes tutorials, workshops, and seminars
                                    to support academic excellence and skills
                                    development among CISSAites.
                                </p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-primary">
                                    Welfare Support
                                </h3>
                                <p className="text-base-content/80">
                                    Ensures the well-being of members by
                                    addressing students&apos; concerns, and providing
                                    assistance during emergencies.
                                </p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-primary">
                                    Social Events & Networking
                                </h3>
                                <p className="text-base-content/80">
                                    Plans and executes events like Freshers&apos;
                                    Welcome, Dinner & Awards, and other social
                                    functions to foster unity and networking.
                                </p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-primary">
                                    Sports and Fitness
                                </h3>
                                <p className="text-base-content/80">
                                    Promotes physical well-being and unity
                                    through inter-departmental games, Dean Cup,
                                    and sporting events.
                                </p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-primary">
                                    Career and Tech Development
                                </h3>
                                <p className="text-base-content/80">
                                    Collaborates with industry experts to host
                                    tech bootcamps, career talks, and trainings
                                    for future-ready CISSAites.
                                </p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-primary">
                                    Representation & Advocacy
                                </h3>
                                <p className="text-base-content/80">
                                    Serves as a voice for CISSAites in
                                    faculty-wide or university-level matters,
                                    ensuring students&apos; interests are protected.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="py-20 bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                            Get in <span className="text-primary">Touch</span>
                        </h2>
                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            Have questions or want to get involved? We&apos;d love to
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
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}
