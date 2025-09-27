import { Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

interface Executive {
    name: string;
    position: string;
    image: string;
    socials?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
    };
}

export default function Executives() {
    const executives: Executive[] = [
        {
            name: "Sanni Nurudeen Akorede",
            position: "President",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Oyebanji Aminat Oluwatobi",
            position: "Vice President",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Shittu Ayomide Ebunoluwa",
            position: "General Secretary",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Oguntuwase Oluwafemi Joseph",
            position: "Assistant General Secretary",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
            },
        },
        {
            name: "Kuforiji Ayobami Waris",
            position: "Public Relations Officer",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Shanu Mariam Oluwabunmi",
            position: "Financial Secretary",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Shittu Fareedah Adedamola",
            position: "Welfare Secretary",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Akinleye Akinjuwon Olushola",
            position: "Social Director",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Ashaolu Michael Oluwatoni",
            position: "Sports Director",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
        {
            name: "Ikeh Chidiebere Franklin",
            position: "Software Director",
            image: "https://img.daisyui.com/images/stock/daisyui-hat-1.webp",
            socials: {
                facebook: "https://facebook.com",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com",
            },
        },
    ];
    return (
        <div className="py-16 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                        Meet Our{" "}
                        <span className="text-primary">Executives</span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Get to know the dedicated team leading CISSA towards
                        excellence
                    </p>
                </div>

                <div className="carousel carousel-center w-full p-4 space-x-4 rounded-box">
                    {executives.map((executive, index) => (
                        <div
                            key={index}
                            className="carousel-item w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
                        >
                            <div className="card bg-base-100 shadow-lg w-full">
                                <figure className="px-4 pt-4 relative h-64">
                                    <Image
                                        src={executive.image}
                                        alt={executive.name}
                                        fill
                                        className="rounded-xl object-cover"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h3 className="card-title font-bold">
                                        {executive.name}
                                    </h3>
                                    <p className="text-base-content/70">
                                        {executive.position}
                                    </p>
                                    <div className="flex gap-4 mt-2">
                                        {executive.socials?.facebook && (
                                            <a
                                                href={
                                                    executive.socials.facebook
                                                }
                                                className="text-primary hover:text-primary/80"
                                            >
                                                <Facebook size={20} />
                                            </a>
                                        )}
                                        {executive.socials?.twitter && (
                                            <a
                                                href={executive.socials.twitter}
                                                className="text-primary hover:text-primary/80"
                                            >
                                                <Twitter size={20} />
                                            </a>
                                        )}
                                        {executive.socials?.linkedin && (
                                            <a
                                                href={
                                                    executive.socials.linkedin
                                                }
                                                className="text-primary hover:text-primary/80"
                                            >
                                                <Linkedin size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
