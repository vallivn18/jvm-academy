/**
 * @file userContent.ts
 * @description Handles user-submitted photos & reviews on the Gallery page.
 *
 * HOW IT WORKS (important to understand):
 * ─────────────────────────────────────────
 * This site is a static Next.js site with NO backend database (yet).
 * So user-submitted content is stored in the VISITOR'S OWN BROWSER
 * using `localStorage`. This means:
 *
 *   ✅ Works immediately, no backend needed, completely free
 *   ✅ Each visitor can add their own photo/review and see it instantly
 *   ❌ Submissions are NOT shared between different visitors/devices —
 *      they only persist on the same browser that submitted them
 *
 * 🚀 TO MAKE SUBMISSIONS PUBLIC (visible to ALL visitors), you need a
 * real backend. Recommended free options when you're ready:
 *   1. Supabase (https://supabase.com) — free Postgres DB + image storage
 *   2. Firebase (https://firebase.google.com) — free Firestore + Storage
 *   3. Google Sheets as a DB (simplest, via a Google Apps Script API)
 *
 * This file is written so that swapping localStorage for a real API call
 * later only requires changing the functions below — no component changes.
 */

import type { GalleryPhoto, Testimonial } from "@/lib/constants";

const PHOTOS_KEY = "jvm_user_photos";
const REVIEWS_KEY = "jvm_user_reviews";

// ─── User-submitted photo type ────────────────────────────────────────────────
export type UserPhoto = GalleryPhoto & {
  uploadedAt: string; // ISO date string
};

// ─── User-submitted review type ───────────────────────────────────────────────
export type UserReview = Testimonial & {
  submittedAt: string;
};

/** Safely reads and parses a JSON array from localStorage. */
function readArray<T>(key: string): T[] {
  if (typeof window === "undefined") return []; // SSR guard
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

/** Safely writes a JSON array to localStorage. */
function writeArray<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage full or disabled — fail silently
  }
}

// ─── Photos ────────────────────────────────────────────────────────────────────
export function getUserPhotos(): UserPhoto[] {
  return readArray<UserPhoto>(PHOTOS_KEY);
}

export function addUserPhoto(photo: Omit<UserPhoto, "id" | "uploadedAt" | "source">) {
  const photos = getUserPhotos();
  const newPhoto: UserPhoto = {
    ...photo,
    id: `user-photo-${Date.now()}`,
    uploadedAt: new Date().toISOString(),
    source: "user",
  };
  writeArray(PHOTOS_KEY, [newPhoto, ...photos]);
  return newPhoto;
}

export function deleteUserPhoto(id: string) {
  const photos = getUserPhotos().filter((p) => p.id !== id);
  writeArray(PHOTOS_KEY, photos);
}

// ─── Reviews ───────────────────────────────────────────────────────────────────
export function getUserReviews(): UserReview[] {
  return readArray<UserReview>(REVIEWS_KEY);
}

export function addUserReview(review: Omit<UserReview, "id" | "submittedAt" | "source">) {
  const reviews = getUserReviews();
  const newReview: UserReview = {
    ...review,
    id: `user-review-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    source: "user",
  };
  writeArray(REVIEWS_KEY, [newReview, ...reviews]);
  return newReview;
}

export function deleteUserReview(id: string) {
  const reviews = getUserReviews().filter((r) => r.id !== id);
  writeArray(REVIEWS_KEY, reviews);
}

/**
 * Converts an uploaded File into a base64 data URL so it can be
 * stored in localStorage and displayed immediately (no server upload needed).
 * Note: localStorage has a ~5-10MB total limit, so very large images
 * should be compressed before calling this in production.
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
