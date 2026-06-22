# JVM Academy for Excellence Website

Modern, responsive, and SEO-optimized website for **JVM Academy for Excellence**, a leading coaching and career development institute in Coimbatore.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E)

---

## About JVM Academy

**JVM Academy for Excellence** is a premier coaching institute founded by **Jayasree S. (M.A, M.Phil, M.Ed)**.

Over the past **10 years**, the academy has helped **1200–1400 students** secure opportunities in companies across India and abroad through specialized training programs and personalized mentorship.

**Location**

Bashyakaralu Road East, RS Puram, Vadakovai, Coimbatore – 641002

**Contact**

+91 9944900195

**Rating**

⭐ 4.7/5 (152+ Reviews)

---

## Services

* English Speaking Classes
* IELTS Coaching
* TOEFL Coaching
* UPSC Coaching
* One-on-One Mentoring Sessions
* Overseas Education Guidance
* Career Development Programs
* Interview Preparation
* Communication Skills Training

---

## Features

### Website Features

* Responsive mobile-first design
* Modern dark/light theme support
* SEO-optimized pages
* Fast page loads and performance optimization
* Course and service pages
* Student testimonials
* Gallery & Reviews section
* Student photo uploads
* Review submission system
* Contact & enquiry forms
* Call-to-action sections
* Smooth animations and transitions

### Admin & Data Features

* Review moderation support
* Image storage and management
* Cloud database integration
* Email notifications for enquiries

---

## Tech Stack

| Technology              | Purpose                 |
| ----------------------- | ----------------------- |
| Next.js 15 (App Router) | Frontend Framework      |
| React                   | UI Library              |
| TypeScript              | Type Safety             |
| Tailwind CSS v4         | Styling                 |
| Framer Motion           | Animations              |
| Lucide React            | Icons                   |
| React Hook Form         | Form Handling           |
| Supabase                | Database & File Storage |
| Resend / EmailJS        | Email Services          |
| Cloudflare Pages        | Hosting & Deployment    |

---

## Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── courses/
│   ├── gallery/
│   ├── contact/
│   └── layout.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CTABanner.tsx
│   ├── ThemeToggle.tsx
│   └── ...
│
├── lib/
│   ├── constants.ts
│   └── userContent.ts
│
└── public/
```

---

## Gallery & Reviews

The Gallery & Reviews system allows students to:

* Upload photos
* Submit reviews
* Share success stories
* Browse community contributions

All uploads are stored securely using Supabase Storage and can be moderated before publication.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/jvm-academy-website.git
cd jvm-academy-website
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
cp .env.example .env.local
```

Add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

RESEND_API_KEY=
CONTACT_EMAIL=
```

### Run Development Server

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
npm start
```

---

## Deployment

### Cloudflare Pages

This project is optimized for deployment on Cloudflare Pages.

```bash
npm run build
```

Connect the GitHub repository to Cloudflare Pages and deploy.

---

## SEO Highlights

* Metadata API
* Open Graph support
* Semantic HTML
* Optimized images
* Fast Core Web Vitals
* Mobile-first architecture

---

## Future Enhancements

* Admin dashboard
* Review approval workflow
* Student achievement showcase
* Course registration portal
* WhatsApp integration
* Blog & educational resources
* Analytics dashboard

---

© JVM Academy for Excellence. All rights reserved.
