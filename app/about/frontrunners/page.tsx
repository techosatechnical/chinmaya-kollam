import { TenantPageShell } from "@/components/TenantPageShell";
import { FrontrunnersClient } from "@/components/pages/FrontrunnersClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPeople } from "@/lib/data/school-repository";

export default async function FrontrunnersPage() {
  const school = await requireActiveSchool();
  const items = await getSchoolPeople(school.id, ["frontrunner"]);

  return (
    <TenantPageShell school={school}>
      <FrontrunnersClient schoolName={school.name} items={items} />
    </TenantPageShell>
  );
}
