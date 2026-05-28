"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { BookOpen, Edit, Plus, Trash2 } from "lucide-react";

import {
    createMaterial,
    deleteMaterial,
    getMaterials,
    updateMaterial,
    type DepartmentType,
    type LevelType,
    type Material,
    type MaterialFormatType,
    type SemesterType,
} from "@/lib/materials";

type MaterialFormState = {
    title: string;
    description: string;
    course_code: string;
    course_title: string;
    level: LevelType | "";
    semester: SemesterType | "";
    material_type: MaterialFormatType | "";
    drive_url: string;
    session: string;
    departments: DepartmentType[];
};

const levelOptions: LevelType[] = ["100", "200", "300", "400"];
const semesterOptions: Array<{ value: SemesterType; label: string }> = [
    { value: "harmattan", label: "Harmattan Semester" },
    { value: "rain", label: "Rain Semester" },
];
const materialTypeOptions: Array<{ value: MaterialFormatType; label: string }> = [
    { value: "lecture_notes", label: "Lecture Notes" },
    { value: "past_questions", label: "Past Questions" },
    { value: "textbook", label: "Textbook" },
];
const departmentOptions: Array<{ value: DepartmentType; label: string }> = [
    { value: "CSC", label: "Computer Science" },
    { value: "IFT", label: "Information & Communication Science" },
    { value: "LIS", label: "Library & Information Science" },
    { value: "TCS", label: "Telecommunication Science" },
    { value: "MAC", label: "Mass Communication" },
];

