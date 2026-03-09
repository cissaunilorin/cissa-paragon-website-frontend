import { Metadata } from "next";
import AnnouncementsDashboard from "./_components/AnnouncementsDashboardClient";

export const metadata: Metadata = {
    title: "Announcements",
    description: "Manage site announcements",
};

export default function AnnouncementsPage() {
    return <AnnouncementsDashboard />;
}