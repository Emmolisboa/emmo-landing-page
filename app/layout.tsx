import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emmo — Music for Hire",
  description: "Live music, videos & booking inquiries.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Emmo — Music for Hire",
    description: "Live music, videos & booking inquiries.",
    images: [
      {
        url: "/images/Dropbox/DSC_0470.jpg",
        width: 1200,
        height: 630,
        alt: "Emmo performing live",
      },
    ],
    type: "website",
    siteName: "Emmo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmo — Music for Hire",
    description: "Live music, videos & booking inquiries.",
    images: ["/images/Dropbox/DSC_0470.jpg"],
  },
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
