import { BookOpen, Heart, Users, Trophy, Code, Megaphone } from "lucide-react";

export default function Responsibilities() {
    const items = [
        {
            title: "Academic Empowerment",
            icon: BookOpen,
            description:
                "Organizes tutorials, workshops, and seminars to support academic excellence and skills development among CISSAites.",
        },
        {
            title: "Welfare Support",
            icon: Heart,
            description:
                "Ensures the well-being of members by addressing students' concerns, and providing assistance during emergencies.",
        },
        {
            title: "Social Events & Networking",
            icon: Users,
            description:
                "Plans and executes events like Freshers' Welcome, Dinner & Awards, and other social functions to foster unity and networking.",
        },
        {
            title: "Sports and Fitness",
            icon: Trophy,
            description:
                "Promotes physical well-being and unity through inter-departmental games, Dean Cup, and sporting events.",
        },
        {
            title: "Career and Tech Development",
            icon: Code,
            description:
                "Collaborates with industry experts to host tech bootcamps, career talks, and trainings for future-ready CISSAites.",
        },
        {
            title: "Representation & Advocacy",
            icon: Megaphone,
            description:
                "Serves as a voice for CISSAites in faculty-wide or university-level matters, ensuring students' interests are protected.",
        },
    ];

    return (
        <div id="responsibilities" className="py-16 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Our <span className="text-primary">Responsibilities</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                    {items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="collapse collapse-plus bg-base-100">
                                <input
                                    type="radio"
                                    name="responsibility-accordion"
                                    defaultChecked={idx === 0}
                                />
                                <div className="collapse-title text-xl md:text-3xl font-medium md:font-bold flex items-center gap-3">
                                    <Icon className="text-primary" size={24} />
                                    {item.title}
                                </div>
                                <div className="collapse-content">
                                    <p className="text-base-content/80 md:text-xl">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
