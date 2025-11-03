"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAccessToken } from "@/lib/utils/token";

import "../globals.css";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = !!getAccessToken;

        if (!isAuthenticated) {
            router.push("/admin/login");
        }
    }, [router]);

    return <>{children}</>;
}
