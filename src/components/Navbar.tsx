"use client";
/**
 * @file Navbar.tsx — v4
 *
 * THEME TOGGLE BUTTON is in the right side of the navbar.
 * It shows a ☀️ Sun icon in dark mode  → click to switch to Light
 * It shows a 🌙 Moon icon in light mode → click to switch to Dark
 *
 * The navbar always has a solid background (never transparent) so the
 * toggle button and all nav links are always clearly visible.
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/*
        ─── NAVBAR ─────────────────────────────────────────────────
        Always has a background — never transparent — so the
        ☀️/🌙 theme toggle button is ALWAYS visible to the user.
        On scroll it gains a blur + shadow for depth.
        ────────────────────────────────────────────────────────────
      */}
      <header
        className="navbar-header"
        style={{
          background: scrolled ? "var(--nav-bg)" : "var(--bg-2)",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: "1px solid var(--nav-border)",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
          transition: "background 0.35s, box-shadow 0.35s",
        }}
      >
        <nav className="container-site navbar-inner">

          {/* ── Logo ───────────────────────────────────────── */}
          <Link href="/" className="navbar-logo" aria-label="JVM Academy home">
            <div className="navbar-logo-img">
              <Image
                src="/jvm_logo.jpeg"
                alt="JVM Academy Logo"
                width={40} height={40}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <span className="navbar-logo-name">JVM Academy</span>
              <span className="navbar-logo-sub">for Excellence</span>
            </div>
          </Link>

          {/* ── Desktop nav links ───────────────────────────── */}
          <ul className="navbar-links hide-mobile">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`navbar-link ${active ? "navbar-link-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right: Theme toggle + CTA + Hamburger ─────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>

            {/*
              ☀️ / 🌙  THEME TOGGLE BUTTON
              ──────────────────────────────
              This is the button to switch between dark and light themes.
              • In dark mode  → shows ☀️ Sun  → click for Light mode
              • In light mode → shows 🌙 Moon → click for Dark mode
              Preference is saved — survives page refresh.
            */}
            <ThemeToggle />

            {/* Call Now — desktop only */}
            <a
              href={`tel:${SITE.phone}`}
              className="btn-primary hide-mobile"
              style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}
            >
              Call Now
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(p => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="hamburger show-mobile"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="hamburger-bar"
                  style={{
                    transform: menuOpen
                      ? i === 0 ? "rotate(45deg) translateY(6.5px)"
                      : i === 2 ? "rotate(-45deg) translateY(-6.5px)"
                      : "none"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>

        {/* ── Mobile slide-down menu ────────────────────────── */}
        <div
          className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="container-site mobile-menu-inner">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mobile-nav-link ${active ? "mobile-nav-link-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={`tel:${SITE.phone}`}
              className="btn-primary"
              style={{ marginTop: "0.5rem", justifyContent: "center" }}
            >
              📞 {SITE.phone}
            </a>
          </div>
        </div>
      </header>

      {/* Responsive media queries */}
      <style>{`
        @media (min-width: 768px) {
          .hide-mobile { display: flex !important; }
          .show-mobile  { display: none  !important; }
        }
        @media (max-width: 767px) {
          .hide-mobile { display: none  !important; }
          .show-mobile  { display: flex  !important; }
        }
      `}</style>
    </>
  );
}
