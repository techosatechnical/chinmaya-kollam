import { z } from "zod";

export const SCHOOL_IDS = [
  "kollam",
  "attukal",
  "naruvamodu",
  "kattakada",
  "kunnumpuram",
  "vazhutacaud",
] as const;

export type SchoolId = (typeof SCHOOL_IDS)[number];

export const PublishStatusSchema = z.enum(["draft", "published"]);
export type PublishStatus = z.infer<typeof PublishStatusSchema>;

export const HexColorSchema = z
  .string()
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Must be a valid hex color");

export const SchoolThemeSchema = z.object({
  primary: HexColorSchema, // e.g. #0F284A
  secondary: HexColorSchema, // e.g. #FF9924
  accent: HexColorSchema, // e.g. #FF6A00
  accentAlt: HexColorSchema, // e.g. #385EEC
  brandBlue: HexColorSchema, // e.g. #004B87
  brandBlueDeep: HexColorSchema, // e.g. #1A457B
  darkSurface: HexColorSchema, // e.g. #0B1121
  navySurface: HexColorSchema, // e.g. #02133a
  logoBadgeBg: HexColorSchema, // e.g. #DE7129
  primaryContrast: HexColorSchema.default("#ffffff"),
  secondaryContrast: HexColorSchema.default("#121214"),
  accentContrast: HexColorSchema.default("#ffffff"),
});

export type SchoolTheme = z.infer<typeof SchoolThemeSchema>;

export const NavVisibilitySchema = z.object({
  about: z.boolean().default(true),
  academics: z.boolean().default(true),
  activities: z.boolean().default(true),
  facilities: z.boolean().default(true),
  accolades: z.boolean().default(true),
  innovationHub: z.boolean().default(true),
  contact: z.boolean().default(true),
  hiddenSubRoutes: z.array(z.string()).default([]),
});

export type NavVisibility = z.infer<typeof NavVisibilitySchema>;

export const SocialLinksSchema = z.object({
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
});

export const SchoolContactSchema = z.object({
  addressLines: z.array(z.string()),
  shortLocation: z.string(),
  phone: z.string(),
  email: z.string(),
  workingHours: z.array(z.string()),
  mapEmbedUrl: z.string().optional(),
});

export const SchoolBrandingSchema = z.object({
  logoWhiteBadge: z.string(), // /logos/CV Kollam white logo.png
  logoTextWhite: z.string(), // /logos/CV Kollam text white.png
  logoDark: z.string(), // /logos/CV Kollam BLACK.png
  logoWhiteFull: z.string(), // /logos/CV Kollam WHITE.png
  tintLogoText: z.boolean().default(true),
});

export type SchoolBranding = z.infer<typeof SchoolBrandingSchema>;

export const SchoolHeroSchema = z.object({
  mediaType: z.enum(["video", "image"]).default("video"),
  mediaUrl: z.string(),
  posterUrl: z.string().optional(),
  overlayOpacity: z.number().min(0).max(0.8).default(0.1),
});

export const SchoolVisionMissionSchema = z.object({
  enabled: z.boolean().default(true),
  visionTitle: z.string().default("Our Vision"),
  visionText: z.string(),
  missionTitle: z.string().default("Our Mission"),
  missionText: z.string(),
  quotesTitle: z.string().default("Quotes from Gurudev"),
  quotesBackgroundImage: z.string().default("/image/gurudev2.jfif"),
  quotes: z.array(z.string()),
  floatingBadge: z
    .object({
      enabled: z.boolean().default(true),
      line1: z.string().default("AI &"),
      line2: z.string().default("Robotics"),
      subtitle: z.string().default("Chinmaya Science\nResearch"),
      ctaText: z.string().default("Explore"),
      href: z.string().default("/innovation-hub/ai-robotics"),
    })
    .optional(),
});

export const SchoolHistorySummarySchema = z.object({
  enabled: z.boolean().default(true),
  image: z.string(),
  imageAlt: z.string(),
  paragraphs: z.array(z.string()),
  ctaText: z.string().default("Read More"),
  ctaHref: z.string().default("/about/beginning"),
});

export const SchoolLeadershipMessageItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  name: z.string(),
  role: z.string(),
  image: z.string(),
  greeting: z.string().default("Hari Om!"),
  paragraphs: z.array(z.string()),
  highlightQuote: z.string().optional(),
});

export const SchoolCategoryLinkSchema = z.object({
  id: z.string(),
  iconName: z.string(),
  title: z.string(),
  href: z.string(),
});

export const SchoolFacilityCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  href: z.string(),
  image: z.string(),
  desc: z.string(),
});

export const SchoolSeoSchema = z.object({
  titleTemplate: z.string(),
  defaultTitle: z.string(),
  defaultDescription: z.string(),
  ogImage: z.string().optional(),
});

