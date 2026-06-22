"use client";
/**
 * @file ReviewUploadForm.tsx — v2 (Supabase)
 * Inserts a review into gallery_reviews table.
 * Review immediately visible to ALL visitors.
 */
import { useState } from "react";
import { submitReview } from "@/lib/userContent";

type Props = { onSubmitted: () => void };

export default function ReviewUploadForm({ onSubmitted }: Props) {
  const [open,       setOpen]       = useState(false);
  const [name,       setName]       = useState("");
  const [role,       setRole]       = useState("");
  const [rating,     setRating]     = useState(5);
  const [review,     setReview]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim())   { setError("Please enter your name."); return; }
    if (!review.trim()) { setError("Please write your review."); return; }
    setSubmitting(true);
    setError("");
    try {
      await submitReview({
        name:   name.trim(),
        role:   role.trim() || "Student",
        rating,
        review: review.trim(),
      });
      setSuccess(true);
      setName(""); setRole(""); setReview(""); setRating(5);
      onSubmitted();
      setTimeout(() => { setSuccess(false); setOpen(false); }, 2200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-ghost upload-toggle-btn">
        ✍️ Write a Review
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card upload-form">
      <div className="upload-form-header">
        <h3 className="upload-form-title">Share Your Experience</h3>
        <button type="button" onClick={() => setOpen(false)} className="upload-close-btn" aria-label="Close">✕</button>
      </div>

      <input type="text" value={name} onChange={e => setName(e.target.value)}
        placeholder="Your full name *" className="upload-input" maxLength={60} required />

      <input type="text" value={role} onChange={e => setRole(e.target.value)}
        placeholder="e.g. IELTS Student, Working Professional" className="upload-input" maxLength={60} />

      {/* Star rating */}
      <div className="rating-picker">
        <span className="rating-picker-label">Your rating:</span>
        <div style={{ display:"flex", gap:"2px" }}>
          {[1,2,3,4,5].map(star => (
            <button key={star} type="button" onClick={() => setRating(star)}
              aria-label={`${star} star`} className="rating-star-btn"
              style={{ color: star <= rating ? "var(--orange)" : "var(--text-4)" }}>
              ★
            </button>
          ))}
        </div>
      </div>

      <textarea value={review} onChange={e => setReview(e.target.value)}
        placeholder="Tell us about your experience at JVM Academy… *"
        className="upload-input upload-textarea" rows={4} maxLength={500} required />

      {error   && <p className="upload-error">⚠ {error}</p>}
      {success && <p className="upload-success">✅ Review submitted! Thank you — it's now live for everyone.</p>}

      <button type="submit" className="btn-primary" disabled={submitting} style={{ justifyContent:"center" }}>
        {submitting ? (
          <><span className="upload-spinner" /> Submitting…</>
        ) : (
          "Submit Review"
        )}
      </button>

      <p className="upload-disclaimer">
        📢 Your review will be visible to all visitors instantly — stored securely in the cloud.
      </p>
    </form>
  );
}
