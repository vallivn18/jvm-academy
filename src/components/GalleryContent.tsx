"use client";
/**
 * @file GalleryContent.tsx — v2 (Supabase)
 *
 * Fetches photos + reviews from Supabase on mount.
 * Merges them with seed data from constants.ts (so the page always
 * has real content even before any user submissions).
 *
 * Two tabs: Photos | Reviews
 * Each tab has its own upload/submit form that writes to Supabase,
 * then refreshes the list so new content appears immediately for everyone.
 */
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS, TESTIMONIALS } from "@/lib/constants";
import {
  fetchPhotos, fetchReviews, deletePhoto, deleteReview,
} from "@/lib/userContent";
import { type DbPhoto, type DbReview } from "@/lib/supabase";
import PhotoUploadForm  from "@/components/PhotoUploadForm";
import ReviewUploadForm from "@/components/ReviewUploadForm";

type Tab = "photos" | "reviews";

export default function GalleryContent() {
  const [tab,        setTab]        = useState<Tab>("photos");
  const [dbPhotos,   setDbPhotos]   = useState<DbPhoto[]>([]);
  const [dbReviews,  setDbReviews]  = useState<DbReview[]>([]);
  const [loading,    setLoading]    = useState(true);

  // ── Data loaders ────────────────────────────────────────────
  const loadPhotos = useCallback(async () => {
    const data = await fetchPhotos();
    setDbPhotos(data);
  }, []);

  const loadReviews = useCallback(async () => {
    const data = await fetchReviews();
    setDbReviews(data);
  }, []);

  useEffect(() => {
    Promise.all([loadPhotos(), loadReviews()]).finally(() => setLoading(false));
  }, [loadPhotos, loadReviews]);

  // ── Merge Supabase rows with seed constants ──────────────────
  // Supabase already contains seeded reviews (inserted via SQL in setup).
  // GALLERY_PHOTOS seed data is kept as fallback for photos only,
  // in case the user hasn't seeded photos via SQL.
  const seedPhotoIds  = new Set(dbPhotos.map(p => p.src));
  const fallbackPhotos = GALLERY_PHOTOS.filter(p => !seedPhotoIds.has(p.src));

  // Build unified display arrays — DB rows first (newest), then fallbacks
  const allPhotos  = [...dbPhotos, ...fallbackPhotos];
  const allReviews = dbReviews.length > 0 ? dbReviews : TESTIMONIALS;

  return (
    <div>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div className="gallery-tabs">
        <button
          onClick={() => setTab("photos")}
          className={`gallery-tab ${tab === "photos" ? "gallery-tab-active" : ""}`}
        >
          📷 Photos
          <span className="gallery-tab-count">{allPhotos.length}</span>
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={`gallery-tab ${tab === "reviews" ? "gallery-tab-active" : ""}`}
        >
          ⭐ Reviews
          <span className="gallery-tab-count">{allReviews.length}</span>
        </button>
      </div>

      {/* ── Upload row ────────────────────────────────────────── */}
      <div className="gallery-upload-row">
        {tab === "photos"
          ? <PhotoUploadForm  onUploaded={loadPhotos} />
          : <ReviewUploadForm onSubmitted={loadReviews} />
        }
      </div>

      {/* ── Loading skeleton ──────────────────────────────────── */}
      {loading && (
        <div className="gallery-loading">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="gallery-skeleton" />
          ))}
        </div>
      )}

      {/* ── Photos grid ───────────────────────────────────────── */}
      {!loading && tab === "photos" && (
        <>
          {allPhotos.length === 0 && (
            <div className="gallery-empty">
              <span style={{ fontSize: "2rem" }}>📷</span>
              <p>No photos yet. Be the first to upload one!</p>
            </div>
          )}
          <div className="gallery-photo-grid">
            {allPhotos.map((photo, i) => {
              const isDb = "created_at" in photo;
              return (
                <figure
                  key={photo.id}
                  className={`gallery-photo-card anim-up d-${(i % 6) + 1}`}
                >
                  <div className="gallery-photo-wrap">
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      sizes="(max-width:768px) 50vw, 280px"
                      className="gallery-photo-img"
                      unoptimized={photo.src.startsWith("http")}
                    />
                    {photo.source === "user" && (
                      <span className="gallery-photo-badge">New</span>
                    )}
                  </div>
                  <figcaption className="gallery-photo-caption">
                    <span>{photo.caption}</span>
                    {isDb && photo.source === "user" && (
                      <button
                        onClick={async () => {
                          await deletePhoto((photo as DbPhoto).id, photo.src);
                          loadPhotos();
                        }}
                        className="gallery-delete-btn"
                        aria-label="Delete photo"
                      >
                        Remove
                      </button>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </>
      )}

      {/* ── Reviews grid ──────────────────────────────────────── */}
      {!loading && tab === "reviews" && (
        <>
          {allReviews.length === 0 && (
            <div className="gallery-empty">
              <span style={{ fontSize: "2rem" }}>⭐</span>
              <p>No reviews yet. Share your experience!</p>
            </div>
          )}
          <div className="gallery-review-grid">
            {allReviews.map((t, i) => {
              const isDb = "created_at" in t;
              return (
                <blockquote
                  key={t.id}
                  className={`card anim-up d-${(i % 6) + 1} review-card`}
                >
                  {/* Stars */}
                  <div style={{ display:"flex", gap:"2px", marginBottom:"0.875rem" }}>
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <span key={si} style={{ color:"var(--orange)", fontSize:"0.95rem" }}>★</span>
                    ))}
                  </div>

                  <p className="review-text">"{t.review}"</p>

                  <footer className="review-footer">
                    <div className="review-avatar">
                      {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div style={{ flex:1 }}>
                      <cite className="review-name">{t.name}</cite>
                      <span className="review-role">{t.role}</span>
                    </div>

                    {/* Source badge */}
                    {"source" in t && t.source === "seed" && (
                      <span className="review-source-badge">Verified</span>
                    )}

                    {isDb && (t as DbReview).source === "user" && (
                      <button
                        onClick={async () => {
                          await deleteReview((t as DbReview).id);
                          loadReviews();
                        }}
                        className="gallery-delete-btn"
                        aria-label="Delete review"
                      >
                        Remove
                      </button>
                    )}
                  </footer>
                </blockquote>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
