# Chinmaya Schools — Multi-Tenant Firebase & Vercel Deployment Guide

## 1. Vercel Deployment Decision (`*.vercel.app` Hostnames)

The six requested hostnames are:

| School      | Hostname                        | `schoolId`    |
| ----------- | ------------------------------- | ------------- |
| Kollam      | chinmaya-kollam.vercel.app      | `kollam`      |
| Attukal     | chinmaya-vidyalaya-attukal.vercel.app | `attukal`     |
| Naruvamodu  | chinmaya-naruvamodu.vercel.app  | `naruvamodu`  |
| Kattakada   | chinmaya-kattakada.vercel.app   | `kattakada`   |
| Kunnumpuram | chinmaya-kunnumpuram.vercel.app | `kunnumpuram` |
| Vazhutacaud | chinmaya-vazhutacaud.vercel.app | `vazhutacaud` |

### Why Six Vercel Projects Are Required for Six `*.vercel.app` Hostnames
On Vercel, a `*.vercel.app` subdomain is bound to a single Vercel project's name and cannot be arbitrarily attached as a custom domain to a different Vercel project. Therefore:

- **With `*.vercel.app` hostnames:** Create **6 Vercel projects** (`chinmaya-kollam`, `chinmaya-attukal`, `chinmaya-naruvamodu`, `chinmaya-kattakada`, `chinmaya-kunnumpuram`, `chinmaya-vazhutacaud`), all connected to **this same GitHub repository** (`main` branch) and **the same Firebase project**.
  - Set `DEPLOYMENT_SCHOOL_ID=<schoolId>` in each Vercel project's environment variables so even Vercel preview URLs resolve to the intended school.
  - Every push to `main` automatically builds and deploys all 6 projects from one codebase.
- **Alternative (Custom Domains):** If you purchase custom domains or subdomains (e.g., `kollam.chinmayaschools.edu.in`, `attukal.chinmayaschools.edu.in`), all 6 domains can be attached to **one single Vercel project** and added to `SCHOOL_HOST_REGISTRY` in `lib/tenant-host.ts`.

### Cross-Deployment Cache Invalidation
When an admin publishes changes in `/admin`, `revalidateTag("school:<schoolId>:all", "max")` invalidates the cache on the deployment handling `/admin`. Other deployments pick up changes via the 300s `unstable_cache` TTL, or immediately by calling:

```bash
curl -X POST https://<school-host>/api/revalidate \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"schoolId":"attukal"}'
```

---

## 2. Firebase Project Setup

1. Create one Firebase project in the Firebase Console.
2. Enable **Cloud Firestore** (Native mode) and **Authentication** (Email/Password provider).
3. (Optional) Enable **Firebase Storage** if you want browser/admin uploads stored in Firebase Storage instead of external URLs.
4. Generate a Service Account key (`Project Settings -> Service Accounts -> Generate new private key`) and populate `.env.local` / Vercel Environment Variables (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`).
5. Deploy Firestore & Storage rules and indexes:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes,storage
   ```

---

## 3. Seeding Kollam & Initializing the Other 5 Schools

Run a dry run first (writes `docs/kollam-migration-report.md` without modifying Firestore):
```bash
npx tsx scripts/seed-firestore.ts --dry-run
```

Run the live migration (non-destructive: skips any document that already exists so later admin edits are never overwritten):
```bash
npx tsx scripts/seed-firestore.ts
```

---

## 4. Bootstrapping the First Super Admin

```bash
npx tsx scripts/bootstrap-admin.ts superadmin@chinmaya.edu.in "YourStrongPassword!"
```

Sign in at `/admin` on any configured school domain. From the **Admin Users** tab, the Super Admin can assign `school_admin` roles scoped to specific `assignedSchoolIds`.

---

## 5. Local Multi-Tenant Testing

Start the dev server (`npm run dev`) and open:
- `http://kollam.localhost:3000` (Kollam — baseline theme & content)
- `http://attukal.localhost:3000` (Attukal — green/amber theme & demo scaffold)
- `http://naruvamodu.localhost:3000` (Naruvamodu — purple/amber theme)
- `http://kattakada.localhost:3000` (Kattakada — crimson/amber theme)
- `http://kunnumpuram.localhost:3000` (Kunnumpuram — teal/orange theme)
- `http://vazhutacaud.localhost:3000` (Vazhutacaud — slate/gold theme)

Unknown hosts (e.g. `unknown.localhost:3000`) return **404**.
