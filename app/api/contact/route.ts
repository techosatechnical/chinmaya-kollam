import { NextResponse, type NextRequest } from "next/server";
import { getResolvedSchoolId } from "@/lib/tenant";
import { getAdminFirestore, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { ContactSubmissionSchema } from "@/lib/types/school";

// Simple in-memory per-instance rate limit (per IP, 5 requests per 10 minutes)
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const schoolId = await getResolvedSchoolId();
  if (!schoolId) {
    return NextResponse.json({ error: "Unknown school domain" }, { status: 404 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(`${schoolId}:${ip}`)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  // Honeypot field check
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).trim() !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = ContactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  if (!isFirebaseAdminConfigured()) {
    // In local dev without Firebase configured, acknowledge cleanly without persisting
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, mode: "dev-noop" });
    }
    return NextResponse.json(
      { error: "Submission service is temporarily unavailable." },
      { status: 503 }
    );
  }

  const db = getAdminFirestore();
  await db
    .collection("schools")
    .doc(schoolId)
    .collection("submissions")
    .add({
      ...parsed.data,
      schoolId,
      status: "new",
      createdAt: new Date().toISOString(),
    });

  return NextResponse.json({ ok: true });
}
