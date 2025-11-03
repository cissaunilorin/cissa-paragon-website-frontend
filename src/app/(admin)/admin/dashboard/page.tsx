"use client";
import { getCurrentUser, UserData } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function AdminHome() {
    const [user, setUser] = useState<UserData | undefined>(undefined);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        };

        fetchUser();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <p className="text-base-content/70 mt-2">Hello Admin {user?.username}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Quick Actions</h2>
                        <p>Manage your admin tasks efficiently</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary btn-sm">Get Started</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Recent Activity</h2>
                        <p>View latest updates and changes</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-secondary btn-sm">View All</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">System Status</h2>
                        <p>Monitor system health and performance</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-accent btn-sm">Check Status</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="prose max-w-none">
                <p>Welcome to the admin dashboard. Here you can manage announcements, events, signatories, and other important information for the CISSA Paragon website.</p>
            </div>
        </div>
    );
}
