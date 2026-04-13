import type { Metadata } from "next";
import type { ReactNode } from "react";

import AdminDashboardShell from "./_components/AdminDashboardShell";

export const metadata: Metadata = {
    title: "Overview",
    description:
        "Administrative dashboard for managing the CISSA website, including content updates, user management, and site settings.",
};

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
    return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
