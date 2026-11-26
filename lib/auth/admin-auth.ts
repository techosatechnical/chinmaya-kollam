import "server-only";
import type { NextRequest } from "next/server";
import { getAdminAuth, getAdminFirestore, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { SCHOOL_IDS, type AdminUserRecord, type SchoolId } from "@/lib/types/school";

export function isValidSchoolId(value: string): value is SchoolId {
  return (SCHOOL_IDS as readonly string[]).includes(value);
}

export function canAdminManageSchool(admin: AdminUserRecord, schoolId: SchoolId): boolean {
  if (!admin.active) return false;
  if (admin.role === "super_admin") return true;
  return admin.assignedSchoolIds.includes(schoolId);
}

export class AdminAuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function requireAdminFromRequest(request: NextRequest): Promise<AdminUserRecord> {
  if (!isFirebaseAdminConfigured()) {
    throw new AdminAuthError("Firebase Admin is not configured on the server.", 503);
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AdminAuthError("Missing Bearer authorization token.", 401);
  }

  const idToken = authHeader.slice("Bearer ".length).trim();
  if (!idToken) {
    throw new AdminAuthError("Empty authorization token.", 401);
  }

  let decoded;
  try {
    decoded = await getAdminAuth().verifyIdToken(idToken);
  } catch {
    throw new AdminAuthError("Invalid or expired authentication token.", 401);
  }

  const db = getAdminFirestore();
  const snap = await db.collection("admins").doc(decoded.uid).get();
  if (!snap.exists) {
    throw new AdminAuthError("User is not registered as an administrator.", 403);
  }

  const data = snap.data() as Partial<AdminUserRecord>;
  const adminRecord: AdminUserRecord = {
    uid: decoded.uid,
    email: data.email || decoded.email || "",
    displayName: data.displayName || decoded.name || "",
    role: data.role === "super_admin" ? "super_admin" : "school_admin",
    assignedSchoolIds: Array.isArray(data.assignedSchoolIds)
      ? data.assignedSchoolIds.filter((id): id is SchoolId => isValidSchoolId(String(id)))
      : [],
    active: data.active === true,
  };

  if (!adminRecord.active) {
    throw new AdminAuthError("Administrator account is inactive.", 403);
  }

  return adminRecord;
}

export async function requireSchoolAdminFromRequest(
  request: NextRequest,
  rawSchoolId: string
): Promise<{ admin: AdminUserRecord; schoolId: SchoolId }> {
  if (!isValidSchoolId(rawSchoolId)) {
    throw new AdminAuthError("Unknown school ID.", 404);
  }
  const admin = await requireAdminFromRequest(request);
  if (!canAdminManageSchool(admin, rawSchoolId)) {
    throw new AdminAuthError("Forbidden: you do not have access to this school.", 403);
  }
  return { admin, schoolId: rawSchoolId };
}
