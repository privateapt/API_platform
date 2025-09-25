// =============================================================================
// Firebase Configuration
// =============================================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if we have all required config values
const hasAllFirebaseConfig = Object.values(firebaseConfig).every(value => value !== undefined && value !== '');

// Initialize Firebase only if we have valid configuration
let app: any = null;
if (hasAllFirebaseConfig) {
  app = initializeApp(firebaseConfig);
} else if (typeof window !== 'undefined') {
  // Only show warning on client side to avoid build errors
  console.warn('Firebase configuration is incomplete. Some features may not work.');
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
