import fs from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, initializeFirestore, type Firestore } from "firebase-admin/firestore";
import { KOLLAM_SEED_BUNDLE, type SchoolSeedBundle } from "../lib/data/kollam-seed";
import { OTHER_SCHOOLS_BUNDLES } from "../lib/data/other-schools-seed";

try {
  process.loadEnvFile?.(".env.local");
} catch {
  // .env.local is optional when env vars are already set
}

interface CliOptions {
  dryRun: boolean;
  force: boolean;
  includeOtherSchools: boolean;
}

function parseArgs(argv: string[]): CliOptions {
  return {
    dryRun: argv.includes("--dry-run"),
    force: argv.includes("--force"),
    includeOtherSchools: !argv.includes("--kollam-only"),
  };
}

function initFirestore(): Firestore {
  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    throw new Error("FIREBASE_PROJECT_ID (or NEXT_PUBLIC_FIREBASE_PROJECT_ID) is required.");
  }

  if (getApps().length === 0) {
    if (process.env.FIRESTORE_EMULATOR_HOST) {
      initializeApp({ projectId });
    } else {
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
      if (!clientEmail || !privateKey) {
        throw new Error("FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are required outside emulator.");
      }
      initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
        projectId,
      });
    }
  }
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    return getFirestore();
  }
  return initializeFirestore(getApps()[0]!, { preferRest: true });
}

interface ReportLine {
  path: string;
  action: "create" | "skip_existing" | "overwrite";
  status: string;
  reviewNote?: string;
}

async function upsertDocIfSafe(
  db: Firestore | null,
  docPath: string,
  data: Record<string, unknown>,
  options: CliOptions,
  report: ReportLine[],
  status: string,
  reviewNote?: string
) {
  if (options.dryRun || !db) {
    report.push({
      path: docPath,
      action: "create",
      status,
      reviewNote,
    });
    return;
  }

  const ref = db.doc(docPath);
  const existing = await ref.get();
  if (existing.exists && !options.force) {
    report.push({
      path: docPath,
      action: "skip_existing",
      status,
      reviewNote,
    });
    return;
  }

  await ref.set(
    {
      ...data,
      seededAt: new Date().toISOString(),
    },
    { merge: false }
  );

  report.push({
    path: docPath,
    action: existing.exists ? "overwrite" : "create",
    status,
    reviewNote,
  });
}

async function seedBundle(
  db: Firestore | null,
  bundle: SchoolSeedBundle,
  options: CliOptions,
  report: ReportLine[]
) {
  const sid = bundle.config.id;
  await upsertDocIfSafe(
    db,
    `schools/${sid}`,
    bundle.config as unknown as Record<string, unknown>,
    options,
    report,
    bundle.config.status,
    bundle.config.isDemoData ? "Unpublished demo scaffold for non-Kollam school" : undefined
  );

  const subcollections: Array<{
    name: string;
    items: Array<{ id: string; status?: string; reviewNote?: string }>;
  }> = [
    { name: "announcements", items: bundle.announcements },
    { name: "news", items: bundle.news },
    { name: "people", items: bundle.people },
    { name: "documents", items: bundle.documents },
    { name: "albums", items: bundle.albums },
    { name: "videos", items: bundle.videos },
    { name: "accolades", items: bundle.accolades },
    { name: "pages", items: bundle.pages },
  ];

  for (const col of subcollections) {
    for (const item of col.items) {
      await upsertDocIfSafe(
        db,
        `schools/${sid}/${col.name}/${item.id}`,
        item as unknown as Record<string, unknown>,
        options,
        report,
        item.status ?? "published",
        item.reviewNote
      );
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const db = options.dryRun ? null : initFirestore();
  const report: ReportLine[] = [];

  await seedBundle(db, KOLLAM_SEED_BUNDLE, options, report);
  if (options.includeOtherSchools) {
    for (const bundle of Object.values(OTHER_SCHOOLS_BUNDLES)) {
      await seedBundle(db, bundle, options, report);
    }
  }

  const flagged = report.filter((r) => Boolean(r.reviewNote));
  const created = report.filter((r) => r.action === "create").length;
  const skipped = report.filter((r) => r.action === "skip_existing").length;
  const overwritten = report.filter((r) => r.action === "overwrite").length;

  const lines = [
    "# Kollam & Multi-School Migration Report",
    "",
    `- **Mode:** ${options.dryRun ? "DRY RUN (no Firestore writes)" : "LIVE"}`,
    `- **Force overwrite:** ${options.force}`,
    `- **Total records processed:** ${report.length}`,
    `- **Created / Planned:** ${created}`,
    `- **Skipped (already exists, preserving admin edits):** ${skipped}`,
    `- **Overwritten:** ${overwritten}`,
    `- **Flagged for review (held as draft):** ${flagged.length}`,
    "",
    "## Flagged Items Requiring Admin Confirmation",
    "",
    "| Document Path | Status | Review Note |",
    "| --- | --- | --- |",
    ...flagged.map((f) => `| \`${f.path}\` | \`${f.status}\` | ${f.reviewNote} |`),
    "",
    "## All Processed Records",
    "",
    "| Document Path | Action | Status |",
    "| --- | --- | --- |",
    ...report.map((r) => `| \`${r.path}\` | \`${r.action}\` | \`${r.status}\` |`),
    "",
  ];

  const reportPath = path.resolve(process.cwd(), "docs/kollam-migration-report.md");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

  console.log(
    `Migration ${options.dryRun ? "dry-run " : ""}complete: ${report.length} records (${flagged.length} flagged). Report written to docs/kollam-migration-report.md`
  );
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
