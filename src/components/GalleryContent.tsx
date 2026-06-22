"use client";
/**
 * @file GalleryContent.tsx
 * @description Client component powering the Gallery page.
 *
 * Combines:
 *  - Seed photos/reviews   (from lib/constants.ts — real JVM Academy content)
 *  - User-submitted content (from localStorage via lib/userContent.ts)
 *
 * Has two tabs: "Photos" and "Reviews", each with its own upload form.
 * Fully theme-aware (uses CSS vars — works in dark & light mode).
 */
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS, TESTIMONIALS } from "@/lib/constants";
import { getUserPhotos, getUserReviews, deleteUserPhoto, deleteUserReview, type UserPhoto, type UserReview } from "@/lib/userContent";
import PhotoUploadForm from "@/components/PhotoUploadForm";
import ReviewUploadForm from "@/components/ReviewUploadForm";

type Tab = "photos" | "reviews";

export default function GalleryContent() {
  const [tab, setTab] = useState<Tab>("photos");
  const [userPhotos, setUserPhotos] = useState<UserPhoto[]>([]);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load user content from localStorage on mount (client-only)
  const refreshPhotos = useCallback(() => setUserPhotos(getUserPhotos()), []);
  const refreshReviews = useCallback(() => setUserReviews(getUserReviews()), []);

  useEffect(() => {
    refreshPhotos();
    refreshReviews();
    setMounted(true);
  }, [refreshPhotos, refreshReviews]);

  // Combine seed + user content — newest user submissions first
  const allPhotos = [...userPhotos, ...GALLERY_PHOTOS];
  const allReviews = [...userReviews, ...TESTIMONIALS];

  return (
    <div>
      {/* ── Tab switcher ─────────────────────────────────────── */}
      <div className="gallery-tabs">
        <button
          onClick={() => setTab("photos")}
          className={`gallery-tab ${tab === "photos" ? "gallery-tab-active" : ""}`}
        >
          📷 Photos <span className="gallery-tab-count">{allPhotos.length}</span>
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={`gallery-tab ${tab === "reviews" ? "gallery-tab-active" : ""}`}
        >
          ⭐ Reviews <span className="gallery-tab-count">{allReviews.length}</span>
        </button>
      </div>

      {/* ── Upload action row ────────────────────────────────── */}
      <div className="gallery-upload-row">
        {tab === "photos" ? (
          <PhotoUploadForm onUploaded={refreshPhotos} />
        ) : (
          <ReviewUploadForm onSubmitted={refreshReviews} />
        )}
      </div>

      {/* ── Photos grid ──────────────────────────────────────── */}
      {tab === "photos" && (
        <div className="gallery-photo-grid">
          {allPhotos.map((photo, i) => (
            <figure key={photo.id} className={`gallery-photo-card anim-up d-${(i % 6) + 1}`}>
              <div className="gallery-photo-wrap">
                {photo.src.startsWith("data:") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.src} alt={photo.caption} className="gallery-photo-img" />
                ) : (
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="gallery-photo-img"
                    unoptimized // external CDN images
                  />
                )}
                {photo.source === "user" && (
                  <span className="gallery-photo-badge">Your upload</span>
                )}
              </div>
              <figcaption className="gallery-photo-caption">
                {photo.caption}
                {photo.source === "user" && mounted && (
                  <button
                    onClick={() => { deleteUserPhoto(photo.id); refreshPhotos(); }}
                    className="gallery-delete-btn"
                    aria-label="Remove your photo"
                  >Remove</button>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* ── Reviews grid ─────────────────────────────────────── */}
      {tab === "reviews" && (
        <div className="gallery-review-grid">
          {allReviews.map((t, i) => (
            <blockquote key={t.id} className={`card anim-up d-${(i % 6) + 1} review-card`}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "0.875rem" }}>
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si} style={{ color: "var(--orange)", fontSize: "0.95rem" }}>★</span>
                ))}
              </div>
              <p className="review-text">"{t.review}"</p>
              <footer className="review-footer">
                <div className="review-avatar">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div style={{ flex: 1 }}>
                  <cite className="review-name">{t.name}</cite>
                  <span className="review-role">{t.role}</span>
                </div>
                {"source" in t && t.source === "user" && mounted && (
                  <button
                    onClick={() => { deleteUserReview(t.id); refreshReviews(); }}
                    className="gallery-delete-btn"
                    aria-label="Remove your review"
                  >Remove</button>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      )}
    </div>
  );
}
