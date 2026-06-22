/**
 * @file CourseCard.tsx — v4  (theme-aware)
 */
import type { CSSProperties } from "react";
import type { Course } from "@/lib/constants";
type Props = { course: Course; style?: CSSProperties; };
export default function CourseCard({ course, style }: Props) {
  return (
    <article className="card anim-up" style={{ display:"flex", flexDirection:"column", ...style }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"1.125rem" }}>
        <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:"var(--orange-subtle)", border:"1px solid var(--orange-border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.375rem", flexShrink:0 }}>{course.icon}</div>
        {course.badge && <span className="badge">{course.badge}</span>}
      </div>
      <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.05rem", color:"var(--text-1)", marginBottom:"0.6rem" }}>{course.title}</h3>
      <p style={{ fontSize:"0.86rem", color:"var(--text-3)", lineHeight:1.68, marginBottom:"1.125rem", flex:1, fontWeight:400 }}>{course.description}</p>
      <div style={{ height:"1px", background:"var(--border)", marginBottom:"1.125rem" }} />
      <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.45rem" }}>
        {course.features.map((f) => (
          <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:"0.5rem", fontSize:"0.82rem", color:"var(--text-2)", fontWeight:400 }}>
            <span style={{ color:"var(--orange)", fontWeight:700, flexShrink:0, marginTop:"1px" }}>✓</span>{f}
          </li>
        ))}
      </ul>
      <a href={`/contact?course=${course.id}`} className="btn-primary" style={{ marginTop:"1.625rem", justifyContent:"center", fontSize:"0.84rem" }}>Enquire Now →</a>
    </article>
  );
}
