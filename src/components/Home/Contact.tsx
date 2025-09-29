export default function Contact() {
    return (
        <div id="contact" className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Get in <span className="text-primary">Touch</span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Have questions or want to get involved? We&apos;d love
                        to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <svg
                                        className="w-6 h-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p className="text-base-content/70">
                                        Faculty of CIS, University of Ilorin,
                                        Kwara State
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <svg
                                        className="w-6 h-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-base-content/70">
                                        info@cissa-unilorin.org
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <svg
                                        className="w-6 h-6 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-base-content/70">
                                        +234 (0) 803 xxx xxxx
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title mb-4">
                                Send us a Message
                            </h3>
                            <form className="space-y-4">
                                <div className="form-control">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered h-32"
                                        placeholder="Your Message"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
