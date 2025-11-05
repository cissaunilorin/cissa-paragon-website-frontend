import { Metadata } from "next";
import AnnouncementsDashboard from "@/components/Admin/Dashboard/AnnouncementsDashboard";

export const metadata: Metadata = {
    title: "Announcements",
    description: "Manage site announcements",
};

export default function AnnouncementsPage() {
    return <AnnouncementsDashboard />;
}