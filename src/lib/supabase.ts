/**
 * @file supabase.ts
 * @description Supabase client singleton.
 *
 * Reads credentials from .env.local — never hardcode keys here.
 * NEXT_PUBLIC_ prefix makes them available in both server and client code.
 *
 * Import this wherever you need database/storage access:
 *   import { supabase } from "@/lib/supabase";
 */
import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !key) {
  throw new Error(
    "Missing Supabase env vars. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

// createClient is called once and reused across the app (singleton pattern)
export const supabase = createClient(url, key);

// ─── Type definitions matching our database schema ────────────────────────────
export type DbPhoto = {
  id:         string;
  src:        string;
  caption:    string;
  source:     "seed" | "user";
  created_at: string;
};

export type DbReview = {
  id:         string;
  name:       string;
  role:       string;
  rating:     number;
  review:     string;
  source:     "seed" | "user";
  created_at: string;
};
