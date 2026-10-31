export default function EventCardSkeleton() {
    return (
        <article
            className="group relative rounded-3xl border border-base-300/80 bg-base-100 p-5 sm:p-6 shadow-xs"
            aria-hidden="true"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[auto_16rem_1fr] lg:grid-cols-[auto_18rem_1fr] md:items-center md:gap-7">
                {/* Date display (Desktop) */}
                <div className="hidden md:flex min-w-24 flex-col items-center justify-center rounded-2xl bg-base-200/60 p-4 text-center border border-base-200">
                    <div className="h-3 w-12 rounded-full bg-base-300 animate-pulse" />
                    <div className="h-9 w-14 rounded-xl bg-base-300 animate-pulse my-2" />
                    <div className="h-3 w-10 rounded-full bg-base-300 animate-pulse" />
                </div>

                {/* Event Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-base-300 animate-pulse md:self-stretch" />

                {/* Content details */}
                <div className="min-w-0 space-y-3">
                    <div className="h-6 w-3/4 rounded-full bg-base-300 animate-pulse" />
                    <div className="h-4 w-1/3 rounded-full bg-base-300 animate-pulse" />

                    <div className="space-y-2 pt-1">
                        <div className="h-3.5 w-full rounded-full bg-base-300 animate-pulse" />
                        <div className="h-3.5 w-4/5 rounded-full bg-base-300 animate-pulse" />
                    </div>

                    <div className="h-9 w-28 rounded-full bg-base-300 animate-pulse" />
                </div>
            </div>
        </article>
    );
}
