import { BookOpen, Heart, Users, Trophy, Code, Megaphone } from "lucide-react";

export default function Responsibilities() {
    return (
        <div className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Our{" "}
                        <span className="text-primary">Responsibilities</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                    <div className="collapse collapse-plus bg-base-100">
                        <input type="radio" name="responsibility-accordion" />
                        <div className="collapse-title text-xl font-medium flex items-center gap-3">
                            <BookOpen className="text-primary" size={24} />
                            Academic Empowerment
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">
                                Organizes tutorials, workshops, and seminars to
                                support academic excellence and skills
                                development among CISSAites.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus bg-base-100">
                        <input type="radio" name="responsibility-accordion" />
                        <div className="collapse-title text-xl font-medium flex items-center gap-3">
                            <Heart className="text-primary" size={24} />
                            Welfare Support
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">
                                Ensures the well-being of members by addressing
                                students&apos; concerns, and providing
                                assistance during emergencies.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus bg-base-100">
                        <input type="radio" name="responsibility-accordion" />
                        <div className="collapse-title text-xl font-medium flex items-center gap-3">
                            <Users className="text-primary" size={24} />
                            Social Events & Networking
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">
                                Plans and executes events like Freshers&apos;
                                Welcome, Dinner & Awards, and other social
                                functions to foster unity and networking.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus bg-base-100">
                        <input type="radio" name="responsibility-accordion" />
                        <div className="collapse-title text-xl font-medium flex items-center gap-3">
                            <Trophy className="text-primary" size={24} />
                            Sports and Fitness
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">
                                Promotes physical well-being and unity through
                                inter-departmental games, Dean Cup, and sporting
                                events.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus bg-base-100">
                        <input type="radio" name="responsibility-accordion" />
                        <div className="collapse-title text-xl font-medium flex items-center gap-3">
                            <Code className="text-primary" size={24} />
                            Career and Tech Development
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">
                                Collaborates with industry experts to host tech
                                bootcamps, career talks, and trainings for
                                future-ready CISSAites.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus bg-base-100">
                        <input type="radio" name="responsibility-accordion" />
                        <div className="collapse-title text-xl font-medium flex items-center gap-3">
                            <Megaphone className="text-primary" size={24} />
                            Representation & Advocacy
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/80">
                                Serves as a voice for CISSAites in faculty-wide
                                or university-level matters, ensuring
                                students&apos; interests are protected.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
