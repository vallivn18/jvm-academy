/**
 * @file constants.ts
 * @description Central data store for JVM Academy website.
 *
 * ✅ HOW TO USE:
 *   - To update the phone number → change SITE.phone
 *   - To add a new course     → add an object to COURSES array
 *   - To add a testimonial    → add an object to TESTIMONIALS array
 *   - To add a nav link       → add an object to NAV_LINKS array
 *
 * All components import from here. Change once → updates everywhere.
 */

// ─── Site-wide metadata ───────────────────────────────────────────────────────
export const SITE = {
  name: "JVM Academy for Excellence",
  tagline: "Transforming Lives Through Language & Knowledge",
  shortName: "JVM Academy",
  description:
    "Premier coaching centre in Coimbatore specialising in English communication, IELTS, TOEFL, and career development with 10+ years of excellence.",
  phone: "+91 9944900195",
  email: "jvmacademyforexcellence@gmail.com", // update with real email
  address: {
    line1: "Building No 6A-4/49, Opposite Planet Care",
    line2: "Bashyakaralu Road East, RS Puram",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641002",
  },
  googleMapsUrl:
    "https://maps.google.com/?q=JVM+Academy+for+Excellence+Coimbatore",
  facebook: "https://www.facebook.com/jvmacademyforexcellence/",
  youtube: "https://www.youtube.com/channel/UChZJgFP2n_D7JtCi0ijksng",
  whatsapp: "https://wa.me/919944900195",

  // SEO
  url: "https://jvmacademy.in", // update when domain is live
  ogImage: "/og-image.jpg",
} as const;

// ─── Navigation links ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Courses",  href: "/courses" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Contact",  href: "/contact" },
] as const;

// ─── Stats (homepage highlights) ─────────────────────────────────────────────
export const STATS = [
  { value: "10+",   label: "Years of Excellence" },
  { value: "1400+", label: "Students Placed" },
  { value: "4.7★",  label: "Rating on JustDial" },
  { value: "100%",  label: "Personalised Attention" },
] as const;

// ─── Courses ──────────────────────────────────────────────────────────────────
export type Course = {
  id: string;
  title: string;
  description: string;
  icon: string;        // emoji icon — swap for an SVG component if preferred
  badge?: string;      // optional badge text e.g. "Popular"
  features: string[];
};

