import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurora Fine Arts | Print.Work",
  description: "A completely self-sufficient printing house with a 35-year legacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased bg-white text-black`}
      >
        <LenisWrapper>
          {children}
        </LenisWrapper>
      </body>
    </html>
  );
}
