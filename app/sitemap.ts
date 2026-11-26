import type { MetadataRoute } from "next";
import { getResolvedSchoolId } from "@/lib/tenant";
import { getSchoolConfig } from "@/lib/data/school-repository";

const BASE_PATHS = [
  "/",
  "/about/overview",
  "/about/beginning",
  "/about/management",
  "/about/principal-desk",
  "/about/general-info",
  "/about/frontrunners",
  "/academics",
  "/academics/downloads",
  "/academics/news-letter",
  "/academics/news",
  "/academics/examination",
  "/academics/photo-gallery",
  "/academics/video-gallery",
  "/academics/mentors",
  "/academics/academic-planner",
  "/academics/academic-results",
  "/academics/student-council",
  "/academics/chinmaya-blossoms",
  "/academics/nep",
  "/academics/school-safety-policy",
  "/academics/child-protection-policy",
  "/activities",
  "/activities/sports",
  "/activities/scouts",
  "/activities/co-curricular",
  "/activities/karate-chess",
  "/activities/arts",
  "/facilities",
  "/facilities/library",
  "/facilities/smart-class",
  "/facilities/labs",
  "/facilities/kindergarten",
  "/facilities/sports-games",
  "/facilities/chinmaya-blossoms",
  "/accolades",
  "/innovation-hub",
  "/innovation-hub/csrs",
  "/innovation-hub/ai-robotics",
  "/innovation-hub/ai-teachers",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const schoolId = await getResolvedSchoolId();
  if (!schoolId) return [];

  const school = await getSchoolConfig(schoolId);
  if (!school || school.status !== "published") return [];

  const hidden = new Set(school.navVisibility.hiddenSubRoutes ?? []);
  const origin = `https://${school.primaryDomain}`;
  const now = new Date();

  return BASE_PATHS.filter((p) => !hidden.has(p)).map((p) => ({
    url: `${origin}${p === "/" ? "" : p}`,
    lastModified: now,
    changeFrequency: p === "/" || p === "/academics/news" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
