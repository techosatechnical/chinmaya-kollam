import { TenantPageShell } from "@/components/TenantPageShell";
import { AcademicsClient, type AcademicsData } from "@/components/pages/AcademicsClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function AcademicsPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "academics-overview");
  const data = (page?.data ?? {}) as AcademicsData;

  return (
    <TenantPageShell school={school}>
      <AcademicsClient
        schoolName={school.name}
        heroImage={page?.heroImage || "/image/academics.webp"}
        data={{
          ...data,
          affiliationRegNo: data.affiliationRegNo ?? school.affiliationRegNo,
        }}
      />
    </TenantPageShell>
  );
}
