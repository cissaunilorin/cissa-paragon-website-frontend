"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Home/Hero";
import Statistics from "@/components/Home/Statistics";
import Footer from "@/components/Footer";
import Responsibilities from "@/components/Home/Responsibilities";
import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact";
import Executives from "@/components/Home/Executives";
import Departments from "@/components/Home/Departments";

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



    return (
        <>
            <Navbar showNavbar={showNavbar} />
            <Hero />
            <About />
            <Departments />
            <Executives />
            <Responsibilities />
            <Contact />
            <Footer />
        </>
    );
}
