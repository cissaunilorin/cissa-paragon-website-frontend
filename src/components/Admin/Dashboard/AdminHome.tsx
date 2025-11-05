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
        </div>
    );
}
