export interface Executive {
  name: string;
  position: string;
  image: string;
  socials?: {
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const executives: Executive[] = [
  {
    name: "Sanni Nurudeen Akorede",
    position: "President",
    image: "/assets/Executives/President.jpg",
    socials: {
      whatsapp: undefined,
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Oyebanji Aminat Oluwatobi",
    position: "Vice President",
    image: "/assets/Executives/VicePresident.jpg",
    socials: {
      whatsapp: undefined,
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Shittu Ayomide Ebunoluwa",
    position: "General Secretary",
    image: "/assets/Executives/GeneralSec.jpg",
    socials: {
      whatsapp: undefined,
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Oguntuwase Oluwafemi Joseph",
    position: "Assistant General Secretary",
    image: "/assets/Executives/AssistantGeneralSec.jpg",
    socials: {
      whatsapp: undefined,
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Kuforiji Ayobami Waris",
    position: "Public Relations Officer",
    image: "/assets/Executives/PublicRelationOfficer.jpg",
    socials: {
      whatsapp: undefined,
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Shanu Mariam Oluwabunmi",
    position: "Financial Secretary",
    image: "/assets/Executives/FinancialSec.jpeg",
    socials: {
      whatsapp: undefined,
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Shittu Fareedah Adedamola",
    position: "Welfare Secretary",
    image: "/assets/Executives/WelfareSec.jpg",
    socials: {
      whatsapp: undefined,
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Akinleye Akinjuwon Olushola",
    position: "Social Director",
    image: "/assets/Executives/SocialDirector.jpg",
    socials: {
      whatsapp: undefined,
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Ashaolu Michael Oluwatoni",
    position: "Sports Director",
    image: "/assets/Executives/SportsDirector.jpg",
    socials: {
      whatsapp: undefined,
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Ikeh Chidiebere Franklin",
    position: "Software Director",
    image: "/assets/Executives/SoftwareDirector.jpg",
    socials: {
      whatsapp: undefined,
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
];