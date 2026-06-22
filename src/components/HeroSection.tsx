/**
 * @file HeroSection.tsx — v4
 * Uses .h-page / .hero-headline CSS classes → no stretched text.
 * All colours via CSS vars → works in both dark and light themes.
 */
import Link from "next/link";
import Image from "next/image";
import { SITE, STATS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="hero-section" style={{ position:"relative", minHeight:"100svh", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* Dot grid background */}
      <div aria-hidden className="hero-dot-grid" />

      {/* Glow orbs */}
      <div className="glow-orb" style={{ width:"480px", height:"480px", top:"-80px", right:"-80px", background:"radial-gradient(circle, var(--orange-glow) 0%, transparent 70%)" }} />
      <div className="glow-orb" style={{ width:"320px", height:"320px", bottom:"80px", left:"-60px", background:"radial-gradient(circle, var(--orange-subtle) 0%, transparent 70%)" }} />

      {/* Main grid */}
      <div className="container-site" style={{ flex:1, display:"flex", alignItems:"center", paddingTop:"clamp(3rem,8vh,5.5rem)", paddingBottom:"2.5rem", position:"relative", zIndex:2 }}>
        <div className="hero-grid" style={{ display:"grid", gap:"3rem", alignItems:"center", width:"100%" }}>

          {/* ── Left text ── */}
          <div>
            {/* Eyebrow badge */}
            <div className="anim-up hero-badge">
              <span className="hero-badge-dot" />
              <span className="eyebrow" style={{ letterSpacing:"0.16em" }}>Coimbatore's Premier Academy</span>
            </div>

            {/* Headline — controlled size, no stretch */}
            <h1 className="hero-headline anim-up d-1">
              Learn Smarter.{" "}
              <span className="accent">Speak Better.</span>
              <br />
              Achieve More.
            </h1>

            {/* Sub-headline */}
            <p className="body-lg hero-sub anim-up d-2">
              Personalised coaching in IELTS, TOEFL, Spoken English &amp; UPSC.
              One-on-one attention · 10+ years · 1,400+ lives transformed.
            </p>

            {/* CTAs */}
            <div className="anim-up d-3" style={{ display:"flex", flexWrap:"wrap", gap:"0.875rem", marginBottom:"2.25rem" }}>
              <Link href="/courses" className="btn-primary">Explore Courses →</Link>
              <a href={`tel:${SITE.phone}`} className="btn-ghost">📞 Call Now</a>
            </div>

            {/* Stats row */}
            <div className="hero-stats anim-up d-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="hero-stat-val">{s.value}</p>
                  <p className="hero-stat-lbl">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right logo card ── */}
          <div className="anim-scale d-2 hero-right" style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:"clamp(240px,32vw,360px)" }}>
              <div aria-hidden className="hero-ring" />
              <div aria-hidden style={{ position:"absolute", inset:"22%", background:"radial-gradient(circle, var(--orange-glow) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(24px)" }} />
              <div className="anim-float hero-logo-box">
                <Image src="/jvm_logo.jpeg" alt="JVM Academy for Excellence" width={220} height={220} style={{ objectFit:"contain", borderRadius:"10px" }} priority />
              </div>
              <div className="float-badge float-badge-tr">⭐ 4.7 / 5 Rating</div>
              <div className="float-badge float-badge-bl">🎓 1,400+ Placed</div>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee ticker */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[0,1].map((i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"2.5rem", paddingRight:"2.5rem" }}>
              {["IELTS Coaching","TOEFL Preparation","Spoken English","UPSC Coaching","English Camp","Overseas Education","Career Guidance","One-on-One Sessions"].map((t) => (
                <span key={t} style={{ display:"flex", alignItems:"center", gap:"0.6rem", whiteSpace:"nowrap" }}>
                  <span className="mq-dot" /><span className="mq-text">{t}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(min-width:900px){ .hero-grid{ grid-template-columns:1fr 1fr !important; } }
        @media(max-width:899px){ .hero-right{ display:none !important; } }
      `}</style>
    </section>
  );
}
