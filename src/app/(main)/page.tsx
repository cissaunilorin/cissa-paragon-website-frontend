"use client";

import Hero from "@/components/Home/Hero";
import News from "@/components/Home/News";
import Responsibilities from "@/components/Home/Responsibilities";
import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact";
import Executives from "@/components/Home/Executives";
import Departments from "@/components/Home/Departments";
import PresidentialWelcome from "@/components/Home/PresidentialWelcome";

export default function Home() {
  return (
    <>
      <Hero />
      <PresidentialWelcome />
      <About />
      <Departments />
      <Executives />
      <Responsibilities />
      <News />
      <Contact />
    </>
  );
}
