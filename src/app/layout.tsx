/**
 * @file layout.tsx — v4
 *
 * Sets data-theme="dark" on <html> by default (server-side).
 * ThemeToggle.tsx overrides this on the client using localStorage.
 *
 * The inline <script> runs BEFORE the page paints — this prevents
 * the "flash of wrong theme" (FWOT) that would otherwise happen if
 * a user saved "light" preference and the page starts dark for a frame.
 */
import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "../lib/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: [
    "IELTS coaching Coimbatore", "TOEFL coaching Coimbatore",
    "English speaking classes Coimbatore", "JVM Academy",
    "spoken English Coimbatore", "UPSC coaching Coimbatore",
  ],
  openGraph: { type: "website", url: SITE.url, title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('jvm-theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>

      <body
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg)",
          color: "var(--text-1)",
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
