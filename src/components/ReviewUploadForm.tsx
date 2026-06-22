"use client";
/**
 * @file ReviewUploadForm.tsx
 * @description Lets a visitor submit their own review/testimonial.
 * Stored in the browser via userContent.ts.
 */
import { useState } from "react";
import { addUserReview } from "@/lib/userContent";

type Props = {
  onSubmitted: () => void;
};

export default function ReviewUploadForm({ onSubmitted }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !review.trim()) {
      setError("Please fill in your name and review.");
      return;
    }
    setSubmitting(true);
    try {
      addUserReview({
        name: name.trim(),
        role: role.trim() || "Student",
        rating,
        review: review.trim(),
      });
      setName(""); setRole(""); setReview(""); setRating(5);
      setOpen(false);
      onSubmitted();
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

      <input
        type="text" value={name} onChange={(e) => setName(e.target.value)}
        placeholder="Your name" className="upload-input" maxLength={60} required
      />
      <input
        type="text" value={role} onChange={(e) => setRole(e.target.value)}
        placeholder="e.g. IELTS Student, Working Professional" className="upload-input" maxLength={60}
      />

      {/* Star rating picker */}
      <div className="rating-picker">
        <span className="rating-picker-label">Your rating:</span>
        <div style={{ display: "flex", gap: "2px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              className="rating-star-btn"
              style={{ color: star <= rating ? "var(--orange)" : "var(--text-4)" }}
            >★</button>
          ))}
        </div>
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Tell us about your experience at JVM Academy…"
        className="upload-input upload-textarea"
        rows={4}
        maxLength={500}
        required
      />

      {error && <p className="upload-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={submitting} style={{ justifyContent: "center", width: "100%" }}>
        {submitting ? "Submitting…" : "Submit Review"}
      </button>

      <p className="upload-disclaimer">
        Reviews are stored in your browser for this demo site. Visible only to you for now.
      </p>
    </form>
  );
}
