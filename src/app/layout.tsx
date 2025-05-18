import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/NavBar/Navbar";
import Homefooter from "./Components/HomePage/Homefooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: [
      // Primary production icon (absolute URL)
      { 
        url: "https://hostelhub.shop/Image/logo.png",
        type: "image/png",
        sizes: "32x32"
      },
      // Development/localhost fallback
      { 
        url: "/Image/logo.png", 
        type: "image/png",
        rel: "alternate icon",
        sizes: "32x32"
      },
      // Apple touch icon
      {
        url: "/Image/logo.png",
        type: "image/png",
        rel: "apple-touch-icon",
        sizes: "180x180"
      }
    ],
  },
  metadataBase: new URL("https://hostelhub.shop"), // Critical for absolute URLs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Preload logo for better performance */}
      <head>
        <link 
          rel="preload" 
          href="/Image/logo.png" 
          as="image" 
          type="image/png"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div><Navbar /></div>
        <div className="my-6">{children}</div>
        <section><Homefooter /></section>
      </body>
    </html>
  );
}