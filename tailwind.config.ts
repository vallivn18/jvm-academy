/**
 * @file tailwind.config.ts
 *
 * Tailwind CSS v4 NOTE:
 * In v4, theme customisation (colours, fonts, animations) moves INTO
 * globals.css using @theme { } — this config file is now minimal.
 *
 * The content array is still needed to tell Tailwind which files to scan.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;