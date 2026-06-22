/**
 * @file app/gallery/page.tsx — v5
 * Gallery page with Photos + Reviews tabs, upload forms, real seed content.
 * Server component shell — interactive parts live in <GalleryContent />.
 */
import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import GalleryContent from "@/components/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery & Reviews",
  description: "Photos and student reviews from JVM Academy for Excellence, Coimbatore. Upload your own photo or review.",
};

export default function GalleryPage() {
  return (
    <>
      <header className="page-header">
        <div className="page-header-glow" style={{ bottom: "-80px", left: "-80px" }} />
        <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow">Student Stories</span>
          <div className="divider" />
          <h1 className="h-page">Gallery &amp; Reviews</h1>
          <p className="body-lg" style={{ maxWidth: "520px", marginTop: "0.75rem" }}>
            Real photos and real words from real students. Share your own experience too —
            your photo or review will appear right here.
          </p>
        </div>
      </header>

      <section className="section" style={{ background: "var(--section-a)" }}>
        <div className="container-site">
          <GalleryContent />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
