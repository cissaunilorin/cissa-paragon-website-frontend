import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Metadata } from "next";

export const metadata: Metadata = {
    // title: "Home | CISSA",
    title: {
        template: "%s | CISSA",
        default: "Home | CISSA",
    },
    description:
        "CISSA is the official student association for Communication and Information Sciences students at the University of Ilorin. We aim to enhance the student experience through various activities, events, and support services.",
    keywords: [
        "CISSA",
        "Communication and Information Sciences",
        "Student Association",
        "University of Ilorin",
        "CIS",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
