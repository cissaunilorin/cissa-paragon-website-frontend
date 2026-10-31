// Course materials are plain Google Drive folders full of PDFs. The list of
// courses lives in ./materials-data.ts (generated from the Drive listing).
// No backend or database is involved.

export type LevelType = "100" | "200" | "300" | "400";
export type SemesterType = "harmattan" | "rain";
export type DepartmentType = "CSC" | "IFT" | "LIS" | "TCS" | "MAC";

export interface MaterialFile {
    id: string; // Google Drive file ID
    name: string; // display name, without ".pdf"
}

export interface MaterialFolder {
    course_code: string; // e.g. "PHY 101", or "General" for files outside a course folder
    course_title?: string; // optional, e.g. "General Physics I"
    department: DepartmentType;
    level: LevelType;
    semester: SemesterType | "all"; // "all" = not tied to one semester
    folder_id: string; // Google Drive folder ID
    files: MaterialFile[];
}

export const LEVELS: LevelType[] = ["100", "200", "300", "400"];
export const SEMESTERS: { value: SemesterType; label: string }[] = [
    { value: "harmattan", label: "Harmattan" },
    { value: "rain", label: "Rain" },
];
export const DEPARTMENTS: DepartmentType[] = ["CSC", "IFT", "LIS", "MAC", "TCS"];

export const folderUrl = (id: string) => `https://drive.google.com/drive/folders/${id}`;
export const fileUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;

export { MATERIALS } from "./materials-data";
