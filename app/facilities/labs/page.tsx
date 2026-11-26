import { TenantPageShell } from "@/components/TenantPageShell";
import { LabsClient, type LabItem } from "@/components/pages/LabsClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function LabsPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "facilities-labs");
  const labs = (page?.data?.labs as LabItem[] | undefined) ?? [];

  return (
    <TenantPageShell school={school}>
      <LabsClient
        schoolName={school.name}
        heroImage={page?.heroImage || "/facilities/chem lab.jpeg"}
        labs={labs}
      />
    </TenantPageShell>
  );
}
