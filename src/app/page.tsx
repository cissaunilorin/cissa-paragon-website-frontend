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
            name: "Sanni Nurudeen Akorede",
            position: "President",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Oyebanji Aminat Oluwatobi",
            position: "Vice President",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Shittu Ayomide Ebunoluwa",
            position: "General Secretary",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Oguntuwase Oluwafemi Joseph",
            position: "Assistant General Secretary",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
            },
        },
        {
            name: "Kuforiji Ayobami Waris",
            position: "Public Relations Officer",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Shanu Mariam Oluwabunmi",
            position: "Financial Secretary",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Shittu Fareedah Adedamola",
            position: "Welfare Secretary",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Akinleye Akinjuwon Olushola",
            position: "Social Director",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Ashaolu Michael Oluwatoni",
            position: "Sports Director",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Ikeh Chidiebere Franklin",
            position: "Software Director",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
    ];

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
            <About />
            <Statistics stats={stats} />
            <Executives executives={executives} />
            <Responsibilities />
            <Contact />
            <Footer />
        </>
    );
}
