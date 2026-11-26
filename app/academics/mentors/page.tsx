import { TenantPageShell } from "@/components/TenantPageShell";
import { MentorsClient } from "@/components/pages/MentorsClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPeople } from "@/lib/data/school-repository";

export default async function MentorsPage() {
  const school = await requireActiveSchool();
  const people = await getSchoolPeople(school.id, ["mentor-leadership", "mentor-faculty"]);
  const leadership = people.filter((p) => p.kind === "mentor-leadership");
  const teachers = people.filter((p) => p.kind === "mentor-faculty");

  return (
    <TenantPageShell school={school} className="min-h-screen bg-slate-50">
      <MentorsClient schoolName={school.name} leadership={leadership} teachers={teachers} />
    </TenantPageShell>
  );
}
