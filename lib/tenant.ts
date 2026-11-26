import "server-only";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { SchoolId } from "@/lib/types/school";
import {
  normalizeHostname,
  resolveSchoolIdFromHostname,
  SCHOOL_CANONICAL_HOSTS,
  SCHOOL_HOST_REGISTRY,
} from "@/lib/tenant-host";

export {
  normalizeHostname,
  resolveSchoolIdFromHostname,
  SCHOOL_CANONICAL_HOSTS,
  SCHOOL_HOST_REGISTRY,
};

/**
 * Resolves the current request's schoolId from Next.js request headers.
 * Never trusts client-supplied tenant query params or custom headers.
 */
export async function getResolvedSchoolId(): Promise<SchoolId | null> {
  const headerList = await headers();
  const host = headerList.get("host");
  return resolveSchoolIdFromHostname(host);
}

/**
 * Resolves the current request's schoolId or triggers a 404 Not Found response.
 */
export async function requireResolvedSchoolId(): Promise<SchoolId> {
  const schoolId = await getResolvedSchoolId();
  if (!schoolId) {
    notFound();
  }
  return schoolId;
}
