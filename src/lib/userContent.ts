/**
 * @file userContent.ts — v2 (Supabase backend)
 * @description All photo and review CRUD now goes through Supabase.
 *
 * BEFORE (localStorage): data was saved only in the visitor's own browser.
 * NOW (Supabase):        data is saved in a shared cloud database —
 *                        visible to ALL visitors on ALL devices immediately.
 *
 * Photo uploads flow:
 *   1. User picks a file  →  PhotoUploadForm
 *   2. File is uploaded to Supabase Storage bucket "gallery"
 *   3. Supabase returns a public URL for that file
 *   4. That URL + caption is inserted into the gallery_photos table
 *   5. GalleryContent re-fetches the list — photo appears for everyone
 *
 * Review flow:
 *   1. User fills in name / role / rating / review text
 *   2. Row is inserted into gallery_reviews table
 *   3. GalleryContent re-fetches — review appears for everyone
 */

import { supabase, type DbPhoto, type DbReview } from "@/lib/supabase";

// ─── Photos ───────────────────────────────────────────────────────────────────

/** Fetch all photos from Supabase, newest first. */
export async function fetchPhotos(): Promise<DbPhoto[]> {
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchPhotos error:", error.message);
    return [];
  }
  return data as DbPhoto[];
}

/**
 * Upload a photo file to Supabase Storage, then insert a row into
 * gallery_photos with the resulting public URL.
 *
 * Returns the new DbPhoto row, or throws on error.
 */
export async function uploadPhoto(
  file: File,
  caption: string
): Promise<DbPhoto> {
  // 1. Build a unique filename so concurrent uploads never collide
  const ext      = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path     = `uploads/${filename}`;

  // 2. Upload binary file to Supabase Storage bucket "gallery"
  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  // 3. Get the permanent public URL for this file
  const { data: urlData } = supabase.storage
    .from("gallery")
    .getPublicUrl(path);

  const publicUrl = urlData.publicUrl;

  // 4. Insert a record in gallery_photos pointing to that URL
  const { data, error: insertError } = await supabase
    .from("gallery_photos")
    .insert({ src: publicUrl, caption: caption || "Shared by a visitor", source: "user" })
    .select()
    .single();

  if (insertError) throw new Error(`DB insert failed: ${insertError.message}`);
  return data as DbPhoto;
}

/** Delete a photo row + its storage file by record id and src URL. */
export async function deletePhoto(id: string, src: string): Promise<void> {
  // Remove DB row
  await supabase.from("gallery_photos").delete().eq("id", id);

  // Also remove the actual file from Storage (extract path from public URL)
  try {
    const url      = new URL(src);
    const pathPart = url.pathname.split("/object/public/gallery/")[1];
    if (pathPart) {
      await supabase.storage.from("gallery").remove([pathPart]);
    }
  } catch {
    // If storage delete fails, the DB row is already gone — not critical
  }
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

/** Fetch all reviews from Supabase, newest first. */
export async function fetchReviews(): Promise<DbReview[]> {
  const { data, error } = await supabase
    .from("gallery_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchReviews error:", error.message);
    return [];
  }
  return data as DbReview[];
}

/**
 * Insert a new review into gallery_reviews.
 * Returns the new DbReview row.
 */
export async function submitReview(review: {
  name:   string;
  role:   string;
  rating: number;
  review: string;
}): Promise<DbReview> {
  const { data, error } = await supabase
    .from("gallery_reviews")
    .insert({ ...review, source: "user" })
    .select()
    .single();

  if (error) throw new Error(`Review submit failed: ${error.message}`);
  return data as DbReview;
}

/** Delete a review by id. */
export async function deleteReview(id: string): Promise<void> {
  await supabase.from("gallery_reviews").delete().eq("id", id);
}
