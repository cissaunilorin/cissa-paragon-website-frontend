import { Metadata } from "next";
import NewsPage from "./_components/NewsPageClient";

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

export default async function NewsPageWrapper({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    return <NewsPage initialPage={page} />;
}