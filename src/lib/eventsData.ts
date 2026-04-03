export interface Event {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    location: string;
    location_type: "physical" | "online" | "hybrid";
    start_date: string;
    end_date: string | null;
    start_time: string;
    end_time: string | null;
    requires_ticket: boolean;
    ticket_url: string | null;
    session: string;
}

export type EventStatus = "upcoming" | "past";

const todayKey = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export function getEventStatus(event: Event, referenceDate = todayKey()): EventStatus {
    if (event.start_date > referenceDate) {
        return "upcoming";
    }

    if (event.end_date) {
        return event.end_date < referenceDate ? "past" : "upcoming";
    }

    return event.start_date < referenceDate ? "past" : "upcoming";
}

export const eventsData: Event[] = [
    {
        id: "freshers-welcome-night-2026",
        title: "Freshers' Welcome Night",
        description:
            "A high-energy welcome experience for new students featuring mentorship, music, introductions to CISSA leaders, and practical guidance for settling into life on campus.",
        image_url: "/assets/events/ev-2.jpg",
        location: "Faculty of CIS Auditorium, University of Ilorin",
        location_type: "physical",
        start_date: "2026-04-12",
        end_date: null,
        start_time: "4:00 PM",
        end_time: "7:00 PM",
        requires_ticket: true,
        ticket_url: "https://example.com/tickets/freshers-welcome-night",
        session: "2025/2026 Session",
    },
    {
        id: "cissa-innovation-week-2026",
        title: "CISSA Innovation Week",
        description:
            "A three-day hybrid programme focused on design thinking, software showcases, and career conversations with alumni, partners, and faculty mentors.",
        image_url: "/assets/events/ev-3.jpg",
        location: "Faculty of CIS Auditorium and Google Meet",
        location_type: "hybrid",
        start_date: "2026-05-18",
        end_date: "2026-05-20",
        start_time: "10:00 AM",
        end_time: "3:00 PM",
        requires_ticket: false,
        ticket_url: null,
        session: "2025/2026 Session",
    },
    {
        id: "data-literacy-masterclass-2026",
        title: "Data Literacy Masterclass",
        description:
            "An online masterclass that introduced practical data interpretation skills, research tools, and the communication habits needed to present findings clearly.",
        image_url: "/assets/events/ev-1.jpg",
        location: "Google Meet",
        location_type: "online",
        start_date: "2026-02-10",
        end_date: null,
        start_time: "5:00 PM",
        end_time: "6:30 PM",
        requires_ticket: false,
        ticket_url: null,
        session: "2025/2026 Session",
    },
    {
        id: "departmental-orientation-2025",
        title: "Departmental Orientation",
        description:
            "A physical orientation session that brought together students, representatives, and coordinators for a shared look at departmental expectations and support channels.",
        image_url: "/assets/events/ev-2.jpg",
        location: "College Auditorium, University of Ilorin",
        location_type: "physical",
        start_date: "2025-12-06",
        end_date: null,
        start_time: "11:00 AM",
        end_time: "1:00 PM",
        requires_ticket: false,
        ticket_url: null,
        session: "2024/2025 Session",
    },
];