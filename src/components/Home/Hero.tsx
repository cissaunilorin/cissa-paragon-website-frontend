export default function Hero() {
    return (
        <div
            id="home"
            className="hero min-h-screen relative"
            style={{
                backgroundImage: "url(/assets/ov-3.png)",
            }}
        >
            <div className="hero-overlay bg-gradient-to-r from-black/60 to-black/40"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-4xl">
                    <h1 className="mb-6 text-5xl md:text-7xl font-bold leading-tight">
                        Where{" "}
                        <span className="text-secondary">Communication</span>{" "}
                        Meets <span className="text-secondary">Innovation</span>
                    </h1>
                    <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto">
                        With CISSA at its core, the faculty thrives through
                        collaboration, creativity, and excellence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn btn-primary btn-lg ">
                            Explore CISSA
                        </button>
                        <button className="btn btn-outline btn-lg">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    ></path>
                </svg>
            </div>
        </div>
    );
}
