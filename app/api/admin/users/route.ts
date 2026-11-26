import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { AdminAuthError, requireAdminFromRequest } from "@/lib/auth/admin-auth";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase/admin";
import { SCHOOL_IDS } from "@/lib/types/school";

const AssignAdminSchema = z.object({
  email: z.string().email(),
  displayName: z.string().optional(),
  role: z.enum(["super_admin", "school_admin"]),
  assignedSchoolIds: z.array(z.enum(SCHOOL_IDS)).default([]),
  active: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdminFromRequest(request);
    if (admin.role !== "super_admin") {
      return NextResponse.json({ error: "Super admin access required." }, { status: 403 });
    }

    const db = getAdminFirestore();
    const snap = await db.collection("admins").get();
    const users = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
    return NextResponse.json({ users });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdminFromRequest(request);
    if (admin.role !== "super_admin") {
      return NextResponse.json({ error: "Super admin access required." }, { status: 403 });
    }

    const body = await request.json();
    const parsed = AssignAdminSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid admin assignment payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const auth = getAdminAuth();
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(parsed.data.email);
    } catch {
      return NextResponse.json(
        { error: "No Firebase Auth user found with that email. Create the user in Firebase Auth first." },
        { status: 404 }
      );
    }

    const db = getAdminFirestore();
    const record = {
      uid: userRecord.uid,
      email: parsed.data.email,
      displayName: parsed.data.displayName || userRecord.displayName || "",
      role: parsed.data.role,
      assignedSchoolIds:
        parsed.data.role === "super_admin" ? [...SCHOOL_IDS] : parsed.data.assignedSchoolIds,
      active: parsed.data.active,
      updatedAt: new Date().toISOString(),
    };

    await db.collection("admins").doc(userRecord.uid).set(record, { merge: true });
    return NextResponse.json({ ok: true, user: record });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
