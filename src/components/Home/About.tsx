export default function About() {
    return (
        <div id="about" className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
                            About <span className="text-primary">CISSA</span>
                        </h2>
                        <p className="text-lg text-base-content/80 mb-6">
                            The Communication and Information Sciences Students
                            Association (CISSA) is the official student body
                            representing undergraduates in the Faculty of
                            Communication and Information Sciences (CIS),
                            University of Ilorin.
                        </p>
                        <p className="text-lg text-base-content/80 mb-6">
                            Founded in 2008, following the establishment of the
                            faculty itself, CISSA was created to unite students
                            from the five departments under the faculty:
                        </p>
                        <ul className="list-disc list-inside text-lg text-base-content/80 mb-6 space-y-2 pl-4">
                            <li>Computer Science</li>
                            <li>Information and Communication Science</li>
                            <li>Library and Information Science</li>
                            <li>Mass Communication</li>
                            <li>Telecommunication Science</li>
                        </ul>
                        <p className="text-lg text-base-content/80 mb-6">
                            Over the years, CISSA has evolved into one of the
                            most active and innovative student associations in
                            the university. Through academic tutorials, tech
                            trainings, media initiatives, social events, and
                            welfare drives, it continues to embody the faculty&apos;s
                            vision of producing globally competitive and
                            communication-savvy graduates.
                        </p>
                        <p className="text-lg text-base-content/80 mb-6">
                            CISSA is governed by a constitution and run by
                            elected executives who work with faculty authorities
                            and student representatives to serve the interests
                            of CIS students, popularly known as CISSAites.
                        </p>
                    </div>
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-2xl mb-4">
                                Our Mission
                            </h3>
                            <p className="text-base-content/80 mb-4">
                                To empower students with the knowledge, skills,
                                and networks necessary for success in the
                                dynamic fields of communication and information
                                sciences.
                            </p>
                            <h3 className="card-title text-2xl mb-4">
                                Our Vision
                            </h3>
                            <p className="text-base-content/80">
                                To be the leading student association that
                                bridges academia and industry, producing
                                graduates who are innovative leaders in
                                communication and information sciences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
