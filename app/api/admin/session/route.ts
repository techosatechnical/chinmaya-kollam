import { NextResponse, type NextRequest } from "next/server";
import { AdminAuthError, requireAdminFromRequest } from "@/lib/auth/admin-auth";
import { SCHOOL_IDS } from "@/lib/types/school";
import { SCHOOL_CANONICAL_HOSTS } from "@/lib/tenant-host";
import { getResolvedSchoolId } from "@/lib/tenant";

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdminFromRequest(request);
    const currentHostSchoolId = await getResolvedSchoolId();
    const accessibleIds =
      admin.role === "super_admin" ? [...SCHOOL_IDS] : admin.assignedSchoolIds;

    return NextResponse.json({
      admin,
      currentHostSchoolId,
      schools: accessibleIds.map((id) => ({
        id,
        canonicalHost: SCHOOL_CANONICAL_HOSTS[id],
      })),
    });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
