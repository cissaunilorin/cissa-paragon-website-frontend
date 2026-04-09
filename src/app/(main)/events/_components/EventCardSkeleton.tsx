export default function EventCardSkeleton() {
    return (
        <article className="relative bg-base-100 py-6 md:p-6" aria-hidden="true">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(5.5rem,0.58fr)_minmax(14rem,1.2fr)_minmax(0,2.4fr)] md:items-center md:gap-8">
                <div className="relative flex items-center">
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 md:max-w-24 md:flex-none md:items-start">
                        <div className="h-4 w-16 rounded-full bg-base-300 animate-pulse" />
                        <div className="h-14 w-20 rounded-2xl bg-base-300 animate-pulse md:h-16 md:w-24" />
                        <div className="h-4 w-24 rounded-full bg-base-300 animate-pulse" />
                    </div>
                </div>

                <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-base-300 animate-pulse md:w-64 md:self-stretch" />

                <div className="min-w-0 space-y-3 md:pl-2">
                    <div className="h-7 w-11/12 rounded-full bg-base-300 animate-pulse md:h-8" />

                    <div className="flex items-start gap-2">
                        <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-base-300 animate-pulse" />
                        <div className="h-5 w-4/5 rounded-full bg-base-300 animate-pulse md:h-[1.15rem]" />
                    </div>

                    <div className="space-y-2 pt-1">
                        <div className="h-4 w-full rounded-full bg-base-300 animate-pulse md:h-5" />
                        <div className="h-4 w-11/12 rounded-full bg-base-300 animate-pulse md:h-5" />
                        <div className="h-4 w-5/6 rounded-full bg-base-300 animate-pulse md:h-5" />
                    </div>

                    <div className="h-10 w-32 rounded-full bg-base-300 animate-pulse" />
                </div>
            </div>
        </article>
    );
}