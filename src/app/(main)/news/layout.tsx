import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "News & Announcements",
    description:
        "Stay updated with the latest news and announcements from the Faculty of Communication and Information Sciences at the University of Ilorin.",
    keywords: [
        "CISSA",
        "Communication and Information Sciences",
        "Student Association",
        "University of Ilorin",
        "CIS",
        "News",
        "Announcements",
        "Updates",
    ],
};

export default function NewsLayout({ children }: { children: ReactNode }) {
    return children;
}