import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Announcements",
    description: "Manage site announcements",
};

export default function AnnouncementsLayout({ children }: { children: ReactNode }) {
    return children;
}