"use client";
/**
 * @file PhotoUploadForm.tsx — v2 (Supabase)
 * Uploads file to Supabase Storage → inserts row in gallery_photos.
 * The uploaded photo immediately becomes visible to ALL visitors.
 */
import { useState, useRef } from "react";
import { uploadPhoto } from "@/lib/userContent";

type Props = { onUploaded: () => void };

export default function PhotoUploadForm({ onUploaded }: Props) {
  const [open,        setOpen]        = useState(false);
  const [preview,     setPreview]     = useState<string | null>(null);
  const [file,        setFile]        = useState<File | null>(null);
  const [caption,     setCaption]     = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState("");
  const [success,     setSuccess]     = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (f.size > 5 * 1024 * 1024)     { setError("Image must be under 5 MB."); return; }
    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError("Please choose a photo first."); return; }
    setSubmitting(true);
    setError("");
    try {
      await uploadPhoto(file, caption);
      setSuccess(true);
      setPreview(null);
      setFile(null);
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
      onUploaded();
      // Auto-close after showing success
      setTimeout(() => { setSuccess(false); setOpen(false); }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setOpen(false); setPreview(null); setFile(null);
    setCaption(""); setError(""); setSuccess(false);
    if (fileRef.current) fileRef.current.value = "";
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
        <button type="button" onClick={reset} className="upload-close-btn" aria-label="Close">✕</button>
      </div>

      {/* Dropzone */}
      <label className="upload-dropzone">
        {preview
          ? <img src={preview} alt="Preview" className="upload-preview-img" /> // eslint-disable-line
          : (
            <div className="upload-dropzone-empty">
              <span style={{ fontSize:"1.75rem" }}>📁</span>
              <span>Click to choose a photo</span>
              <span style={{ fontSize:"0.72rem", color:"var(--text-4)" }}>JPG, PNG, WEBP · max 5 MB</span>
            </div>
          )
        }
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display:"none" }} />
      </label>

      <input
        type="text" value={caption} onChange={e => setCaption(e.target.value)}
        placeholder="Add a caption (optional)" className="upload-input" maxLength={120}
      />

      {error   && <p className="upload-error">⚠ {error}</p>}
      {success && <p className="upload-success">✅ Photo uploaded! Visible to everyone now.</p>}

      <button type="submit" className="btn-primary" disabled={submitting} style={{ justifyContent:"center" }}>
        {submitting ? (
          <><span className="upload-spinner" /> Uploading to cloud…</>
        ) : (
          "Share Photo"
        )}
      </button>

      <p className="upload-disclaimer">
        📢 Your photo will be visible to all visitors instantly — stored securely in the cloud.
      </p>
    </form>
  );
}
