import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, initializeFirestore, type Firestore } from "firebase-admin/firestore";

let cachedApp: App | null = null;
let cachedDb: Firestore | null = null;

export function isFirebaseAdminConfigured(): boolean {
  if (process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    return Boolean(process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  }
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  );
}

export function getFirebaseAdminApp(): App {
  if (cachedApp) return cachedApp;
  const existing = getApps();
  if (existing.length > 0) {
    cachedApp = existing[0]!;
    return cachedApp;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error("FIREBASE_PROJECT_ID is not configured.");
  }

  // Emulator mode does not require a service account private key
  if (process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    cachedApp = initializeApp({ projectId });
    return cachedApp;
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin credentials (FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY) are not configured."
    );
  }

  cachedApp = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    projectId,
  });

  return cachedApp;
}

export function getAdminFirestore(): Firestore {
  if (cachedDb) return cachedDb;
  const app = getFirebaseAdminApp();
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    cachedDb = getFirestore(app);
    return cachedDb;
  }
  try {
    cachedDb = initializeFirestore(app, { preferRest: true });
  } catch {
    cachedDb = getFirestore(app);
  }
  return cachedDb;
}

export function getAdminAuth(): Auth {
  return getAuth(getFirebaseAdminApp());
}
