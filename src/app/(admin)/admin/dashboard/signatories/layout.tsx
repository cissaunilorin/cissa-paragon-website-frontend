import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Signatories",
    description: "Manage signatories for announcements",
};

export default function SignatoriesLayout({ children }: { children: ReactNode }) {
    return children;
}