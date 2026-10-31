import { ExternalLink, FileText, FolderOpen } from "lucide-react";

import {
    SEMESTERS,
    fileUrl,
    folderUrl,
    type MaterialFolder,
} from "@/lib/materials";

function fileKind(name: string): string | null {
    const n = name.toLowerCase();
    if (/outline/.test(n)) return "Outline";
    if (/\bpq\b|past q|question|exam|test|mock|cbt/.test(n)) return "Past questions";
    if (/note|lecture|slide|module|handout|summary|study guide|compil/.test(n)) return "Notes";
    return null;
}

export default function MaterialCard({ material }: { material: MaterialFolder }) {
    const semesterLabel =
        material.semester === "all"
            ? "All semesters"
            : `${SEMESTERS.find((s) => s.value === material.semester)?.label} Semester`;
    const count = material.files.length;

    return (
        <article className="flex h-full flex-col justify-between gap-5 rounded-3xl border border-base-300/80 bg-base-100 p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="truncate max-w-[160px] sm:max-w-none">{material.department}</span>
                    </span>
                    <span className="text-xs font-medium text-base-content/60 bg-base-200/80 px-2 py-0.5 rounded-full">
                        {count} {count === 1 ? "File" : "Files"}
                    </span>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-base-content">
                        {material.course_code}
                    </h2>
                    {material.course_title ? (
                        <p className="text-xs sm:text-sm text-base-content/70 mt-0.5 line-clamp-2">
                            {material.course_title}
                        </p>
                    ) : null}
                </div>

                <div className="flex flex-wrap gap-1.5 text-xs text-base-content/75">
                    <span className="rounded-full bg-base-200/80 px-2.5 py-0.5 font-medium">
                        {material.level} Level
                    </span>
                    <span className="rounded-full bg-base-200/80 px-2.5 py-0.5 font-medium">
                        {semesterLabel}
                    </span>
                </div>

                <details className="group rounded-2xl border border-base-300/80 bg-base-200/30 overflow-hidden">
                    <summary className="cursor-pointer select-none px-3.5 py-2 text-xs sm:text-sm font-semibold text-base-content/80 hover:bg-base-200/60 transition-colors">
                        View file directory ({count})
                    </summary>
                    <ul className="max-h-60 divide-y divide-base-200 overflow-y-auto border-t border-base-300/60 bg-base-100">
                        {material.files.map((file) => {
                            const kind = fileKind(file.name);
                            return (
                                <li key={file.id}>
                                    <a
                                        href={fileUrl(file.id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-2 px-3.5 py-2 text-xs sm:text-sm hover:bg-base-200/60 transition-colors"
                                    >
                                        <FileText
                                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                                            aria-hidden="true"
                                        />
                                        <span className="min-w-0 flex-1 break-words">
                                            {file.name}
                                        </span>
                                        {kind ? (
                                            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                                                {kind}
                                            </span>
                                        ) : null}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </details>
            </div>

            <a
                href={folderUrl(material.folder_id)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary/90 active:scale-95"
                aria-label={`Open ${material.department} ${material.level} level ${material.course_code} folder on Google Drive`}
            >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>Open Drive Folder</span>
            </a>
        </article>
    );
}