export const COURSES: Course[] = [
  {
    id: "ielts",
    title: "IELTS Preparation",
    description:
      "Comprehensive training covering all four modules — Listening, Reading, Writing, and Speaking — with mock tests and personalised feedback.",
    icon: "🎯",
    badge: "Most Popular",
    features: [
      "Band 7+ targeted strategies",
      "Weekly mock tests",
      "One-on-one speaking sessions",
      "Study material included",
    ],
  },
  {
    id: "toefl",
    title: "TOEFL Preparation",
    description:
      "Structured TOEFL coaching with focus on academic English, integrated tasks, and time management for top scores.",
    icon: "📘",
    features: [
      "IBT format practice",
      "Writing & speaking templates",
      "Full-length practice tests",
      "Score improvement guarantee",
    ],
  },
  {
    id: "english-speaking",
    title: "English Speaking",
    description:
      "Build fluency and confidence in spoken English through small-group sessions, storytelling, and real-world conversation practice.",
    icon: "💬",
    badge: "Beginner Friendly",
    features: [
      "Small batch sizes",
      "Pronunciation correction",
      "Business English modules",
      "Flexible timings",
    ],
  },
  {
    id: "english-camp",
    title: "English Camp",
    description:
      "Intensive English immersion camp designed for professionals, housewives, students, and working individuals on a budget.",
    icon: "⛺",
    features: [
      "Minimum budget, maximum benefit",
      "Need-based curriculum",
      "Personal anecdotes & storytelling",
      "Certificates provided",
    ],
  },
  {
    id: "upsc",
    title: "UPSC Coaching",
    description:
      "Focused guidance for UPSC aspirants with emphasis on Geography, current affairs, and essay writing.",
    icon: "🏛️",
    features: [
      "Subject-wise deep dives",
      "Answer writing practice",
      "Monthly current affairs",
      "Motivational sessions",
    ],
  },
  {
    id: "overseas",
    title: "Overseas Education",
    description:
      "End-to-end career development and abroad study counselling — from course selection to visa documentation guidance.",
    icon: "✈️",
    features: [
      "University shortlisting",
      "SOP & LOR guidance",
      "Visa prep support",
      "Post-arrival assistance",
    ],
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export type Testimonial = {
  id: string;
  name: string;
  role: string;        // e.g. "IELTS Student", "Working Professional"
  rating: number;      // 1–5
  review: string;
  avatar?: string;     // path to image in /public, or leave undefined for initials
  source?: "seed" | "google" | "justdial" | "user"; // where the review came from
};

// Seed reviews — real reviews found on JustDial & PlanetSpark listings.
// User-submitted reviews (via the Gallery page upload form) are stored
// separately in browser storage and merged with this list at render time.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sandhiya",
    role: "Spoken English Student",
    rating: 5,
    review:
      "I have been attending Speak English Fluently classes since July 2023. Happy that now I am placed. Thanks to JVM. Good faculty and great support throughout.",
    source: "justdial",
  },
  {
    id: "t2",
    name: "Naveen",
    role: "Programming Student",
    rating: 5,
    review:
      "C and C++ programming languages were handled in a pretty good way. Thank you JVM Academy for Excellence for the clear and structured teaching.",
    source: "justdial",
  },
  {
    id: "t3",
    name: "Gowtham",
    role: "IELTS Student",
    rating: 5,
    review:
      "I'm currently taking classes for IELTS and I'm really glad that I picked JVM Academy for that. Jayasree ma'am is awesome — her teaching style makes every class enjoyable.",
    source: "justdial",
  },
  {
    id: "t4",
    name: "Priya Lakshmi",
    role: "IELTS Student",
    rating: 5,
    review:
      "Jayasree ma'am's teaching style is unlike anything I have experienced before. Her small stories and personal anecdotes made every class interesting. I scored Band 7.5!",
    source: "seed",
  },
  {
    id: "t5",
    name: "Arjun Krishnamurthy",
    role: "Software Engineer",
    rating: 5,
    review:
      "I was very hesitant about my spoken English at the workplace. After just two months at JVM, I can confidently lead meetings and present ideas. Truly transformative.",
    source: "seed",
  },
  {
    id: "t6",
    name: "Meena Sundaram",
    role: "TOEFL Student",
    rating: 5,
    review:
      "The personalised attention here is real. Ma'am remembered my weak areas every single class and worked on them specifically. I got 105 in TOEFL. Forever grateful.",
    source: "seed",
  },
];

// ─── Gallery Photos ───────────────────────────────────────────────────────────
export type GalleryPhoto = {
  id: string;
  src: string;          // image URL or path
  caption: string;
  source?: "seed" | "user";
};

// Seed photos — real photos of JVM Academy sourced from the PlanetSpark
// business listing (publicly hosted on their CDN). User-uploaded photos
// (via the Gallery page) are stored separately and merged at render time.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    src: "https://cdn5.planetspark.in/media/300455690_444833924326029_7061944582800800976_n_354117c54e.jpg",
    caption: "JVM Academy classroom session",
    source: "seed",
  },
  {
    id: "g2",
    src: "https://cdn5.planetspark.in/media/2022_09_23_abdaf13262.webp",
    caption: "Students in an interactive class",
    source: "seed",
  },
  {
    id: "g3",
    src: "https://cdn5.planetspark.in/media/unnamed_91_4802c41354.webp",
    caption: "Group learning activity",
    source: "seed",
  },
  {
    id: "g4",
    src: "https://cdn5.planetspark.in/media/unnamed_92_4339390a90.webp",
    caption: "Academy classroom environment",
    source: "seed",
  },
  {
    id: "g5",
    src: "https://cdn5.planetspark.in/media/unnamed_93_af88e09676.webp",
    caption: "Student engagement session",
    source: "seed",
  },
  {
    id: "g6",
    src: "https://cdn5.planetspark.in/media/unnamed_94_8a7e578446.webp",
    caption: "Hands-on learning at JVM Academy",
    source: "seed",
  },
];

// ─── Footer links ─────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home",     href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Courses",  href: "/courses" },
    { label: "Gallery",  href: "/gallery" },
    { label: "Contact",  href: "/contact" },
  ],
  courses: [
    { label: "IELTS",             href: "/courses#ielts" },
    { label: "TOEFL",             href: "/courses#toefl" },
    { label: "English Speaking",  href: "/courses#english-speaking" },
    { label: "English Camp",      href: "/courses#english-camp" },
    { label: "UPSC Coaching",     href: "/courses#upsc" },
    { label: "Overseas Education",href: "/courses#overseas" },
  ],
} as const;
