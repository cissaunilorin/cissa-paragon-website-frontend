export default function Statistics({ stats }: { stats: { label: string; value: string }[] }) {
    return (
        <div className="pb-16 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat place-items-center">
                            <div className="stat-title text-base-content/70">
                                {stat.label}
                            </div>
                            <div className="stat-value text-primary">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
