import type { Metadata } from "next";
import CourseCard from "@/components/CourseCard";
import CTABanner  from "@/components/CTABanner";
import { COURSES } from "@/lib/constants";
export const metadata: Metadata = { title:"Our Courses", description:"IELTS, TOEFL, Spoken English, UPSC at JVM Academy Coimbatore." };
export default function CoursesPage() {
  return (
    <>
      <header className="page-header">
        <div className="page-header-glow" style={{ top:"-80px", right:"-80px" }} />
        <div className="container-site" style={{ position:"relative", zIndex:1 }}>
          <span className="eyebrow">What We Offer</span>
          <div className="divider" />
          <h1 className="h-page">Our Courses</h1>
          <p className="body-lg" style={{ maxWidth:"520px", marginTop:"0.75rem" }}>
            Personalised programmes designed to meet you where you are.
          </p>
        </div>
      </header>
      <section className="section" style={{ background:"var(--section-a)" }}>
        <div className="container-site">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.25rem" }}>
            {COURSES.map((c,i) => <CourseCard key={c.id} course={c} style={{ animationDelay:`${i*75}ms` }} />)}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
