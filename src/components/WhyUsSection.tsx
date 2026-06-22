/**
 * @file WhyUsSection.tsx — v4  (theme-aware, no hardcoded dark colours)
 */
const WHY = [
  { n:"01", icon:"🎯", title:"Truly Personalised",    desc:"One-on-one sessions built around your pace, your weak areas, your goals. No batch pressure." },
  { n:"02", icon:"👩‍🏫", title:"Expert-Led Training",   desc:"Founded and taught by Jayasree S. (M.A, M.Phil, M.Ed) with 10+ years of passionate teaching." },
  { n:"03", icon:"📊", title:"Proven Track Record",   desc:"1,400+ students placed in companies across India and abroad. Real results, real stories." },
  { n:"04", icon:"💡", title:"Need-Based Learning",   desc:"Curriculum crafted for each learner — from total beginner to Band 8 IELTS. We meet you where you are." },
] as const;
export default function WhyUsSection() {
  return (
    <section className="section" style={{ background:"var(--section-b)" }}>
      <div className="container-site">
        <div style={{ marginBottom:"3rem" }}>
          <span className="eyebrow">Our Difference</span>
          <div className="divider" />
          <h2 className="h-section">Why Thousands Choose<br /><span className="accent">JVM Academy</span></h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"1.25rem" }}>
          {WHY.map((w,i) => (
            <div key={w.title} className={`card anim-up d-${i+1}`} style={{ position:"relative", overflow:"hidden" }}>
              <div aria-hidden style={{ position:"absolute", top:"-8px", right:"14px", fontFamily:"var(--font-display)", fontWeight:800, fontSize:"4.5rem", color:"var(--orange-subtle)", lineHeight:1, userSelect:"none", pointerEvents:"none", filter:"blur(0.5px)" }}>{w.n}</div>
              <div style={{ fontSize:"1.8rem", marginBottom:"0.875rem" }}>{w.icon}</div>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.05rem", color:"var(--text-1)", marginBottom:"0.6rem" }}>{w.title}</h3>
              <p style={{ fontSize:"0.875rem", color:"var(--text-3)", lineHeight:1.72, fontWeight:400 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