export default function MaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState<MaterialFormState>({
        title: "",
        description: "",
        course_code: "",
        course_title: "",
        level: "",
        semester: "",
        material_type: "",
        drive_url: "",
        session: "2025/2026",
        departments: [],
    });

    const fetchMaterials = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getMaterials(currentPage, 12);

            setMaterials(data.items);
            setTotalPages(data.total_pages);
            setTotal(data.total_items);
        } catch (error) {
            console.error("Failed to fetch materials:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchMaterials();
    }, [fetchMaterials]);

    const resetFormData = () => {
        setFormData({
            title: "",
            description: "",
            course_code: "",
            course_title: "",
            level: "",
            semester: "",
            material_type: "",
            drive_url: "",
            session: "2025/2026",
            departments: [],
        });
    };

    const openModal = () => {
        setEditingMaterial(null);
        resetFormData();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMaterial(null);
        resetFormData();
    };

    const handleEdit = (material: Material) => {
        setEditingMaterial(material);
        setFormData({
            title: material.title,
            description: material.description || "",
            course_code: material.course_code,
            course_title: material.course_title,
            level: material.level,
            semester: material.semester,
            material_type: material.material_type,
            drive_url: material.drive_url,
            session: material.session || "",
            departments: material.departments,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this material?")) {
            try {
                await deleteMaterial(id);
                setMaterials((prev) => prev.filter((material) => material.id !== id));
                setTotal((prev) => prev - 1);
            } catch (error) {
                console.error("Failed to delete material:", error);
                alert("Failed to delete material. Please try again.");
            }
        }
    };

    const handleDepartmentToggle = (department: DepartmentType) => {
        setFormData((prev) => ({
            ...prev,
            departments: prev.departments.includes(department)
                ? prev.departments.filter((item) => item !== department)
                : [...prev.departments, department],
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.course_code ||
            !formData.course_title ||
            !formData.level ||
            !formData.semester ||
            !formData.material_type ||
            !formData.drive_url ||
            formData.departments.length === 0
        ) {
            alert("Please fill in all required fields");
            return;
        }

        const submitFormData = {
            title: formData.title,
            description: formData.description || null,
            course_code: formData.course_code,
            course_title: formData.course_title,
            level: formData.level,
            semester: formData.semester,
            material_type: formData.material_type,
            drive_url: formData.drive_url,
            session: formData.session || null,
            departments: formData.departments,
        };

        try {
            setSubmitting(true);

            if (editingMaterial) {
                const updatedMaterial = await updateMaterial(editingMaterial.id, submitFormData);
                setMaterials((prev) =>
                    prev.map((material) =>
                        material.id === editingMaterial.id ? updatedMaterial : material,
                    ),
                );
            } else {
                const newMaterial = await createMaterial(submitFormData);
                setMaterials((prev) => [newMaterial, ...prev]);
                setTotal((prev) => prev + 1);
            }

            closeModal();
        } catch (error) {
            console.error("Failed to save material:", error);
            alert("Failed to save material. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const getLevelLabel = (level: LevelType) => `${level} Level`;

    const getSemesterLabel = (semester: SemesterType) =>
        semester === "harmattan" ? "Harmattan Semester" : "Rain Semester";

    const getMaterialTypeLabel = (materialType: MaterialFormatType) => {
        const option = materialTypeOptions.find((item) => item.value === materialType);
        return option?.label ?? materialType;
    };

    const uniqueDepartments = new Set(materials.flatMap((material) => material.departments));
    const uniqueMaterialTypes = new Set(materials.map((material) => material.material_type));

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
                        <h1 className="text-3xl font-bold text-base-content">Material Management</h1>
                        <p className="mt-2 text-base-content/70">
                            Create, edit, and manage faculty materials
                        </p>
                    </div>
                    <button onClick={openModal} className="btn btn-primary btn-lg gap-2">
                        <Plus size={20} />
                        New Material
                    </button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="stat rounded-lg bg-primary text-primary-content">
                        <div className="stat-figure">
                            <BookOpen size={32} />
                        </div>
                        <div className="stat-title text-primary-content/70">Total Materials</div>
                        <div className="stat-value">{total}</div>
                    </div>

                    <div className="stat rounded-lg bg-secondary text-secondary-content">
                        <div className="stat-figure">
                            <BookOpen size={32} />
                        </div>
                        <div className="stat-title text-secondary-content/70">Departments Covered</div>
                        <div className="stat-value">{uniqueDepartments.size}</div>
                    </div>

                    <div className="stat rounded-lg bg-accent text-accent-content">
                        <div className="stat-figure">
                            <BookOpen size={32} />
                        </div>
                        <div className="stat-title text-accent-content/70">Material Types</div>
                        <div className="stat-value">{uniqueMaterialTypes.size}</div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">All Materials</h2>

                        {materials.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <BookOpen size={64} className="mb-4 text-base-content/20" />
                                <p className="text-base-content/60">
                                    No materials yet. Add your first material to get started.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {materials.map((material) => (
                                    <div
                                        key={material.id}
                                        className="flex h-full flex-col rounded-2xl bg-base-200 p-5"
                                    >
                                        <div className="space-y-4">
                                            <div className="line-clamp-2 text-lg font-bold text-base-content">
                                                {material.title}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-base-content/60">
                                                <span>{material.course_code}</span>
                                                <span className="hidden h-1 w-1 rounded-full bg-base-content/30 sm:inline-block"></span>
                                                <span className="line-clamp-1">{material.course_title}</span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <span className="badge badge-sm badge-neutral">
                                                    {getLevelLabel(material.level)}
                                                </span>
                                                <span className="badge badge-sm badge-ghost">
                                                    {getSemesterLabel(material.semester)}
                                                </span>
                                                <span className="badge badge-sm badge-primary">
                                                    {getMaterialTypeLabel(material.material_type)}
                                                </span>
                                            </div>

                                            {material.session && (
                                                <div className="text-sm text-base-content/50">
                                                    {material.session}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-auto pt-5">
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {material.departments.map((department) => {
                                                    const label = departmentOptions.find(
                                                        (item) => item.value === department,
                                                    )?.label;

                                                    return (
                                                        <span
                                                            key={department}
                                                            className="badge badge-outline badge-sm"
                                                        >
                                                            {label ?? department}
                                                        </span>
                                                    );
                                                })}
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(material)}
                                                    className="btn btn-ghost btn-sm"
                                                    title="Edit material"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(material.id)}
                                                    className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
                                                    title="Delete material"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                                className={`join-item btn ${
                                                    currentPage === page ? "btn-active" : ""
                                                }`}
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
                                        {editingMaterial ? "Edit Material" : "Create New Material"}
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
                                            placeholder="Enter material title"
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
                                                Course Code
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. CSC 301"
                                            className="input input-bordered w-full"
                                            value={formData.course_code}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    course_code: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Course Title
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Software Engineering"
                                            className="input input-bordered w-full"
                                            value={formData.course_title}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    course_title: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Level
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={formData.level}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    level: e.target.value as LevelType | "",
                                                }))
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a level
                                            </option>
                                            {levelOptions.map((level) => (
                                                <option key={level} value={level}>
                                                    {level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Semester
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={formData.semester}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    semester: e.target.value as SemesterType | "",
                                                }))
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a semester
                                            </option>
                                            {semesterOptions.map((semester) => (
                                                <option key={semester.value} value={semester.value}>
                                                    {semester.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Material Type
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={formData.material_type}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    material_type: e.target.value as MaterialFormatType | "",
                                                }))
                                            }
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a material type
                                            </option>
                                            {materialTypeOptions.map((materialType) => (
                                                <option key={materialType.value} value={materialType.value}>
                                                    {materialType.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">
                                            Drive URL
                                            <span className="ml-0.5 text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Google Drive link"
                                        className="input input-bordered w-full"
                                        value={formData.drive_url}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, drive_url: e.target.value }))
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">Description</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        style={{ minHeight: "140px" }}
                                        placeholder="Enter material description..."
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, description: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">Session</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 2025/2026"
                                        className="input input-bordered w-full"
                                        value={formData.session}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, session: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">
                                            Departments
                                            <span className="ml-0.5 text-error">*</span>
                                        </span>
                                        <span className="label-text-alt text-base-content/50">
                                            {formData.departments.length} selected
                                        </span>
                                    </label>

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        {departmentOptions.map((department) => {
                                            const isSelected = formData.departments.includes(department.value);

                                            return (
                                                <label
                                                    key={department.value}
                                                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                                                        isSelected
                                                            ? "border-primary bg-primary/10"
                                                            : "border-base-300 hover:bg-base-200"
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-primary"
                                                        checked={isSelected}
                                                        onChange={() => handleDepartmentToggle(department.value)}
                                                    />
                                                    <span className="min-w-0 flex-1 text-sm font-medium">
                                                        {department.label}
                                                    </span>
                                                </label>
                                            );
                                        })}
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
                                                {editingMaterial ? "Updating..." : "Creating..."}
                                            </>
                                        ) : editingMaterial ? (
                                            "Update Material"
                                        ) : (
                                            "Create Material"
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