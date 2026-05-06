import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LZ Three Gallery",
  description: "A deterministic WebGL effects sketchbook with blunt grades, visible keepers, and archived failures.",
  openGraph: {
    title: "LZ Three Gallery",
    description: "Small React Three Fiber effects, graded by taste instead of hidden behind a polished reel.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LZ Three Gallery",
    description: "Small WebGL effects, blunt grades, and the failures left in.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
