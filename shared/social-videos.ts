export const SOCIAL_PROFILES = {
  facebook: "https://www.facebook.com/addysrevemd/",
  instagram: "https://www.instagram.com/addysreve/",
  tiktok: "https://www.tiktok.com/@addysrevemd",
} as const;

export type SocialVideoPlacement =
  | "home"
  | "naples"
  | "insurance-accepted"
  | "primary-care"
  | "palliative-care";

const CORE_PLACEMENTS: readonly SocialVideoPlacement[] = [
  "home",
  "naples",
  "insurance-accepted",
  "primary-care",
  "palliative-care",
];

export interface SocialVideo {
  slug: string;
  title: string;
  description: string;
  language: "en" | "es";
  uploadDate: string;
  durationSeconds: number;
  thumbnailUrl: string;
  tiktokUrl: string;
  instagramUrl: string;
  placements: readonly SocialVideoPlacement[];
}

export const SOCIAL_VIDEOS: readonly SocialVideo[] = [
  {
    slug: "care-plan-for-a-sick-person",
    title: "How to create a care plan for a sick person",
    description: "Five questions that bring clarity to medications, warning signs, doctors, and emergency decisions.",
    language: "en",
    uploadDate: "2026-07-29T22:02:11Z",
    durationSeconds: 55,
    thumbnailUrl: "/images/social-videos/care-plan-for-a-sick-person.webp",
    tiktokUrl: "https://www.tiktok.com/@addysrevemd/video/7668073597205744909",
    instagramUrl: "https://www.instagram.com/addysreve/reel/DbZIuqogQ5z/",
    placements: CORE_PLACEMENTS,
  },
  {
    slug: "medical-appointment-checklist",
    title: "5 cosas que debes llevar a una cita médica",
    description: "Una lista práctica para acompañar a un adulto mayor y aprovechar mejor su próxima consulta.",
    language: "es",
    uploadDate: "2026-07-23T22:02:03Z",
    durationSeconds: 65,
    thumbnailUrl: "/images/social-videos/medical-appointment-checklist.webp",
    tiktokUrl: "https://www.tiktok.com/@addysrevemd/video/7665847025333751054",
    instagramUrl: "https://www.instagram.com/addysreve/reel/DbJr7A2CbKb/",
    placements: CORE_PLACEMENTS,
  },
  {
    slug: "hidden-symptom-in-older-adults",
    title: "The hidden fall warning sign in older adults",
    description: "Why a near-fall or a new fear of walking deserves attention before a serious accident happens.",
    language: "en",
    uploadDate: "2026-07-19T22:02:08Z",
    durationSeconds: 37,
    thumbnailUrl: "/images/social-videos/hidden-symptom-in-older-adults.webp",
    tiktokUrl: "https://www.tiktok.com/@addysrevemd/video/7664362738478550285",
    instagramUrl: "https://www.instagram.com/addysreve/reel/Da_Y38MiY2t/",
    placements: CORE_PLACEMENTS,
  },
  {
    slug: "palliative-care-vs-hospice",
    title: "Cuidados paliativos vs. hospicio",
    description: "La diferencia esencial entre dos tipos de apoyo que con frecuencia se confunden.",
    language: "es",
    uploadDate: "2026-07-17T22:01:38Z",
    durationSeconds: 66,
    thumbnailUrl: "/images/social-videos/palliative-care-vs-hospice.webp",
    tiktokUrl: "https://www.tiktok.com/@addysrevemd/video/7663620417768246542",
    instagramUrl: "https://www.instagram.com/addysreve/reel/Da6PQKNDaYN/",
    placements: CORE_PLACEMENTS,
  },
  {
    slug: "managing-aging-parents",
    title: "Managing aging parents with multiple conditions",
    description: "What to ask when your family needs one doctor to connect medications, specialists, and the overall care plan.",
    language: "en",
    uploadDate: "2026-07-15T22:01:43Z",
    durationSeconds: 34,
    thumbnailUrl: "/images/social-videos/managing-aging-parents.webp",
    tiktokUrl: "https://www.tiktok.com/@addysrevemd/video/7662878311541968141",
    instagramUrl: "https://www.instagram.com/addysreve/reel/Da1FmZ6lSev/",
    placements: CORE_PLACEMENTS,
  },
  {
    slug: "when-to-call-911",
    title: "No esperes a que llegue la ambulancia",
    description: "Señales que indican que es momento de organizar una revisión médica antes de la próxima crisis.",
    language: "es",
    uploadDate: "2026-07-11T22:02:19Z",
    durationSeconds: 41,
    thumbnailUrl: "/images/social-videos/when-to-call-911.webp",
    tiktokUrl: "https://www.tiktok.com/@addysrevemd/video/7661394118538530062",
    instagramUrl: "https://www.instagram.com/addysreve/reel/DaqyXs9FSGH/",
    placements: CORE_PLACEMENTS,
  },
] as const;

export function socialVideosFor(placement: SocialVideoPlacement): readonly SocialVideo[] {
  return SOCIAL_VIDEOS.filter((video) => video.placements.includes(placement));
}
