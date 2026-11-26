import "server-only";
import { notFound } from "next/navigation";
import { requireResolvedSchoolId } from "@/lib/tenant";
import { getSchoolConfig } from "@/lib/data/school-repository";
import type { SchoolConfig } from "@/lib/types/school";

export async function requireActiveSchool(): Promise<SchoolConfig> {
  const schoolId = await requireResolvedSchoolId();
  const school = await getSchoolConfig(schoolId);
  if (!school) {
    notFound();
  }
  return school;
}
