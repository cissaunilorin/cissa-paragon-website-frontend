"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import AnnouncementPreview, {
    AnnouncementPreviewSkeleton,
} from "./AnnouncementPreview";
import {
    getAnnouncements,
    type Announcement,
    type AnnouncementsListResponse,
} from "@/lib/announcements";

export default function AnnouncementsPage({
    initialPage,
}: {
    initialPage?: string;
}) {
    const router = useRouter();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [currentPage, setCurrentPage] = useState(() => {
        const p = parseInt(initialPage ?? "1", 10);
        return isNaN(p) || p < 1 ? 1 : p;
    });

    const pageSize = 9;

    const fetchAnnouncements = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data: AnnouncementsListResponse = await getAnnouncements(
                currentPage,
                pageSize,
            );
            setAnnouncements(data.items);
            setCurrentPage(data.current_page);
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
        if (currentPage > 0) {
            fetchAnnouncements();
        }
    }, [fetchAnnouncements, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`/news?page=${page}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const PageHeader = () => (
        <header className="max-w-4xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-base-content md:text-6xl">
                Latest News
            </h1>
            <p className="max-w-2xl text-base leading-7 text-base-content/60 md:text-lg">
                Stay current with the latest announcements, updates, and stories from the faculty.
            </p>
        </header>
    );

    const LoadingSkeleton = () => (
        <div className="space-y-12 md:space-y-14">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(pageSize)].map((_, index) => (
                    <AnnouncementPreviewSkeleton key={index} />
                ))}
            </div>

            <div className="mt-12 flex w-full flex-col items-start justify-between gap-6 border-t border-base-200/60 pt-8 sm:flex-row sm:items-center">
                <div className="skeleton h-4 w-52 max-w-full" />

                <div className="flex flex-wrap items-center justify-end gap-4 sm:gap-5">
                    <div className="skeleton h-10 w-10 rounded-full" />
                    <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
                        <div className="skeleton h-10 w-10 rounded-full" />
                        <div className="skeleton h-10 w-10 rounded-full" />
                        <div className="skeleton h-10 w-10 rounded-full" />
                        <div className="skeleton h-10 w-10 rounded-full" />
                    </div>
                    <div className="skeleton h-10 w-10 rounded-full" />
                </div>
            </div>
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
            <div className="mt-12 flex w-full flex-col items-start justify-between gap-6 border-t border-base-200/60 pt-8 sm:flex-row sm:items-center">
                <div className="text-sm text-base-content/55">
                    Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
                    {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
                </div>

                <div className="flex flex-wrap items-center justify-end gap-4 sm:gap-5">
                    <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-base-100 text-base-content/50 transition hover:bg-base-200 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
                        {getVisiblePages().map((page, index) =>
                            page === "..." ? (
                                <span
                                    key={`dots-${index}`}
                                    className="px-1 text-sm text-base-content/40"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-4 text-sm font-medium transition ${
                                        currentPage === page
                                            ? "bg-primary text-primary-content shadow-sm"
                                            : "bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                                    }`}
                                    onClick={() =>
                                        handlePageChange(page as number)
                                    }
                                    aria-current={
                                        currentPage === page
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {page}
                                </button>
                            ),
                        )}
                    </div>

                    <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-base-100 text-base-content/50 transition hover:bg-base-200 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-base-100 pb-16">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mt-12 space-y-12 md:mt-16 md:space-y-14">
                    <PageHeader />

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
                        <section>
                            {announcements.length > 0 ? (
                                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                                    {announcements.map((announcement) => (
                                        <AnnouncementPreview
                                            key={announcement.id}
                                            announcement={announcement}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex min-h-56 items-center justify-center text-center text-base-content/60">
                                    Nothing here yet. Check back soon.
                                </div>
                            )}

                            <PaginationControls />
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
