"use client";
/**
 * @file PhotoUploadForm.tsx
 * @description Lets a visitor upload a photo + caption to the Gallery.
 * Stored in the browser via userContent.ts (see that file for how to
 * upgrade this to a shared/public backend later).
 */
import { useState, useRef } from "react";
import { addUserPhoto, fileToDataUrl } from "@/lib/userContent";

type Props = {
  onUploaded: () => void; // called after a successful upload so parent can refresh the list
};

export default function PhotoUploadForm({ onUploaded }: Props) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Image is too large. Please choose one under 4MB.");
      return;
    }
    setError("");
    const dataUrl = await fileToDataUrl(file);
    setPreview(dataUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!preview) {
      setError("Please choose a photo first.");
      return;
    }
    setSubmitting(true);
    try {
      addUserPhoto({ src: preview, caption: caption || "Shared by a visitor" });
      // Reset form
      setPreview(null);
      setCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setOpen(false);
      onUploaded();
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-primary upload-toggle-btn">
        📷 Upload a Photo
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card upload-form">
      <div className="upload-form-header">
        <h3 className="upload-form-title">Share a Photo</h3>
        <button type="button" onClick={() => setOpen(false)} className="upload-close-btn" aria-label="Close">✕</button>
      </div>

      {/* File input */}
      <label className="upload-dropzone">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview" className="upload-preview-img" />
        ) : (
          <div className="upload-dropzone-empty">
            <span style={{ fontSize: "1.5rem" }}>📁</span>
            <span>Click to choose a photo</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {/* Caption */}
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a short caption (optional)"
        className="upload-input"
        maxLength={120}
      />

      {error && <p className="upload-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={submitting} style={{ justifyContent: "center", width: "100%" }}>
        {submitting ? "Uploading…" : "Share Photo"}
      </button>

      <p className="upload-disclaimer">
        Photos are stored in your browser for this demo site. Visible only to you for now.
      </p>
    </form>
  );
}
