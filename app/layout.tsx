import type { Metadata } from "next";
import { Manrope, Urbanist } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Chinmaya Vidyalaya Kollam",
  description: "Providing a strong foundation for students to discover their innate talents and skills.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-body">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
