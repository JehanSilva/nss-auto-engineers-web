import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nssauto.lk'),
  title: {
    default: "NSS Auto Engineers - Premier Car Repair Shop in Ja-Ela | Auto Repair & Engine Tune-Ups",
    template: "%s | NSS Auto Engineers Ja-Ela"
  },
  description: "Expert auto repair services in Ja-Ela & best mechanic near Ja-Ela. Specializing in engine repair, hybrid battery service, vehicle scanning, A/C repair, and brake replacement. We are a reliable 24-hour emergency auto garage offering affordable same-day car repair. Visit our auto parts store for genuine spare parts for all vehicle makes, Toyota KDH & Maruti Suzuki parts, Cworks filters, and wholesale auto parts in Sri Lanka. Full vehicle inspection and maintenance.",
  keywords: [
    "car repair shop in ja ela", 
    "auto repair in ja ela", 
    "Engine tune ups", 
    "ja-ela", 
    "automobile car repair",
    "Mechanic in Ja-Ela", 
    "Hybrid Repair Sri Lanka", 
    "Car Service Ja-Ela", 
    "NSS Auto Engineers", 
    "Sri Lanka Auto Repair",
    "Vehicle Scanning",
    "Genuine Spare Parts",
    "Car repair near me",
    "best mechanic in ja-ela",
    "Auto garage near reality plaza",
    "Auto garage in ja ela",
    "Car repair in ja-ela",
    "24-hour emergency mechanic",
    "Auto shop open on Saturday",
    "Same-day car repair",
    "Affordable car service",
    "Reliable auto repair shop",
    "Professional vehicle maintenance",
    "Brake pad replacement",
    "rotor resurfacing",
    "brake fluid flush",
    "ABS light diagnostics",
    "Engine rebuild",
    "timing belt replacement",
    "head gasket repair",
    "spark plug replacement",
    "Gearbox repair",
    "clutch replacement",
    "transmission fluid change",
    "automatic transmission service",
    "Shock absorber replacement",
    "power steering pump repair",
    "wheel alignment",
    "rack and pinion service",
    "Radiator leak repair",
    "water pump replacement",
    "coolant flush",
    "thermostat replacement",
    "Check engine light diagnosis",
    "ECU programming",
    "OBD-II scanning",
    "Battery health test",
    "alternator replacement",
    "starter motor repair",
    "jump-start service",
    "LED bulb installation",
    "wiring fault repairs",
    "Car A/C gas refill (recharge)",
    "A/C compressor repair",
    "heater core service",
    "cabin air filter change",
    "Car making squeaking noise when braking",
    "Engine overheating in traffic",
    "Steering wheel vibrating at high speeds",
    "White smoke coming from exhaust",
    "Car won't start but lights work",
    "Full vehicle inspection",
    "oil and filter change",
    "tire rotation",
    "emission test prep",
    "Collision repair",
    "dent removal",
    "car spray painting",
    "windshield crack repair",
    "Hybrid battery testing",
    "electric vehicle motor service",
    "Auto electrical services",
    "Suspension repair and replacement",
    "Car diagnostic services",
    "Engine scanning and diagnostics",
    "Car regular servicing",
    "Auto AC repair and maintenance",
    "Oil change and filter replacement",
    "Brake inspection and servicing",
    "Exhaust system repair",
    "Fuel injector cleaning services",
    "Car battery replacement Ja-Ela",
    "Pre-purchase car inspection Sri Lanka",
    "Engine overhaul specialists",
    "Hybrid car maintenance",
    "Japanese car repair specialists",
    "European car repair Ja-Ela",
    "Diesel engine repair",
    "Petrol engine tune-up",
    "Radiator replacement",
    "Car AC gas charging",
    "Car wash and detailing",
    "Car diagnostic testing",
    "Car garage Ja-Ela",
    "Auto garage Sri Lanka",
    "Best auto garage near me",
    "Hybrid car garage",
    "Engine repair garage",
    "Mechanic garage in Ja-Ela",
    "Vehicle repair garage",
    "Local auto garage",
    "Trusted car garage",
    "Full service auto garage"
  ],
  authors: [{ name: "NSS Auto Engineers" }],
  creator: "NSS Auto Engineers",
  publisher: "NSS Auto Engineers",
  openGraph: {
    title: "NSS Auto Engineers - Premier Car Repair Shop in Ja-Ela",
    description: "Expert auto repair services in Ja-Ela. Specializing in engine repair, hybrid battery service, scanning, genuine spare parts for all vehicle makes, 24-hour emergency mechanic, auto AC repair, and brake replacement. Best auto garage near Ja-Ela.",
    url: 'https://www.nssauto.lk',
    siteName: 'NSS Auto Engineers Ja-Ela',
    images: [
      {
        url: '/assets/sponser-banner-2.png',
        width: 1200,
        height: 630,
        alt: 'NSS Auto Engineers Auto Repair Workshop in Ja-Ela',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NSS Auto Engineers - Expert Auto Repair in Ja-Ela',
    description: "Expert auto repair services in Ja-Ela. Specializing in engine repair, hybrid battery service, vehicle scanning, and genuine spare parts for all vehicle makes. Reliable 24-hour emergency mechanic and auto garage near Ja-Ela.",
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
      <head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-T3HCZ4CYGS" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T3HCZ4CYGS');
          `}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              "name": "NSS Auto Engineers",
              "description": "Expert auto repair services in Ja-Ela & best mechanic near Ja-Ela. Specializing in engine repair, hybrid battery service, vehicle scanning, A/C repair, and brake replacement. We are a reliable 24-hour emergency auto garage offering affordable same-day car repair and genuine spare parts for all vehicle makes.",
              "image": "https://www.nssauto.lk/assets/sponser-banner-2.png",
              "url": "https://www.nssauto.lk",
              "telephone": "+94777123456", // Placeholder, user might want to update
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "NSS Auto Engineers",
                "addressLocality": "Ja-Ela",
                "addressRegion": "Western Province",
                "addressCountry": "LK"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 7.0784, 
                "longitude": 79.8913 
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:30",
                "closes": "17:30"
              },
              "priceRange": "$$"
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}