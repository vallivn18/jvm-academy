/**
 * @file CoursesPreview.tsx — v4  (theme-aware)
 */
import Link from "next/link";
import { COURSES } from "@/lib/constants";
import CourseCard from "@/components/CourseCard";
export default function CoursesPreview() {
  return (
    <section className="section" style={{ background:"var(--section-a)" }}>
      <div className="container-site">
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:"1.5rem", marginBottom:"3rem" }}>
          <div>
            <span className="eyebrow">What We Teach</span>
            <div className="divider" />
            <h2 className="h-section">Courses Designed<br />Around Your Goals</h2>
          </div>
          <Link href="/courses" className="btn-ghost" style={{ fontSize:"0.82rem", padding:"0.65rem 1.5rem" }}>View All Courses →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.25rem" }}>
          {COURSES.slice(0,3).map((c,i) => <CourseCard key={c.id} course={c} style={{ animationDelay:`${i*110}ms` }} />)}
        </div>
      </div>
    </section>
  );
}
