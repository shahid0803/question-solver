import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  avatar: string | null;

  role: "user" | "admin";

  createdAt: any;
  updatedAt: any;
  lastLogin: any;

  solvedQuestions: number;
  uploadedFiles: number;

  bookmarkedQuestions: string[];

  streak: number;
  longestStreak: number;

  totalStudyTime: number;

  coins: number;

  level: number;

  xp: number;

  plan: "free" | "premium";

  preferences: {
    theme: "light" | "dark" | "system";
    language: string;
  };
}

/**
 * Create User Profile
 */
export const createUserProfile = async (
  uid: string,
  email: string,
  name: string,
  avatar: string | null = null
) => {
  const userRef = doc(db, "users", uid);

  await setDoc(userRef, {
    uid,

    email,

    name,

    avatar,

    role: "user",

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),

    lastLogin: serverTimestamp(),

    solvedQuestions: 0,

    uploadedFiles: 0,

    bookmarkedQuestions: [],

    streak: 0,

    longestStreak: 0,

    totalStudyTime: 0,

    coins: 0,

    level: 1,

    xp: 0,

    plan: "free",

    preferences: {
      theme: "system",
      language: "en",
    },
  });
};

/**
 * Get User Profile
 */
export const getUserProfile = async (uid: string) => {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as UserProfile;
};

/**
 * Update User Profile
 */
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
) => {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Update Last Login
 */
export const updateLastLogin = async (uid: string) => {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    lastLogin: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Increase Solved Questions
 */
export const incrementSolvedQuestions = async (uid: string) => {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    solvedQuestions: increment(1),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Increase Uploaded Files
 */
export const incrementUploadedFiles = async (uid: string) => {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    uploadedFiles: increment(1),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Increase Study Time
 */
export const addStudyTime = async (
  uid: string,
  minutes: number
) => {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    totalStudyTime: increment(minutes),
    updatedAt: serverTimestamp(),
  });
};
