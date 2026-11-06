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
    name: "Kuforiji Ayobami Waris",
    position: "President",
    image: "/assets/Executives/President.jpg",
    socials: {
      whatsapp: "09167369415",
     instagram: "https://www.instagram.com/ayobami.w.k",
      twitter: "https://x.com/aw_kuforiji",
    },
  },
  {
    name: "Shanu Mariam Oluwabunmi",
    position: "Vice President",
    image: "/assets/Executives/VicePresident.jpg",
    socials: {
      whatsapp: "09030857396",
      twitter: "https://x.com/Bummie___",
      tiktok: "https://tiktok.com/@bummie____"
    },
  },
  {
    name: "Odeniyi David Dideolu",
    position: "General Secretary",
    image: "/assets/Executives/GeneralSec.jpg",
    socials: {
      whatsapp: "09130169243",
      twitter: "https://x.com/iamdideolu",
     instagram: "https://www.instagram.com/iamdideolu"
    },
  },
  {
    name: "Adelaja Elijah Omotayo",
    position: "Assistant General Secretary",
    image: "/assets/Executives/AssistantGeneralSec.jpg",
    socials: {
      whatsapp: "08051230488",
    },
  },
  {
    name: "Fiki Kehinde Elisha",
    position: "Public Relations Officer I",
    image: "/assets/Executives/PublicRelationOfficer.jpg",
    socials: {
      whatsapp: "07088832997",
      twitter: "https://x.com/GlobalREY001",
      instagram: "https://www.instagram.com/fikikehindeelisha?igsh=aWhhMzN6NGVnZXZs",
    },
  },
  {
    name: "Mustapha Ololade Firdauz",
    position: "Public Relations Officer II",
    image: "/assets/Executives/PublicRelationOfficerii.jpg",
    socials: {
      whatsapp: "07013940533",
      twitter: "x.com/Sarauniya_001",
    },
  },
  
  {
    name: "Oladejo Mary Ouwadarasimi",
    position: "Financial Secretary",
    image: "/assets/Executives/FinancialSec.jpeg",
    socials: {
      whatsapp: "07056657260",
      instagram: "https://www.instagram.com/darasdelighthub/"
    },
  },
  {
    name: "Jacobs Favour Olamilekan",
    position: "Software Director",
    image: "/assets/Executives/SoftwareDirector.jpg",
    socials: {
      whatsapp: "0121606821",
      instagram: "https://www.instagram.com/thefavourjacobs/",
      linkedin: "https://ng.linkedin.com/in/thefavourjacobs",
      twitter: "https://x.com/favour30312",
    },
  },
  {
    name: "Abdulrasheed Ayobami Ishola",
    position: "Welfare Secretary",
    image: "/assets/Executives/WelfareSec.jpg",
    socials: {
      whatsapp: "09015359742",
       tiktok: "https://www.tiktok.com/jiggy_sola",
      twitter: "https://x.com/jiggy_206",
    },
  },
  {
    name: "Ejigah Ojochenemi Oluwatosin",
    position: "Social Director",
    image: "/assets/Executives/SocialDirector.jpeg",
    socials: {
      whatsapp: "09017555275",
    },
  },
  {
    name: "Arewa Sultan Ayomide",
    position: "Sports Director",
    image: "/assets/Executives/SportDirector.png",
    socials: {
      whatsapp: "08127828846",
      instagram: "https://www.instagram.com/Surphur_gram",
    },
  },
];

export type PrincipalOfficer = Executive;

export const principalOfficers: PrincipalOfficer[] = [
  {
    name: "Rt. Hon. Akinola David Oluwamayowa (Bucknor)",
    position: "Speaker",
    image: "/assets/Principal Officers/Speaker.jpg",
    socials: {
      twitter: "https://x.com/BucknorBlaq",
      instagram: "https://www.instagram.com/Bucknorr_",
      tiktok: "https://www.tiktok.com/@Bucknor_Blaq",
    },
  },
  {
    name: "Hon. Ogunremi Oluwafunmilayo Favour (Layo)",
    position: "Deputy Speaker",
    image: "/assets/Principal Officers/DeputySpeaker.jpg",
    socials: {
      instagram: "https://www.instagram.com/Omo_arolu_owo",
      tiktok: "https://www.tiktok.com/@Omo_arolu_owo",
    },
  },
  {
    name: "Hon. Alabi Oluwasore Samuel (Sorefunmi)",
    position: "Clerk",
    image: "/assets/Principal Officers/Clerk.jpg",
    socials: {
      twitter: "https://x.com/sore_alabi",
      instagram: "https://www.instagram.com/sore_alabi",
      tiktok: "https://www.tiktok.com/@sorealabi",
    },
  },
  {
    name: "Hon. Adebayo Kabir Kayode (Salwest)",
    position: "Deputy Clerk",
    image: "/assets/Principal Officers/DeputyClerk.jpg",
    socials: {
      twitter: "https://x.com/Iamsalwest",
      instagram: "https://www.instagram.com/salwestxr",
    },
  },
];
