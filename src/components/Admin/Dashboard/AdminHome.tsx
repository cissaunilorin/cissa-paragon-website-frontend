"use client";
import { getCurrentUser, UserData } from "@/lib/auth";
import { getAnnouncements, type Announcement } from "@/lib/announcements";
import { getSignatories } from "@/lib/signatories";
import { useEffect, useState } from "react";
import {
    FileText,
    Users,
    Calendar,
    TrendingUp,
    Plus,
    Eye,
    Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DashboardStats {
    totalAnnouncements: number;
    totalSignatories: number;
    thisMonthAnnouncements: number;
    recentAnnouncements: Announcement[];
}

export default function AdminHome() {
    const [user, setUser] = useState<UserData | undefined>(undefined);
    const [stats, setStats] = useState<DashboardStats>({
        totalAnnouncements: 0,
        totalSignatories: 0,
        thisMonthAnnouncements: 0,
        recentAnnouncements: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Fetch user data
                const currentUser = await getCurrentUser();
                setUser(currentUser);

                // Fetch announcements and signatories
                const [announcementsData, signatoriesData] = await Promise.all([
                    getAnnouncements(1, 50), // Get first 50 announcements for stats
                    getSignatories()
                ]);

                // Calculate this month's announcements
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                const thisMonthCount = announcementsData.items.filter(announcement => {
                    const publishedDate = new Date(announcement.published_at);
                    return publishedDate.getMonth() === currentMonth &&
                        publishedDate.getFullYear() === currentYear;
                }).length;

                setStats({
                    totalAnnouncements: announcementsData.total_items,
                    totalSignatories: signatoriesData.length,
                    thisMonthAnnouncements: thisMonthCount,
                    recentAnnouncements: announcementsData.items.slice(0, 5)
                });
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                    <p className="text-base-content/70 mt-2">
                        Welcome back, {user?.username}! Here&apos;s what&apos;s happening.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                    <Link href="/admin/dashboard/announcements" className="btn btn-primary gap-2">
                        <Plus size={16} />
                        New Announcement
                    </Link>
                    <Link href="/admin/dashboard/signatories" className="btn btn-outline gap-2">
                        <Users size={16} />
                        Manage Signatories
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat bg-primary text-primary-content rounded-xl shadow-lg">
                    <div className="stat-figure">
                        <FileText size={32} />
                    </div>
                    <div className="stat-title text-primary-content/80">Total Announcements</div>
                    <div className="stat-value">{stats.totalAnnouncements}</div>
                    <div className="stat-desc text-primary-content/60">All time</div>
                </div>

                <div className="stat bg-secondary text-secondary-content rounded-xl shadow-lg">
                    <div className="stat-figure">
                        <Users size={32} />
                    </div>
                    <div className="stat-title text-secondary-content/80">Signatories</div>
                    <div className="stat-value">{stats.totalSignatories}</div>
                    <div className="stat-desc text-secondary-content/60">Available</div>
                </div>

                <div className="stat bg-accent text-accent-content rounded-xl shadow-lg">
                    <div className="stat-figure">
                        <Calendar size={32} />
                    </div>
                    <div className="stat-title text-accent-content/80">This Month</div>
                    <div className="stat-value">{stats.thisMonthAnnouncements}</div>
                    <div className="stat-desc text-accent-content/60">New announcements</div>
                </div>

                <div className="stat bg-info text-info-content rounded-xl shadow-lg">
                    <div className="stat-figure">
                        <TrendingUp size={32} />
                    </div>
                    <div className="stat-title text-info-content/80">Activity</div>
                    <div className="stat-value text-2xl">
                        {stats.thisMonthAnnouncements > 0 ? "Active" : "Quiet"}
                    </div>
                    <div className="stat-desc text-info-content/60">Current trend</div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Announcements */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="card-title">Recent Announcements</h2>
                            <Link href="/admin/dashboard/announcements" className="btn btn-ghost btn-sm">
                                View All
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {stats.recentAnnouncements.length === 0 ? (
                                <div className="text-center py-8">
                                    <FileText size={48} className="mx-auto text-base-content/20 mb-3" />
                                    <p className="text-base-content/60">No announcements yet</p>
                                    <Link href="/admin/dashboard/announcements" className="btn btn-primary btn-sm mt-2">
                                        Create First Announcement
                                    </Link>
                                </div>
                            ) : (
                                stats.recentAnnouncements.map((announcement) => (
                                    <div key={announcement.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors">
                                        {announcement.image_url ? (
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded">
                                                    <Image
                                                        src={announcement.image_url}
                                                        alt={announcement.title}
                                                        width={48}
                                                        height={48}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded bg-base-300 flex items-center justify-center flex-shrink-0">
                                                <FileText size={20} className="text-base-content/40" />
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium line-clamp-2 text-sm">{announcement.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="badge badge-primary badge-xs">{announcement.category}</span>
                                                <span className="text-xs text-base-content/60 flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {formatDate(announcement.published_at)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-1">
                                            <a
                                                href={`/news/${announcement.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-ghost btn-xs"
                                                title="View announcement"
                                            >
                                                <Eye size={14} />
                                            </a>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* System Info & Quick Links */}
                <div className="space-y-6">

                    {/* Quick Actions */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-1 gap-2">
                                <Link href="/admin/dashboard/announcements" className="btn btn-outline btn-sm justify-start">
                                    <Plus size={16} />
                                    Create Announcement
                                </Link>
                                <Link href="/admin/dashboard/signatories" className="btn btn-outline btn-sm justify-start">
                                    <Users size={16} />
                                    Add Signatory
                                </Link>
                                <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm justify-start">
                                    <Eye size={16} />
                                    View Website
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
