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

    // Call hooks at the top level for each stat
    const count1 = useCountUp(stats[0].value, 2000, isVisible);
    const count2 = useCountUp(stats[1].value, 2200, isVisible);
    const count3 = useCountUp(stats[2].value, 2400, isVisible);
    const count4 = useCountUp(stats[3].value, 2600, isVisible);
    const count5 = useCountUp(stats[4].value, 2800, isVisible);
    const count6 = useCountUp(stats[5].value, 3000, isVisible);
    const count7 = useCountUp(stats[6].value, 3200, isVisible);

    const counts = [count1, count2, count3, count4, count5, count6, count7];

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
                <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full bg-secondary text-secondary-content">
                    {stats.map((stat, index) => {
                        const count = counts[index];
                        const formattedCount = stat.value === 1250 ? count.toLocaleString() : count.toString();
                        
                        return (
                            <div key={index} className="stat">
                                <div className="stat-figure mb-2">
                                    <stat.icon size={46} />
                                </div>
                                <div className="stat-value font-black text-4xl md:text-6xl">
                                    {formattedCount}
                                </div>
                                <div className="stat-title font-bold text-secondary-content text-md mt-2">
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
