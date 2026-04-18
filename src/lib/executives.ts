export interface Executive {
  name: string;
  position: string;
  image: string;
  socials?: {
    whatsapp?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
    snapchat?: string;
  };
}

export const executives: Executive[] = [
  {
    name: "Sanni Nurudeen Akorede",
    position: "President",
    image: "/assets/Executives/President.jpg",
    socials: {
      whatsapp: "09152349887",
      twitter: "https://x.com/dreal_nurudeen",
      linkedin: "http://www.linkedin.com/in/sanni-nurudeen-akorede",
    },
  },
  {
    name: "Oyebanji Aminat Oluwatobi",
    position: "Vice President",
    image: "/assets/Executives/VicePresident.jpg",
    socials: {
      whatsapp: "09096981054",
      twitter: "https://x.com/_hermyheenat",
      linkedin: "https://www.linkedin.com/in/aminat-oyebanji-2b99a330b",
    },
  },
  {
    name: "Shittu Ayomide Ebunoluwa",
    position: "General Secretary",
    image: "/assets/Executives/GeneralSec.jpg",
    socials: {
      whatsapp: "08084070943",
      tiktok: "https://www.tiktok.com/@ebun1277",
      snapchat: "https://snapchat.com/t/v4y9LXbO"
    },
  },
  {
    name: "Oguntuwase Oluwafemi Joseph",
    position: "Assistant General Secretary",
    image: "/assets/Executives/AssistantGeneralSec.jpg",
    socials: {
      whatsapp: "07034972272",
      instagram: "https://www.instagram.com/oluwafemi31_",
      twitter: "https://x.com/theoluwafemi_",
    },
  },
  {
    name: "Kuforiji Ayobami Waris",
    position: "Public Relations Officer",
    image: "/assets/Executives/PublicRelationOfficer.jpg",
    socials: {
      whatsapp: "09167369415",
      instagram: "https://www.instagram.com/ayobami.w.k",
      twitter: "https://x.com/aw_kuforiji",
    },
  },
  {
    name: "Shanu Mariam Oluwabunmi",
    position: "Financial Secretary",
    image: "/assets/Executives/FinancialSec.jpeg",
    socials: {
      whatsapp: "09030857396",
      twitter: "https://x.com/Bummie___",
      tiktok: "https://tiktok.com/@bummie____"
    },
  },
  {
    name: "Shittu Fareedah Adedamola",
    position: "Welfare Secretary",
    image: "/assets/Executives/WelfareSec.jpg",
    socials: {
      whatsapp: "09134434959",
    },
  },
  {
    name: "Akinleye Akinjuwon Olushola",
    position: "Social Director",
    image: "/assets/Executives/SocialDirector.jpg",
    socials: {
      whatsapp: "08073617300",
      twitter: "https://x.com/irregularstilez",
      instagram: "https://www.instagram.com/clicksbystilez"
    },
  },
  {
    name: "Ashaolu Michael Oluwatoni",
    position: "Sports Director",
    image: "/assets/Executives/SportsDirector.jpg",
    socials: {
      whatsapp: "07010635009",
      instagram: "https://www.instagram.com/ashaolu.micheal",
      twitter: "https://x.com/Toni2kul",
    },
  },
  {
    name: "Ikeh Chidiebere Franklin",
    position: "Software Director",
    image: "/assets/Executives/SoftwareDirector.jpg",
    socials: {
      whatsapp: "09079016973",
      twitter: "https://x.com/builtbyfranklin",
      linkedin: "https://www.linkedin.com/in/franklin-ikeh",
    },
  },
];