import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BackLink() {
    return (
        <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm text-base-content/55 underline-offset-4 transition-colors hover:text-base-content/80 hover:underline"
            aria-label="Back to events"
        >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to events</span>
        </Link>
    );
}