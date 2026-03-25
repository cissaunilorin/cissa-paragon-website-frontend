import Hero from "./_components/Hero";
import WhatWeDo from "./_components/WhatWeDo";
import News from "./_components/News";
import Responsibilities from "./_components/Responsibilities";
import About from "./_components/About";
import Contact from "./_components/Contact";
import Executives from "./_components/Executives";
import Departments from "./_components/Departments";
import PresidentialWelcome from "./_components/PresidentialWelcome";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <PresidentialWelcome />
      {/* <About /> */}
      {/* <Departments /> */}
      {/* <Executives /> */}
      {/* <Responsibilities /> */}
      <News />
      {/* <Contact /> */}
    </>
  );
}
