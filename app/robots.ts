import type { MetadataRoute } from "next";
import { getResolvedSchoolId } from "@/lib/tenant";
import { getSchoolConfig } from "@/lib/data/school-repository";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const schoolId = await getResolvedSchoolId();
  const school = schoolId ? await getSchoolConfig(schoolId) : null;

  if (!school || school.status !== "published") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `https://${school.primaryDomain}/sitemap.xml`,
  };
}
