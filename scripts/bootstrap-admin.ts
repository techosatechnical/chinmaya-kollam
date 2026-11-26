import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, initializeFirestore } from "firebase-admin/firestore";
import { SCHOOL_IDS } from "../lib/types/school";

try {
  process.loadEnvFile?.(".env.local");
} catch {
  // .env.local is optional when env vars are already set
}

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email) {
    console.error("Usage: npx tsx scripts/bootstrap-admin.ts <email> [password]");
    process.exit(1);
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    throw new Error("FIREBASE_PROJECT_ID is required.");
  }

  if (getApps().length === 0) {
    if (process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_AUTH_EMULATOR_HOST) {
      initializeApp({ projectId });
    } else {
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
      if (!clientEmail || !privateKey) {
        throw new Error("FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are required.");
      }
      initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
        projectId,
      });
    }
  }

  const auth = getAuth();
  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log(`Found existing Firebase Auth user: ${user.uid}`);
  } catch {
    if (!password) {
      throw new Error("User does not exist yet; provide a password as the second argument.");
    }
    user = await auth.createUser({
      email,
      password,
      displayName: "Chinmaya Super Admin",
    });
    console.log(`Created Firebase Auth user: ${user.uid}`);
  }

  const db = process.env.FIRESTORE_EMULATOR_HOST
    ? getFirestore()
    : initializeFirestore(getApps()[0]!, { preferRest: true });
  await db.collection("admins").doc(user.uid).set({
    uid: user.uid,
    email,
    displayName: user.displayName || "Chinmaya Super Admin",
    role: "super_admin",
    assignedSchoolIds: [...SCHOOL_IDS],
    active: true,
    updatedAt: new Date().toISOString(),
  });

  console.log(`Bootstrapped super_admin in Firestore at admins/${user.uid}`);
}

main().catch((err) => {
  console.error("Bootstrap failed:", err);
  process.exit(1);
});
