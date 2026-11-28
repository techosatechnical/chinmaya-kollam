import type { SchoolConfig, SchoolId, SchoolTheme } from "@/lib/types/school";
import type { SchoolSeedBundle } from "./kollam-seed";

interface OtherSchoolMeta {
  id: SchoolId;
  name: string;
  shortName: string;
  location: string;
  hostname: string;
  theme: SchoolTheme;
}

const OTHER_SCHOOLS_META: OtherSchoolMeta[] = [
  {
    id: "attukal",
    name: "Chinmaya Vidyalaya Attukal",
    shortName: "CV Attukal",
    location: "Attukal, Thiruvananthapuram",
    hostname: "chinmaya-vidyalaya-attukal.vercel.app",
    theme: {
      primary: "#1B3B2B",
      secondary: "#E68A00",
      accent: "#D95D1E",
      accentAlt: "#2E7D5B",
      brandBlue: "#1B4D3E",
      brandBlueDeep: "#143A2F",
      darkSurface: "#0D1B14",
      navySurface: "#10281D",
      logoBadgeBg: "#D95D1E",
      primaryContrast: "#ffffff",
      secondaryContrast: "#121214",
      accentContrast: "#ffffff",
    },
  },
  {
    id: "naruvamodu",
    name: "Chinmaya Vidyalaya Naruvamodu",
    shortName: "CV Naruvamodu",
    location: "Naruvamodu, Thiruvananthapuram",
    hostname: "chinmaya-naruvamodu.vercel.app",
    theme: {
      primary: "#3B1F47",
      secondary: "#F59E0B",
      accent: "#C026D3",
      accentAlt: "#6D28D9",
      brandBlue: "#4C1D95",
      brandBlueDeep: "#3B0764",
      darkSurface: "#180B24",
      navySurface: "#261136",
      logoBadgeBg: "#A21CAF",
      primaryContrast: "#ffffff",
      secondaryContrast: "#121214",
      accentContrast: "#ffffff",
    },
  },
  {
    id: "kattakada",
    name: "Chinmaya Vidyalaya Kattakada",
    shortName: "CV Kattakada",
    location: "Kattakada, Thiruvananthapuram",
    hostname: "chinmaya-kattakada.vercel.app",
    theme: {
      primary: "#4A1D1F",
      secondary: "#F59E0B",
      accent: "#DC2626",
      accentAlt: "#B45309",
      brandBlue: "#7F1D1D",
      brandBlueDeep: "#5C1414",
      darkSurface: "#1A0B0C",
      navySurface: "#2D1113",
      logoBadgeBg: "#B91C1C",
      primaryContrast: "#ffffff",
      secondaryContrast: "#121214",
      accentContrast: "#ffffff",
    },
  },
  {
    id: "kunnumpuram",
    name: "Chinmaya Vidyalaya Kunnumpuram",
    shortName: "CV Kunnumpuram",
    location: "Kunnumpuram, Thiruvananthapuram",
    hostname: "chinmaya-kunnumpuram.vercel.app",
    theme: {
      primary: "#0F3D4C",
      secondary: "#F97316",
      accent: "#0D9488",
      accentAlt: "#0284C7",
      brandBlue: "#115E59",
      brandBlueDeep: "#134E4A",
      darkSurface: "#081C24",
      navySurface: "#0C2B36",
      logoBadgeBg: "#0F766E",
      primaryContrast: "#ffffff",
      secondaryContrast: "#121214",
      accentContrast: "#ffffff",
    },
  },
  {
    id: "vazhutacaud",
    name: "Chinmaya Vidyalaya Vazhutacaud",
    shortName: "CV Vazhutacaud",
    location: "Vazhutacaud, Thiruvananthapuram",
    hostname: "chinmaya-vazhutacaud.vercel.app",
    theme: {
      primary: "#1E293B",
      secondary: "#EAB308",
      accent: "#EA580C",
      accentAlt: "#2563EB",
      brandBlue: "#1D4ED8",
      brandBlueDeep: "#1E3A8A",
      darkSurface: "#0F172A",
      navySurface: "#172554",
      logoBadgeBg: "#C2410C",
      primaryContrast: "#ffffff",
      secondaryContrast: "#121214",
      accentContrast: "#ffffff",
    },
  },
];

