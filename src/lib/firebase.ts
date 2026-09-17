import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "../../firebase-applet-config.json";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(config) : getApp();

// Initialize Services
export const auth = getAuth(app);
const dbId = (config as any).firestoreDatabaseId;
export const db = dbId && dbId !== "(default)" ? getFirestore(app, dbId) : getFirestore(app);

// Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

let activeLoginPromise: Promise<any> | null = null;

export const loginWithGoogle = async () => {
  if (activeLoginPromise) {
    return activeLoginPromise;
  }

  activeLoginPromise = (async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      // Benign errors: user closed popup or cancelled
      if (
        error?.code === 'auth/popup-closed-by-user' ||
        error?.code === 'auth/cancelled-popup-request'
      ) {
        console.warn("Google sign-in popup cancelled by user or replaced:", error?.code);
      } else if (error?.code === 'auth/popup-blocked') {
        console.warn("Google sign-in popup blocked by browser/iframe.");
      } else {
        console.error("Login failed:", error);
      }
      throw error;
    } finally {
      // Delay releasing the lock slightly to prevent rapid double-clicks from triggering Firebase Auth assertion errors
      setTimeout(() => {
        activeLoginPromise = null;
      }, 500);
    }
  })();

  return activeLoginPromise;
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};
