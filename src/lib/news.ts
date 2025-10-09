export interface Signatory {
    name: string; // e.g. "SANNI, Nurudeen Akorede"
    alias?: string; // e.g. "D'LIGHT"
    role: string; // e.g. "Executive President"
    contact?: string; // e.g. WhatsApp link
}

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

const announcements: Announcement[] = [
    {
        id: "happy-resumption-29-09-2025",
        imageUrl: "/assets/publication/pub-3.jpg",
        category: "PRESS RELEASE",
        session: "2025/2026 ACADEMIC SESSION",
        date: "29/09/2025",
        time: "11:30AM",
        title: "HAPPY RESUMPTION CISSAITES!",
        body: "The Paragon Administration warmly welcomes all *Freshers* and *Staylites* back to campus for the commencement of the 2025/2026 academic session.\n\nAs CISSAites return back to campus, we encourage everyone to embrace the new session with renewed zeal, academic focus, and a commitment to personal and collective growth.\n\nThis resumption marks the continuation of our administration's dedication to student development through impactful initiatives and consistent engagement. We look forward to another session of learning, bonding, innovation, and community.\n\nOnce again, welcome home to CIS!",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
    {
        id: "students-handbook",
        imageUrl: "/assets/publication/pub-2.jpg",
        category: "PRESS RELEASE",
        session: "2025/2026 ACADEMIC SESSION",
        date: "26/09/2025",
        time: "9:00AM",
        title: "IMPORTANT NOTICE REGARDING THE STUDENTS' INFORMATION AND REGULATIONS HANDBOOK",
        body: "The University of Ilorin has officially released the *Students’ Information and Regulations Handbook* — a vital guide containing rules, expectations, and student privileges on campus.\n\nAll CISSAites are urged to go through and familiarise themselves with the University's rule of conduct, offences and their corresponding penalties.\n\nKindly note that ignorance is not an excuse! Every student is expected to be familiar with the contents of the handbook.\n\nThe CISSA Paragon executives encourage all CISSAites to access it through the link below, download and read.\nhttps://drive.google.com/file/d/1enlb6mCrq73v1FpMtjFLHZdOW3NK_C01/view?usp=drivesdk\n\nLet’s stay informed, act responsibly, and represent CISSA proudly. 💛🤎",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
    {
        id: "interactive-session-ep4-20-09-2025",
        imageUrl: "/assets/publication/pub-1.jpg",
        category: "EVENT",
        session: "2025/2026 ACADEMIC SESSION",
        date: "20/09/2025",
        time: "12:45PM",
        title: "EPISODE 4 OF THE BI-WEEKLY INTERACTIVE SESSION",
        body: "Dear CISSAites,\n\nWe’re back again with *Episode 4* of the Bi-Weekly Interactive Session happening today.\n\n🎙️ *Anchor:* Shuaibu Olasubomi\n🗓️ *Date:* Saturday, 20th September, 2025\n⏰ *Time:* 7:30PM prompt\n📌 *LIVE on X*  — https://x.com/i/spaces/1ynKOMebqBqJR\n💬 *Topic:* New session, New energy: “What are you bringing into the new semester?”\n\nBe part of the conversation. Let’s share and relate.",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
        {
        id: "happy-resumption-29-09-2025-2",
        imageUrl: "/assets/publication/pub-3.jpg",
        category: "PRESS RELEASE",
        session: "2025/2026 ACADEMIC SESSION",
        date: "29/09/2025",
        time: "11:30AM",
        title: "HAPPY RESUMPTION CISSAITES!",
        body: "The Paragon Administration warmly welcomes all *Freshers* and *Staylites* back to campus for the commencement of the 2025/2026 academic session.\n\nAs CISSAites return back to campus, we encourage everyone to embrace the new session with renewed zeal, academic focus, and a commitment to personal and collective growth.\n\nThis resumption marks the continuation of our administration's dedication to student development through impactful initiatives and consistent engagement. We look forward to another session of learning, bonding, innovation, and community.\n\nOnce again, welcome home to CIS!",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
    {
        id: "students-handbook2",
        imageUrl: "/assets/publication/pub-2.jpg",
        category: "PRESS RELEASE",
        session: "2025/2026 ACADEMIC SESSION",
        date: "26/09/2025",
        time: "9:00AM",
        title: "IMPORTANT NOTICE REGARDING THE STUDENTS' INFORMATION AND REGULATIONS HANDBOOK",
        body: "The University of Ilorin has officially released the *Students’ Information and Regulations Handbook* — a vital guide containing rules, expectations, and student privileges on campus.\n\nAll CISSAites are urged to go through and familiarise themselves with the University's rule of conduct, offences and their corresponding penalties.\n\nKindly note that ignorance is not an excuse! Every student is expected to be familiar with the contents of the handbook.\n\nThe CISSA Paragon executives encourage all CISSAites to access it through the link below, download and read.\nhttps://drive.google.com/file/d/1enlb6mCrq73v1FpMtjFLHZdOW3NK_C01/view?usp=drivesdk\n\nLet’s stay informed, act responsibly, and represent CISSA proudly. 💛🤎",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
    {
        id: "interactive-session-ep4-20-09-2025-2",
        imageUrl: "/assets/publication/pub-1.jpg",
        category: "EVENT",
        session: "2025/2026 ACADEMIC SESSION",
        date: "20/09/2025",
        time: "12:45PM",
        title: "EPISODE 4 OF THE BI-WEEKLY INTERACTIVE SESSION",
        body: "Dear CISSAites,\n\nWe’re back again with *Episode 4* of the Bi-Weekly Interactive Session happening today.\n\n🎙️ *Anchor:* Shuaibu Olasubomi\n🗓️ *Date:* Saturday, 20th September, 2025\n⏰ *Time:* 7:30PM prompt\n📌 *LIVE on X*  — https://x.com/i/spaces/1ynKOMebqBqJR\n💬 *Topic:* New session, New energy: “What are you bringing into the new semester?”\n\nBe part of the conversation. Let’s share and relate.",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
        {
        id: "happy-resumption-29-09-2025-3",
        imageUrl: "/assets/publication/pub-3.jpg",
        category: "PRESS RELEASE",
        session: "2025/2026 ACADEMIC SESSION",
        date: "29/09/2025",
        time: "11:30AM",
        title: "HAPPY RESUMPTION CISSAITES!",
        body: "The Paragon Administration warmly welcomes all *Freshers* and *Staylites* back to campus for the commencement of the 2025/2026 academic session.\n\nAs CISSAites return back to campus, we encourage everyone to embrace the new session with renewed zeal, academic focus, and a commitment to personal and collective growth.\n\nThis resumption marks the continuation of our administration's dedication to student development through impactful initiatives and consistent engagement. We look forward to another session of learning, bonding, innovation, and community.\n\nOnce again, welcome home to CIS!",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
    {
        id: "students-handbook3",
        imageUrl: "/assets/publication/pub-2.jpg",
        category: "PRESS RELEASE",
        session: "2025/2026 ACADEMIC SESSION",
        date: "26/09/2025",
        time: "9:00AM",
        title: "IMPORTANT NOTICE REGARDING THE STUDENTS' INFORMATION AND REGULATIONS HANDBOOK",
        body: "The University of Ilorin has officially released the *Students’ Information and Regulations Handbook* — a vital guide containing rules, expectations, and student privileges on campus.\n\nAll CISSAites are urged to go through and familiarise themselves with the University's rule of conduct, offences and their corresponding penalties.\n\nKindly note that ignorance is not an excuse! Every student is expected to be familiar with the contents of the handbook.\n\nThe CISSA Paragon executives encourage all CISSAites to access it through the link below, download and read.\nhttps://drive.google.com/file/d/1enlb6mCrq73v1FpMtjFLHZdOW3NK_C01/view?usp=drivesdk\n\nLet’s stay informed, act responsibly, and represent CISSA proudly. 💛🤎",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
    {
        id: "interactive-session-ep4-20-09-2025-3",
        imageUrl: "/assets/publication/pub-1.jpg",
        category: "EVENT",
        session: "2025/2026 ACADEMIC SESSION",
        date: "20/09/2025",
        time: "12:45PM",
        title: "EPISODE 4 OF THE BI-WEEKLY INTERACTIVE SESSION",
        body: "Dear CISSAites,\n\nWe’re back again with *Episode 4* of the Bi-Weekly Interactive Session happening today.\n\n🎙️ *Anchor:* Shuaibu Olasubomi\n🗓️ *Date:* Saturday, 20th September, 2025\n⏰ *Time:* 7:30PM prompt\n📌 *LIVE on X*  — https://x.com/i/spaces/1ynKOMebqBqJR\n💬 *Topic:* New session, New energy: “What are you bringing into the new semester?”\n\nBe part of the conversation. Let’s share and relate.",
        hashtags: ["TheParagonAdministration"],
        signatories: [
            {
                name: "SANNI, Nurudeen Akorede",
                alias: "D'LIGHT",
                role: "Executive President",
                contact: "https://wa.me/+2349152349887",
            },
            {
                name: "KUFORIJI, Ayobami Waris",
                alias: "APEXWEALTH",
                role: "Public Relations Officer",
                contact: "https://wa.me/+2349167369415",
            },
        ],
    },
];

export function getAnnouncements(): Announcement[] {
    // In a real-world scenario, you might fetch this data from a database or an API
    // For this example, we'll read from a local JSON file

    // const file = await promises.readFile(process.cwd() + "/src/data/news.json", "utf-8");
    // return JSON.parse(file) as Announcement[];

    return announcements;
}

export async function getAnnouncementById(id: string): Promise<Announcement | undefined> {
    const allAnnouncements = getAnnouncements();
    return allAnnouncements.find((announcement) => announcement.id === id);
}
