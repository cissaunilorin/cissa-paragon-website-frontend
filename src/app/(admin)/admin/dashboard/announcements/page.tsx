"use client";

import { useState, useEffect } from "react";
import {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    type Announcement,
    type AnnouncementsListResponse,
} from "@/lib/announcements";
import { getSignatories, type Signatory } from "@/lib/signatories";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Calendar,
    FileText,
    Users,
    Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export default function AnnouncementsDashboard() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [signatories, setSignatories] = useState<Signatory[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] =
        useState<Announcement | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        body: "",
        session: "",
        published_at: "",
        signatories: [] as string[],
        image: null as File | null,
    });

    useEffect(() => {
        fetchAnnouncements();
        fetchSignatories();
    }, [currentPage]);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const data = await getAnnouncements(currentPage, 10);

            setAnnouncements(data.items);
            setTotalPages(data.total_pages);
            setTotal(data.total_items);
        } catch (error) {
            console.error("Failed to fetch announcements:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSignatories = async () => {
        try {
            const data = await getSignatories();
            setSignatories(data);
        } catch (error) {
            console.error("Failed to fetch signatories:", error);
        }
    };

    console.log(announcements)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.category ||
            !formData.body ||
            !formData.session ||
            !formData.published_at
        ) {
            alert("Please fill in all required fields");
            return;
        }

        if (!editingAnnouncement && !formData.image) {
            alert("Please select an image for the announcement");
            return;
        }

        const submitFormData = {
            title: formData.title,
            category: formData.category,
            body: formData.body,
            session: formData.session,
            published_at: formData.published_at,
            signatories: formData.signatories,
            image: formData.image as File,
        };

        try {
            setSubmitting(true);
            if (editingAnnouncement) {
                // Update existing announcement
                const updatedAnnouncement = await updateAnnouncement(
                    editingAnnouncement.id,
                    submitFormData
                );
                setAnnouncements((prev) =>
                    prev.map((a) =>
                        a.id === editingAnnouncement.id
                            ? updatedAnnouncement
                            : a
                    )
                );
            } else {
                // Create new announcement
                const newAnnouncement = await createAnnouncement(
                    submitFormData
                );
                // Refresh the list to get updated data
                await fetchAnnouncements();
            }

            closeModal();
        } catch (error) {
            console.error("Failed to save announcement:", error);
            alert("Failed to save announcement. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setFormData({
            title: announcement.title,
            category: announcement.category,
            body: announcement.body,
            session: announcement.session,
            published_at: announcement.published_at,
            signatories: announcement.signatories.map((s) => s.id),
            image: null,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this announcement?")) {
            try {
                await deleteAnnouncement(id);
                setAnnouncements((prev) => prev.filter((a) => a.id !== id));
                setTotal((prev) => prev - 1);
            } catch (error) {
                console.error("Failed to delete announcement:", error);
                alert("Failed to delete announcement. Please try again.");
            }
        }
    };

    const openModal = () => {
        setEditingAnnouncement(null);
        setFormData({
            title: "",
            category: "",
            body: "",
            session: "",
            published_at: "",
            signatories: [],
            image: null,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAnnouncement(null);
        setFormData({
            title: "",
            category: "",
            body: "",
            session: "",
            published_at: "",
            signatories: [],
            image: null,
        });
    };

    const handleSignatoryToggle = (signatoryId: string) => {
        setFormData((prev) => ({
            ...prev,
            signatories: prev.signatories.includes(signatoryId)
                ? prev.signatories.filter((id) => id !== signatoryId)
                : [...prev.signatories, signatoryId],
        }));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-base-content">
                            Announcement Management
                        </h1>
                        <p className="text-base-content/70 mt-2">
                            Create, edit, and manage faculty announcements
                        </p>
                    </div>
                    <button
                        onClick={openModal}
                        className="btn btn-primary btn-lg gap-2"
                    >
                        <Plus size={20} />
                        New Announcement
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="stat bg-primary text-primary-content rounded-lg">
                        <div className="stat-figure">
                            <FileText size={32} />
                        </div>
                        <div className="stat-title text-primary-content/70">
                            Total Announcements
                        </div>
                        <div className="stat-value">{total}</div>
                    </div>

                    <div className="stat bg-secondary text-secondary-content rounded-lg">
                        <div className="stat-figure">
                            <Users size={32} />
                        </div>
                        <div className="stat-title text-secondary-content/70">
                            Available Signatories
                        </div>
                        <div className="stat-value">{signatories.length}</div>
                    </div>

                    <div className="stat bg-accent text-accent-content rounded-lg">
                        <div className="stat-figure">
                            <Calendar size={32} />
                        </div>
                        <div className="stat-title text-accent-content/70">
                            This Month
                        </div>
                        <div className="stat-value">
                            {
                                announcements?.filter(
                                    (a) =>
                                        new Date(a.published_at).getMonth() ===
                                        new Date().getMonth()
                                ).length
                            }
                        </div>
                    </div>
                </div>

                {/* Announcements Table */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">All Announcements</h2>

                        {announcements?.length === 0 ? (
                            <div className="text-center py-12">
                                <FileText
                                    size={64}
                                    className="mx-auto text-base-content/20 mb-4"
                                />
                                <p className="text-base-content/60">
                                    No announcements found
                                </p>
                                <p className="text-base-content/40 text-sm">
                                    Create your first announcement to get
                                    started
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Session</th>
                                            <th>Published</th>
                                            <th>Signatories</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {announcements?.map((announcement) => (
                                            <tr key={announcement.id}>
                                                <td>
                                                    {announcement.image_url ? (
                                                        <div className="avatar">
                                                            <div className="w-12 h-12 rounded">
                                                                <Image
                                                                    src={
                                                                        announcement.image_url
                                                                    }
                                                                    alt={
                                                                        announcement.title
                                                                    }
                                                                    width={48}
                                                                    height={48}
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-12 h-12 rounded bg-base-300 flex items-center justify-center">
                                                            <ImageIcon
                                                                size={24}
                                                                className="text-base-content/40"
                                                            />
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="font-bold line-clamp-2 max-w-xs">
                                                        {announcement.title}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-primary badge-sm">
                                                        {announcement.category}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-sm">
                                                        {announcement.session}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-sm">
                                                        {formatDate(
                                                            announcement.published_at
                                                        )}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex flex-wrap gap-1">
                                                        {announcement.signatories
                                                            .slice(0, 2)
                                                            .map(
                                                                (signatory) => (
                                                                    <span
                                                                        key={
                                                                            signatory.id
                                                                        }
                                                                        className="badge badge-outline badge-xs"
                                                                    >
                                                                        {signatory.alias ||
                                                                            signatory.name.split(
                                                                                " "
                                                                            )[0]}
                                                                    </span>
                                                                )
                                                            )}
                                                        {announcement
                                                            .signatories
                                                            .length > 2 && (
                                                            <span className="badge badge-outline badge-xs">
                                                                +
                                                                {announcement
                                                                    .signatories
                                                                    .length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <a
                                                            href={`/news/${announcement.id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-ghost btn-sm"
                                                            title="View announcement"
                                                        >
                                                            <Eye size={16} />
                                                        </a>
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    announcement
                                                                )
                                                            }
                                                            className="btn btn-ghost btn-sm"
                                                            title="Edit announcement"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    announcement.id
                                                                )
                                                            }
                                                            className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
                                                            title="Delete announcement"
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
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-6">
                                <div className="join">
                                    <button
                                        className="join-item btn"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage((prev) => prev - 1)
                                        }
                                    >
                                        «
                                    </button>

                                    {Array.from(
                                        { length: Math.min(5, totalPages) },
                                        (_, i) => {
                                            const page = i + 1;
                                            return (
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
                                            );
                                        }
                                    )}

                                    <button
                                        className="join-item btn"
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage((prev) => prev + 1)
                                        }
                                    >
                                        »
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-4xl">
                            <h3 className="font-bold text-lg mb-4">
                                {editingAnnouncement
                                    ? "Edit Announcement"
                                    : "Create New Announcement"}
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">
                                                Title *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter announcement title"
                                            className="input input-bordered"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">
                                                Category *
                                            </span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    category: e.target.value,
                                                }))
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select category
                                            </option>
                                            <option value="PRESS RELEASE">
                                                Press Release
                                            </option>
                                            <option value="EVENT">Event</option>
                                            <option value="NOTICE">
                                                Notice
                                            </option>
                                            <option value="ANNOUNCEMENT">
                                                Announcement
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">
                                                Session *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 2025/2026 ACADEMIC SESSION"
                                            className="input input-bordered"
                                            value={formData.session}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    session: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">
                                                Published Date *
                                            </span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            className="input input-bordered"
                                            value={formData.published_at}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    published_at:
                                                        e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">
                                            Image{" "}
                                            {editingAnnouncement
                                                ? "(optional - leave empty to keep current)"
                                                : "*"}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="file-input file-input-bordered"
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                image:
                                                    e.target.files?.[0] || null,
                                            }))
                                        }
                                        required={!editingAnnouncement}
                                    />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">
                                            Body *
                                        </span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered h-32"
                                        placeholder="Enter announcement content..."
                                        value={formData.body}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                body: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-control mb-6">
                                    <label className="label">
                                        <span className="label-text">
                                            Signatories
                                        </span>
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-3">
                                        {signatories.map((signatory) => (
                                            <label
                                                key={signatory.id}
                                                className="label cursor-pointer"
                                            >
                                                <span className="label-text">
                                                    {signatory.name}{" "}
                                                    {signatory.alias &&
                                                        `(${signatory.alias})`}
                                                    <br />
                                                    <span className="text-xs opacity-70">
                                                        {signatory.role}
                                                    </span>
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-primary"
                                                    checked={formData.signatories.includes(
                                                        signatory.id
                                                    )}
                                                    onChange={() =>
                                                        handleSignatoryToggle(
                                                            signatory.id
                                                        )
                                                    }
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="modal-action">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="btn btn-ghost"
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                {editingAnnouncement
                                                    ? "Updating..."
                                                    : "Creating..."}
                                            </>
                                        ) : editingAnnouncement ? (
                                            "Update"
                                        ) : (
                                            "Create"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div
                            className="modal-backdrop"
                            onClick={closeModal}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
}
