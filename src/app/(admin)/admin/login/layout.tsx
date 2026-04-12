import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Login",
    description:
        "Login page for CISSA administrators to access the administrative interface for managing the CISSA website.",
};

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
    return children;
}