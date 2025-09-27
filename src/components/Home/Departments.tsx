// New Departments component for the departments grid
import { Code, Satellite, BookOpen, Mic, Wifi } from "lucide-react";
export default function Departments() {
    const departments = [
        {
            name: "Computer Science",
            icon: Code,
            color: "from-blue-500 to-blue-600",
        },
        {
            name: "Information & Communication Science",
            icon: Satellite,
            color: "from-purple-500 to-purple-600",
        },
        {
            name: "Library & Information Science",
            icon: BookOpen,
            color: "from-green-500 to-green-600",
        },
        {
            name: "Mass Communication",
            icon: Mic,
            color: "from-red-500 to-red-600",
        },
        {
            name: "Telecommunication Science",
            icon: Wifi,
            color: "from-orange-500 to-orange-600",
        },
    ];


    return (
        <div className="pb-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Our <span className="text-secondary">Dynamic</span>{" "}
                        Departments
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {departments.map((dept, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 hover:-translate-y-2"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            ></div>
                            <div className="relative z-10">
                                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                    <dept.icon size={34} className="text-primary" />
                                </div>
                                <h4 className="text-lg font-bold text-base-content mb-2 group-hover:text-primary transition-colors duration-300">
                                    {dept.name}
                                </h4>
                                <div className="w-full h-1 bg-base-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${dept.color} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-100`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
