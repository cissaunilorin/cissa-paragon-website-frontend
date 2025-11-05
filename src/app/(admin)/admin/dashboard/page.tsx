import { Metadata } from "next";
import AdminHome from "@/components/Admin/Dashboard/AdminHome";

export const metadata: Metadata = {
    title: "Overview",
    description:
        "Administrative dashboard for managing the CISSA website, including content updates, user management, and site settings.",
};

export default function AdminDashboardPage() {
    return <AdminHome />;
}