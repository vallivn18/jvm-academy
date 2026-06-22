import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
export const metadata: Metadata = { title:"Contact Us", description:"Contact JVM Academy, Coimbatore. Call +91 9944900195." };
const INFO = [
  { icon:"📍", title:"Location",         text:`${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city} - ${SITE.address.pincode}`, href:SITE.googleMapsUrl, cta:"Get Directions" },
  { icon:"📞", title:"Phone / WhatsApp", text:SITE.phone,  href:`tel:${SITE.phone}`,      cta:"Call Now" },
  { icon:"✉",  title:"Email",            text:SITE.email,  href:`mailto:${SITE.email}`,   cta:"Send Email" },
  { icon:"🕐", title:"Working Hours",    text:"Mon – Sat: 9:00 AM – 7:00 PM", href:null,  cta:null },
];
export default function ContactPage() {
  return (
    <>
      <header className="page-header">
        <div className="page-header-glow" style={{ bottom:"-80px", right:"-80px" }} />
        <div className="container-site" style={{ position:"relative", zIndex:1 }}>
          <span className="eyebrow">Get in Touch</span>
          <div className="divider" />
          <h1 className="h-page">Contact Us</h1>
          <p className="body-lg" style={{ maxWidth:"460px", marginTop:"0.75rem" }}>We'd love to hear from you. Reach out and we'll respond within 24 hours.</p>
        </div>
      </header>
      <section className="section" style={{ background:"var(--section-a)" }}>
        <div className="container-site">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.75rem" }}>
            {/* Enquiry box */}
            <div className="card anim-up" style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}>
              <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.375rem", color:"var(--text-1)" }}>Send an Enquiry</h2>
              <p className="body-lg" style={{ fontSize:"0.9rem" }}>The full enquiry form is coming soon. For now, reach us instantly via WhatsApp or phone.</p>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent:"center", marginTop:"0.5rem" }}>💬 WhatsApp Us Now</a>
              <a href={`tel:${SITE.phone}`} className="btn-ghost" style={{ justifyContent:"center" }}>📞 {SITE.phone}</a>
            </div>
            {/* Info cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {INFO.map((item,i) => (
                <div key={item.title} className={`card anim-up d-${i+1}`} style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                  <div style={{ width:"42px", height:"42px", borderRadius:"11px", background:"var(--orange-subtle)", border:"1px solid var(--orange-border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", flexShrink:0 }}>{item.icon}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"0.84rem", color:"var(--text-1)", marginBottom:"0.25rem" }}>{item.title}</p>
                    <p style={{ fontSize:"0.85rem", color:"var(--text-3)", lineHeight:1.6, fontWeight:400 }}>{item.text}</p>
                    {item.href && item.cta && (
                      <a href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel={item.href.startsWith("http")?"noopener noreferrer":undefined} className="inline-cta">{item.cta} →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
