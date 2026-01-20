import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emmo - Musician Landing Page",
  description: "Official landing page for Emmo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
