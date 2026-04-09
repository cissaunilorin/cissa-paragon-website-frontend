"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Megaphone,
    Calendar,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import { getAccessToken, isTokenExpired } from "@/lib/utils/token";
import { getCurrentUser, type UserData } from "@/lib/auth";

export default function AdminDashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);

    const redirectToLogin = useCallback(() => {
        sessionStorage.setItem("admin_return_url", pathname);
        router.push("/admin/login");
    }, [pathname, router]);

    const validateAuthentication = useCallback(async () => {
        try {
            const token = getAccessToken();

            if (!token) {
                redirectToLogin();
                return;
            }

            if (isTokenExpired()) {
                localStorage.removeItem("access_token");
                redirectToLogin();
                return;
            }

            const currentUser = await getCurrentUser();
            setUser(currentUser || null);

            setLoading(false);
        } catch (error) {
            console.error("Authentication validation error:", error);
            redirectToLogin();
        }
    }, [redirectToLogin]);

    useEffect(() => {
        validateAuthentication();
    }, [validateAuthentication]);

    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true);
            validateAuthentication();
        };

        handleRouteChange();
    }, [pathname, validateAuthentication]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-base-100">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg mb-4 text-primary"></div>
                    <p className="text-base-content/70">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    const isActive = (path: string) => pathname === path;

    const navigationItems = [
        { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/dashboard/signatories", label: "Signatories", icon: Users },
        { href: "/admin/dashboard/announcements", label: "Announcements", icon: Megaphone },
        { href: "/admin/dashboard/events", label: "Events", icon: Calendar },
    ];

    return (
        <div className="flex h-screen bg-base-100">
            <div
                className={`flex flex-col border-r border-base-300 bg-base-200 transition-all duration-300 ${
                    isCollapsed ? "w-16" : "w-64"
                }`}
            >
                <div className="border-b border-base-300 p-4">
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="h-8 w-8 rounded-full">
                                <Image
                                    src="/assets/cissa.png"
                                    alt="CISSA Logo"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </div>
                        {!isCollapsed && (
                            <div>
                                <h1 className="text-2xl font-bold text-base-content">CISSA</h1>
                                <p className="text-md text-base-content/70">Admin Panel</p>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-1 p-2">
                    <ul className="space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                                            active
                                                ? "bg-primary text-primary-content"
                                                : "text-base-content hover:bg-base-300"
                                        } ${isCollapsed ? "justify-center" : ""}`}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <Icon size={20} className="shrink-0" />
                                        {!isCollapsed && <span className="font-medium">{item.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="border-t border-base-300 p-2">
                    <div className={`flex items-center gap-3 px-3 py-2 ${isCollapsed ? "justify-center" : ""}`}>
                        <div className="avatar avatar-placeholder">
                            <div className="w-10 rounded-full bg-primary text-primary-content">
                                <span className="text-lg font-semibold">
                                    {user ? user.username.charAt(0).toUpperCase() : "A"}
                                </span>
                            </div>
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-base-content">
                                    {user ? user.username : "Admin User"}
                                </p>
                                <p className="truncate text-xs text-base-content/70">
                                    {user ? user.email : "admin@cissa.com"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-base-300 p-2">
                    <button
                        onClick={() => {
                            localStorage.removeItem("access_token");
                            redirectToLogin();
                        }}
                        className="btn btn-soft btn-error flex w-full items-center justify-center rounded-lg p-2"
                        title="Logout"
                    >
                        {isCollapsed ? <LogOut size={20} /> : <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>

                <div className="border-t border-base-300 p-2">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="flex w-full items-center justify-center rounded-lg p-2 transition-colors hover:bg-base-300"
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? (
                            <ChevronRight size={20} />
                        ) : (
                            <>
                                <ChevronLeft size={20} />
                                <span className="ml-2 text-sm">Collapse</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <main className="min-w-0 flex-1 overflow-auto">{children}</main>
        </div>
    );
}