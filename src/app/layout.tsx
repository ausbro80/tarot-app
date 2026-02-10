import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Magic Fortune Cookie | Free AI Tarot & Horoscope",
  description: "Get your daily fortune read by Master Meow! 🐱 Free AI Tarot reading, daily horoscope, and mystical advice.",
  keywords: ["AI Tarot", "Free Tarot Reading", "Cute Astrology", "Daily Horoscope", "Magic Fortune"],
  openGraph: {
    title: "Magic Fortune Cookie | Free AI Tarot",
    description: "Meow! Let me read your stars today! 🔮",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Placeholder - Replace YOUR_CLIENT_ID later */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID" crossOrigin="anonymous"></script>
      </head>
      <body className={fredoka.className}>{children}</body>
    </html>
  );
}
