import Image from "next/image";

export default function About() {
    return (
        <div id="about" className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Discover <span className="text-primary">CISSA</span>{" "}
                        - The heartbeat of{" "}
                        <span className="text-secondary">CIS</span>
                    </h2>
                </div>

                <div className="mx-auto">
                    <div className="card card-xl lg:card-side shadow-2xl overflow-hidden mb-8">
                        <figure>
                            <Image
                                src="/assets/ov-2.png"
                                alt="About CISSA"
                                width={600}
                                height={400}
                                className="object-contain w-full h-full"
                            />
                        </figure>
                        <div className="card-body bg-primary text-primary-content p-8 lg:w-1/2">
                            <h3 className="card-title font-bold text-3xl mb-6">
                                Who We Are
                            </h3>
                            <p className="text-xl mb-4">
                                The Communication and Information Sciences
                                Students Association (CISSA) is the official
                                student body representing undergraduates in the
                                Faculty of Communication and Information
                                Sciences, University of Ilorin.
                            </p>
                            <p className="text-xl mb-6">
                                Founded in 2008, we unite students from five
                                dynamic departments and have evolved into one of
                                the most active student associations in the
                                university.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-2xl font-semibold mb-3">
                                        Our Departments:
                                    </h4>
                                    <ul className="space-y-2 text-xl">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-primary-content rounded-full mr-3"></span>
                                            Computer Science
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-primary-content rounded-full mr-3"></span>
                                            Information & Communication Science
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-primary-content rounded-full mr-3"></span>
                                            Library & Information Science
                                        </li>
                                    </ul>
                                </div>
                                <div className="md:mt-8">
                                    <ul className="space-y-2 text-xl">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-primary-content rounded-full mr-3"></span>
                                            Mass Communication
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-primary-content rounded-full mr-3"></span>
                                            Telecommunication Science
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
