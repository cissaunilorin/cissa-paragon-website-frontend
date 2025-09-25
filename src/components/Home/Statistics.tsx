import { Calendar, Building2, Users, Crown, Award, UserCheck, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function useCountUp(endValue: number, duration: number = 2000, startAnimation: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startAnimation) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * endValue));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [endValue, duration, startAnimation]);

    return count;
}

export default function Statistics() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const stats = [
        { label: "Years of Excellence", value: 17, icon: Calendar },
        { label: "Departments", value: 5, icon: Building2 },
        { label: "Executive Officers", value: 10, icon: Crown },
        { label: "Principal Officers", value: 4, icon: Award },
        { label: "Honourables", value: 20, icon: UserCheck },
        { label: "Senators", value: 3, icon: GraduationCap },
        { label: "Students", value: 1250, icon: Users },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="pb-16 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full">
                    {stats.map((stat, index) => {
                        const count = useCountUp(stat.value, 2000 + index * 200, isVisible);
                        const formattedCount = stat.value === 1250 ? count.toLocaleString() : count.toString();
                        
                        return (
                            <div key={index} className="stat">
                                <div className="stat-figure text-primary mb-2">
                                    <stat.icon size={36} />
                                </div>
                                <div className="stat-value text-primary text-4xl">
                                    {formattedCount}
                                </div>
                                <div className="stat-title text-base-content/70">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
