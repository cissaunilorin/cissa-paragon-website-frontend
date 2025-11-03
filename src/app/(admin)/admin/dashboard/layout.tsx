"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Megaphone,
    Calendar,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

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
        },
        // {
        //     href: "/admin/events",
        //     label: "Events",
        //     icon: Calendar,
        // },
        // {
        //     href: "/admin/settings",
        //     label: "Settings",
        //     icon: Settings,
        // },
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
                        {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-content font-bold text-sm">
                                C
                            </span>
                        </div> */}
                        <div className="avatar">
                            <div className="w-8 h-8 rounded-full">
                                <img src="/assets/cissa.png" alt="CISSA Logo" />
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
