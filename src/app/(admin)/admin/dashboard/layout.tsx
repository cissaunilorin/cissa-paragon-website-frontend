"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Megaphone,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getAccessToken, isTokenExpired } from "@/lib/utils/token";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);

    const redirectToLogin = useCallback(() => {
        // Store the attempted URL for redirect after login
        sessionStorage.setItem("admin_return_url", pathname);
        router.push("/admin/login");
    }, [pathname, router]);

    const validateAuthentication = useCallback(async () => {
        try {
            const token = getAccessToken();

            // No token found
            if (!token) {
                redirectToLogin();
                return;
            }

            // Token is expired
            if (isTokenExpired()) {
                // Clear expired token
                localStorage.removeItem("access_token");
                redirectToLogin();
                return;
            }

            // Token is valid
            setLoading(false);
        } catch (error) {
            console.error("Authentication validation error:", error);
            redirectToLogin();
        }
    }, [pathname, router, redirectToLogin]);

    useEffect(() => {
        validateAuthentication();
    }, [validateAuthentication]);

    // Handle route changes
    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true);
            validateAuthentication();
        };

        // Re-validate on pathname change
        handleRouteChange();
    }, [pathname, validateAuthentication]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-base-100">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
                    <p className="text-base-content/70">
                        Verifying authentication...
                    </p>
                </div>
            </div>
        );
    }

    const isActive = (path: string) => pathname === path;

    const navigationItems = [
        {
            href: "/admin/dashboard",
            label: "Overview",
            icon: LayoutDashboard,
        },
        {
            href: "/admin/dashboard/signatories",
            label: "Signatories",
            icon: Users,
        },
        {
            href: "/admin/dashboard/announcements",
            label: "Announcements",
            icon: Megaphone,
        }
    ];

    return (
        <div className="flex h-screen bg-base-100">
            {/* Sidebar */}
            <div
                className={`bg-base-200 border-r border-base-300 transition-all duration-300 ${
                    isCollapsed ? "w-16" : "w-64"
                } flex flex-col`}
            >
                {/* Logo and Title */}
                <div className="p-4 border-b border-base-300">
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="w-8 h-8 rounded-full">
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
                                <h1 className="text-2xl font-bold text-base-content">
                                    CISSA
                                </h1>
                                <p className="text-md text-base-content/70">
                                    Admin Panel
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-2">
                    <ul className="space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                      ${
                          active
                              ? "bg-primary text-primary-content"
                              : "text-base-content hover:bg-base-300"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                                        title={
                                            isCollapsed ? item.label : undefined
                                        }
                                    >
                                        <Icon
                                            size={20}
                                            className="flex-shrink-0"
                                        />
                                        {!isCollapsed && (
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Toggle Button */}
                <div className="p-2 border-t border-base-300">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-base-300 transition-colors"
                        title={
                            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
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

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
