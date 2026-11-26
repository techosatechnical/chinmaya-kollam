import { SCHOOL_IDS, type SchoolId } from "@/lib/types/school";

export interface SchoolHostEntry {
  schoolId: SchoolId;
  canonicalHost: string;
  displayName: string;
}

/**
 * Authoritative hostname-to-school-ID registry.
 * Preserve exact hostnames from project requirements.
 */
export const SCHOOL_HOST_REGISTRY: Record<string, SchoolHostEntry> = {
  "chinmaya-kollam.vercel.app": {
    schoolId: "kollam",
    canonicalHost: "chinmaya-kollam.vercel.app",
    displayName: "Chinmaya Vidyalaya Kollam",
  },
  "chinmaya-vidyalaya-attukal.vercel.app": {
    schoolId: "attukal",
    canonicalHost: "chinmaya-vidyalaya-attukal.vercel.app",
    displayName: "Chinmaya Vidyalaya Attukal",
  },
  "chinmaya-naruvamodu.vercel.app": {
    schoolId: "naruvamodu",
    canonicalHost: "chinmaya-naruvamodu.vercel.app",
    displayName: "Chinmaya Vidyalaya Naruvamodu",
  },
  "chinmaya-kattakada.vercel.app": {
    schoolId: "kattakada",
    canonicalHost: "chinmaya-kattakada.vercel.app",
    displayName: "Chinmaya Vidyalaya Kattakada",
  },
  "chinmaya-kunnumpuram.vercel.app": {
    schoolId: "kunnumpuram",
    canonicalHost: "chinmaya-kunnumpuram.vercel.app",
    displayName: "Chinmaya Vidyalaya Kunnumpuram",
  },
  "chinmaya-vazhutacaud.vercel.app": {
    schoolId: "vazhutacaud",
    canonicalHost: "chinmaya-vazhutacaud.vercel.app",
    displayName: "Chinmaya Vidyalaya Vazhutacaud",
  },
};

export const SCHOOL_CANONICAL_HOSTS: Record<SchoolId, string> = {
  kollam: "chinmaya-kollam.vercel.app",
  attukal: "chinmaya-vidyalaya-attukal.vercel.app",
  naruvamodu: "chinmaya-naruvamodu.vercel.app",
  kattakada: "chinmaya-kattakada.vercel.app",
  kunnumpuram: "chinmaya-kunnumpuram.vercel.app",
  vazhutacaud: "chinmaya-vazhutacaud.vercel.app",
};

/**
 * Normalizes a Host header value by trimming, lowercasing, and stripping port.
 */
export function normalizeHostname(rawHost: string | null | undefined): string {
  if (!rawHost) return "";
  const first = rawHost.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("[")) {
    const endBracket = first.indexOf("]");
    return endBracket !== -1 ? first.slice(0, endBracket + 1) : first;
  }
  return first.replace(/:\d+$/, "");
}

function isSchoolId(value: string): value is SchoolId {
  return (SCHOOL_IDS as readonly string[]).includes(value);
}

/**
 * Pure hostname-to-schoolId resolver.
 * - Never falls back to Kollam for unknown production hosts.
 * - In non-production, supports `<schoolId>.localhost` and `<schoolId>.local`
 *   as well as bare `localhost` / `127.0.0.1` via DEV_DEFAULT_SCHOOL_ID.
 */
export function resolveSchoolIdFromHostname(
  rawHost: string | null | undefined,
  options?: {
    isDev?: boolean;
    devDefaultSchoolId?: string;
    deploymentSchoolId?: string;
  }
): SchoolId | null {
  const host = normalizeHostname(rawHost);
  if (!host) return null;

  const exact = SCHOOL_HOST_REGISTRY[host];
  if (exact) {
    return exact.schoolId;
  }

  const isDev = options?.isDev ?? process.env.NODE_ENV !== "production";
  if (isDev) {
    for (const id of SCHOOL_IDS) {
      if (
        host === `${id}.localhost` ||
        host === `chinmaya-${id}.localhost` ||
        host === `${id}.local` ||
        host === `chinmaya-${id}.local`
      ) {
        return id;
      }
    }

    if (host === "localhost" || host === "127.0.0.1") {
      const devDefault =
        options?.devDefaultSchoolId ?? process.env.DEV_DEFAULT_SCHOOL_ID ?? "kollam";
      if (isSchoolId(devDefault)) {
        return devDefault;
      }
    }
  }

  const deploymentSchoolId = options?.deploymentSchoolId ?? process.env.DEPLOYMENT_SCHOOL_ID;
  if (
    deploymentSchoolId &&
    isSchoolId(deploymentSchoolId) &&
    host.endsWith(".vercel.app") &&
    (host.startsWith(`chinmaya-${deploymentSchoolId}-`) ||
      host.startsWith(`chinmaya-vidyalaya-${deploymentSchoolId}-`))
  ) {
    return deploymentSchoolId;
  }

  return null;
}
