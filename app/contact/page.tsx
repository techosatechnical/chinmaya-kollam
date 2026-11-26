import { TenantPageShell } from "@/components/TenantPageShell";
import { ContactClient } from "@/components/pages/ContactClient";
import { requireActiveSchool } from "@/lib/data/get-active-school";

export default async function ContactPage() {
  const school = await requireActiveSchool();
  return (
    <TenantPageShell school={school} className="min-h-screen bg-slate-50 flex flex-col">
      <ContactClient contact={school.contact} />
    </TenantPageShell>
  );
}
