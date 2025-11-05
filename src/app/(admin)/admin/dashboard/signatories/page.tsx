import { Metadata } from "next";
import SignatoriesDashboard from "@/components/Admin/Dashboard/SignatoriesDashboard";

export const metadata: Metadata = {
    title: "Signatories",
    description: "Manage signatories for announcements",
};

export default function Page() {
    return <SignatoriesDashboard />;
}