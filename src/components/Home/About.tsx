export default function About() {
    return (
        <div id="about" className="py-20 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
                            About <span className="text-primary">CISSA</span>
                        </h2>
                        <p className="text-lg text-base-content/80 mb-6">
                            The Communication and Information Sciences Students
                            Association (CISSA) is the premier student
                            organization representing all undergraduate and
                            graduate students in the Faculty of Communication
                            and Information Sciences at the University of
                            Ilorin.
                        </p>
                        <p className="text-lg text-base-content/80 mb-8">
                            We are committed to fostering academic excellence,
                            professional development, and creating lasting bonds
                            among students while bridging the gap between
                            academic theory and industry practice.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="badge badge-primary badge-lg">
                                Academic Excellence
                            </div>
                            <div className="badge badge-secondary badge-lg">
                                Professional Growth
                            </div>
                            <div className="badge badge-accent badge-lg">
                                Community Building
                            </div>
                        </div>
                    </div>
                    <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl">
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
