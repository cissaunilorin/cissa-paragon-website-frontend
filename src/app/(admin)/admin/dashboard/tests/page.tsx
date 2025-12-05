"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";
import {
    getTestsData,
    deleteTest as deleteTestFromStorage,
    toggleTestStatus as toggleTestStatusInStorage,
    type Test,
} from "@/lib/testStorage";

interface Statistics {
    total_tests: number;
    published_tests: number;
    draft_tests: number;
    total_questions: number;
}

export default function TestsDashboard() {
    const [tests, setTests] = useState<Test[]>([]);
    const [statistics, setStatistics] = useState<Statistics>({
        total_tests: 0,
        published_tests: 0,
        draft_tests: 0,
        total_questions: 0,
    });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [testToDelete, setTestToDelete] = useState<Test | null>(null);

    const pageSize = 10;

    // Load data from localStorage
    useEffect(() => {
        const loadData = () => {
            setLoading(true);
            // Simulate API delay
            setTimeout(() => {
                const data = getTestsData();
                setTests(data.tests);
                setStatistics(data.statistics);
                setTotalPages(Math.ceil(data.tests.length / pageSize));
                setLoading(false);
            }, 500);
        };

        loadData();
    }, []);

    const handleDelete = (test: Test) => {
        setTestToDelete(test);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (testToDelete) {
            // Delete from storage
            const success = deleteTestFromStorage(testToDelete.id);
            if (success) {
                // Reload data from storage
                const data = getTestsData();
                setTests(data.tests);
                setStatistics(data.statistics);
                setTotalPages(Math.ceil(data.tests.length / pageSize));
            }
        }
        setShowDeleteModal(false);
        setTestToDelete(null);
    };

    const toggleStatus = (testId: string) => {
        // Toggle status in storage
        const updatedTest = toggleTestStatusInStorage(testId);
        if (updatedTest) {
            // Reload data from storage
            const data = getTestsData();
            setTests(data.tests);
            setStatistics(data.statistics);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Pagination
    const paginatedTests = tests.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
                    <p className="text-base-content/70">Loading tests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">
                        Test Management
                    </h1>
                    <p className="text-base-content/70 mt-1">
                        Create and manage tests for students
                    </p>
                </div>
                <Link
                    href="/admin/dashboard/tests/new"
                    className="btn btn-primary"
                >
                    <Plus size={20} />
                    Create New Test
                </Link>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat bg-primary text-primary-content rounded-lg">
                    <div className="stat-figure">
                        <FileText size={32} />
                    </div>
                    <div className="stat-title text-primary-content/70">
                        Total Tests
                    </div>
                    <div className="stat-value">{statistics.total_tests}</div>
                </div>

                <div className="stat bg-success text-success-content rounded-lg">
                    <div className="stat-figure">
                        <CheckCircle size={32} />
                    </div>
                    <div className="stat-title text-success-content/70">
                        Published
                    </div>
                    <div className="stat-value">{statistics.published_tests}</div>
                </div>

                <div className="stat bg-warning text-warning-content rounded-lg">
                    <div className="stat-figure">
                        <Clock size={32} />
                    </div>
                    <div className="stat-title text-warning-content/70">
                        Drafts
                    </div>
                    <div className="stat-value">{statistics.draft_tests}</div>
                </div>

                <div className="stat bg-info text-info-content rounded-lg">
                    <div className="stat-figure">
                        <AlertCircle size={32} />
                    </div>
                    <div className="stat-title text-info-content/70">
                        Total Questions
                    </div>
                    <div className="stat-value">{statistics.total_questions}</div>
                </div>
            </div>

            {/* Tests Table */}
            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">All Tests</h2>

                    {tests.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText
                                size={48}
                                className="mx-auto text-base-content/30 mb-4"
                            />
                            <p className="text-base-content/70 text-lg">
                                No tests found
                            </p>
                            <p className="text-base-content/50 text-sm mt-2">
                                Create your first test to get started
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Test Title</th>
                                            <th>Status</th>
                                            <th>Duration</th>
                                            <th>Pass Score</th>
                                            <th>Questions</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedTests.map((test) => (
                                            <tr key={test.id}>
                                                <td>
                                                    <div>
                                                        <div className="font-semibold">
                                                            {test.title}
                                                        </div>
                                                        <div className="text-sm text-base-content/70 line-clamp-1">
                                                            {test.description}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            toggleStatus(test.id)
                                                        }
                                                        className={`badge ${
                                                            test.status ===
                                                            "published"
                                                                ? "badge-success"
                                                                : "badge-warning"
                                                        } cursor-pointer hover:opacity-80`}
                                                    >
                                                        {test.status ===
                                                        "published"
                                                            ? "Published"
                                                            : "Draft"}
                                                    </button>
                                                </td>
                                                <td>
                                                    <span className="badge badge-outline">
                                                        {test.duration} mins
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge badge-primary badge-outline">
                                                        {test.passing_score}%
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="font-semibold">
                                                        {test.questions_count}
                                                    </span>
                                                </td>
                                                <td>
                                                    {formatDate(test.created_at)}
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={`/admin/dashboard/tests/${test.id}`}
                                                            className="btn btn-ghost btn-sm"
                                                            title="View/Edit"
                                                        >
                                                            <Eye size={16} />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(test)
                                                            }
                                                            className="btn btn-ghost btn-sm text-error"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6">
                                    <div className="join">
                                        <button
                                            className="join-item btn"
                                            onClick={() =>
                                                setCurrentPage(
                                                    Math.max(1, currentPage - 1)
                                                )
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            «
                                        </button>
                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => i + 1
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                className={`join-item btn ${
                                                    currentPage === page
                                                        ? "btn-active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            className="join-item btn"
                                            onClick={() =>
                                                setCurrentPage(
                                                    Math.min(
                                                        totalPages,
                                                        currentPage + 1
                                                    )
                                                )
                                            }
                                            disabled={currentPage === totalPages}
                                        >
                                            »
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Test</h3>
                        <p className="py-4">
                            Are you sure you want to delete &quot;
                            {testToDelete?.title}&quot;? This action cannot be
                            undone and will delete all associated questions.
                        </p>
                        <div className="modal-action">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="btn"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="btn btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => setShowDeleteModal(false)}
                    ></div>
                </div>
            )}

        </div>
    );
}
