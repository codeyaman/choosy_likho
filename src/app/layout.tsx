import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Agentation } from "agentation";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Social Atelier — Ready-to-Publish Content Plans",
  description:
    "An elite content-strategy studio. Choose your industry, set the cadence, feed us your brand notes — receive a complete, ready-to-publish social media plan.",
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <body className="grain bg-ink text-cream antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          {process.env.NODE_ENV === "development" && <Agentation />}
        </ThemeProvider>
      </body>
    </html>
  );
}
