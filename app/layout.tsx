import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://triviumsports.com"),
  title: {
    default: "Trivium Sports | Tennis Coaches & U.S. Clubs",
    template: "%s | Trivium Sports",
  },
  description:
    "Trivium Sports connects international tennis coaches and collegiate players with U.S. tennis clubs and academies — a clear path from the college game to coaching on American courts.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Trivium Sports",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
