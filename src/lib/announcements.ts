import apiClient from "./api";
import { Signatory } from "./signatories";

export interface Announcement {
    id: string;
    title: string;
    image_url: string;
    category: string;
    body: string;
    session: string;
    published_at: string;
    signatories: Signatory[];
}

export interface AnnouncementsListResponse {
    items: Announcement[];
    total_items: number;
    total_pages: number;
    current_page: number;
    page_size: number;
}

export const getAnnouncements = async (
    page: number,
    pageSize: number
): Promise<AnnouncementsListResponse> => {
    const response = await apiClient.get("/announcements", {
        params: { page, page_size: pageSize },
    });
    return response.data.data;
};

export const getAnnouncementById = async (
    id: string
): Promise<Announcement | undefined> => {
    const response = await apiClient.get(`/announcements/${id}`);
    return response.data.data;
};

// backend expects a multi-part form data for image uploads
export const createAnnouncement = async (announcement: {
    title: string;
    image: File;
    category: string;
    body: string;
    session: string;
    published_at: string;
    signatories: string[];
}): Promise<Announcement> => {
    const formData = new FormData();
    formData.append("title", announcement.title);
    formData.append("image", announcement.image);
    formData.append("category", announcement.category);
    formData.append("body", announcement.body);
    formData.append("session", announcement.session);
    formData.append("published_at", announcement.published_at);
    announcement.signatories.forEach((id) =>
        formData.append("signatories", id)
    );

    const response = await apiClient.post("/announcements", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const updateAnnouncement = async (
    id: string,
    announcement: {
        title?: string;
        image?: File;
        category?: string;
        body?: string;
        session?: string;
        published_at?: string;
        signatories?: string[];
    }
): Promise<Announcement> => {
    const formData = new FormData();
    if (announcement.title) formData.append("title", announcement.title);
    if (announcement.image) formData.append("image", announcement.image);
    if (announcement.category)
        formData.append("category", announcement.category);
    if (announcement.body) formData.append("body", announcement.body);
    if (announcement.session) formData.append("session", announcement.session);
    if (announcement.published_at)
        formData.append("published_at", announcement.published_at);
    if (announcement.signatories) {
        announcement.signatories.forEach((id) =>
            formData.append("signatories", id)
        );
    }

    const response = await apiClient.put(`/announcements/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
    await apiClient.delete(`/announcements/${id}`);
};