export const SchoolConfigSchema = z.object({
  id: z.enum(SCHOOL_IDS),
  name: z.string(),
  shortName: z.string(),
  campusName: z.string().optional(),
  affiliationLabel: z.string().optional(),
  affiliationRegNo: z.string().optional(),
  primaryDomain: z.string(),
  domains: z.array(z.string()),
  status: PublishStatusSchema,
  isDemoData: z.boolean().default(false),
  theme: SchoolThemeSchema,
  branding: SchoolBrandingSchema,
  contact: SchoolContactSchema,
  social: SocialLinksSchema,
  navVisibility: NavVisibilitySchema,
  hero: SchoolHeroSchema,
  visionMission: SchoolVisionMissionSchema,
  historySummary: SchoolHistorySummarySchema,
  leadershipMessages: z.array(SchoolLeadershipMessageItemSchema),
  categoriesSection: z.object({
    enabled: z.boolean().default(true),
    eyebrow: z.string().default("New List"),
    items: z.array(SchoolCategoryLinkSchema),
  }),
  recentNewsSection: z.object({
    enabled: z.boolean().default(true),
    eyebrow: z.string().default("Highlights"),
  }),
  testimonialsSection: z.object({
    enabled: z.boolean().default(true),
    badge: z.string().default("Our Testimonial"),
  }),
  facilitiesSection: z.object({
    enabled: z.boolean().default(true),
    badge: z.string().default("Campus Infrastructure"),
    subtitle: z.string(),
    items: z.array(SchoolFacilityCardSchema),
  }),
  footer: z.object({
    description: z.string(),
    copyrightName: z.string(),
    poweredByText: z.string().default("techosa.it"),
    poweredByUrl: z.string().default("#"),
  }),
  seo: SchoolSeoSchema,
  updatedAt: z.string().optional(),
});

export type SchoolConfig = z.infer<typeof SchoolConfigSchema>;

// Collection item schemas
export const AnnouncementItemSchema = z.object({
  id: z.string(),
  kind: z.enum(["ticker", "modal", "board"]),
  title: z.string(),
  dateLabel: z.string().optional(), // e.g. "June 5, 2026"
  image: z.string().optional(),
  alt: z.string().optional(),
  link: z.string().optional(),
  colorClass: z.string().optional(),
  order: z.number().default(0),
  status: PublishStatusSchema.default("published"),
  reviewNote: z.string().optional(),
});
export type AnnouncementItem = z.infer<typeof AnnouncementItemSchema>;

export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string().optional(),
  image: z.string(),
  badge: z.string(),
  category: z.string(),
  dateLabel: z.string(),
  link: z.string().optional(),
  featured: z.boolean().default(true),
  order: z.number().default(0),
  status: PublishStatusSchema.default("published"),
  reviewNote: z.string().optional(),
});
export type NewsItem = z.infer<typeof NewsItemSchema>;

export const PersonItemSchema = z.object({
  id: z.string(),
  kind: z.enum([
    "management-featured",
    "management-member",
    "mentor-leadership",
    "mentor-faculty",
    "frontrunner",
    "testimonial",
  ]),
  name: z.string(),
  role: z.string(),
  qualification: z.string().optional(),
  organization: z.string().optional(),
  quote: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  initials: z.string().optional(),
  order: z.number().default(0),
  status: PublishStatusSchema.default("published"),
  reviewNote: z.string().optional(),
});
export type PersonItem = z.infer<typeof PersonItemSchema>;

export const DocumentItemSchema = z.object({
  id: z.string(),
  kind: z.enum([
    "general-info",
    "academic-planner",
    "safety-policy",
    "child-protection-policy",
    "newsletter",
    "download",
  ]),
  title: z.string(),
  dateLabel: z.string().optional(),
  description: z.string().optional(),
  fileUrl: z.string(),
  coverColor: z.string().optional(),
  order: z.number().default(0),
  status: PublishStatusSchema.default("published"),
  reviewNote: z.string().optional(),
});
export type DocumentItem = z.infer<typeof DocumentItemSchema>;

export const AlbumPhotoSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.string(),
  imageUrl: z.string(),
  heightClass: z.string().default("h-80"),
  order: z.number().default(0),
  status: PublishStatusSchema.default("published"),
  reviewNote: z.string().optional(),
});
export type AlbumPhoto = z.infer<typeof AlbumPhotoSchema>;

export const VideoItemSchema = z.object({
  id: z.string(),
  youtubeId: z.string(),
  title: z.string(),
  academicYear: z.string(),
  order: z.number().default(0),
  status: PublishStatusSchema.default("published"),
});
export type VideoItem = z.infer<typeof VideoItemSchema>;

export const AccoladeItemSchema = z.object({
  id: z.string(),
  kind: z.enum(["accolade", "academic-result"]),
  title: z.string(),
  imageUrl: z.string(),
  order: z.number().default(0),
  status: PublishStatusSchema.default("published"),
});
export type AccoladeItem = z.infer<typeof AccoladeItemSchema>;

export const PageContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
  status: PublishStatusSchema.default("published"),
  data: z.record(z.string(), z.unknown()),
});
export type PageContent = z.infer<typeof PageContentSchema>;

export const ContactSubmissionSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(6).max(30).optional().or(z.literal("")),
  subject: z.string().min(1).max(80),
  message: z.string().min(5).max(3000),
});
export type ContactSubmissionInput = z.infer<typeof ContactSubmissionSchema>;

export interface AdminUserRecord {
  uid: string;
  email: string;
  displayName?: string;
  role: "super_admin" | "school_admin";
  assignedSchoolIds: SchoolId[];
  active: boolean;
}
