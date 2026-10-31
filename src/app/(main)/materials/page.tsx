"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
    DEPARTMENTS,
    LEVELS,
    MATERIALS,
    SEMESTERS,
    type DepartmentType,
    type LevelType,
    type SemesterType,
} from "@/lib/materials";

import MaterialCard from "./_components/MaterialCard";

// "csc101", "CSC 101" and "csc-101" should all match the same course
const normalize = (value: string) => value.toLowerCase().replace(/[\s\-_]+/g, "");

// Pre-compute a searchable string per card (course code + file names)
const SEARCH_INDEX = new Map(
    MATERIALS.map((m) => [
        m,
        normalize(`${m.course_code} ${m.course_title ?? ""} ${m.files.map((f) => f.name).join(" ")}`),
    ]),
);

export default function MaterialsPage() {
    const [search, setSearch] = useState("");
    const [level, setLevel] = useState<LevelType | "">("");
    const [semester, setSemester] = useState<SemesterType | "">("");
    const [department, setDepartment] = useState<DepartmentType | "">("");

    const filtered = useMemo(() => {
        const query = normalize(search);

        return MATERIALS.filter((m) => {
            if (level && m.level !== level) return false;
            if (semester && m.semester !== semester && m.semester !== "all") return false;
            if (department && m.department !== department) return false;
            if (query && !SEARCH_INDEX.get(m)?.includes(query)) return false;
            return true;
        });
    }, [search, level, semester, department]);

    return (
        <main className="min-h-screen bg-base-100 pb-16">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mt-12 space-y-8 md:mt-16 md:space-y-10">
                    <header className="max-w-4xl space-y-3">
                        <h1 className="text-4xl font-bold tracking-tight text-base-content md:text-6xl">
                            Materials
                        </h1>
                        <p className="text-base-content/70">
                            Find your course and open its folder for lecture notes,
                            past questions and textbooks.
                        </p>
                    </header>

                    <section
                        aria-label="Filter materials"
                        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        <label className="input input-bordered flex items-center gap-2 sm:col-span-2 lg:col-span-1">
                            <Search className="h-4 w-4 opacity-60" aria-hidden="true" />
                            <input
                                type="search"
                                className="grow"
                                placeholder="Search course code or file name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </label>

                        <select
                            className="select select-bordered"
                            aria-label="Level"
                            value={level}
                            onChange={(e) => setLevel(e.target.value as LevelType | "")}
                        >
                            <option value="">All levels</option>
                            {LEVELS.map((l) => (
                                <option key={l} value={l}>
                                    {l} Level
                                </option>
                            ))}
                        </select>

                        <select
                            className="select select-bordered"
                            aria-label="Semester"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value as SemesterType | "")}
                        >
                            <option value="">All semesters</option>
                            {SEMESTERS.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>

                        <select
                            className="select select-bordered"
                            aria-label="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value as DepartmentType | "")}
                        >
                            <option value="">All departments</option>
                            {DEPARTMENTS.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </section>

                    {filtered.length === 0 ? (
                        <div className="flex min-h-56 items-center justify-center text-center text-base-content/60">
                            {MATERIALS.length === 0
                                ? "No materials have been added yet."
                                : "No courses match your search."}
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((m) => (
                                <MaterialCard key={m.folder_id} material={m} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
