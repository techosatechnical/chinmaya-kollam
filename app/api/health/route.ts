import { NextResponse } from "next/server";
import { getResolvedSchoolId } from "@/lib/tenant";

export async function GET() {
  try {
    const schoolId = await getResolvedSchoolId();
    const { getAdminFirestore, isFirebaseAdminConfigured } = await import(
      "@/lib/firebase/admin"
    );
    const configured = isFirebaseAdminConfigured();

    if (!configured) {
      return NextResponse.json(
        { ok: false, schoolId, firebaseConfigured: false, error: "Firebase Admin env vars missing" },
        { status: 503 }
      );
    }

    const db = getAdminFirestore();
    const snap = schoolId ? await db.collection("schools").doc(schoolId).get() : null;
    return NextResponse.json({
      ok: true,
      schoolId,
      firebaseConfigured: true,
      schoolDocExists: snap?.exists ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
