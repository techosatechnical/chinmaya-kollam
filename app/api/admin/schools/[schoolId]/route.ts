import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { AdminAuthError, requireSchoolAdminFromRequest } from "@/lib/auth/admin-auth";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { getSchoolConfig, schoolCacheTag } from "@/lib/data/school-repository";
import { SchoolConfigSchema } from "@/lib/types/school";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ schoolId: string }> }
) {
  try {
    const { schoolId } = await context.params;
    await requireSchoolAdminFromRequest(request, schoolId);
    const config = await getSchoolConfig(schoolId as never, { includeDraft: true });
    if (!config) {
      return NextResponse.json({ error: "School record not found" }, { status: 404 });
    }
    return NextResponse.json({ config });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ schoolId: string }> }
) {
  try {
    const { schoolId } = await context.params;
    const { admin, schoolId: validSchoolId } = await requireSchoolAdminFromRequest(
      request,
      schoolId
    );

    const body = (await request.json()) as Record<string, unknown>;
    const existing = await getSchoolConfig(validSchoolId, { includeDraft: true });
    if (!existing) {
      return NextResponse.json({ error: "School record not found" }, { status: 404 });
    }

    // Only super_admin may alter domain bindings or school ID
    const sanitizedPatch = { ...body };
    delete sanitizedPatch.id;
    if (admin.role !== "super_admin") {
      delete sanitizedPatch.primaryDomain;
      delete sanitizedPatch.domains;
    }

    const merged = {
      ...existing,
      ...sanitizedPatch,
      id: validSchoolId,
      updatedAt: new Date().toISOString(),
    };

    const parsed = SchoolConfigSchema.safeParse(merged);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid school configuration", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    await db.collection("schools").doc(validSchoolId).set(parsed.data, { merge: false });

    // Invalidate ONLY this school's cache tags
    revalidateTag(schoolCacheTag(validSchoolId), "max");
    revalidateTag(schoolCacheTag(validSchoolId, "config"), "max");

    return NextResponse.json({ ok: true, config: parsed.data });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
