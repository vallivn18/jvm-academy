/**
 * @file Footer.tsx — v4
 * Footer is always dark (--ft-* variables) in both themes.
 * No hardcoded --black or rgba values for main bg.
 */
import Link from "next/link";
import Image from "next/image";
import { SITE, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background:"var(--bg-2)", borderTop:"1px solid var(--border)" }}>
      <div className="container-site" style={{ padding:"3.5rem clamp(1.25rem,5vw,2.5rem)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:"2.75rem", marginBottom:"2.75rem" }}>

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.125rem" }}>
              <div style={{ width:"40px", height:"40px", borderRadius:"9px", overflow:"hidden", border:"1.5px solid var(--orange-border)", flexShrink:0 }}>
                <Image src="/jvm_logo.jpeg" alt="JVM Academy" width={40} height={40} style={{ objectFit:"cover", width:"100%", height:"100%" }} />
              </div>
              <div>
                <p style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"0.95rem", color:"var(--text-1)" }}>JVM Academy</p>
                <p style={{ fontSize:"0.56rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--orange)" }}>for Excellence</p>
              </div>
            </div>
            <p style={{ fontSize:"0.84rem", color:"var(--text-3)", lineHeight:1.7, marginBottom:"1.375rem", fontWeight:400 }}>
              Transforming lives through language and knowledge since 2013. Coimbatore's most trusted coaching centre.
            </p>
            <div style={{ display:"flex", gap:"0.5rem" }}>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social">f</a>
              <a href={SITE.youtube}  target="_blank" rel="noopener noreferrer" aria-label="YouTube"  className="footer-social">▶</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social">W</a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="footer-col-heading">Quick Links</p>
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.55rem" }}>
              {FOOTER_LINKS.quickLinks.map(l => <li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>)}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <p className="footer-col-heading">Our Courses</p>
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.55rem" }}>
              {FOOTER_LINKS.courses.map(l => <li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer-col-heading">Contact</p>
            <address style={{ fontStyle:"normal", display:"flex", flexDirection:"column", gap:"0.8rem" }}>
              <a href={SITE.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-link"><span>📍</span><span>{SITE.address.line1}, {SITE.address.city} - {SITE.address.pincode}</span></a>
              <a href={`tel:${SITE.phone}`} className="footer-contact-link"><span>📞</span><span>{SITE.phone}</span></a>
              <a href={`mailto:${SITE.email}`} className="footer-contact-link"><span>✉</span><span>{SITE.email}</span></a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:"1.5rem", display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:"0.75rem" }}>
          <p style={{ fontSize:"0.78rem", color:"var(--text-3)", fontWeight:400 }}>© {year} JVM Academy for Excellence. All rights reserved.</p>
          <p style={{ fontSize:"0.78rem", color:"var(--text-3)", fontWeight:400 }}>Coimbatore, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}
