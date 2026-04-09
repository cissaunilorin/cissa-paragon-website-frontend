"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { Plus, Edit, Trash2, Eye, Calendar, Clock3, History, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { getEvents, createEvent, updateEvent, deleteEvent, type Event } from "@/lib/events";

type EventFormState = {
    title: string;
    description: string;
    image: File | null;
    location: string;
    location_type: "physical" | "online";
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    requires_ticket: boolean;
    ticket_url: string;
    session: string;
};

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState<EventFormState>({
        title: "",
        description: "",
        image: null,
        location: "",
        location_type: "physical",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        requires_ticket: false,
        ticket_url: "",
        session: "2025/2026 ACADEMIC SESSION",
    });

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getEvents(currentPage, 10);

            setEvents(data.items);
            setTotalPages(data.total_pages);
            setTotal(data.total_items);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const resetFormData = () => {
        setFormData({
            title: "",
            description: "",
            image: null,
            location: "",
            location_type: "physical",
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            requires_ticket: false,
            ticket_url: "",
            session: "2025/2026 ACADEMIC SESSION",
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        resetFormData();
    };

    const openModal = () => {
        setEditingEvent(null);
        resetFormData();
        setIsModalOpen(true);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            image: null,
            location: event.location,
            location_type: event.location_type,
            start_date: event.start_date,
            end_date: event.end_date || "",
            start_time: event.start_time,
            end_time: event.end_time || "",
            requires_ticket: event.requires_ticket,
            ticket_url: event.ticket_url || "",
            session: event.session,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                await deleteEvent(id);
                setEvents((prev) => prev.filter((event) => event.id !== id));
                setTotal((prev) => prev - 1);
            } catch (error) {
                console.error("Failed to delete event:", error);
                alert("Failed to delete event. Please try again.");
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.description ||
            !formData.location ||
            !formData.location_type ||
            !formData.start_date ||
            !formData.start_time ||
            !formData.session
        ) {
            alert("Please fill in all required fields");
            return;
        }

        if (!editingEvent && !formData.image) {
            alert("Please select an image for the event");
            return;
        }

        if (formData.requires_ticket && !formData.ticket_url) {
            alert("Please provide a ticket URL when tickets are required");
            return;
        }

        const submitEvent = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            location_type: formData.location_type,
            start_date: formData.start_date,
            end_date: formData.end_date || undefined,
            start_time: formData.start_time,
            end_time: formData.end_time || undefined,
            requires_ticket: formData.requires_ticket,
            ticket_url: formData.requires_ticket ? formData.ticket_url || undefined : undefined,
            session: formData.session,
        };

        try {
            setSubmitting(true);

            if (editingEvent) {
                const updatedEvent = await updateEvent(editingEvent.id, {
                    ...submitEvent,
                    ...(formData.image ? { image: formData.image } : {}),
                });

                setEvents((prev) =>
                    prev.map((event) => (event.id === editingEvent.id ? updatedEvent : event)),
                );
            } else {
                const newEvent = await createEvent({
                    ...submitEvent,
                    image: formData.image as File,
                });

                setEvents((prev) => [newEvent, ...prev]);
                setTotal((prev) => prev + 1);
            }

            closeModal();
        } catch (error) {
            console.error("Failed to save event:", error);
            alert("Failed to save event. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatDateRange = (startDate: string, endDate: string | null) => {
        if (!endDate || startDate === endDate) {
            return formatDate(startDate);
        }

        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

    const today = new Date().toISOString().split("T")[0];
    const upcomingEvents = events.filter((event) => event.start_date >= today);
    const pastEvents = events.filter((event) => event.start_date < today);

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
                        <h1 className="text-3xl font-bold text-base-content">Event Management</h1>
                        <p className="mt-2 text-base-content/70">
                            Create, edit, and manage faculty events
                        </p>
                    </div>
                    <button onClick={openModal} className="btn btn-primary btn-lg gap-2">
                        <Plus size={20} />
                        New Event
                    </button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="stat rounded-lg bg-primary text-primary-content">
                        <div className="stat-figure">
                            <Calendar size={32} />
                        </div>
                        <div className="stat-title text-primary-content/70">Total Events</div>
                        <div className="stat-value">{total}</div>
                    </div>

                    <div className="stat rounded-lg bg-secondary text-secondary-content">
                        <div className="stat-figure">
                            <Clock3 size={32} />
                        </div>
                        <div className="stat-title text-secondary-content/70">Upcoming Events</div>
                        <div className="stat-value">{upcomingEvents.length}</div>
                    </div>

                    <div className="stat rounded-lg bg-accent text-accent-content">
                        <div className="stat-figure">
                            <History size={32} />
                        </div>
                        <div className="stat-title text-accent-content/70">Past Events</div>
                        <div className="stat-value">{pastEvents.length}</div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">All Events</h2>

                        {events.length === 0 ? (
                            <div className="py-12 text-center">
                                <Calendar size={64} className="mx-auto mb-4 text-base-content/20" />
                                <p className="text-base-content/60">No events found</p>
                                <p className="text-sm text-base-content/40">
                                    Create your first event to get started
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Date</th>
                                            <th>Location</th>
                                            <th>Location Type</th>
                                            <th>Requires Ticket</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map((event) => (
                                            <tr key={event.id}>
                                                <td>
                                                    {event.image_url ? (
                                                        <div className="avatar">
                                                            <div className="h-12 w-12 rounded">
                                                                <Image
                                                                    src={event.image_url}
                                                                    alt={event.title}
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
                                                        {event.title}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="text-sm">
                                                        {formatDateRange(event.start_date, event.end_date)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-sm">{event.location}</span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge badge-sm ${
                                                            event.location_type === "physical"
                                                                ? "badge-primary"
                                                                : "badge-secondary"
                                                        }`}
                                                    >
                                                        {event.location_type}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge badge-sm ${
                                                            event.requires_ticket ? "badge-warning" : "badge-ghost"
                                                        }`}
                                                    >
                                                        {event.requires_ticket ? "Required" : "Not required"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <a
                                                            href={`/events/${event.id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-ghost btn-sm"
                                                            title="View event"
                                                        >
                                                            <Eye size={16} />
                                                        </a>
                                                        <button
                                                            onClick={() => handleEdit(event)}
                                                            className="btn btn-ghost btn-sm"
                                                            title="Edit event"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(event.id)}
                                                            className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
                                                            title="Delete event"
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
                                        {editingEvent ? "Edit Event" : "Create New Event"}
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
                                            placeholder="Enter event title"
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
                                                Location Type
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={formData.location_type}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    location_type: e.target.value as "physical" | "online",
                                                }))
                                            }
                                            required
                                        >
                                            <option value="physical">Physical</option>
                                            <option value="online">Online</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">
                                            Description
                                            <span className="ml-0.5 text-error">*</span>
                                        </span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        style={{ minHeight: "180px" }}
                                        placeholder="Enter event description..."
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, description: e.target.value }))
                                        }
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Location
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter event location"
                                            className="input input-bordered w-full"
                                            value={formData.location}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, location: e.target.value }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Session
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter session"
                                            className="input input-bordered w-full"
                                            value={formData.session}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, session: e.target.value }))
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Start Date
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered w-full"
                                            value={formData.start_date}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, start_date: e.target.value }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">End Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered w-full"
                                            value={formData.end_date}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, end_date: e.target.value }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Start Time
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="time"
                                            className="input input-bordered w-full"
                                            value={formData.start_time}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, start_time: e.target.value }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">End Time</span>
                                        </label>
                                        <input
                                            type="time"
                                            className="input input-bordered w-full"
                                            value={formData.end_time}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, end_time: e.target.value }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3 px-0 pb-1">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={formData.requires_ticket}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    requires_ticket: e.target.checked,
                                                }))
                                            }
                                        />
                                        <span className="label-text font-medium">Event requires ticketing</span>
                                    </label>
                                </div>

                                {formData.requires_ticket && (
                                    <div className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-medium">
                                                Ticket URL
                                                <span className="ml-0.5 text-error">*</span>
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter ticket URL"
                                            className="input input-bordered w-full"
                                            value={formData.ticket_url}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, ticket_url: e.target.value }))
                                            }
                                            required={formData.requires_ticket}
                                        />
                                    </div>
                                )}

                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text font-medium">
                                            Event Image
                                            {!editingEvent && <span className="ml-0.5 text-error">*</span>}
                                        </span>
                                        {editingEvent && (
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
                                                required={!editingEvent}
                                            />
                                        </label>
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
                                                {editingEvent ? "Updating..." : "Creating..."}
                                            </>
                                        ) : editingEvent ? (
                                            "Update Event"
                                        ) : (
                                            "Create Event"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
