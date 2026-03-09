import { Metadata } from "next";
import SignatoriesDashboard from "./_components/SignatoriesDashboardClient";

export const metadata: Metadata = {
    title: "Signatories",
    description: "Manage signatories for announcements",
};

export default function Page() {
    return <SignatoriesDashboard />;
}