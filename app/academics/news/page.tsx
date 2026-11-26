import { TenantPageShell } from "@/components/TenantPageShell";
import { NewsClient } from "@/components/pages/NewsClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolNews } from "@/lib/data/school-repository";

export default async function NewsPage() {
  const school = await requireActiveSchool();
  const items = await getSchoolNews(school.id);

  return (
    <TenantPageShell school={school} className="min-h-screen bg-slate-50 flex flex-col">
      <NewsClient schoolName={school.name} items={items} />
    </TenantPageShell>
  );
}
