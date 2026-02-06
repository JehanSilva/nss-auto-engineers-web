import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nssauto.lk'),
  title: {
    default: "NSS Auto Engineers - Expert Auto Repair in Ja-Ela",
    template: "%s | NSS Auto Engineers"
  },
  description: "Expert auto repair services in Ja-Ela. Specializing in engine repair, hybrid battery service, scanning, and genuine spare parts for all vehicle makes.",
  keywords: ["Auto Repair", "Ja-Ela", "Mechanic", "Hybrid Repair", "Engine Tune-up", "Car Service", "NSS Auto Engineers", "Sri Lanka"],
  authors: [{ name: "NSS Auto Engineers" }],
  creator: "NSS Auto Engineers",
  publisher: "NSS Auto Engineers",
  openGraph: {
    title: "NSS Auto Engineers - Expert Auto Repair in Ja-Ela",
    description: "Expert auto repair services in Ja-Ela. Specializing in engine repair, hybrid battery service, scanning, and genuine spare parts.",
    url: 'https://www.nssauto.lk',
    siteName: 'NSS Auto Engineers',
    images: [
      {
        url: '/assets/sponser-banner-2.png',
        width: 1200,
        height: 630,
        alt: 'NSS Auto Engineers Workshop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NSS Auto Engineers - Expert Auto Repair',
    description: 'Professional auto repair and maintenance services in Ja-Ela.',
    images: ['/assets/sponser-banner-2.png'],
  },
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}