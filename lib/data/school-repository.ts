import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminFirestore, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { KOLLAM_SEED_BUNDLE, type SchoolSeedBundle } from "@/lib/data/kollam-seed";
import { getSeedBundleForSchool } from "@/lib/data/other-schools-seed";
import {
  AccoladeItemSchema,
  AlbumPhotoSchema,
  AnnouncementItemSchema,
  DocumentItemSchema,
  NewsItemSchema,
  PageContentSchema,
  PersonItemSchema,
  SchoolConfigSchema,
  VideoItemSchema,
  type AccoladeItem,
  type AlbumPhoto,
  type AnnouncementItem,
  type DocumentItem,
  type NewsItem,
  type PageContent,
  type PersonItem,
  type SchoolConfig,
  type SchoolId,
  type VideoItem,
} from "@/lib/types/school";

export function schoolCacheTag(schoolId: SchoolId, scope = "all"): string {
  return `school:${schoolId}:${scope}`;
}

function getLocalSeedBundle(schoolId: SchoolId): SchoolSeedBundle | null {
  if (schoolId === "kollam") {
    return KOLLAM_SEED_BUNDLE;
  }
  if (process.env.NODE_ENV !== "production") {
    return getSeedBundleForSchool(schoolId);
  }
  return null;
}

async function fetchSchoolConfigFromDb(schoolId: SchoolId): Promise<SchoolConfig | null> {
  if (!isFirebaseAdminConfigured()) {
    const seed = getLocalSeedBundle(schoolId);
    return seed ? seed.config : null;
  }

  const db = getAdminFirestore();
  const snap = await db.collection("schools").doc(schoolId).get();
  if (!snap.exists) {
    // In local dev without seeded DB, allow local seed; in production return null
    if (process.env.NODE_ENV !== "production") {
      return getLocalSeedBundle(schoolId)?.config ?? null;
    }
    return null;
  }

  const parsed = SchoolConfigSchema.safeParse({ id: schoolId, ...snap.data() });
  if (!parsed.success) {
    console.error(`[school-repository] Invalid SchoolConfig for ${schoolId}:`, parsed.error.flatten());
    return null;
  }
  return parsed.data;
}

export async function getSchoolConfig(
  schoolId: SchoolId,
  options?: { includeDraft?: boolean }
): Promise<SchoolConfig | null> {
  const includeDraft = options?.includeDraft ?? false;

  if (includeDraft) {
    return fetchSchoolConfigFromDb(schoolId);
  }

  const cachedFn = unstable_cache(
    async () => fetchSchoolConfigFromDb(schoolId),
    ["school-config", schoolId],
    {
      revalidate: 300,
      tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, "config")],
    }
  );

  const config = await cachedFn();
  if (!config) return null;

  // Never serve unpublished school records publicly in production
  if (config.status !== "published" && process.env.NODE_ENV === "production") {
    return null;
  }
  return config;
}

async function fetchPublishedCollection<T extends { id: string; status?: string; order?: number }>(
  schoolId: SchoolId,
  collectionName: string,
  schema: { safeParse: (d: unknown) => { success: true; data: T } | { success: false } },
  fallbackItems: T[],
  includeDraft = false
): Promise<T[]> {
  if (!isFirebaseAdminConfigured()) {
    return includeDraft
      ? fallbackItems
      : fallbackItems.filter((item) => item.status === "published");
  }

  const db = getAdminFirestore();
  const colRef = db.collection("schools").doc(schoolId).collection(collectionName);
  const snap = includeDraft
    ? await colRef.get()
    : await colRef.where("status", "==", "published").get();

  if (snap.empty && process.env.NODE_ENV !== "production") {
    return includeDraft
      ? fallbackItems
      : fallbackItems.filter((item) => item.status === "published");
  }

  const items: T[] = [];
  for (const doc of snap.docs) {
    const parsed = schema.safeParse({ id: doc.id, ...doc.data() });
    if (parsed.success) {
      items.push(parsed.data);
    }
  }
  items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return items;
}

export async function getSchoolAnnouncements(
  schoolId: SchoolId,
  kind?: AnnouncementItem["kind"],
  includeDraft = false
): Promise<AnnouncementItem[]> {
  const seed = getLocalSeedBundle(schoolId)?.announcements ?? [];
  const load = async () =>
    fetchPublishedCollection(schoolId, "announcements", AnnouncementItemSchema, seed, includeDraft);

  const items = includeDraft
    ? await load()
    : await unstable_cache(load, ["school-announcements", schoolId], {
        revalidate: 300,
        tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, "announcements")],
      })();

  return kind ? items.filter((a) => a.kind === kind) : items;
}

