/**
 * @file StatsSection.tsx — v4  (theme-aware)
 */
import { STATS } from "@/lib/constants";
export default function StatsSection() {
  return (
    <section style={{ background:"var(--bg-2)", borderBottom:"1px solid var(--border)", padding:"3rem 0" }}>
      <div className="container-site">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"1.5rem" }}>
          {STATS.map((s,i) => (
            <div key={s.label} className={`anim-up d-${i+1}`} style={{ textAlign:"center", padding:"1rem" }}>
              <p style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(1.75rem,3vw,2.5rem)", color:"var(--orange)", lineHeight:1, marginBottom:"0.4rem" }}>{s.value}</p>
              <p style={{ fontSize:"0.8rem", color:"var(--text-3)", fontWeight:400 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
