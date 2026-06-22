/**
 * @file app/page.tsx — Home  (composition only)
 */
import HeroSection    from "@/components/HeroSection";
import StatsSection   from "@/components/StatsSection";
import CoursesPreview from "@/components/CoursesPreview";
import WhyUsSection   from "@/components/WhyUsSection";
import CTABanner      from "@/components/CTABanner";
export const metadata = {
  title: "JVM Academy for Excellence | Coimbatore",
  description: "Premier coaching for IELTS, TOEFL, Spoken English & UPSC. 10+ years, 1400+ placed. Call +91 9944900195.",
};
export default function HomePage() {
  return (<><HeroSection /><StatsSection /><CoursesPreview /><WhyUsSection /><CTABanner /></>);
}
