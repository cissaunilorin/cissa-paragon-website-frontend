"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, UserCheck } from "lucide-react";

import {
    getSignatories,
    createSignatory,
    updateSignatory,
    deleteSignatory,
    Signatory,
} from "@/lib/signatories";
import { formatNumberToWhatsappLink } from "@/lib/utils/format";

export default function SignatoriesDashboard() {
    const [signatories, setSignatories] = useState<Signatory[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSignatory, setEditingSignatory] = useState<Signatory | null>(
        null
    );
    const [formData, setFormData] = useState({
        name: "",
        alias: "",
        role: "",
        contact: "",
    });

    useEffect(() => {
        fetchSignatories();
    }, []);

    const fetchSignatories = async () => {
        try {
            setLoading(true);
            const data = await getSignatories();
            setSignatories(data);
        } catch (error) {
            console.error("Failed to fetch signatories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingSignatory) {
                // Update existing signatory
                const updatedSignatory = await updateSignatory(
                    editingSignatory.id,
                    {
                        name: formData.name || undefined,
                        alias: formData.alias || undefined,
                        role: formData.role || undefined,
                        contact: formData.contact || undefined,
                    }
                );
                setSignatories((prev) =>
                    prev.map((s) =>
                        s.id === editingSignatory.id ? updatedSignatory : s
                    )
                );
            } else {
                // Create new signatory
                const newSignatory = await createSignatory({
                    name: formData.name,
                    alias: formData.alias || "",
                    role: formData.role,
                    contact: formData.contact || "",
                });
                setSignatories((prev) => [...prev, newSignatory]);
            }

            closeModal();
            // Show success message (you could add a toast notification here)
        } catch (error) {
            console.error("Failed to save signatory:", error);
            // Show error message (you could add a toast notification here)
        }
    };

    const handleEdit = (signatory: Signatory) => {
        setEditingSignatory(signatory);

        setFormData({
            name: signatory.name,
            alias: signatory.alias || "",
            role: signatory.role,
            contact: signatory.contact || "",
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this signatory?")) {
            try {
                await deleteSignatory(id);
                setSignatories((prev) => prev.filter((s) => s.id !== id));
                // Show success message
            } catch (error) {
                console.error("Failed to delete signatory:", error);
                // Show error message
            }
        }
    };

    const openModal = () => {
        setEditingSignatory(null);
        setFormData({ name: "", alias: "", role: "", contact: "" });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSignatory(null);
        setFormData({ name: "", alias: "", role: "", contact: "" });
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
                            Signatory Management
                        </h1>
                        <p className="text-base-content/70 mt-2">
                            Manage announcement signatories and their
                            information
                        </p>
                    </div>
                    <button
                        onClick={openModal}
                        className="btn btn-primary btn-lg gap-2"
                    >
                        <Plus size={20} />
                        Add Signatory
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
                    <div className="stat bg-primary text-primary-content rounded-lg">
                        <div className="stat-figure">
                            <UserCheck size={32} />
                        </div>
                        <div className="stat-title text-primary-content/70">
                            Total Signatories
                        </div>
                        <div className="stat-value">{signatories.length}</div>
                    </div>
                </div>

                {/* Signatories Table */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">All Signatories</h2>

                        {signatories.length === 0 ? (
                            <div className="text-center py-12">
                                <UserCheck
                                    size={64}
                                    className="mx-auto text-base-content/20 mb-4"
                                />
                                <p className="text-base-content/60">
                                    No signatories found
                                </p>
                                <p className="text-base-content/40 text-sm">
                                    Create your first signatory to get started
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Alias</th>
                                            <th>Role</th>
                                            <th>Contact</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {signatories.map((signatory) => (
                                            <tr key={signatory.id}>
                                                <td>
                                                    <div className="font-bold">
                                                        {signatory.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    {signatory.alias ? (
                                                        <span className="badge badge-outline">
                                                            {signatory.alias}
                                                        </span>
                                                    ) : (
                                                        <span className="text-base-content/40">
                                                            —
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <span className="badge badge-primary badge-sm">
                                                        {signatory.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    {signatory.contact ? (
                                                        <a
                                                            href={formatNumberToWhatsappLink(
                                                                signatory.contact
                                                            )}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="link link-primary text-sm"
                                                        >
                                                            {signatory.contact}
                                                        </a>
                                                    ) : (
                                                        <span className="text-base-content/40">
                                                            —
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    signatory
                                                                )
                                                            }
                                                            className="btn btn-ghost btn-sm"
                                                            title="Edit signatory"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    signatory.id
                                                                )
                                                            }
                                                            className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
                                                            title="Delete signatory"
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
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4">
                                {editingSignatory
                                    ? "Edit Signatory"
                                    : "Add New Signatory"}
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label mr-2">
                                        <span className="label-text">
                                            Name *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., SANNI, Nurudeen Akorede"
                                        className="input input-bordered"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label mr-2">
                                        <span className="label-text">
                                            Alias
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., D'LIGHT"
                                        className="input input-bordered"
                                        value={formData.alias}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                alias: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label mr-2">
                                        <span className="label-text">
                                            Role *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Executive President"
                                        className="input input-bordered"
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                role: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-control mb-6">
                                    <label className="label mr-2">
                                        <span className="label-text">
                                            Contact
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="e.g., 09152349887"
                                        className="input input-bordered"
                                        value={formData.contact}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                contact: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="modal-action">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {editingSignatory ? "Update" : "Create"}
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
