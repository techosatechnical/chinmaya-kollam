import { TenantPageShell } from "@/components/TenantPageShell";
import {
  AboutBeginningClient,
  type BeginningData,
} from "@/components/pages/AboutBeginningClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function BeginningPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "about-beginning");
  const data = (page?.data ?? {}) as BeginningData;

  return (
    <TenantPageShell school={school}>
      <AboutBeginningClient
        schoolName={school.name}
        navyColor={school.theme.navySurface}
        title={page?.title || "ORIGIN"}
        subtitle={
          page?.subtitle ||
          `The journey and founding milestones of ${school.name}.`
        }
        heroImage={page?.heroImage || "/image/about2.webp"}
        data={data}
      />
    </TenantPageShell>
  );
}
