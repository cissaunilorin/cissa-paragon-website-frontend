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
        <>
            <h1>Hello Admin {user?.username}</h1>
            <p>Welcome to the admin dashboard.</p>
            <p>Here you can manage announcements, events, and other important information.</p>
        </>
    );
}
