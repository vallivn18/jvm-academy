import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import Image from "next/image";
export const metadata: Metadata = { title:"About Us", description:"JVM Academy founded by Jayasree S. in Coimbatore." };
const MILESTONES = [
  { year:"2013", text:"JVM Academy founded with a vision to make English coaching truly personal." },
  { year:"2016", text:"Expanded to IELTS & TOEFL with dedicated modules for Band 7+ results." },
  { year:"2019", text:"Crossed 500+ students successfully placed across India." },
  { year:"2023", text:"Added UPSC coaching and Overseas Education counselling." },
  { year:"2025", text:"1,400+ lives transformed. Rated 4.7★ with 152+ reviews on JustDial." },
];
export default function AboutPage() {
  return (
    <>
      <header className="page-header">
        <div className="page-header-glow" style={{ top:"-80px", left:"-80px" }} />
        <div className="container-site" style={{ position:"relative", zIndex:1 }}>
          <span className="eyebrow">Our Story</span>
          <div className="divider" />
          <h1 className="h-page">About JVM Academy</h1>
        </div>
      </header>

      {/* Chairperson */}
      <section className="section" style={{ background:"var(--section-a)" }}>
        <div className="container-site">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:"3.5rem", alignItems:"center" }}>
            <div className="anim-scale" style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"270px", height:"270px", borderRadius:"var(--r-xl)", overflow:"hidden", border:"2px solid var(--orange-border)", boxShadow:"0 0 50px var(--orange-glow)", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg-card)", padding:"1.875rem" }}>
                <Image src="/jvm_logo.jpeg" alt="JVM Academy" width={210} height={210} style={{ objectFit:"contain" }} />
              </div>
            </div>
            <div className="anim-up d-1">
              <span className="eyebrow">Our Chairperson</span>
              <div className="divider" />
              <h2 className="h-section" style={{ marginBottom:"0.6rem" }}>Jayasree S.</h2>
              <p style={{ color:"var(--orange)", fontSize:"0.875rem", fontWeight:600, marginBottom:"1.25rem", letterSpacing:"0.04em" }}>M.A · M.Phil · M.Ed · Cha &amp; Head Trainer</p>
              <p className="body-lg" style={{ marginBottom:"0.875rem" }}>With over a decade of experience, Jayasree has built JVM Academy on one belief — every student is unique and deserves a curriculum built just for them.</p>
              <p className="body-lg">Known for her personal teaching style and genuine care, she has transformed 1,400+ lives across Coimbatore and beyond.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background:"var(--section-b)" }}>
        <div className="container-site">
          <span className="eyebrow">Our Journey</span>
          <div className="divider" />
          <h2 className="h-section" style={{ marginBottom:"2.75rem" }}>A Decade of Excellence</h2>
          <div style={{ position:"relative", maxWidth:"680px" }}>
            <div style={{ position:"absolute", left:"34px", top:0, bottom:0, width:"1px", background:"var(--orange-border)" }} />
            <div style={{ display:"flex", flexDirection:"column", gap:"1.875rem" }}>
              {MILESTONES.map((m,i) => (
                <div key={m.year} className={`anim-up d-${i+1}`} style={{ display:"flex", gap:"1.875rem", alignItems:"flex-start" }}>
                  <div style={{ flexShrink:0, width:"68px", height:"68px", borderRadius:"50%", background:"var(--orange-subtle)", border:"1px solid var(--orange-border)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontWeight:800, fontSize:"0.72rem", color:"var(--orange)", zIndex:1 }}>{m.year}</div>
                  <p className="body-lg" style={{ paddingTop:"1.1rem" }}>{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