export async function getSchoolNews(
  schoolId: SchoolId,
  options?: { featuredOnly?: boolean; includeDraft?: boolean }
): Promise<NewsItem[]> {
  const includeDraft = options?.includeDraft ?? false;
  const seed = getLocalSeedBundle(schoolId)?.news ?? [];
  const load = async () =>
    fetchPublishedCollection(schoolId, "news", NewsItemSchema, seed, includeDraft);

  const items = includeDraft
    ? await load()
    : await unstable_cache(load, ["school-news", schoolId], {
        revalidate: 300,
        tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, "news")],
      })();

  return options?.featuredOnly ? items.filter((n) => n.featured) : items;
}

export async function getSchoolPeople(
  schoolId: SchoolId,
  kinds?: PersonItem["kind"][],
  includeDraft = false
): Promise<PersonItem[]> {
  const seed = getLocalSeedBundle(schoolId)?.people ?? [];
  const load = async () =>
    fetchPublishedCollection(schoolId, "people", PersonItemSchema, seed, includeDraft);

  const items = includeDraft
    ? await load()
    : await unstable_cache(load, ["school-people", schoolId], {
        revalidate: 300,
        tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, "people")],
      })();

  return kinds ? items.filter((p) => kinds.includes(p.kind)) : items;
}

export async function getSchoolDocuments(
  schoolId: SchoolId,
  kind?: DocumentItem["kind"],
  includeDraft = false
): Promise<DocumentItem[]> {
  const seed = getLocalSeedBundle(schoolId)?.documents ?? [];
  const load = async () =>
    fetchPublishedCollection(schoolId, "documents", DocumentItemSchema, seed, includeDraft);

  const items = includeDraft
    ? await load()
    : await unstable_cache(load, ["school-documents", schoolId], {
        revalidate: 300,
        tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, "documents")],
      })();

  return kind ? items.filter((d) => d.kind === kind) : items;
}

export async function getSchoolAlbums(
  schoolId: SchoolId,
  includeDraft = false
): Promise<AlbumPhoto[]> {
  const seed = getLocalSeedBundle(schoolId)?.albums ?? [];
  const load = async () =>
    fetchPublishedCollection(schoolId, "albums", AlbumPhotoSchema, seed, includeDraft);

  return includeDraft
    ? load()
    : unstable_cache(load, ["school-albums", schoolId], {
        revalidate: 300,
        tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, "albums")],
      })();
}

export async function getSchoolVideos(
  schoolId: SchoolId,
  includeDraft = false
): Promise<VideoItem[]> {
  const seed = getLocalSeedBundle(schoolId)?.videos ?? [];
  const load = async () =>
    fetchPublishedCollection(schoolId, "videos", VideoItemSchema, seed, includeDraft);

  return includeDraft
    ? load()
    : unstable_cache(load, ["school-videos", schoolId], {
        revalidate: 300,
        tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, "videos")],
      })();
}

export async function getSchoolAccolades(
  schoolId: SchoolId,
  kind?: AccoladeItem["kind"],
  includeDraft = false
): Promise<AccoladeItem[]> {
  const seed = getLocalSeedBundle(schoolId)?.accolades ?? [];
  const load = async () =>
    fetchPublishedCollection(schoolId, "accolades", AccoladeItemSchema, seed, includeDraft);

  const items = includeDraft
    ? await load()
    : await unstable_cache(load, ["school-accolades", schoolId], {
        revalidate: 300,
        tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, "accolades")],
      })();

  return kind ? items.filter((a) => a.kind === kind) : items;
}

export async function getSchoolPageContent(
  schoolId: SchoolId,
  pageId: string,
  includeDraft = false
): Promise<PageContent | null> {
  const seed = getLocalSeedBundle(schoolId)?.pages.find((p) => p.id === pageId) ?? null;

  const load = async (): Promise<PageContent | null> => {
    if (!isFirebaseAdminConfigured()) {
      if (!seed) return null;
      return includeDraft || seed.status === "published" ? seed : null;
    }
    const db = getAdminFirestore();
    const doc = await db
      .collection("schools")
      .doc(schoolId)
      .collection("pages")
      .doc(pageId)
      .get();
    if (!doc.exists) {
      if (process.env.NODE_ENV !== "production" && seed) {
        return includeDraft || seed.status === "published" ? seed : null;
      }
      return null;
    }
    const parsed = PageContentSchema.safeParse({ id: doc.id, ...doc.data() });
    if (!parsed.success) return null;
    if (!includeDraft && parsed.data.status !== "published") return null;
    return parsed.data;
  };

  return includeDraft
    ? load()
    : unstable_cache(load, ["school-page", schoolId, pageId], {
        revalidate: 300,
        tags: [schoolCacheTag(schoolId), schoolCacheTag(schoolId, `page:${pageId}`)],
      })();
}
