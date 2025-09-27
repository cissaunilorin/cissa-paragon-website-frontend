import Image from "next/image";
import Departments from "./Departments";

export default function About() {
    return (
        <div id="about" className="pt-10 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        Discover <span className="text-primary">CISSA</span> -
                        The heartbeat of{" "}
                        <span className="text-secondary">CIS</span>
                    </h2>
                </div>

                <div className="mx-auto">
                    <div className="card card-xl lg:card-side shadow-lg rounded-3xl overflow-hidden mb-8 border border-base-200">
                        <figure>
                            <Image
                                src="/assets/ov-2.png"
                                alt="About CISSA"
                                width={600}
                                height={400}
                                className="object-contain w-full h-full"
                            />
                        </figure>
                        <div className="p-8 lg:p-12 bg-gradient-to-br from-primary/95 to-primary text-primary-content">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-3">
                                        {/* <span className="w-2 h-2 bg-primary-content rounded-full"></span> */}
                                        <Image
                                            src="/assets/cissa.png"
                                            alt="CISSA Logo"
                                            width={46}
                                            height={46}
                                        />
                                        Who We Are
                                    </h3>
                                    <div className="space-y-4 text-lg leading-relaxed">
                                        <p>
                                            The{" "}
                                            <strong>
                                                Communication and Information
                                                Sciences Students Association
                                                (CISSA)
                                            </strong>{" "}
                                            is the official student body
                                            representing undergraduates in the
                                            Faculty of Communication and
                                            Information Sciences, University of
                                            Ilorin.
                                        </p>
                                        <p>
                                            <span className="inline-flex items-center gap-2 bg-primary-content/20 px-3 py-1 rounded-full text-sm font-medium mr-2">
                                                Est. 2008
                                            </span>
                                            We unite students from five dynamic
                                            departments and have evolved into
                                            one of the most active student
                                            associations in the university.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
