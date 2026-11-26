import { TenantPageShell } from "@/components/TenantPageShell";
import { ManagementClient } from "@/components/pages/ManagementClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPeople } from "@/lib/data/school-repository";

export default async function ManagementPage() {
  const school = await requireActiveSchool();
  const people = await getSchoolPeople(school.id, ["management-featured", "management-member"]);
  const featured = people.filter((p) => p.kind === "management-featured");
  const members = people.filter((p) => p.kind === "management-member");

  return (
    <TenantPageShell school={school}>
      <ManagementClient
        schoolName={school.name}
        campusLabel={school.campusName || school.name}
        navyColor={school.theme.navySurface}
        featured={featured}
        members={members}
      />
    </TenantPageShell>
  );
}
