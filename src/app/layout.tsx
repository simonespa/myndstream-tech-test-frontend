import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Ad free spa music - Myndstream";
const description =
  "Elevate your spa experience with The Stream — a wellness music platform with soundscapes designed by leading artists and scientists to elevate the guest experience and enhance the outcomes of your treatments.";
const url = "https://myndstream.com";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Myndstream",
    images: [
      {
        url: "/myndstream.webp",
        width: 1089,
        height: 955,
        type: "image/webp",
        alt: "Myndstream",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@myndstreammusic",
    images: ["/myndstream.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
