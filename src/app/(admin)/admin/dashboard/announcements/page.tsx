"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
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

import {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    type Announcement,
} from "@/lib/announcements";
import { getSignatories, type Signatory } from "@/lib/signatories";

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [signatories, setSignatories] = useState<Signatory[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const [signatorySearch, setSignatorySearch] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        body: "",
        published_at: "",
        signatories: [] as string[],
        image: null as File | null,
    });

    const fetchAnnouncements = useCallback(async () => {
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
    }, [currentPage]);

    const fetchSignatories = useCallback(async () => {
        try {
            const data = await getSignatories();
            setSignatories(data);
        } catch (error) {
            console.error("Failed to fetch signatories:", error);
        }
    }, []);

    useEffect(() => {
        fetchAnnouncements();
        fetchSignatories();
    }, [fetchAnnouncements, fetchSignatories]);

    console.log(announcements);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.body || !formData.published_at) {
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
            session: "2025/2026 ACADEMIC SESSION",
            published_at: formData.published_at,
            signatories: formData.signatories,
            image: formData.image as File,
        };

        try {
            setSubmitting(true);
            if (editingAnnouncement) {
                const updatedAnnouncement = await updateAnnouncement(
                    editingAnnouncement.id,
                    submitFormData,
                );
                setAnnouncements((prev) =>
                    prev.map((a) => (a.id === editingAnnouncement.id ? updatedAnnouncement : a)),
                );
            } else {
                const newAnnouncement = await createAnnouncement(submitFormData);
                setAnnouncements((prev) => [newAnnouncement, ...prev]);
                setTotal((prev) => prev + 1);
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
            published_at: announcement.published_at,
            signatories: announcement.signatories.map((s) => s.id),
            image: null,
        });
        setSignatorySearch("");
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
            published_at: "",
            signatories: [],
            image: null,
        });
        setSignatorySearch("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAnnouncement(null);
        setFormData({
            title: "",
            category: "",
            body: "",
            published_at: "",
            signatories: [],
            image: null,
        });
        setSignatorySearch("");
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
        return new Date(dateString).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-100 p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex h-64 items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-base-content">
                            Announcement Management
                        </h1>
                        <p className="mt-2 text-base-content/70">
                            Create, edit, and manage faculty announcements
                        </p>
                    </div>
                    <button onClick={openModal} className="btn btn-primary btn-lg gap-2">
                        <Plus size={20} />
                        New Announcement
                    </button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="stat rounded-lg bg-primary text-primary-content">
                        <div className="stat-figure">
                            <FileText size={32} />
                        </div>
                        <div className="stat-title text-primary-content/70">Total Announcements</div>
                        <div className="stat-value">{total}</div>
                    </div>

                    <div className="stat rounded-lg bg-secondary text-secondary-content">
                        <div className="stat-figure">
                            <Users size={32} />
                        </div>
                        <div className="stat-title text-secondary-content/70">
                            Available Signatories
                        </div>
                        <div className="stat-value">{signatories.length}</div>
                    </div>

                    <div className="stat rounded-lg bg-accent text-accent-content">
                        <div className="stat-figure">
                            <Calendar size={32} />
                        </div>
                        <div className="stat-title text-accent-content/70">This Month</div>
                        <div className="stat-value">
                            {announcements?.filter(
                                (a) => new Date(a.published_at).getMonth() === new Date().getMonth(),
                            ).length}
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">All Announcements</h2>

                        {announcements?.length === 0 ? (
                            <div className="py-12 text-center">
                                <FileText size={64} className="mx-auto mb-4 text-base-content/20" />
                                <p className="text-base-content/60">No announcements found</p>
                                <p className="text-sm text-base-content/40">
                                    Create your first announcement to get started
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
                                                            <div className="h-12 w-12 rounded">
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
                                                        <div className="flex h-12 w-12 items-center justify-center rounded bg-base-300">
                                                            <ImageIcon size={24} className="text-base-content/40" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="max-w-xs line-clamp-2 font-bold">
                                                        {announcement.title}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-primary badge-sm">
                                                        {announcement.category}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-sm">{announcement.session}</span>
                                                </td>
                                                <td>
                                                    <span className="text-sm">
                                                        {formatDate(announcement.published_at)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex flex-wrap gap-1">
                                                        {announcement.signatories
                                                            .slice(0, 2)
                                                            .map((signatory) => (
                                                                <span
                                                                    key={signatory.id}
                                                                    className="badge badge-outline badge-xs"
                                                                >
                                                                    {signatory.alias || signatory.name.split(" ")[0]}
                                                                </span>
                                                            ))}
                                                        {announcement.signatories.length > 2 && (
                                                            <span className="badge badge-outline badge-xs">
                                                                +{announcement.signatories.length - 2}
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
                                                            onClick={() => handleEdit(announcement)}
                                                            className="btn btn-ghost btn-sm"
                                                            title="Edit announcement"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(announcement.id)}
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

                        {totalPages > 1 && (
                            <div className="mt-6 flex justify-center">
                                <div className="join">
                                    <button
                                        className="join-item btn"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                    >
                                        «
                                    </button>

                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const page = i + 1;
                                        return (
                                            <button
                                                key={page}
                                                className={`join-item btn ${currentPage === page ? "btn-active" : ""}`}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}

                                    <button
                                        className="join-item btn"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                    >
                                        »
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-3xl w-full">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {editingAnnouncement ? "Edit Announcement" : "Create New Announcement"}
                                    </h3>
                                    <p className="mt-0.5 text-sm text-base-content/50">
                                        2025/2026 Academic Session
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="btn btn-circle btn-ghost btn-sm"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Title
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter announcement title"
                                            className="input input-bordered w-full"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, title: e.target.value }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Category
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, category: e.target.value }))
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a category
                                            </option>
                                            <option value="PRESS RELEASE">Press Release</option>
                                            <option value="EVENT">Event</option>
                                            <option value="NOTICE">Notice</option>
                                            <option value="ANNOUNCEMENT">Announcement</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">
                                            Published Date
                                            {!editingAnnouncement && (
                                                <span className="ml-0.5 text-error">*</span>
                                            )}
                                        </span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="input input-bordered w-full"
                                        value={formData.published_at}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                published_at: e.target.value,
                                            }))
                                        }
                                        required={!editingAnnouncement}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">
                                            Cover Image
                                            {!editingAnnouncement && (
                                                <span className="ml-0.5 text-error">*</span>
                                            )}
                                        </span>
                                        {editingAnnouncement && (
                                            <span className="label-text-alt text-base-content/50">
                                                Leave empty to keep existing image
                                            </span>
                                        )}
                                    </label>
                                    <div className="flex items-center gap-4 rounded-lg border-2 border-dashed border-base-300 p-4 transition-colors hover:border-primary/50">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-base-200">
                                            <ImageIcon size={20} className="text-base-content/40" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-base-content/70">
                                                {formData.image ? formData.image.name : "Choose an image file"}
                                            </p>
                                            <p className="mt-0.5 text-xs text-base-content/40">
                                                PNG, JPG, WEBP up to 10MB
                                            </p>
                                        </div>
                                        <label className="btn btn-outline btn-sm cursor-pointer">
                                            Browse
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        image: e.target.files?.[0] || null,
                                                    }))
                                                }
                                                required={!editingAnnouncement}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">
                                            Body
                                            <span className="ml-0.5 text-error">*</span>
                                        </span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        style={{ minHeight: "180px" }}
                                        placeholder="Enter announcement content..."
                                        value={formData.body}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, body: e.target.value }))
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">Signatories</span>
                                        <span className="label-text-alt text-base-content/50">
                                            {formData.signatories.length} selected
                                        </span>
                                    </label>

                                    {formData.signatories.length > 0 && (
                                        <div className="mb-2 flex flex-wrap gap-2">
                                            {formData.signatories.map((id) => {
                                                const s = signatories.find((sig) => sig.id === id);
                                                if (!s) return null;
                                                return (
                                                    <span
                                                        key={id}
                                                        className="badge badge-primary gap-1.5 px-3 py-3"
                                                    >
                                                        <span className="text-xs font-medium">
                                                            {s.alias || s.name}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSignatoryToggle(id)}
                                                            className="leading-none opacity-70 hover:opacity-100"
                                                            aria-label={`Remove ${s.name}`}
                                                        >
                                                            ✕
                                                        </button>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}

                                    <input
                                        type="text"
                                        placeholder="Search signatories..."
                                        className="input input-bordered input-sm mb-2 w-full"
                                        value={signatorySearch}
                                        onChange={(e) => setSignatorySearch(e.target.value)}
                                    />

                                    <div className="max-h-48 overflow-y-auto rounded-lg border border-base-300 divide-y divide-base-200">
                                        {signatories
                                            .filter((s) => {
                                                const q = signatorySearch.toLowerCase();
                                                return (
                                                    s.name.toLowerCase().includes(q) ||
                                                    (s.alias?.toLowerCase().includes(q) ?? false) ||
                                                    s.role.toLowerCase().includes(q)
                                                );
                                            })
                                            .map((signatory) => {
                                                const isSelected = formData.signatories.includes(signatory.id);
                                                return (
                                                    <button
                                                        key={signatory.id}
                                                        type="button"
                                                        onClick={() => handleSignatoryToggle(signatory.id)}
                                                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                                                            isSelected ? "bg-primary/10" : "hover:bg-base-200"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 text-xs transition-colors ${
                                                                isSelected
                                                                    ? "border-primary bg-primary text-primary-content"
                                                                    : "border-base-300"
                                                            }`}
                                                        >
                                                            {isSelected && "✓"}
                                                        </span>
                                                        <span className="min-w-0 flex-1">
                                                            <span className="block truncate text-sm font-medium">
                                                                {signatory.name}
                                                                {signatory.alias && (
                                                                    <span className="ml-1 font-normal text-base-content/50">
                                                                        ({signatory.alias})
                                                                    </span>
                                                                )}
                                                            </span>
                                                            <span className="block text-xs text-base-content/50">
                                                                {signatory.role}
                                                            </span>
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        {signatories.filter((s) => {
                                            const q = signatorySearch.toLowerCase();
                                            return (
                                                s.name.toLowerCase().includes(q) ||
                                                (s.alias?.toLowerCase().includes(q) ?? false) ||
                                                s.role.toLowerCase().includes(q)
                                            );
                                        }).length === 0 && (
                                            <p className="py-6 text-center text-sm text-base-content/40">
                                                No signatories match your search
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-action mt-2 border-t border-base-200 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="btn btn-ghost"
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                                        {submitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                {editingAnnouncement ? "Updating..." : "Creating..."}
                                            </>
                                        ) : editingAnnouncement ? (
                                            "Update Announcement"
                                        ) : (
                                            "Create Announcement"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-backdrop" onClick={closeModal}></div>
                    </div>
                )}
            </div>
        </div>
    );
}
