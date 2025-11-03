import { Signatory } from "./signatory";

export interface Announcement {
    id: string;
    imageUrl?: string;
    category: string; // e.g. PRESS RELEASE
    session?: string;
    date: string;
    time?: string;
    title: string;
    body: string; // raw text with *bold* and _italics_
    hashtags?: string[];
    signatories?: Signatory[];
    createdAt?: string;
}

const mockAnnouncements: Announcement[] = []

export function getAnnouncements(): Announcement[] {
}

export async function getAnnouncementById(id: string): Promise<Announcement | undefined> {
}
