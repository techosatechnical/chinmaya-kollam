import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { isValidSchoolId } from "@/lib/auth/admin-auth";
import { schoolCacheTag } from "@/lib/data/school-repository";

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    schoolId?: string;
    scope?: string;
  };

  if (!body.schoolId || !isValidSchoolId(body.schoolId)) {
    return NextResponse.json({ error: "Invalid schoolId" }, { status: 400 });
  }

  revalidateTag(schoolCacheTag(body.schoolId), "max");
  if (body.scope) {
    revalidateTag(schoolCacheTag(body.schoolId, body.scope), "max");
  }

  return NextResponse.json({ revalidated: true, schoolId: body.schoolId });
}
