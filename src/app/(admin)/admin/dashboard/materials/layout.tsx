import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Materials",
    description: "Manage site materials",
};

export default function MaterialsLayout({ children }: { children: ReactNode }) {
    return children;
}