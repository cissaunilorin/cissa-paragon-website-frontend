import apiClient from "./api";

export interface Event {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    location: string;
    location_type: "physical" | "online";
    start_date: string;
    end_date: string | null;
    start_time: string;
    end_time: string | null;
    requires_ticket: boolean;
    ticket_url: string | null;
    session: string;
    created_at: string;
}

export interface EventsListResponse {
    items: Event[];
    total_items: number;
    total_pages: number;
    current_page: number;
    page_size: number;
}

export interface EventsFilters {
    time_status?: "upcoming" | "past";
    title?: string;
    location_type?: "physical" | "online";
}

export const getEvents = async (
    page: number,
    pageSize: number,
    filters?: EventsFilters
): Promise<EventsListResponse> => {
    const params: {
        page: number;
        page_size: number;
        time_status?: "upcoming" | "past";
        title?: string;
        location_type?: "physical" | "online";
    } = {
        page,
        page_size: pageSize,
    };

    if (filters?.time_status != undefined) params.time_status = filters.time_status;
    if (filters?.title !== undefined) params.title = filters.title;
    if (filters?.location_type !== undefined)
        params.location_type = filters.location_type;

    const response = await apiClient.get("/events", {
        params,
    });
    return response.data.data;
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data.data;
};

// backend expects a multi-part form data for image uploads
export const createEvent = async (event: {
    title: string;
    image: File;
    description: string;
    location: string;
    location_type: "physical" | "online";
    start_date: string;
    start_time: string;
    session: string;
    end_date?: string;
    end_time?: string;
    requires_ticket?: boolean;
    ticket_url?: string;
}): Promise<Event> => {
    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("image", event.image);
    formData.append("description", event.description);
    formData.append("location", event.location);
    formData.append("location_type", event.location_type);
    formData.append("start_date", event.start_date);
    formData.append("start_time", event.start_time);
    formData.append("session", event.session);
    if (event.end_date) formData.append("end_date", event.end_date);
    if (event.end_time) formData.append("end_time", event.end_time);
    if (event.requires_ticket !== undefined) {
        formData.append("requires_ticket", String(event.requires_ticket));
    }
    if (event.ticket_url) formData.append("ticket_url", event.ticket_url);

    const response = await apiClient.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const updateEvent = async (
    id: string,
    event: {
        title?: string;
        image?: File;
        description?: string;
        location?: string;
        location_type?: "physical" | "online";
        start_date?: string;
        end_date?: string;
        start_time?: string;
        end_time?: string;
        requires_ticket?: boolean;
        ticket_url?: string;
        session?: string;
    }
): Promise<Event> => {
    const formData = new FormData();
    if (event.title) formData.append("title", event.title);
    if (event.image) formData.append("image", event.image);
    if (event.description) formData.append("description", event.description);
    if (event.location) formData.append("location", event.location);
    if (event.location_type)
        formData.append("location_type", event.location_type);
    if (event.start_date) formData.append("start_date", event.start_date);
    if (event.end_date) formData.append("end_date", event.end_date);
    if (event.start_time) formData.append("start_time", event.start_time);
    if (event.end_time) formData.append("end_time", event.end_time);
    if (event.requires_ticket !== undefined) {
        formData.append("requires_ticket", String(event.requires_ticket));
    }
    if (event.ticket_url) formData.append("ticket_url", event.ticket_url);
    if (event.session) formData.append("session", event.session);

    const response = await apiClient.put(`/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
};