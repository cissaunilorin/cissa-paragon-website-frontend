import Hero from "./_components/Hero";
import WhatWeDo from "./_components/WhatWeDo";
import LatestAnnouncements from "./_components/LatestAnnouncements";
import PresidentialWelcome from "./_components/PresidentialWelcome";
import UpcomingEvent from "./_components/UpcomingEvent";

export default function Home() {
    return (
        <>
            <Hero />
            <WhatWeDo />
            <PresidentialWelcome />
            <UpcomingEvent />
            <LatestAnnouncements />
        </>
    );
}
