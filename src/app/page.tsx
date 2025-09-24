"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Home/Hero";
import Statistics from "@/components/Home/Statistics";
import Footer from "@/components/Footer";
import Responsibilities from "@/components/Home/Responsibilities";
import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact";

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
            <Navbar showNavbar={showNavbar} />
            <Hero />
            <Statistics stats={stats} />
            <About />
            <Responsibilities />
            <Contact />
            <Footer />
        </>
    );
}
