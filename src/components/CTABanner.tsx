/**
 * @file CTABanner.tsx — v4  (theme-aware, no hardcoded dark gradient)
 */
import Link from "next/link";
import { SITE } from "@/lib/constants";
export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div aria-hidden className="cta-banner-glow" />
      <div className="container-site" style={{ textAlign:"center", position:"relative", zIndex:1 }}>
        <span className="eyebrow" style={{ marginBottom:"0.75rem" }}>Start Today</span>
        <h2 className="h-section" style={{ marginBottom:"1rem" }}>
          Ready for Your{" "}<span className="accent">Excellence</span>{" "}Journey?
        </h2>
        <p className="body-lg" style={{ maxWidth:"480px", margin:"0 auto 2.25rem" }}>
          Call us today or send an enquiry — we'll help you find the right course for your goals.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"center" }}>
          <a href={`tel:${SITE.phone}`} className="btn-primary" style={{ padding:"0.9rem 2.25rem", fontSize:"0.95rem" }}>📞 {SITE.phone}</a>
          <Link href="/contact" className="btn-ghost" style={{ padding:"0.9rem 2.25rem", fontSize:"0.95rem" }}>Send an Enquiry →</Link>
        </div>
      </div>
    </section>
  );
}
