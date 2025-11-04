"use client";

import React from "react";
import { useEffect, useState, useCallback } from "react";
import AnnouncementPreview from "@/components/News/NewsPreview";
import {
    getAnnouncements,
    type Announcement,
    type AnnouncementsListResponse,
} from "@/lib/announcements";

export default function NewsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const pageSize = 9;

    const fetchAnnouncements = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data: AnnouncementsListResponse = await getAnnouncements(
                currentPage,
                pageSize
            );
            setAnnouncements(data.items);
            setTotalPages(data.total_pages);
            setTotalItems(data.total_items);
        } catch (error) {
            console.error("Failed to fetch announcements:", error);
            setError("Failed to load announcements. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize]);

    useEffect(() => {
        fetchAnnouncements();
    }, [fetchAnnouncements]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(pageSize)].map((_, index) => (
                <div
                    key={index}
                    className="card bg-base-100 shadow-md border border-base-200 overflow-hidden"
                >
                    <div className="skeleton h-48 w-full"></div>
                    <div className="card-body p-5 space-y-3">
                        <div className="flex gap-2">
                            <div className="skeleton h-4 w-16"></div>
                            <div className="skeleton h-4 w-20"></div>
                        </div>
                        <div className="skeleton h-6 w-full"></div>
                        <div className="skeleton h-6 w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const PaginationControls = () => {
        if (totalPages <= 1) return null;

        const getVisiblePages = () => {
            const delta = 2;
            const range = [];
            const rangeWithDots = [];

            for (
                let i = Math.max(2, currentPage - delta);
                i <= Math.min(totalPages - 1, currentPage + delta);
                i++
            ) {
                range.push(i);
            }

            if (currentPage - delta > 2) {
                rangeWithDots.push(1, "...");
            } else {
                rangeWithDots.push(1);
            }

            rangeWithDots.push(...range);

            if (currentPage + delta < totalPages - 1) {
                rangeWithDots.push("...", totalPages);
            } else {
                rangeWithDots.push(totalPages);
            }

            return rangeWithDots;
        };

        return (
            <div className="flex flex-col items-center gap-4 pt-16">
                <div className="text-sm text-base-content/70">
                    Showing{" "}
                    {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
                    {Math.min(currentPage * pageSize, totalItems)} of{" "}
                    {totalItems} announcements
                </div>

                <div className="join">
                    <button
                        className="join-item btn"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        «
                    </button>

                    {getVisiblePages().map((page, index) =>
                        page === "..." ? (
                            <button
                                key={`dots-${index}`}
                                className="join-item btn btn-disabled"
                            >
                                ...
                            </button>
                        ) : (
                            <button
                                key={page}
                                className={`join-item btn ${
                                    currentPage === page ? "btn-active" : ""
                                }`}
                                onClick={() => handlePageChange(page as number)}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        className="join-item btn"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        »
                    </button>
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-base-100 pt-24 md:pt-32 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <header className="text-center mb-12">
                    <p className="text-sm uppercase tracking-wide text-primary font-semibold">
                        Faculty Updates
                    </p>
                    <h1 className="mt-3 text-4xl md:text-5xl font-bold text-base-content">
                        <span className="text-primary">News</span> &amp;
                        Announcements
                    </h1>
                    <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
                        Dive into the latest happenings across the Faculty of
                        Communication and Information Sciences.
                    </p>
                </header>

                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="alert alert-error max-w-md mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                        <button
                            onClick={fetchAnnouncements}
                            className="btn btn-primary mt-4"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <AnnouncementPreview
                                        key={announcement.id}
                                        announcement={announcement}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20">
                                    <div className="text-6xl mb-4 opacity-20">
                                        📢
                                    </div>
                                    <p className="text-base-content/60 text-lg mb-2">
                                        No announcements available
                                    </p>
                                    <p className="text-base-content/40 text-sm">
                                        Check back soon for the latest updates
                                        and news.
                                    </p>
                                </div>
                            )}
                        </div>

                        <PaginationControls />
                    </>
                )}
            </div>
        </main>
    );
}
