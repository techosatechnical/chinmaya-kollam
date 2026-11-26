import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { AdminAuthError, requireSchoolAdminFromRequest } from "@/lib/auth/admin-auth";
import { getAdminFirestore } from "@/lib/firebase/admin";
import { schoolCacheTag } from "@/lib/data/school-repository";
import {
  AccoladeItemSchema,
  AlbumPhotoSchema,
  AnnouncementItemSchema,
  DocumentItemSchema,
  NewsItemSchema,
  PageContentSchema,
  PersonItemSchema,
  VideoItemSchema,
} from "@/lib/types/school";

const COLLECTION_SCHEMAS = {
  announcements: AnnouncementItemSchema,
  news: NewsItemSchema,
  people: PersonItemSchema,
  documents: DocumentItemSchema,
  albums: AlbumPhotoSchema,
  videos: VideoItemSchema,
  accolades: AccoladeItemSchema,
  pages: PageContentSchema,
} as const;

type AllowedCollection = keyof typeof COLLECTION_SCHEMAS;

function isAllowedCollection(name: string | null): name is AllowedCollection {
  return Boolean(name && name in COLLECTION_SCHEMAS);
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ schoolId: string }> }
) {
  try {
    const { schoolId } = await context.params;
    const { schoolId: validSchoolId } = await requireSchoolAdminFromRequest(request, schoolId);
    const collection = request.nextUrl.searchParams.get("collection");

    const db = getAdminFirestore();
    if (collection === "submissions") {
      const snap = await db
        .collection("schools")
        .doc(validSchoolId)
        .collection("submissions")
        .orderBy("createdAt", "desc")
        .limit(100)
        .get();
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return NextResponse.json({ items });
    }

    if (!isAllowedCollection(collection)) {
      return NextResponse.json({ error: "Invalid collection parameter" }, { status: 400 });
    }

    const snap = await db
      .collection("schools")
      .doc(validSchoolId)
      .collection(collection)
      .get();

    const items = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => Number((a as { order?: number }).order ?? 0) - Number((b as { order?: number }).order ?? 0));

    return NextResponse.json({ items });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ schoolId: string }> }
) {
  try {
    const { schoolId } = await context.params;
    const { schoolId: validSchoolId } = await requireSchoolAdminFromRequest(request, schoolId);

    const body = (await request.json()) as {
      collection?: string;
      item?: Record<string, unknown>;
    };

    if (!isAllowedCollection(body.collection ?? null) || !body.item) {
      return NextResponse.json({ error: "Invalid collection or item payload" }, { status: 400 });
    }

    const collection = body.collection as AllowedCollection;
    const schema = COLLECTION_SCHEMAS[collection];
    const id =
      typeof body.item.id === "string" && body.item.id.trim()
        ? body.item.id.trim()
        : `${collection}-${Date.now()}`;

    const parsed = schema.safeParse({ ...body.item, id });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    await db
      .collection("schools")
      .doc(validSchoolId)
      .collection(collection)
      .doc(id)
      .set({ ...parsed.data, updatedAt: new Date().toISOString() }, { merge: false });

    revalidateTag(schoolCacheTag(validSchoolId), "max");
    revalidateTag(schoolCacheTag(validSchoolId, collection), "max");

    return NextResponse.json({ ok: true, item: parsed.data });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ schoolId: string }> }
) {
  try {
    const { schoolId } = await context.params;
    const { schoolId: validSchoolId } = await requireSchoolAdminFromRequest(request, schoolId);

    const collection = request.nextUrl.searchParams.get("collection");
    const itemId = request.nextUrl.searchParams.get("id");

    if (!isAllowedCollection(collection) || !itemId) {
      return NextResponse.json({ error: "Invalid collection or id" }, { status: 400 });
    }

    const db = getAdminFirestore();
    await db
      .collection("schools")
      .doc(validSchoolId)
      .collection(collection)
      .doc(itemId)
      .delete();

    revalidateTag(schoolCacheTag(validSchoolId), "max");
    revalidateTag(schoolCacheTag(validSchoolId, collection), "max");

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
