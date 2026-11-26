import type { ReactNode } from "react";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolAnnouncements } from "@/lib/data/school-repository";
import type { SchoolConfig } from "@/lib/types/school";

interface TenantPageShellProps {
  school?: SchoolConfig;
  children: ReactNode;
  className?: string;
}

export async function TenantPageShell({
  school: providedSchool,
  children,
  className = "min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white",
}: TenantPageShellProps) {
  const school = providedSchool ?? (await requireActiveSchool());
  const tickerItems = await getSchoolAnnouncements(school.id, "ticker");

  return (
    <main className={className}>
      <TopBar items={tickerItems} />
      <Navbar
        schoolName={school.name}
        shortName={school.shortName}
        branding={school.branding}
        navVisibility={school.navVisibility}
      />
      {children}
      <Footer school={school} />
    </main>
  );
}