export function buildUnpublishedSchoolBundle(meta: OtherSchoolMeta): SchoolSeedBundle {
  const config: SchoolConfig = {
    id: meta.id,
    name: meta.name,
    shortName: meta.shortName,
    campusName: meta.location,
    affiliationLabel: "Central Board of Secondary Education",
    affiliationRegNo: "",
    primaryDomain: meta.hostname,
    domains: [meta.hostname],
    status: "draft",
    isDemoData: true,
    theme: meta.theme,
    branding: {
      logoWhiteBadge: "/logos/CV Kollam white logo.png",
      logoTextWhite: "",
      logoDark: "",
      logoWhiteFull: "",
      tintLogoText: false,
    },
    contact: {
      addressLines: [meta.name, meta.location],
      shortLocation: meta.location,
      phone: "",
      email: "",
      workingHours: ["Monday - Saturday", "8:30 AM - 4:00 PM"],
      mapEmbedUrl: "",
    },
    social: {},
    navVisibility: {
      about: true,
      academics: true,
      activities: true,
      facilities: true,
      accolades: true,
      innovationHub: false,
      contact: true,
      hiddenSubRoutes: [],
    },
    hero: {
      mediaType: "image",
      mediaUrl: "/image/about2.webp",
      overlayOpacity: 0.25,
    },
    visionMission: {
      enabled: true,
      visionTitle: "Our Vision",
      visionText: `[Development Demo] ${meta.name} nurtures academic excellence, character, and holistic growth in alignment with the Chinmaya Vision Programme.`,
      missionTitle: "Our Mission",
      missionText: `[Development Demo] ${meta.name} is committed to empowering students intellectually, emotionally, socially, physically, and spiritually.`,
      quotesTitle: "Quotes from Gurudev",
      quotesBackgroundImage: "/image/gurudev2.jfif",
      quotes: [
        "What you have is all His Gift to you. What you do with what you have is your Gift to Him ...",
      ],
      floatingBadge: {
        enabled: false,
        line1: "AI &",
        line2: "Robotics",
        subtitle: "Innovation",
        ctaText: "Explore",
        href: "/innovation-hub/ai-robotics",
      },
    },
    historySummary: {
      enabled: true,
      image: "/image/about3.webp",
      imageAlt: `${meta.name} Campus`,
      paragraphs: [
        `[Development Demo] Welcome to ${meta.name}, ${meta.location}. Official campus history and milestones will be published by the school administrator.`,
      ],
      ctaText: "Read More",
      ctaHref: "/about/beginning",
    },
    leadershipMessages: [],
    categoriesSection: {
      enabled: true,
      eyebrow: "New List",
      items: [
        { id: "planner", iconName: "CalendarDays", title: "Academic Planner", href: "/academics/academic-planner" },
        { id: "results", iconName: "Award", title: "Academic Results", href: "/academics/academic-results" },
        { id: "mentors", iconName: "Users", title: "Mentors", href: "/academics/mentors" },
        { id: "cocurricular", iconName: "Activity", title: "Co Curricular Activities", href: "/activities/co-curricular" },
        { id: "council", iconName: "Megaphone", title: "Student Council", href: "/academics/student-council" },
        { id: "scouts", iconName: "Compass", title: "Scouts & Guides", href: "/activities/scouts" },
        { id: "sports", iconName: "Trophy", title: "Sports", href: "/activities/sports" },
        { id: "arts", iconName: "Music", title: "Arts & Culture", href: "/activities/arts" },
      ],
    },
    recentNewsSection: {
      enabled: false,
      eyebrow: "Highlights",
    },
    testimonialsSection: {
      enabled: false,
      badge: "Our Testimonial",
    },
    facilitiesSection: {
      enabled: true,
      badge: "Campus Infrastructure",
      subtitle: `We provide state-of-the-art facilities at ${meta.name} to ensure a comprehensive and holistic educational environment for all our students.`,
      items: [
        {
          id: "library",
          title: "Library",
          href: "/facilities/library",
          image: "/facilities/library.jpg",
          desc: "A vast collection of books, journals, and digital resources to inspire a love for reading.",
        },
        {
          id: "smart-class",
          title: "Smart Class",
          href: "/facilities/smart-class",
          image: "/facilities/smart class.jpg",
          desc: "Interactive digital boards and multimedia content for an engaging learning experience.",
        },
        {
          id: "labs",
          title: "Labs",
          href: "/facilities/labs",
          image: "/facilities/chem lab.jpeg",
          desc: "Well-equipped science and computer labs for practical, hands-on experiments.",
        },
        {
          id: "kindergarten",
          title: "KinderGarten",
          href: "/facilities/kindergarten",
          image: "/facilities/kindergarden.jpg",
          desc: "A nurturing and playful environment specifically designed for our youngest learners.",
        },
        {
          id: "sports-games",
          title: "Sports & Games",
          href: "/facilities/sports-games",
          image: "/facilities/sportsday.jpg",
          desc: "Extensive sports facilities encouraging physical fitness, teamwork, and healthy competition.",
        },
        {
          id: "chinmaya-blossoms",
          title: "Chinmaya Blossoms",
          href: "/facilities/chinmaya-blossoms",
          image: "/facilities/pre kg.jpg",
          desc: "A specialized Pre-KG program focusing on early childhood development and care.",
        },
      ],
    },
    footer: {
      description: `${meta.name} — fostering holistic development and academic excellence.`,
      copyrightName: meta.name,
      poweredByText: "techosa.it",
      poweredByUrl: "#",
    },
    seo: {
      titleTemplate: `%s | ${meta.name}`,
      defaultTitle: meta.name,
      defaultDescription: `Official website of ${meta.name}, ${meta.location}.`,
    },
  };

  return {
    config,
    announcements: [
      {
        id: "demo-ticker-1",
        kind: "ticker",
        title: `[Demo] Welcome to ${meta.name}`,
        colorClass: "text-emerald-400",
        order: 1,
        status: "draft",
        reviewNote: "Development-only placeholder; replace before publishing.",
      },
    ],
    news: [],
    people: [],
    documents: [],
    albums: [],
    videos: [],
    accolades: [],
    pages: [],
  };
}

export const OTHER_SCHOOLS_BUNDLES: Record<Exclude<SchoolId, "kollam">, SchoolSeedBundle> = {
  attukal: buildUnpublishedSchoolBundle(OTHER_SCHOOLS_META[0]),
  naruvamodu: buildUnpublishedSchoolBundle(OTHER_SCHOOLS_META[1]),
  kattakada: buildUnpublishedSchoolBundle(OTHER_SCHOOLS_META[2]),
  kunnumpuram: buildUnpublishedSchoolBundle(OTHER_SCHOOLS_META[3]),
  vazhutacaud: buildUnpublishedSchoolBundle(OTHER_SCHOOLS_META[4]),
};

export function getSeedBundleForSchool(schoolId: SchoolId): SchoolSeedBundle | null {
  if (schoolId === "kollam") return null; // Imported from kollam-seed.ts to keep separation explicit
  return OTHER_SCHOOLS_BUNDLES[schoolId] ?? null;
}
