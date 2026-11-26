import assert from "node:assert/strict";
import { normalizeHostname, resolveSchoolIdFromHostname } from "../lib/tenant-host";
import { getThemeCssVariables } from "../lib/theme";
import { KOLLAM_SEED_BUNDLE } from "../lib/data/kollam-seed";
import { OTHER_SCHOOLS_BUNDLES } from "../lib/data/other-schools-seed";
import {
  AccoladeItemSchema,
  AlbumPhotoSchema,
  AnnouncementItemSchema,
  ContactSubmissionSchema,
  DocumentItemSchema,
  NewsItemSchema,
  PageContentSchema,
  PersonItemSchema,
  SCHOOL_IDS,
  SchoolConfigSchema,
  VideoItemSchema,
  type AdminUserRecord,
  type SchoolId,
} from "../lib/types/school";

function canAdminManageSchoolPure(admin: AdminUserRecord, schoolId: SchoolId): boolean {
  if (!admin.active) return false;
  if (admin.role === "super_admin") return true;
  return admin.assignedSchoolIds.includes(schoolId);
}

console.log("1. Testing hostname resolution...");
const expectedHosts: Record<string, SchoolId> = {
  "chinmaya-kollam.vercel.app": "kollam",
  "chinmaya-vidyalaya-attukal.vercel.app": "attukal",
  "chinmaya-naruvamodu.vercel.app": "naruvamodu",
  "chinmaya-kattakada.vercel.app": "kattakada",
  "chinmaya-kunnumpuram.vercel.app": "kunnumpuram",
  "chinmaya-vazhutacaud.vercel.app": "vazhutacaud",
};

for (const [host, expectedId] of Object.entries(expectedHosts)) {
  assert.equal(resolveSchoolIdFromHostname(host, { isDev: false }), expectedId);
  assert.equal(
    resolveSchoolIdFromHostname(`${host.toUpperCase()}:443`, { isDev: false }),
    expectedId
  );
}

// Unknown production hosts must NEVER fall back to Kollam
assert.equal(resolveSchoolIdFromHostname("unknown-school.vercel.app", { isDev: false }), null);
assert.equal(resolveSchoolIdFromHostname("localhost:3000", { isDev: false }), null);
assert.equal(resolveSchoolIdFromHostname("", { isDev: false }), null);
assert.equal(normalizeHostname("CHINMAYA-KOLLAM.VERCEL.APP:3000"), "chinmaya-kollam.vercel.app");

// Local dev subdomains
for (const id of SCHOOL_IDS) {
  assert.equal(resolveSchoolIdFromHostname(`${id}.localhost:3000`, { isDev: true }), id);
}
assert.equal(resolveSchoolIdFromHostname("unknown.localhost:3000", { isDev: true }), null);

console.log("2. Testing Kollam & 5-school seed schemas...");
assert.doesNotThrow(() => SchoolConfigSchema.parse(KOLLAM_SEED_BUNDLE.config));
for (const a of KOLLAM_SEED_BUNDLE.announcements) AnnouncementItemSchema.parse(a);
for (const n of KOLLAM_SEED_BUNDLE.news) NewsItemSchema.parse(n);
for (const p of KOLLAM_SEED_BUNDLE.people) PersonItemSchema.parse(p);
for (const d of KOLLAM_SEED_BUNDLE.documents) DocumentItemSchema.parse(d);
for (const al of KOLLAM_SEED_BUNDLE.albums) AlbumPhotoSchema.parse(al);
for (const v of KOLLAM_SEED_BUNDLE.videos) VideoItemSchema.parse(v);
for (const ac of KOLLAM_SEED_BUNDLE.accolades) AccoladeItemSchema.parse(ac);
for (const pg of KOLLAM_SEED_BUNDLE.pages) PageContentSchema.parse(pg);

for (const [id, bundle] of Object.entries(OTHER_SCHOOLS_BUNDLES)) {
  const cfg = SchoolConfigSchema.parse(bundle.config);
  assert.equal(cfg.id, id);
  assert.equal(cfg.status, "draft", `${id} must start unpublished`);
  assert.equal(cfg.isDemoData, true, `${id} must be flagged isDemoData`);
  const vars = getThemeCssVariables(cfg.theme) as Record<string, string>;
  assert.ok(vars["--school-primary"]?.startsWith("#"));
}

console.log("3. Testing theme CSS variable fallback...");
const fallbackVars = getThemeCssVariables({ primary: "not-a-hex" } as never) as Record<
  string,
  string
>;
assert.equal(fallbackVars["--school-primary"], "#0F284A");

console.log("4. Testing RBAC school isolation...");
const attukalAdmin: AdminUserRecord = {
  uid: "u1",
  email: "attukal@chinmaya.edu.in",
  role: "school_admin",
  assignedSchoolIds: ["attukal"],
  active: true,
};
assert.equal(canAdminManageSchoolPure(attukalAdmin, "attukal"), true);
assert.equal(canAdminManageSchoolPure(attukalAdmin, "kollam"), false);
assert.equal(canAdminManageSchoolPure(attukalAdmin, "naruvamodu"), false);

const inactiveAdmin: AdminUserRecord = { ...attukalAdmin, active: false };
assert.equal(canAdminManageSchoolPure(inactiveAdmin, "attukal"), false);

const superAdmin: AdminUserRecord = {
  uid: "u0",
  email: "super@chinmaya.edu.in",
  role: "super_admin",
  assignedSchoolIds: [],
  active: true,
};
for (const id of SCHOOL_IDS) {
  assert.equal(canAdminManageSchoolPure(superAdmin, id), true);
}

console.log("5. Testing contact form validation...");
assert.equal(
  ContactSubmissionSchema.safeParse({
    name: "Parent Name",
    email: "parent@example.com",
    phone: "9876543210",
    subject: "admissions",
    message: "Interested in Grade 1 admissions.",
  }).success,
  true
);
assert.equal(
  ContactSubmissionSchema.safeParse({
    name: "A",
    email: "bad-email",
    subject: "",
    message: "hi",
  }).success,
  false
);

console.log("All multi-tenant verification checks passed!");
