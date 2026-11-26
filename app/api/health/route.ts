import { NextResponse } from "next/server";
import { getResolvedSchoolId } from "@/lib/tenant";
import { getAdminFirestore, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export async function GET() {
  const schoolId = await getResolvedSchoolId();
  const configured = isFirebaseAdminConfigured();

  if (!configured) {
    return NextResponse.json(
      { ok: false, schoolId, firebaseConfigured: false, error: "Firebase Admin env vars missing" },
      { status: 503 }
    );
  }

  try {
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
        schoolId,
        firebaseConfigured: true,
        error: err instanceof Error ? err.message : "Unknown Firestore error",
      },
      { status: 500 }
    );
  }
}
