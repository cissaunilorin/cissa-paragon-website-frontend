import { Metadata } from "next";
import AdminLogin from "@/components/Admin/AdminLogin";

export const metadata: Metadata = {
    title: "Login",
    description:
        "Login page for CISSA administrators to access the administrative interface for managing the CISSA website.",
};

export default function AdminLoginPage() {
    return <AdminLogin />;
}