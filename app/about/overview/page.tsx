import { TenantPageShell } from "@/components/TenantPageShell";
import {
  AboutOverviewClient,
  type OverviewGalleryImage,
  type OverviewSectionItem,
} from "@/components/pages/AboutOverviewClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function AboutOverview() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "about-overview");
  const data = (page?.data ?? {}) as {
    sections?: OverviewSectionItem[];
    galleryImages?: OverviewGalleryImage[];
  };

  return (
    <TenantPageShell school={school}>
      <AboutOverviewClient
        schoolName={school.name}
        brandBlue={school.theme.brandBlue}
        title={page?.title || "ABOUT  US"}
        subtitle={
          page?.subtitle ||
          `Discover ${school.name}, where values meet modern education.`
        }
        heroImage={page?.heroImage || "/image/about2.webp"}
        sections={data.sections ?? []}
        galleryImages={data.galleryImages ?? []}
      />
    </TenantPageShell>
  );
}
