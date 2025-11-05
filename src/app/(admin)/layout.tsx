import "../globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | CISSA Admin",
        default: "CISSA Admin",
    },
    description:
        "Administrative interface for managing the CISSA website, including content updates, user management, and site settings.",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
