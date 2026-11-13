import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const mono = JetBrains_Mono({ variable: "--font-mono-jb", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Kod Akademiyası — Front End və Back End öyrən",
  description: "Başlanğıcdan senior səviyyəyə qədər Azərbaycan dilində proqramlaşdırma dərsləri və AI müəllim.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="az" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
