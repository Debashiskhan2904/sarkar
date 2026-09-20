import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut,
  signInAnonymously 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "../../firebase-applet-config.json";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(config) : getApp();

// Initialize Services
export const auth = getAuth(app);
const dbId = (config as any).firestoreDatabaseId;
export const db = dbId && dbId !== "(default)" ? getFirestore(app, dbId) : getFirestore(app);

// Helper to ensure Firebase Auth session is active
export const ensureFirebaseAuth = async () => {
  if (auth.currentUser) return auth.currentUser;
  try {
    const cred = await signInAnonymously(auth);
    return cred.user;
  } catch (err) {
    console.warn("Firebase anonymous auth notice:", err);
    return null;
  }
};

// Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const loginWithRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Redirect login failed:", error);
    throw error;
  }
};

export const checkRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    console.warn("Redirect result check note:", error);
    return null;
  }
};

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
        console.warn("Google sign-in popup cancelled by user:", error?.code);
        throw error;
      } else if (error?.code === 'auth/popup-blocked') {
        console.warn("Google sign-in popup blocked. Attempting seamless redirect login...");
        try {
          await signInWithRedirect(auth, googleProvider);
          return null;
        } catch (redirErr) {
          console.error("Redirect fallback error:", redirErr);
          throw error;
        }
      } else {
        console.error("Login failed:", error);
        throw error;
      }
    } finally {
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
